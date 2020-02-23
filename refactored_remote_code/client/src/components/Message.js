import React from 'react'
import { Feed, Icon } from 'semantic-ui-react'
class Message extends React.Component {
  reportMsg() {
    alert("Do you want to report this message ?")
   
  }
  render (){
    const name = this.props.name
    const text = this.props.text
    const date = this.props.date
    return (
      <Feed.Event>
        <Feed.Label image='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
        <Feed.Content>
          <Feed.Summary>
            <a>{name}</a> posted on his page
            <Feed.Date>{date}</Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>
            {text}
          </Feed.Extra>
          <Feed.Meta>
            <Feed.Like>
              <Icon name='flag' onClick={this.reportMsg}/>
            </Feed.Like>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>

    )
  }

}
export default Message
