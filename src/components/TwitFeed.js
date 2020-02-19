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
    console.log("items:")
    console.log(items)
    console.log("--")
    return (
      <Feed size="large">
        <ul>
          {items.map(item => (
            <li key={item._id}>
              {item.author_id}
              {item.pub_date}
              {item.text}
            </li>
          ))}
        </ul>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
      </Feed>

    )

  }
}

export default TwitFeed
