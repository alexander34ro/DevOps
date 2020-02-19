import React from 'react'
import { Feed, Icon } from 'semantic-ui-react'
import Message from './Message'

// const TwitFeed = () => (
class TwitFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
    componentDidMount() {
    fetch("https://minitwit-api.herokuapp.com/public")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.result
          });
          console.log("success fetching api")
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
            console.log("fail fetching api")
        }
      )
  }
  render() {
    const { error, isLoaded, items } = this.state;
    return (
      <Feed size="large">
          {items.map(item => (
            <Message name={item.author_id}
            text={item.text}
            date={item.pub_date}/>
          ))}
      </Feed>

    )

  }
}

export default TwitFeed
