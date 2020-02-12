import React from 'react';
import Nav from "./components/Nav"
import Flashes from "./components/Flashes"
import Login from "./components/Login"
import Register from "./components/Register"
import Timeline from "./components/Timeline"

function App() {
  // TODO: fetches flash message
  const dummy_flashes = ["this is a test flash msg", "this is another test flash msg"]
  return (
    <div className="App">
    <div className="page">
        <h1>MiniTwit</h1>
      <Nav name="joe" />
      <Flashes msgs={dummy_flashes} />
        <div className="body">
          {/* {'{'}% block body %{'}'}{'{'}% endblock %{'}'} */}
          {/* <Login/> */}
          {/* <Register/> */}
          <Timeline/>
        </div>
        <div className="footer">
          MiniTwit — A Flask Application
        </div>
      </div>
    </div>
  );
}


export default App;
