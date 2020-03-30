import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import TwitMenu from './components/TwitMenu'
import TwitFeed from './components/TwitFeed'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import WhatsOnYourMind from './components/WhatsOnYourMind'
import UserMessages from './components/UserMessages'

import {
  Container,
  Header
} from 'semantic-ui-react'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  return (
    <Router>
    <TwitMenu/>

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/" component={PublicFeed}>
          </Route>
          <Route path="/public" component={PublicFeed}>
          </Route>
          <Route path="/signin" component={SignIn}>
          </Route>
          <Route path="/signup" component={SignUp}>
          </Route>
          <Route path="/:user" component={UserMessages}></Route>
        </Switch>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.




const PublicFeed = () => (
  <div>

    <Container text style={{ marginTop: '7em' }}>
      <WhatsOnYourMind/>
      <Header as='h1'>Public Feed</Header>
      <TwitFeed/>
    </Container>

  </div>
)
