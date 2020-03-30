import React from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errorMessage: false
    };
  }

  changeHandler = (event) => {
    let nam = event.target.name
    let val = event.target.value
    this.setState({[nam]: val})
  }

  sendToApi = () => {

    const data = {username: this.state.username, password: this.state.password}
    fetch('https://minitwit-api.herokuapp.com/login' , {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((result) => {
        if(result.status == 200){
          this.props.history.push('/');
        } else {
          console.log('login failed');
          this.setState({errorMessage: true})
        }
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
                placeholder='Username'
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
          {
          this.state.errorMessage ? 
          <Message
            error
            header='Sign in failed'
            list={[
              'Make sure you correctly entered your credentials',
            ]}
          />
          : null
        }
        </Grid.Column>
      </Grid>
    )
  }
}
export default SignIn
