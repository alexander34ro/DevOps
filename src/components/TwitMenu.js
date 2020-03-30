
import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Link } from 'react-router-dom'
import {
  Container,
  Menu
} from 'semantic-ui-react'

export default function TwitMenu() {
    return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item  as={Link} to="/"  header>
          MiniTwit
        </Menu.Item>
        <Menu.Item as={Link} to="/public" >Public Timeline</Menu.Item>
        <Menu.Item  as={Link} to="/signup" >Sign Up</Menu.Item>
        <Menu.Item  as={Link} to="/signin" >Sign In</Menu.Item>

      </Container>
    </Menu>

    )
}
