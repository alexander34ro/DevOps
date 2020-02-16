import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import TwitMenu from './components/TwitMenu'
import TwitFeed from './components/TwitFeed'
import SignIn from './components/SignIn.js'
import SignUp from './components/SignUp.js'

import {
  Container,
  Message,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
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
          <Route exact path="/">
            <PublicFeed />
          </Route>
          <Route path="/public">
            <PublicFeed />
          </Route>
          <Route path="/signin">
            <SignIn/>
          </Route>
          <Route path="/signup">
            <SignUp/>
          </Route>
        </Switch>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.




const PublicFeed = () => (
  <div>

    <Container text style={{ marginTop: '7em' }}>
    <Message success>
      <Message.Header>Login Successfull</Message.Header>
      <p>Did you know it's been a while?</p>
    </Message>
    <Message warning>
      <Message.Header>Login Failled</Message.Header>
      <p>Did you know it's been a while?</p>
    </Message>
      <Header as='h1'>Public Feed</Header>
      <TwitFeed/>
    </Container>

  </div>
)
