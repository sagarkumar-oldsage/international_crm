/* App entry: handles login → shell routing */

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [active, setActive] = React.useState('overview');

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)}/>;
  }

  const screens = {
    overview:  <OverviewScreen/>,
    inbox:     <InboxScreen/>,
    calendar:  <CalendarScreen/>,
    students:  <StudentsScreen/>,
    apps:      <ApplicationsScreen/>,
    opps:      <OpportunitiesScreen/>,
    visa:      <VisaScreen/>,
    docs:      <DocumentsScreen/>,
    partners:  <PartnersScreen/>,
    events:    <EventsScreen/>,
    finance:   <ScholarshipsScreen/>,
    analytics: <AnalyticsScreen/>,
    ai:        <AIScreen/>,
    kb:        <KnowledgeBaseScreen/>,
    settings:  <SettingsScreen/>
  };

  return (
    <div className="app-shell">
      <Sidebar active={active} setActive={setActive} onLogout={() => setLoggedIn(false)}/>
      <main className="main-scroll" data-screen-label={active}>
        <Topbar active={active} setActive={setActive}/>
        {screens[active] || screens.overview}
      </main>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
