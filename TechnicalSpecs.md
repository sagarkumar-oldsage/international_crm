# Atlas — Technical Specification

> International Relations & Global Mobility CRM
> Companion document to the UI prototype in `index.html`. Use this to scaffold the backend, define the data model, and lay out the frontend.

---

## 0. Recommended Stack

Aligned with the README's preferences and the prototype's UX.

| Layer | Choice | Notes |
|---|---|---|
| **Frontend** | Next.js 14 (App Router) + TypeScript | RSC for read-heavy dashboards, client components for tables/kanbans |
| **Styling** | Tailwind CSS + CSS variables | Port the prototype's `oklch()` palette into `tailwind.config.ts` |
| **UI primitives** | Radix UI (or Mantine) + Framer Motion | Headless + accessible; avoid heavy component libs that fight the editorial look |
| **Data fetching** | TanStack Query v5 | Server cache, optimistic updates for kanban moves |
| **Forms** | React Hook Form + Zod | Shared schemas with backend via `tRPC` or generated OpenAPI clients |
| **Charts** | Recharts or Visx | Replace the inline SVG charts in `screens-intelligence.jsx` |
| **Realtime** | Socket.IO or Pusher | Notifications, inbox, visa-stage updates |
| **Backend** | NestJS (modular monolith) | Easier RBAC + decorators than FastAPI for a CRM of this shape |
| **DB** | PostgreSQL 16 + Prisma | Row-level security policies per institution |
| **Cache / Queue** | Redis + BullMQ | OCR, AI, email, expiry-watcher cron jobs |
| **Search** | Meilisearch (or Elastic) | Students, partners, documents (OCR text), KB |
| **Vector DB** | pgvector (start) → Pinecone (scale) | RAG for Atlas AI |
| **Storage** | S3 (or Cloudflare R2 / MinIO) | Presigned URLs, lifecycle rules |
| **Auth** | Keycloak | OAuth2 / SAML / Shibboleth for institutional SSO |
| **AI** | OpenAI + LangChain (or LlamaIndex) | SOP review, RAG counsel, prediction models |
| **Email** | Postmark / SendGrid | Transactional + templated MoU letters |
| **WhatsApp / SMS** | WhatsApp Business API + Twilio | Multi-channel comms |
| **E-sign** | Dropbox Sign / DocuSign | MoU signing workflows |
| **OCR** | AWS Textract (best) or PaddleOCR | Document repository indexing |
| **Observability** | OpenTelemetry → Grafana / Sentry | Plus pino structured logs |
| **Infra** | Docker → K8s (EKS/GKE) | GitHub Actions CI; ArgoCD CD |

---

## 1. Architecture

```
                                       ┌──────────────────────────┐
                                       │  Next.js 14 (App Router) │
        Browsers / Mobile (PWA)  ──►   │   SSR + RSC + Edge auth  │
                                       └─────────────┬────────────┘
                                                     │  REST / tRPC / WebSocket
                                                     ▼
                                       ┌──────────────────────────┐
                                       │   API Gateway (NestJS)   │
                                       │   AuthGuard · RBAC · DTO │
                                       └──┬───┬───┬────┬────┬─────┘
                                          │   │   │    │    │
              ┌───────────────────────────┘   │   │    │    └────────────┐
              ▼                               ▼   ▼    ▼                 ▼
       ┌─────────────┐               ┌──────────────────┐         ┌──────────────┐
       │ PostgreSQL  │               │  Redis + BullMQ  │         │  Meilisearch │
       │ + pgvector  │◄──Prisma──    │  (jobs, cache)   │         │   (search)   │
       └─────────────┘               └────────┬─────────┘         └──────────────┘
                                              │
                              ┌───────────────┼────────────────┐
                              ▼               ▼                ▼
                       ┌──────────┐    ┌────────────┐   ┌────────────────┐
                       │   OCR    │    │  AI / RAG  │   │ Comms (SMTP,   │
                       │ workers  │    │  workers   │   │ WhatsApp, SMS) │
                       └──────────┘    └────────────┘   └────────────────┘
                              │
                              ▼
                       ┌──────────────────────────┐
                       │ Object storage (S3 / R2) │
                       └──────────────────────────┘
```

