export interface StudentProfileDto {
  id: string;
  fullName: string;
  email: string;
  program: string;
  cgpa: number;
  languageScore: string;
  destinationPreferences: string[];
  budgetBand: string;
}
