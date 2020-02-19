import React from 'react'
import {Link} from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password2: '',
      email: ''
    };
  }

  changeHandler = (event) => {
    // https://www.w3schools.com/react/react_forms.asp
    let nam = event.target.name
    let val = event.target.value
    this.setState({[nam]: val})
  }

  sendToApi = () => {
    console.log(this.state)
    let data ={username: this.state.username,
               password: this.state.password,
               email: this.state.email}
    console.log(data)
    fetch('https://minitwit-api.herokuapp.com/register' , {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((result) => result.json())
      .then((info) => {
        console.log(info)
        if(info.result){
          console.log("success register")
        }else if(info.message){
          console.log("failed register")
          console.log(info.message)
        }
      })
  }

  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Sign up
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='Username'
                name='username'
                onChange={this.changeHandler}
              />
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='E-mail address'
                name='email'
                onChange={this.changeHandler}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name='password'
                onChange={this.changeHandler}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Repeat password'
                type='password'
                name='password2'
                onChange={this.changeHandler}
              />

              <Button color='teal' fluid size='large' onClick={this.sendToApi} >
                Sign Up
              </Button>
            </Segment>
          </Form>
          <Message>
            Already a member? <a href='/signin'>Sign In</a>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}

export default SignUp
