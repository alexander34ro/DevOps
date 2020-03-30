import React from 'react'
import { Button, Form, Message, Segment } from 'semantic-ui-react'

class WhatsOnYourMind extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      successMessage: false
    };
  }

  changeHandler = (event) => {
    let nam = event.target.name
    let val = event.target.value
    this.setState({[nam]: val})
  }

  sendToApi = () => {
    let data ={text: this.state.text}
    fetch('https://minitwit-api.herokuapp.com/add_message' , {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((result) => {
        if(result.status == 200){
          this.setState({successMessage: true})
          setTimeout(() => {
            this.setState({successMessage: false})
            window.location.reload();
          }, 3500);
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Segment >
        <Form >
          <Form.Group widths='equal'>
            <Form.TextArea
              id='form-textarea-control-opinion'
              label='Whats on your mind ?'
              placeholder='type here..'
                name='text'
                onChange={this.changeHandler}
            />
          </Form.Group>
          <Button type='submit' onClick={this.sendToApi} >Submit</Button>
        </Form>
        {
            this.state.successMessage ? 
            <Message
              success
              header='Hooray!'
              content='Your message is now available to your followers'
            />

            : null
          }
      </Segment>
    )
  }
}
export default WhatsOnYourMind
