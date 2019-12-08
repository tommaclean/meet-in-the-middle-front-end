import React from 'react'
import { Button, Header, Icon, Image, Modal, Item, Tab } from 'semantic-ui-react'
import PastMeetup from './PastMeetup'
import MeetupFav  from './MeetupFav'
import ProfilePage from './ProfilePage'


class ProfileModal extends React.Component {
  render(){
    const pastMeetups = () => {
      if (this.props.currentUserMeetups.length) {
        return this.props.currentUserMeetups.reverse().map(userMeetup => {
          return <PastMeetup key={userMeetup.meetup.id} id={userMeetup.meetup.id} meetup={userMeetup} name={userMeetup.meetup.name} vicinity={userMeetup.meetup.vicinity} handleFavoriteMeetup={this.props.handleFavoriteMeetup}/>
        })
      }
    return null
  }
    const userFavs = () => {
      if (this.props.currentUserMeetupFavs.length) {
        return this.props.currentUserMeetupFavs.reverse().map(fav => {
          return <MeetupFav key={fav.id} fav={fav} name={fav.name} vicinity={fav.vicinity} handleDeleteFav={this.props.handleDeleteFav} icon={fav.icon}/>
        })
    }
    return null
  }

    const panes = [
      {
        menuItem: 'Past Meetups',
        render: () => <Tab.Pane attached={false}>
          <Header>Past Meetups</Header>
            <Item.Group>
              { pastMeetups() }
            </Item.Group>
        </Tab.Pane>,
      },
      {
        menuItem: 'Favorite Meetups',
        render: () => <Tab.Pane attached={false}><Header>Favorite Meetups</Header>
        <Item.Group>
        { userFavs() }
        </Item.Group>
        </Tab.Pane>,
      },
    ]
    return(
      <Modal open={this.props.modalOpen}>
          <Modal.Header>{this.props.currentUser.username}'s Profile</Modal.Header>
              <Modal.Content image scrolling>
                <Image size='medium' src='meet-in-the-middle-logo.jpg' wrapped />
                  <Tab menu={{ pointing: true }} panes={panes}/>
              </Modal.Content>
              <Modal.Actions>
                <Button primary onClick={this.props.handleProfileClick}>
                  Close
                </Button>
              </Modal.Actions>
            </Modal>
    )
  }
}




export default ProfileModal
