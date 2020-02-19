import React from 'react'
import { Feed, Icon } from 'semantic-ui-react'
import Message from './Message'

// const TwitFeed = () => (
class TwitFeed extends React.Component {
  render() {
    return (
      <Feed size="large">
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
