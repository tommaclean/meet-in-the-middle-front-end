import React from 'react'
import { Button, Header, Icon, Image, Modal, Item, Tab } from 'semantic-ui-react'
import PastMeetup from './PastMeetup'
import MeetupFav  from './MeetupFav'
import ProfilePage from './ProfilePage'


class ProfileModal extends React.Component {
  render(){
    const pastMeetups = this.props.currentUserMeetups.reverse().map(userMeetup => {
      return <PastMeetup key={userMeetup.meetup.id} id={userMeetup.id} meetup={userMeetup} name={userMeetup.meetup.name} vicinity={userMeetup.meetup.vicinity} handleFavoriteMeetup={this.props.handleFavoriteMeetup} />
    })

    const userFavs = this.props.currentUserMeetupFavs.reverse().map((fav, index) => {
      return <MeetupFav key={index} id={index + 1} fav={fav} name={fav.name} vicinity={fav.vicinity} handleDeleteFav={this.props.handleDeleteFav}/>
    })

    const panes = [
      {
        menuItem: 'Past Meetups',
        render: () => <Tab.Pane attached={false}>
          <Header>{this.props.currentUser.username}'s Past Meetups</Header>
            <Item.Group>
              { pastMeetups }
            </Item.Group>
        </Tab.Pane>,
      },
      {
        menuItem: 'Favorite Meetups',
        render: () => <Tab.Pane attached={false}><h1 className="ui header">Favorite Meetups</h1>
        <Item.Group>
        { userFavs }
        </Item.Group>
        </Tab.Pane>,
      },
    ]
    return(
      <Modal open={this.props.modalOpen}>
          <Modal.Header>{this.props.currentUser.username}'s Profile</Modal.Header>
              <Modal.Content image scrolling>
                <Image size='medium' src='meet-in-the-middle-logo.jpg' wrapped />
                  <Tab menu={{ pointing: true }} panes={panes} />
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
