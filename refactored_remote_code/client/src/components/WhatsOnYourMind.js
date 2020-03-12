import React from 'react'
import {Link} from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class WhatsOnYourMind extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
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
      .then((result) => result.json())
      .then((info) => {
        console.log(info)
      })
  }

  render() {

    var label = "Whats on your mind ? "
    if( localStorage.getItem('username') ){
	label ="Whats on your mind " + localStorage.getItem('username') + " ?"
    }


    return (
      <Segment >
        <Form >
          <Form.Group widths='equal'>
            <Form.TextArea
              id='form-textarea-control-opinion'
              label={label}
              placeholder='type here..'
                name='text'
                onChange={this.changeHandler}
            />
          </Form.Group>
          <Button type='submit' onClick={this.sendToApi} >Submit</Button>
        </Form>
      </Segment>
    )
  }
}
export default WhatsOnYourMind
