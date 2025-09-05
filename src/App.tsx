// import React from "react";
// import logo from "./logo.svg";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Table from "./components/Table";
import Forms from "./components/Forms";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />

      <header className="App-header">
        <Switch>
          <Route exact path="/" component={Table} />
          <Route path="/create-user" component={Forms} />
        </Switch>

        {/* <Forms /> */}
        {/* <Table /> */}
      </header>
    </div>
  );
}

export default App;
