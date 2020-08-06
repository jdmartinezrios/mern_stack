import React from "react";
import "./App.css";
import Main from "./components/commons/Main";
import CreateNote from "./components/notes/CreateNote";
import UdateNote from "./components/notes/UdateNote";
import ListNotes from "./components/notes/ListNotes";
import CreateUser from "./components/users/CreateUser";
import Navigation from "./components/commons/Navigation";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navigation></Navigation>
      <div className="container p-4">
        <Route path="/" exact component={Main}></Route>
        <Route path="/editNotes/:id" component={CreateNote}></Route>
        <Route path="/createNotes" component={CreateNote}></Route>
        <Route path="/updateNotes" component={UdateNote}></Route>
        <Route path="/listNotes" component={ListNotes}></Route>
        <Route path="/createUsers" component={CreateUser}></Route>
      </div>
    </Router>
  );
}

export default App;
