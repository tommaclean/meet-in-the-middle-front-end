import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import './App.css';

class LoginPage extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value  })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(res =>{
          if (res.token)  {
            localStorage.token = res.token
            this.props.redirect('main')
          }
        })
  }

  render () {
    return (
      <div className="loginPage">
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle' >
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h1' color='blue' textAlign='center'>MeetInTheMiddle</Header>
              <Header as='h2' color='blue' textAlign='center'>
                <Image src='meet-in-the-middle-logo.jpg' /> Log-in to your account
              </Header>
              <Form size='large' onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input fluid icon='user' iconPosition='left' placeholder='name'
                  name="username"
                  onChange={this.handleChange}
                  value={this.state.username}
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                  />

                  <Button color='blue' fluid size='large' >
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                New to us? <a href='#'>TOO BAD. Not open for Signups at this time.</a>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default LoginPage;
