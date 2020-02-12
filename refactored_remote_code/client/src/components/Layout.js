import React, { Component } from 'react'

class Layout extends Component {
  constructor(props) {
   super(props) ;
    let who = props.name ? props.name: "nobody"
    this.state = {
      isLogged: true,
      name : who,
    }
  }
  render() {
  return (
    <!doctype html>
    <title>{% block title %}Welcome{% endblock %} | MiniTwit</title>
    <link rel=stylesheet type=text/css href="url_style.css">
      <div class=page>
    <h1>MiniTwit</h1>
    {% with flashes = get_flashed_messages() %}
    {% if flashes %}
    <ul class=flashes>
    {% for message in flashes %}
    <li>{{ message }}
    {% endfor %}
    </ul>
    {% endif %}
    {% endwith %}
    <div class=body>
    {% block body %}{% endblock %}
    </div>
    <div class=footer>
    MiniTwit &mdash; A Flask Application
    </div>
    </div>
  );
}
}


export default Nav;
