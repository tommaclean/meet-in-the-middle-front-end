import React from 'react'
import { Image } from 'semantic-ui-react'
import ProfileModal from './ProfileModal'


class Header extends React.Component {

  state = {
    modalOpen: false
  }

  handleProfileClick = () => {
    this.setState({ modalOpen: !this.state.modalOpen })
  }

  render(){
    return(
        <div className="ui top fixed menu">
          <div className="item">
            <img src="meet-in-the-middle-logo.jpg"/>
          </div>
          <a className="item aligned right" onClick={this.props.handleLogOut}>Log-Out</a>
          <a className="item" onClick={this.handleProfileClick}>
          <i className="user icon" ></i>
          <ProfileModal
          handleProfileClick={this.handleProfileClick}
          modalOpen={this.state.modalOpen}
          currentUser={this.props.currentUser}
          currentUserMeetups={this.props.currentUserMeetups}
          currentUserMeetupFavs={this.props.currentUserMeetupFavs}
          handleFavoriteMeetup={this.props.handleFavoriteMeetup}
          handleDeleteFav={this.props.handleDeleteFav}
          />
          { this.props.currentUser.username }</a>
        </div>
    )
  }
}
export default Header
