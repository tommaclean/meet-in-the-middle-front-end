import React, { Component } from 'react';
import { Grid, Image, Form, Button, Modal, Header, Icon, Tab, Item } from 'semantic-ui-react'
import PastMeetup from './PastMeetup'
import MeetupFav  from './MeetupFav'
import './App.css';

class ProfilePage extends Component {
  render () {
    const pastMeetups = () => {
      if (this.props.currentUserMeetups.length) {
        return this.props.currentUserMeetups.map(userMeetup => {
          return <PastMeetup key={userMeetup.meetup.id} id={userMeetup.meetup.id} meetup={userMeetup} name={userMeetup.meetup.name} vicinity={userMeetup.meetup.vicinity} handleFavoriteMeetup={this.props.handleFavoriteMeetup}/>
        })
      }
    return null
  }

    const userFavs = () => {
      if (this.props.currentUserMeetupFavs.length) {
        return this.props.currentUserMeetupFavs.map(fav => {
          return <MeetupFav key={fav.id} fav={fav} name={fav.name} vicinity={fav.vicinity} handleDeleteFav={this.props.handleDeleteFav} icon={fav.icon}/>
        })
    }
    return null
  }
    const panes = [
        { menuItem: 'Past Meetups', render: () => <Tab.Pane><h1 className="ui header">Past Meetups</h1>
        <Item.Group>
        { pastMeetups() }
        </Item.Group>
        </Tab.Pane> },
        { menuItem: 'Favorite Meetups', render: () => <Tab.Pane><h1 className="ui header">Favorite Meetups</h1>
        <Item.Group>
        { userFavs() }
        </Item.Group>
        </Tab.Pane> },
      ]


    return (
      <div>
        <Tab panes={panes} />
      </div>

    );
  }
}

export default ProfilePage;