**Bounded contexts** map 1:1 to the README modules. Implement as NestJS modules first; promote to separate services only when traffic justifies it.

```
auth · users · institutions · students · applications · opportunities ·
partners · mou · visa · documents · events · delegations · scholarships ·
finance · messaging · notifications · analytics · ai · knowledge-base ·
audit
```

---

## 2. Domain Model

> All tables carry `id (uuid)`, `institution_id`, `created_at`, `updated_at`, `deleted_at`. Hide soft-deleted rows in views. Add `tenant_id` if you ever go multi-tenant SaaS.

### 2.1 Identity & Access (`auth`, `users`)

```prisma
model Institution {
  id           String   @id @default(uuid())
  name         String
  domain       String   @unique          // tagore.edu
  established  Int?
  accreditations Json?                   // {NAAC: "A+", NBA: "Tier I"}
  region       String   @default("IN")
  config       Json?                     // feature flags, AI toggles
  users        User[]
  students     Student[]
  partners     PartnerUniversity[]
}

model User {
  id            String   @id @default(uuid())
  institutionId String
  email         String   @unique
  fullName      String
  avatarUrl     String?
  passwordHash  String?                  // null when SSO-only
  mfaSecret     String?
  ssoProvider   String?                  // google | microsoft | saml | keycloak
  isActive      Boolean  @default(true)
  lastLoginAt   DateTime?
  roles         UserRole[]
  sessions      Session[]
}

model Role {
  id          String  @id @default(uuid())
  key         String  @unique  // super_admin, ir_director, ir_coordinator, ...
  label       String
  scope       RoleScope        // INTERNAL | STUDENT | EXTERNAL
  permissions RolePermission[]
}

model Permission {
  id      String  @id @default(uuid())
  key     String  @unique     // students.read, applications.write, mou.sign, ...
  module  String              // students, applications, mou, ...
}

model UserRole       { userId String; roleId String; @@id([userId, roleId]) }
model RolePermission { roleId String; permId String; @@id([roleId, permId]) }

model Session    { id String @id; userId String; expiresAt DateTime; ua String? ; ip String? }
model AuditLog   { id String @id; actorId String?; action String; entityType String; entityId String; meta Json; at DateTime @default(now()) }
```

**Roles** (seed from README §1):

```
INTERNAL  : super_admin, ir_director, ir_coordinator, dept_coordinator,
            faculty_mentor, admission_team, visa_team, finance_team,
            placement_team, hostel_team, event_manager
STUDENT   : domestic_student, outbound_student, exchange_student,
            study_abroad_applicant, internship_applicant
EXTERNAL  : incoming_student, visiting_faculty, delegate,
            partner_rep, foreign_recruiter
```

**Permission keys** follow `<module>.<verb>[.<scope>]` — e.g. `applications.write.own`, `mou.sign`, `analytics.export.naac`.

### 2.2 Students (`students`)

```prisma
model Student {
  id              String  @id @default(uuid())
  institutionId   String
  userId          String? @unique           // links to User if they log in
  externalId      String                    // STU-3987
  fullName        String
  dob             DateTime?
  gender          String?
  email           String
  phone           String?
  enrollmentYear  Int?
  program         String                    // M.Sc. Data Science
  department      String
  cgpa            Float?

  // Passport & nationality
  nationality     String                    // ISO-3166
  passportNumber  String?    @db.Text       // field-level encrypted
  passportExpiry  DateTime?

  // Profile JSON shards (avoid 60-column tables)
  languageScores  Json?                     // {ielts:8.0, toefl:104, gre:325}
  preferences     Json?                     // {countries:["DE","CA"], budget:"<15k"}
  researchAreas   String[]

  // Mobility state
  mobilityType    MobilityType              // OUTBOUND | INCOMING | EXCHANGE | ...
  mentorId        String?

  applications    Application[]
  documents       Document[]
  visaCases       VisaCase[]
  scholarshipApps ScholarshipApplication[]
  eventRegs       EventRegistration[]
  tickets         Ticket[]
}

enum MobilityType { OUTBOUND  INCOMING  EXCHANGE  STUDY_ABROAD_APPLICANT  INTERNSHIP_APPLICANT  DOMESTIC }
```

