import React from 'react'
import {Link} from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  changeHandler = (event) => {
    let nam = event.target.name
    let val = event.target.value
    this.setState({[nam]: val})
  }

  sendToApi = () => {
    let data ={username: this.state.username,
               password: this.state.password,}
    fetch('https://minitwit-api.herokuapp.com/login' , {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((result) => result.json())
      .then((info) => {
        console.log(info)
      })
  }

  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Log-in to your account
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='E-mail address'
                name='username'
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

              <Button color='teal' fluid size='large' onClick={this.sendToApi} >
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a href='/signup'>Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}
export default SignIn
