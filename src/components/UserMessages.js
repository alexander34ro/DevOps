import React from 'react'
import { Feed, Container, Header, Segment, Dimmer, Loader, Image, Button, Icon, Label, Message as MessageAlert } from 'semantic-ui-react'
import Message from './Message'

export default class UserMessages extends React.Component {
    
  constructor(props) {
    super(props);
    console.log(props)

    this.onFollowClicked = this.onFollowClicked.bind(this);

    this.state = {
        items: [],
        loaded: false,
        followError: false,
        followSuccess: false,
        username: this.props.location.pathname.substr(1)
    };
  }

  componentDidMount() {

    fetch("https://minitwit-api.herokuapp.com/"+this.state.username)
      .then(res => res.json())
      .then(
        (result) => {
          console.log("success fetching api")
          this.setState({
            items: result.response,
            loaded: true
          });
        },

        (error) => {
          this.setState({
            error
          });
            console.log("fail fetching api")
        }
      )
  }

  onFollowClicked() {

    fetch('https://minitwit-api.herokuapp.com/'+ this.state.username +'/follow')
    .then( result => {
      console.log('success', result);
      if(result.status == 200){
        this.setState({followSuccess: true});
        setTimeout(() => {
          this.setState({followSuccess: false})
        }, 3500);
      } else {
        console.log('error');
        this.setState({followError: true})
      }
    })
    .catch(err => this.setState({followError: true}))
  }

  render(){
    const { items } = this.state;
      return(

        <div>

        {
          this.state.loaded ?
        <Container text style={{ marginTop: '7em' }}>
            <Header as='h1'>{this.state.username}'s feed</Header>
            <Button as='div' labelPosition='right' onClick={this.onFollowClicked}>
              <Button basic color='blue'>
                <Icon name='user plus' />
                Follow
              </Button>
              <Label as='a' basic color='blue' pointing='left'>
                +1
              </Label>
            </Button>

            {
          this.state.followError ? 
            <MessageAlert
              error
              header='Follow failed'
              list={[
                'An unexpected error has occured. Please try again later.',
              ]}
            />
            : null
        }

        {
          this.state.followSuccess ?
            <MessageAlert
              success
              header='Follow successful'
              content='You are now following the user.'
            />

            :null
        }
            <Feed size="large">
                {
                items.map(item => (
                    <Message key={item.message_id.toString()}
                    name={this.username}
                    text={item.text}
                    date={item.pub_date}
                    />
                ))
                }
            </Feed>
        </Container>
  
          : 
  
          <Segment>
            <Dimmer active style={{ height: '15vh', marginTop: '7em' }}>
              <Loader size="big" inverted>Loading</Loader>
            </Dimmer>
      
            <Image src='/images/wireframe/short-paragraph.png' />
          </Segment>
        }
        </div>
      )
  }

}