### 2.3 Opportunities & Applications

```prisma
model Opportunity {
  id              String  @id @default(uuid())
  partnerId       String?
  title           String
  kind            OpportunityKind           // EXCHANGE, DUAL_DEGREE, FELLOWSHIP, INTERNSHIP, RESEARCH, SUMMER_SCHOOL, VOLUNTEER, COMPETITION
  country         String                    // ISO-3166-2
  disciplines     String[]
  durationMonths  Int
  tuition         String                    // €0, ¥143k/mo, "Waived"
  intake          String                    // Fall 2026
  deadline        DateTime
  eligibility     Json                      // {minCgpa:7.5, ielts:7.0, ...}
  description     String
  scholarshipIds  String[]
  isActive        Boolean @default(true)
}

model Application {
  id              String  @id @default(uuid())
  studentId       String
  opportunityId   String
  partnerId       String?
  intake          String
  stage           AppStage                  // see state machine §6.1
  stageEnteredAt  DateTime
  countryWorkflowId String?
  documentsRef    String[]                  // Document IDs
  notes           ApplicationNote[]
  assigneeId      String?                   // IR coordinator
  riskScore       Float?                    // AI-computed
  createdAt       DateTime @default(now())
}

enum AppStage { APPLIED  UNDER_REVIEW  INTERVIEW  OFFER_CONDITIONAL  OFFER_RECEIVED  REJECTED  VISA_APPROVED  ENROLLED  WITHDRAWN }

model CountryWorkflow {
  id          String @id @default(uuid())
  country     String                        // DE, UK, US, ...
  visaType    String
  steps       Json                          // ordered array of {key, label, avgDays, requiredDocs[]}
  sopFormat   String
  examMatrix  Json
  costEstimate Json
}
```

### 2.4 Visa & Immigration

```prisma
model VisaCase {
  id            String  @id @default(uuid())
  studentId     String
  country       String
  visaType      String                       // student-D, J1, Tier-4, ...
  stage         VisaStage
  appointmentAt DateTime?
  biometricsAt  DateTime?
  interviewAt   DateTime?
  embassy       String?
  probability   Float?                       // 0..1 AI-predicted
  documents     Document[]
  events        VisaEvent[]                  // audit trail
  appealedAt    DateTime?
}

enum VisaStage { FILED  BIOMETRICS  INTERVIEW  ADMIN_PROCESSING  APPROVED  REJECTED  APPEALED }

model VisaEvent { id String @id; caseId String; type String; detail Json; at DateTime }
```

### 2.5 Documents

```prisma
model Document {
  id              String  @id @default(uuid())
  ownerStudentId  String?
  uploadedById    String
  type            DocType                    // PASSPORT, IELTS, TRANSCRIPT, SOP, LOR, FINANCIAL, INSURANCE, OFFER, ACCEPTANCE, VISA_PACKET, OTHER
  name            String
  storageKey      String                     // s3://atlas-docs/{tenant}/{id}.pdf
  mimeType        String
  sizeBytes       Int
  pageCount       Int?
  checksum        String                     // sha256 for dedupe
  versionOf       String?                    // self-FK for versioning
  ocrText         String?  @db.Text          // populated by worker
  embedding       Unsupported("vector(1536)")? // pgvector
  status          DocStatus                  // UPLOADED, OCR_RUNNING, VERIFIED, REVIEWING, PENDING, EXPIRING, EXPIRED, REJECTED
  expiresAt       DateTime?
  verifiedById    String?
  verifiedAt      DateTime?
  signatures      DocSignature[]
  meta            Json                       // extracted fields {passport_no, dob, ...}
}

model DocSignature { id String @id; documentId String; signerEmail String; signedAt DateTime?; envelopeId String? }
```

OCR + verification pipeline → §6.4.

### 2.6 Partnerships & MoUs

