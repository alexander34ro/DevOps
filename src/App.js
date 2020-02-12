import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from "./components/Nav"

function App() {
  const dummy_flashes = ["this is a test flash msg", "this is another test flash msg"]
  return (
    <div className="App">
      <Nav name="joe" />
    <div className="page">
        <h1>MiniTwit</h1>
      <Flashes flashes_msgs={dummy_flashes} />
        <div className="body">
          {/* {'{'}% block body %{'}'}{'{'}% endblock %{'}'} */}
        </div>
        <div className="footer">
          MiniTwit — A Flask Application
        </div>
      </div>
    </div>
  );
}

function Flashes(props){
        // {/* {'{'}% with flashes = get_flashed_messages() %{'}'} */}
        // {/* {'{'}% if flashes %{'}'} */}
        // <ul className="flashes">
        //   {/* {'{'}% for message in flashes %{'}'} */}
        //   <li>
        //     {/* {'{'}{'{'} message {'}'}{'}'} */}
        //     {/* {'{'}% endfor %{'}'} */}
        //   </li></ul>
        // {/* {'{'}% endif %{'}'} */}
        // {/* {'{'}% endwith %{'}'} */}
  // console.log(msgs)
  // const msgs = ["test flashes"]
  const msgs = props.flashes_msgs
  if (msgs) {
    const flashes = msgs.map((msg) =>
                             <li> {msg} </li>
                            )
   return <ul className="flashes">{flashes}</ul>
  }

}

export default App;
