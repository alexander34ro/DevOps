import React, { Component } from 'react'

class Nav extends Component {
  constructor(props) {
    super(props) ;
    let name = props.name ? props.name: "nobody"
    this.state = {
      isLogged: true,
      username : name,
    }
  }
  render() {
    const isLogged = this.state.isLogged;
    const username = this.state.username;
    if (isLogged){
        return loggedNav({name:username});
    }else{
        return loggedOutNav();
    }


  }
}

function loggedNav(props){
  let username = props.name;
  return (
    <div className="navigation">
                 <a href="/url_timeline">my timeline</a> | <a href="/url_public_timeline">public timeline</a> | <a href="url_logout">sign out {username}</a>
               </div>
  )
}

function loggedOutNav(props){
    return (<div className="navigation">
                     <a href="url_public_timeline">public timeline</a>
                     <a href="url_register">sign up</a>
                     <a href="url_login">sign in</a>
                   </div>)
 
}

export default Nav;