```prisma
model PartnerUniversity {
  id            String @id @default(uuid())
  name          String
  country       String
  tier          PartnerTier                  // TIER_I, TIER_II, TIER_III
  qsRank        Int?
  contactPersons Json                        // [{name, email, role}]
  collabAreas   String[]
  mobilityQuota Int?
  mous          MoU[]
  delegations   Delegation[]
}

model MoU {
  id            String @id @default(uuid())
  code          String @unique               // MoU-DE-014
  partnerId     String
  title         String
  state         MoUState                     // see §6.3
  type          String                       // Exchange + Research, Dual Degree, ...
  signedAt      DateTime?
  effectiveFrom DateTime?
  effectiveTo   DateTime?
  documents     Document[]                   // current draft + signed copy
  history       MoUEvent[]
  reminders     MoUReminder[]
}

enum MoUState { DRAFTING  INTERNAL_REVIEW  PARTNER_REVIEW  AWAITING_SIGNATURE  ACTIVE  RENEWAL_DUE  EXPIRED  TERMINATED }
```

### 2.7 Events & Delegations

```prisma
model Event {
  id          String @id @default(uuid())
  title       String
  type        EventType                       // SEMINAR, WEBINAR, FDP, WORKSHOP, CONFERENCE, DELEGATION_VISIT, OUTREACH, SUPPORT
  startsAt    DateTime
  endsAt      DateTime
  location    String
  capacity    Int
  isVirtual   Boolean
  meetingUrl  String?
  qrToken     String?                         // QR attendance
  registrations EventRegistration[]
  speakers    Json
  feedbackForm Json?
}

model EventRegistration { id String @id; eventId String; studentId String?; userId String?; attendedAt DateTime?; certificateId String? }

model Delegation {
  id           String @id @default(uuid())
  partnerId    String
  arrivalAt    DateTime
  departureAt  DateTime
  visitors     Json                           // [{name, role, passport}]
  itinerary    Json
  meetingMinutes String?
  hospitality  Json
}
```

### 2.8 Scholarships & Finance

```prisma
model Scholarship {
  id          String  @id @default(uuid())
  name        String
  country     String
  provider    String                          // Erasmus, DAAD, Commonwealth, Fulbright, MEXT, INSTITUTIONAL
  amount      String                          // €850/mo, ₹full, ¥143k/mo
  eligibility Json
  deadline    DateTime
  isOpen      Boolean
  applications ScholarshipApplication[]
}

model ScholarshipApplication { id String @id; scholarshipId String; studentId String; status String; awardedAt DateTime?; documents Document[] }

model ExpenseEstimate {
  id        String @id @default(uuid())
  country   String
  programId String?
  items     Json                              // [{label,amount,pct}]
  totalYear Float
  currency  String
}
```

### 2.9 Communication

```prisma
model Thread     { id String @id; subject String; participants String[]; lastMessageAt DateTime; tag String }
model Message    { id String @id; threadId String; senderId String?; senderEmail String; body String @db.Text; channel Channel; attachments Document[]; isRead Boolean; createdAt DateTime }

enum Channel    { EMAIL  WHATSAPP  SMS  IN_APP  PUSH }

model Ticket    { id String @id; studentId String; subject String; category TicketCategory; priority String; status String; assigneeId String?; messages Message[] }

enum TicketCategory { VISA  HOSTEL  DOCUMENTATION  EMERGENCY  ACADEMIC  OTHER }
```

### 2.10 AI & Knowledge

```prisma
model AISession  { id String @id; userId String; title String; createdAt DateTime; messages AIMessage[] }
model AIMessage  { id String @id; sessionId String; role String; content String @db.Text; toolCalls Json?; tokens Int? }

model KBArticle  { id String @id; slug String @unique; title String; body String @db.Text; category String; tags String[]; readMins Int; embedding Unsupported("vector(1536)")?; publishedAt DateTime }
model LearningPath { id String @id; title String; weeks Int; modules Json; enrolledCount Int }
```

---

## 3. State Machines

### 3.1 Application Pipeline

```
APPLIED ─► UNDER_REVIEW ─► INTERVIEW ─► OFFER_CONDITIONAL ─► OFFER_RECEIVED
              │               │                                 │
              ▼               ▼                                 ▼
            REJECTED ◄────────┴───────────────────────────► VISA_APPROVED ─► ENROLLED
                                                                              │
                                                              WITHDRAWN ◄─────┘
```

