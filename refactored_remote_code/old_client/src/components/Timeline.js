import React, { Component } from 'react'

class Timeline extends Component {
  constructor(props) {
    super(props) ;
    let name = props.name ? props.name: "nobody"
    this.state = {
      isLogged: true,
      username : name,
    }
  }
   
  render() {
    // TODO: fetch error msgs
    const error = "oupsii";
    let errorEl = null;
    if (error)
      errorEl = <div className="error"><strong>Error:</strong> {error}</div>

    // TODO: fetch data
    var title = "Timeline title";
    var username = "John"
    var currentUserId = 5703520
      var otherUserId = 8558840
      var otherUserName = "bob"
      var follow = true
      var allTwits = []
      var isLogged = true
      var isUserTimeline = true


      if (isLogged){
          if(isUserTimeline){
              document.title = otherUserName + "'s Timeline'"
              return(
                  <div>
                    <UserTimelineFollowingStatus
                      isFollowing={follow}
                      user={currentUserId}
                      profile_user={otherUserId}/>
                    <TwitFeed feed={[]}/>
                  </div>
              )

          }

          else if(currentUserId == otherUserId){ // self feed
              document.title = "My Timeline"
              return(
                  <div>
                    <UserTimelineFollowingStatus
                      isFollowing={follow}
                      user={currentUserId}
                      profile_user={otherUserId}/>
                    <TwitFeed feed={otherUserId}/>
                    <WhatsOnYourMind name={username}/>
                    <TwitFeed feed={currentUserId}/>
                  </div>
              )

          }

          else{ // loggedIn, public feed
              document.title = "Public Timeline"
              return(
                  <div>
                    <TwitFeed feed="public"/>
                  </div>
              )

          }
      }else{ // loggedOut, public feed
              document.title = "Public Timeline"
              return(
                  <div>
                    <TwitFeed feed="public"/>
                  </div>
              )
      }


  }
}
function WhatsOnYourMind(props){
    const name = props.name;
    return (
        <div className="twitbox">
          <h3>What's on your mind {name}?</h3>
          <form action="{url_add_message}" method="post">
            <p>
              <input type="text" name="text" size={60} />
              <input type="submit" defaultValue="Share" />
            </p>
          </form>
        </div>
    );
}
function UserTimelineFollowingStatus(props){
    // TODO: fetch data
    const user = props.user;
    const profile_user = props.profile_user;
    const following = props.isFollowing ;
    var status;
    if (user == profile_user){
        status = "This is you!";
    }else if( following ){
        status = <span>You are currently following this user.
                 <a className="unfollow" href="url_unfollow/{profile_user.id}">Unfollow user</a>
                 .</span>
    }else{
        status = <span>You are not yet following this user.
                 <a className="follow" href="url_follow/{profile_user.id}">Follow user</a>.</span>


    }

    return (
        <div className="followstatus">
          {status}
        </div>
    )
}
//TODO: manage props properly ( wait to see how api work )
function TwitFeed(props) {
    const twits = props.feed
    if (twits){
        return (
                <em>There's no message so far.</em>
        );
    }else{
        const items = twits.map( (tw) => <Twit data={tw}/> )
        return (
            <ul className="messages">
              { items }
            </ul>
        );
    }
}

//TODO: manage props properly ( wait to see how api work )
function Twit(props){
    const img = props.img
    const usedId = props.userId
    const text = props.text
    const username = props.username
    const pub_date = props.pub_date
    return (
            <li>
              <img src="{img}" />
              <p>

                <strong>
                  <a href="url_user_timeline/{userId}">username</a>
                </strong>
                {text}
                <small>—
                  {pub_date}
                </small>
              </p>
            </li>
    );

}

export default Timeline;
