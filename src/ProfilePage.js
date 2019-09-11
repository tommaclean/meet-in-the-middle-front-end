import React, { Component } from 'react';
import { Grid, Image, Form, Button, Modal, Header, Icon, Tab, Item } from 'semantic-ui-react'
import PastMeetup from './PastMeetup'
import MeetupFav  from './MeetupFav'
import './App.css';

class ProfilePage extends Component {
  render () {

    const pastMeetups = this.props.currentUserMeetups.reverse().map(userMeetup => {
      return <PastMeetup key={userMeetup.meetup.id} id={userMeetup.meetup.id} meetup={userMeetup} name={userMeetup.meetup.name} vicinity={userMeetup.meetup.vicinity} handleFavoriteMeetup={this.props.handleFavoriteMeetup}/>
    })
    const userFavs = this.props.currentUserMeetupFavs.reverse().map(fav => {
      return <MeetupFav key={fav.id} fav={fav} name={fav.name} vicinity={fav.vicinity} handleDeleteFav={this.props.handleDeleteFav} icon={fav.icon}/>
    })
    const panes = [
      // {
      //   menuItem: 'Profile Info',
      //   render: () => <Tab.Pane><h1 className="ui header">Profile Page</h1>
      //     Hi {this.props.currentUser.username}!
      //     <Form>
      //     <Form.Field>
      //     <label>Name</label>
      //     <input placeholder={this.props.currentUser.username} />
      //     </Form.Field>
      //     <Form.Field>
      //     <label>Address</label>
      //     <input placeholder={this.props.currentUser.address} />
      //     </Form.Field>
      //     <Button type='submit'>Update Profile</Button>
      //     </Form></Tab.Pane>,
      //   },
        { menuItem: 'Past Meetups', render: () => <Tab.Pane><h1 className="ui header">Past Meetups</h1>
        <Item.Group>
        { pastMeetups }
        </Item.Group>
        </Tab.Pane> },
        { menuItem: 'Favorite Meetups', render: () => <Tab.Pane><h1 className="ui header">Favorite Meetups</h1>
        <Item.Group>
        { userFavs }
        </Item.Group>
        </Tab.Pane> },
      ]

      console.log(this.props);
    return (
      <div>
        <Tab panes={panes} />
      </div>

    );
  }
}

export default ProfilePage;