Implement with a NestJS state-machine service or `xstate`. Persist last transition in `Application.stageEnteredAt` + emit `application.stage.changed` events for the kanban UI, notifications, and AI risk recompute.

### 3.2 Visa Case

`FILED → BIOMETRICS → INTERVIEW → ADMIN_PROCESSING → APPROVED | REJECTED → APPEALED?`

### 3.3 MoU Lifecycle

`DRAFTING → INTERNAL_REVIEW → PARTNER_REVIEW → AWAITING_SIGNATURE → ACTIVE → RENEWAL_DUE (90d before expiry) → EXPIRED | TERMINATED`

Renewal cron job runs daily, transitions `ACTIVE → RENEWAL_DUE` and pushes notifications.

### 3.4 Document

`UPLOADED → OCR_RUNNING → VERIFIED | REVIEWING | REJECTED → EXPIRING (30d) → EXPIRED`

---

## 4. REST API surface

All endpoints prefixed `/api/v1`. Paginated lists use `?limit=20&cursor=…`. Standard envelope: `{ data, meta, errors }`.

### 4.1 Auth
```
POST   /auth/login              { email, password }
POST   /auth/sso/:provider      → redirect
GET    /auth/sso/:provider/callback
POST   /auth/mfa/verify         { code }
POST   /auth/refresh
POST   /auth/logout
GET    /auth/me
```

### 4.2 Students
```
GET    /students                ?filter=outbound|incoming|visa|attention&country=&program=&intake=
POST   /students
GET    /students/:id
PATCH  /students/:id
GET    /students/:id/timeline           // application + visa + doc events
GET    /students/:id/documents
GET    /students/:id/applications
POST   /students/bulk-import            // CSV/Excel via presigned upload
```

### 4.3 Applications
```
GET    /applications            ?stage=&country=&intake=
POST   /applications
PATCH  /applications/:id
POST   /applications/:id/transition    { toStage, reason? }   // pipeline drag/drop
GET    /applications/pipeline           // kanban projection
GET    /applications/:id/checklist
```

### 4.4 Opportunities
```
GET    /opportunities           ?kind=&country=&tuitionMax=&durationMonths=&deadlineBefore=
POST   /opportunities
GET    /opportunities/:id
POST   /opportunities/:id/apply { studentId }
GET    /opportunities/ai-match  ?studentId=    // returns ranked list w/ explanations
```

### 4.5 Visa
```
GET    /visa/cases              ?country=&stage=&risk=high
POST   /visa/cases
PATCH  /visa/cases/:id
POST   /visa/cases/:id/transition { toStage, payload }
GET    /visa/expiry-watch       ?withinDays=30
GET    /visa/workflows/:country
```

### 4.6 Documents
```
POST   /documents/upload-url    { fileName, mimeType, sha256 } → { url, fields, docId }
POST   /documents/:id/finalize  // marks upload complete, triggers OCR
GET    /documents               ?type=&owner=&status=&q=…(OCR search)
GET    /documents/:id
GET    /documents/:id/download-url
POST   /documents/:id/verify
POST   /documents/:id/sign      { signerEmail }
POST   /documents/packet        { studentId, country } → zip URL
```

### 4.7 Partners & MoUs
```
GET    /partners                ?country=&tier=&type=
POST   /partners
GET    /partners/:id
GET    /partners/:id/mous
POST   /mous
PATCH  /mous/:id
POST   /mous/:id/transition     { toState }
POST   /mous/:id/send-for-signature
GET    /mous/renewals-due
```

### 4.8 Events & Delegations
```
GET    /events                  ?from=&to=&type=
POST   /events
POST   /events/:id/register
POST   /events/:id/attendance   { qrToken, userId }
GET    /events/:id/feedback
POST   /delegations
```

### 4.9 Scholarships
```
GET    /scholarships            ?country=&open=true
POST   /scholarships/:id/apply
GET    /scholarships/applications
GET    /finance/expense-estimate ?country=&programId=
```

### 4.10 Messaging
```
GET    /threads                 ?tag=&unread=
GET    /threads/:id/messages
POST   /threads/:id/messages    { body, channel }
POST   /messages/compose        { to[], subject, body, channel, attachments[] }
GET    /tickets
POST   /tickets
```

