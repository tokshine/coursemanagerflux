import React from "react";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import CoursePage from "./CoursesPage";
import Header from "./common/Header";
function App() {
  function getPage() {
    const route = window.location.pathname;
    if (route === "/about") {
      return <AboutPage />;
    }
    if (route === "/course") {
      return <CoursePage />;
    }
    return <HomePage />;
  }
  return (
    <div className="container-fluid">
      <Header />
      {getPage()}
    </div>
  );
}

export default App;
