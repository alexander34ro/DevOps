import React, { Component } from 'react'

class Login extends Component {
  constructor(props) {
    super(props) ;
    let name = props.name ? props.name: "nobody"
    this.state = {
      isLogged: true,
      username : name,
    }
  }
  componentDidMount(){
    document.title = "Sign in"
  }
  render() {
    const isLogged = this.state.isLogged;
    const username = this.state.username;
    // TODO: fetch error msgs
    const error = "oupsii";
    let errorEl = null;
    if (error)
      errorEl = <div className="error"><strong>Error:</strong> {error}</div>
    return (
      <div>
      <h2>Sign In </h2>
      {errorEl}
      <div>
        <form action method="post">
          <dl>
            <dt>Username:
            </dt><dd><input type="text" name="username" size={30} defaultValue="{{ request.form.username }}" />
            </dd><dt>Password:
            </dt><dd><input type="password" name="password" size={30} />
            </dd></dl>
          <div className="actions"><input type="submit" defaultValue="Sign In" /></div>
        </form>
      </div>
      </div>
    );


  }
}

export default Login;