### 4.11 Analytics
```
GET    /analytics/kpis          ?range=30D|QTR|YTD
GET    /analytics/mobility      ?breakdown=country|program|gender|quarter
GET    /analytics/cohort        ?intake=Fall%202026
GET    /analytics/heatmap       ?dimension=country
POST   /analytics/exports       { kind: "naac" | "nirf" | "qs" | "the" } → job
```

### 4.12 AI
```
POST   /ai/sessions
POST   /ai/sessions/:id/messages    { content, attachments? }   // streamed
POST   /ai/sop/review               { documentId }
POST   /ai/resume/score             { documentId }
POST   /ai/match/universities       { studentId, weights? }
POST   /ai/predict/visa             { caseId }
POST   /ai/predict/admission        { applicationId }
POST   /ai/draft/mou                { partnerId, intent }
```

### 4.13 Knowledge Base
```
GET    /kb/articles             ?category=&q=
GET    /kb/articles/:slug
GET    /kb/paths
POST   /kb/paths/:id/enroll
```

### 4.14 WebSocket events

Channel `user:{id}` for per-user; `institution:{id}` for global.

```
notification.created
inbox.message.received
application.stage.changed
visa.stage.changed
document.verified
mou.signed
ai.token            // streamed chat tokens
```

---

## 5. Frontend route map (Next.js App Router)

```
app/
  (auth)/
    login/page.tsx                ← prototype: Login (login.jsx)
  (app)/
    layout.tsx                    ← Sidebar + Topbar + AuthGuard
    overview/page.tsx             ← OverviewScreen
    inbox/page.tsx                ← InboxScreen
    calendar/page.tsx             ← CalendarScreen (reuses Events)
    students/
      page.tsx                    ← StudentsScreen (list + detail rail)
      [id]/page.tsx               ← Full student profile
    applications/
      page.tsx                    ← ApplicationsScreen (kanban)
      [id]/page.tsx
    opportunities/page.tsx        ← OpportunitiesScreen
    visa/
      page.tsx                    ← VisaScreen
      [caseId]/page.tsx
    documents/page.tsx            ← DocumentsScreen
    partners/
      page.tsx                    ← PartnersScreen
      [id]/page.tsx
      mou/[mouId]/page.tsx
    events/page.tsx               ← EventsScreen
    scholarships/page.tsx         ← ScholarshipsScreen
    analytics/page.tsx            ← AnalyticsScreen
    ai/page.tsx                   ← AIScreen
    kb/page.tsx                   ← KnowledgeBaseScreen
    settings/page.tsx
```

### 5.1 Component library you'll need

Lift from the prototype (already organised this way):

| Component | File | Purpose |
|---|---|---|
| `Sidebar`, `Topbar` | `shell.jsx` | App chrome — `NAV` array drives the menu |
| `Sparkline` | `screens-overview.jsx` | tiny line in KPI cards |
| `Pipeline` | `screens-overview.jsx` | horizontal stacked stage bar |
| `WorldMap` | `screens-overview.jsx` | replace with `react-simple-maps` or D3 + GeoJSON |
| `LineChart`, `BarStack`, `DonutChart` | `screens-intelligence.jsx`, `screens-operations.jsx` | swap for Recharts in production |
| `GlobeArt` | `login.jsx` | login decoration; use Three.js for a 3D upgrade later |
| Tokens | `styles.css` | port to Tailwind theme |

---

## 6. Key workflows

### 6.1 Application drag-and-drop transition

1. Frontend uses `@dnd-kit/sortable`. On drop:
   `POST /applications/:id/transition { toStage }`
2. Backend validates allowed transition (state-machine guard).
3. Persists, writes `AuditLog`, emits `application.stage.changed`.
4. Triggers BullMQ jobs: `notifyAssignee`, `recomputeRiskScore`, `updateChecklist`.
5. WebSocket pushes to subscribed clients → TanStack Query invalidates `applications.pipeline`.

### 6.2 Visa risk scoring

Nightly cron + on-transition recompute.

