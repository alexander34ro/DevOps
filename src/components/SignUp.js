import React from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password2: '',
      email: '',
      errorMessage: false,
      successMessage: false,
      errorMessageUser: false
    };
  }

  changeHandler = (event) => {
    // https://www.w3schools.com/react/react_forms.asp
    let nam = event.target.name
    let val = event.target.value
    this.setState({[nam]: val})
  }

  sendToApi = () => {
    this.setState({
      errorMessage: false,
      errorMessageUser: false
    })

    const data = {username: this.state.username,
               password: this.state.password,
               email: this.state.email}
    
      if(data.username && data.password && data.email){
        fetch('https://minitwit-api.herokuapp.com/register' , {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then((result) => {
            if(result.status == 200){
              console.log('Sign up success')
              this.setState({successMessage: true})
            } else if(result.status == 409){
              console.log('Username exists')
              this.setState({errorMessageUser: true})
            } else {
              this.setState({errorMessage: true})
              console.log('Sign up error')
            }
          });
      } else {
        this.setState({errorMessage: true})
      }
      
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
          {
            this.state.successMessage ? 
            <Message
              success
              header='Your user registration was successful'
              content='You may now log-in with the username you have chosen.'
            />

            : null
          }
          {
            this.state.errorMessage ? 
            <Message
              error
              header='Sign up failed'
              list={[
                'Make sure you entered a valid email address',
                'Make sure you entered correctly the passwords',
              ]}
            />
            : null
          }
          {
            this.state.errorMessageUser ? 
            <Message
              error
              header='Sign up failed'
              list={[
                'Username already exists. Please choose another one',
              ]}
            />
            : null
          }
        </Grid.Column>

        
      </Grid>
      
    )
  }
}

export default SignUp
