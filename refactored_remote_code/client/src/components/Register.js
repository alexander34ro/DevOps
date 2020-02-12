import React, { Component } from 'react'

class Register extends Component {
  constructor(props) {
    super(props) ;
    let name = props.name ? props.name: "nobody"
    this.state = {
      isLogged: true,
      username : name,
    }
  }
  componentDidMount(){
    document.title = "Sign Up"
  }
  render() {
    // TODO: fetch error msgs
    const error = "oupsii";
    let errorEl = null;
    if (error)
      errorEl = <div className="error"><strong>Error:</strong> {error}</div>
    return (

    <div>
        <h2>Sign Up</h2>
        {errorEl}
        <form action method="post">
          <dl>
            <dt>Username:
            </dt><dd><input type="text" name="username" size={30} defaultValue="{{ request.form.username }}" />
            </dd><dt>E-Mail:
            </dt><dd><input type="text" name="email" size={30} defaultValue="{{ request.form.email }}" />
            </dd><dt>Password:
            </dt><dd><input type="password" name="password" size={30} />
            </dd><dt>Password <small>(repeat)</small>:
            </dt><dd><input type="password" name="password2" size={30} />
            </dd></dl>
          <div className="actions"><input type="submit" defaultValue="Sign Up" /></div>
        </form>
      </div>
   
    );
  }
}

export default Register;

    // <div>
    //     {'{'}% block title %{'}'}Sign Up{'{'}% endblock %{'}'}
    //     {'{'}% block body %{'}'}
    //     <h2>Sign Up</h2>
    //     {'{'}% if error %{'}'}<div className="error"><strong>Error:</strong> {'{'}{'{'} error {'}'}{'}'}</div>{'{'}% endif %{'}'}
    //     <form action method="post">
    //       <dl>
    //         <dt>Username:
    //         </dt><dd><input type="text" name="username" size={30} defaultValue="{{ request.form.username }}" />
    //         </dd><dt>E-Mail:
    //         </dt><dd><input type="text" name="email" size={30} defaultValue="{{ request.form.email }}" />
    //         </dd><dt>Password:
    //         </dt><dd><input type="password" name="password" size={30} />
    //         </dd><dt>Password <small>(repeat)</small>:
    //         </dt><dd><input type="password" name="password2" size={30} />
    //         </dd></dl>
    //       <div className="actions"><input type="submit" defaultValue="Sign Up" /></div>
    //     </form>
    //     {'{'}% endblock %{'}'}
    //   </div>
