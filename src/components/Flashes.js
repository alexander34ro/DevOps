import React, { Component } from 'react'

function Flashes(props){
  const msgs = props.msgs
  if (msgs) {
    const flashes = msgs.map((msg) =>
                             <li> {msg} </li>
                            )
   return <ul className="flashes">{flashes}</ul>
  }

}


export default Flashes;