Features: days-to-appointment, docs completeness %, country approval rate (rolling 90d), student CGPA & language scores, prior rejections, embassy slot saturation. Train an XGBoost classifier; serve from a Python worker behind `/ai/predict/visa`. Return `{ probability, top_factors[] }`.

### 6.3 MoU lifecycle + e-sign

```
Draft (rich-text editor)
  → Internal review (assign reviewers, threaded comments)
  → Partner review (share secure link, no Atlas login needed)
  → AWAITING_SIGNATURE: create Dropbox Sign envelope (DocSignature.envelopeId)
  → Webhook on signed → state = ACTIVE, store countersigned PDF as Document
  → Cron 90d before effectiveTo → state = RENEWAL_DUE, notify
```

### 6.4 Document ingest pipeline (BullMQ)

```
upload-url        →   client uploads to S3 directly
finalize          →   enqueue {ocr, classify, validate}
  ocrWorker       →   AWS Textract → ocrText, meta
  classifyWorker  →   small LLM call → DocType + confidence
  validateWorker  →   country-rules engine → status
  embedWorker     →   OpenAI embeddings → pgvector
                  →   Update Document; notify owner; index in Meilisearch
```

### 6.5 Atlas AI counsel (RAG)

Per user query:
1. Embed query (OpenAI text-embedding-3-small).
2. Hybrid search: pgvector top-K over `Document.embedding` + `KBArticle.embedding` filtered by `institution_id` & RBAC.
3. Pull structured context (e.g. student profile, latest visa case) via tool calls.
4. Compose prompt with citations. Stream response via SSE/WebSocket.
5. Persist `AIMessage` for replay + analytics.

Available tools the LLM can call:
```
get_student(id)
get_application(id)
list_opportunities(filters)
predict_visa(caseId)
score_sop(documentId)
match_universities(studentId, weights)
draft_email(template, context)
```

### 6.6 Notifications fanout

`NotificationService.dispatch({ userId, type, channels[] })` writes a `Notification` row, then pushes through enabled channels per the user's preferences:
- `IN_APP` → WebSocket
- `EMAIL` → Postmark template
- `WHATSAPP` → WhatsApp Business API
- `SMS` → Twilio fallback
- `PUSH` → Web Push + FCM

User-controlled preference matrix lives in `users.preferences.notifications`.

---

## 7. Security & Compliance

| Concern | Implementation |
|---|---|
| **Auth** | Keycloak realm per deployment; OIDC to Next.js via `next-auth`; refresh in httpOnly cookies |
| **MFA** | TOTP enforced for `super_admin`, `ir_director`, `visa_team`, `finance_team` |
| **RBAC** | Permission checks via `@RequirePermission('students.read.own')` NestJS decorator; row-level Postgres policies key on `institution_id` |
| **Field encryption** | `passportNumber`, `bankAccount`, `phone` encrypted with KMS-wrapped DEK |
| **Document storage** | S3 SSE-KMS + signed URLs (5-min expiry) + bucket policy denying anonymous reads |
| **Audit** | Every write goes through an interceptor that emits `AuditLog`; tamper-evident chain via per-row `prev_hash` (optional) |
| **GDPR / FERPA-equivalent** | Subject-access export endpoint `/me/export`; right-to-delete with cryptographic erasure (drop the DEK); consent log table |
| **Rate limiting** | NestJS Throttler + Cloudflare; harsher limits on `/ai/*` and `/auth/*` |
| **PII redaction** | Pipeline scrubs OCR text before sending to OpenAI; on-prem LLM option (Llama 3.1) toggle per institution |
| **Backups** | PITR on RDS, S3 versioning, weekly logical dump to separate region |
| **Vulnerability** | Dependabot + Snyk; OWASP ASVS L2 checklist |

---

## 8. Infrastructure & DevOps

```
.github/workflows/
  ci.yml                 # lint, test, type-check, prisma migrate diff
  cd-staging.yml         # build → ECR → ArgoCD sync
  cd-prod.yml            # manual approval gate

infra/
  terraform/             # VPC, RDS, ElastiCache, S3, IAM
  helm/atlas/            # api, web, workers, ingress
  k8s/                   # raw manifests for one-off tooling

docker/
  Dockerfile.web         # multi-stage Next.js standalone
  Dockerfile.api         # NestJS w/ Prisma client
  Dockerfile.worker      # OCR + AI workers (Python sidecar for ML)
```

