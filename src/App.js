import React, { Component } from 'react';
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import MainPage from './MainPage'
import './App.css';

class App extends Component {
  state = {
    page: 'login'
  }

  redirect = (page) => {
    this.setState({page: page})
  }

  handleLogOut = () => {
    this.setState({ page: 'login'})
  }
  componentDidMount() {
    if (localStorage.token) {
      this.redirect('main')
    }
  }

  render () {
    switch(this.state.page) {
      case 'login':
        return <LoginPage redirect={this.redirect}/>
      case 'signup':
        return <SignupPage />
      case 'main':
        return <MainPage isLoggedIn={this.handleLogOut}/>
      default:
        return <LoginPage />
    }
  }
}

export default App;