**Environments:** `dev` (one shared cluster), `staging` (single-replica), `prod` (HA + read replica).

**Observability:** OTel collector → Tempo (traces) + Loki (logs) + Prometheus (metrics) + Grafana. Sentry for frontend + backend errors. Statuspage for incidents.

---

## 9. MVP roadmap (mapping to README §"Phase 1 MVP")

### Phase 1 — MVP (3 months)

| Sprint | Deliverable |
|---|---|
| 1 | Auth (email + Google SSO), institution + users + RBAC seed, shell layout |
| 2 | Students module (CRUD + bulk import), documents upload + OCR |
| 3 | Applications + kanban + state machine + country workflows |
| 4 | Visa cases + expiry-watch cron + notifications |
| 5 | Partners + MoU lifecycle (no e-sign yet) |
| 6 | Events + registration + attendance |
| 7 | Inbox (email channel only) + ticketing |
| 8 | Analytics dashboard (KPIs + heatmap) + accreditation export stubs |
| 9 | Atlas AI v1 — university match + SOP review (single endpoint each) |
| 10 | Polish, perf, security pass, deploy to staging |

### Phase 2 (3–6 months)
- WhatsApp + SMS channels; full notification preference matrix
- E-sign (Dropbox Sign); MoU partner-portal share links
- Visa probability ML model + retraining pipeline
- AI counsel RAG over docs + KB
- Knowledge base authoring + learning paths
- NAAC / NIRF / QS / THE export generators

### Phase 3 (6–12 months)
- Mobile (PWA → React Native with shared schemas)
- Blockchain credential verification (Polygon/Hyperledger)
- Global internship marketplace
- Alumni network module
- Multi-tenant SaaS hardening (per-institution Postgres schema, isolated S3 prefixes, billing)

---

## 10. Open decisions to lock before sprint 1

1. **NestJS or FastAPI?** Recommend NestJS for the CRM scaffolding (decorators, RBAC, BullMQ integration), Python only for the ML workers.
2. **Single-tenant or multi-tenant from day one?** Single-tenant is faster to ship; design schema with `institution_id` everywhere so you can flip later without migration pain.
3. **AI provider:** OpenAI for speed → add Llama 3.1 self-hosted as opt-in for data-sensitive institutions.
4. **Search:** Meilisearch is simpler ops; Elastic if you anticipate >5M docs or complex aggregations.
5. **E-sign vendor:** Dropbox Sign cheaper and friendlier API; DocuSign if your university already has a contract.
6. **Hosting:** AWS (mature K8s, Textract, KMS) or self-hosted on-prem if data residency is a regulatory requirement in your region.

---

## 11. File index — how the prototype maps to source-of-truth

| Concern | Prototype file | Lift to |
|---|---|---|
| Design tokens | `styles.css` | `tailwind.config.ts` + `app/globals.css` |
| Icons | `icons.jsx` | `components/Icon.tsx` (or migrate to Lucide) |
| Mock data | `data.jsx` | Seeders in `prisma/seed.ts` + Faker |
| Login | `login.jsx` | `app/(auth)/login/page.tsx` |
| Shell | `shell.jsx` | `components/Sidebar.tsx`, `Topbar.tsx`, `app/(app)/layout.tsx` |
| Overview | `screens-overview.jsx` | `app/(app)/overview/page.tsx` + `components/KpiRow`, `WorldMap`, `Pipeline` |
| Students | `screens-mobility.jsx` | `app/(app)/students/*` |
| Applications · Visa · Opps | `screens-apps.jsx` | corresponding routes |
| Docs · Partners · Events · Scholarships | `screens-operations.jsx` | corresponding routes |
| Analytics · AI · KB · Inbox · Calendar · Settings | `screens-intelligence.jsx` | corresponding routes |
| App routing | `app.jsx` | replaced by Next.js file-based routing |

---

End of spec. Treat this as v0 — iterate as you discover constraints in deployment, integrations, and accreditation reporting requirements.
