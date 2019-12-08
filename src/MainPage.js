import React from 'react';
import './App.css';
import { Grid, Image, Container } from 'semantic-ui-react'
import ResultsList from './ResultsList'
import Map from './Map'
import InputForm from './InputForm'
import ProfilePage from './ProfilePage'
import Header from './Header'


class MainPage extends React.Component {

  state = {
      loading: false,
      results: [],
      defaultCenter: { lat: 40.712613, lng: -73.943557 },
      defaultZoom: 11,
      addresses: [],
      selectedResult: [],
      currentUser: [],
      currentUserMeetups: [],
      meetupSelection: [],
      currentUserMeetupFavs: [],
      allUsers: [],
      openConfirmationModal: false
    }

  redirect = (page) => {
    this.setState({page: page})
    }

  handlePlacesFetch = (e) => {
      this.setState({ addresses: [...this.state.addresses, e.address1Coor, e.address2Coor, e.address3Coor ], defaultCenter: { lat: e.midpoint[0], lng: e.midpoint[1] }})
      fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${e.midpoint}&radius=1500&types=bar&key=${process.env.REACT_APP_GOOGLE_KEY}`)
        .then(res => res.json())
        .then(placesFetch => {(
          this.setState({ results: placesFetch.results, defaultZoom: 14 })
        )}
      )
    }

  handleResultClick = (e) => {
    console.log(e, "handle MAP MARKER click")
    this.setState({ selectedResult: e })

  }

  handleMeetupSelection = (e) => {
    console.log(e, "handle RESULT click");
    this.setState({ meetupSelection: e, selectedResult: e.id })
  }

  getSingleUserMeetups = () => {
    fetch(`http://localhost:3000/single_user/past_meetups`, {
      headers: { Authorization: localStorage.token }
    })
    .then(res => res.json())
    .then(userMeetupData => { this.setState({ currentUserMeetups: userMeetupData })})

    fetch(`http://localhost:3000/single_user/meetup_favs`, {
      headers: { Authorization: localStorage.token }
    })
    .then(res => res.json())
    .then(userMeetupFavData => { this.setState({ currentUserMeetupFavs: userMeetupFavData })})
  }

  handleFavoriteMeetup = (selectedMeetupToFav) => {
    console.log(selectedMeetupToFav)
    fetch(`http://localhost:3000/single_user/add_meetup_fav`, {
      method: 'POST',
      headers: {
        'Authorization': localStorage.token,
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify({
        user_id: this.state.currentUser.id,
        user_meetup_id: selectedMeetupToFav.id
      })
    })
    .then(this.getSingleUserMeetups)
  }

  handleDeleteFav = (selectedMeetupToDel) => {
    console.log(selectedMeetupToDel)

    fetch(`http://localhost:3000/single_user/meetup_favs`, {
      method: 'DELETE',
      headers: {
        'Authorization': localStorage.token,
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify({
        user_meetup_fav_id: selectedMeetupToDel.fav.id,
        user_id: this.state.currentUser.id
      })

    })
    .then(this.getSingleUserMeetups)
  }

  confirmMeetup = (meetupSelection) => {
      fetch('http://localhost:3000/single_user/meetups', {
        method: 'POST',
        headers: {
          'Authorization': localStorage.token,
          'Content-Type':'application/json',
          'Accept':'application/json'
        },
        body: JSON.stringify({
          name: meetupSelection.name,
          vicinity: meetupSelection.vicinity,
          user_id: this.state.currentUser.id,
          participant1_id: this.state.currentUser.id,
          participant2_id: this.state.currentUser.id
        })
      })
      .then(this.setState({ openConfirmationModal: true }))
      .then(this.getSingleUserMeetups)
  }

  handleCloseConfirmationModal = () => {
    this.setState({ openConfirmationModal: !this.state.openConfirmationModal })
  }

  handleLogOut = (e) => {
    // console.log(this.state);
    this.setState({ currentUser: {} }, () => console.log(this.state))
    localStorage.clear();
    this.props.isLoggedIn()
  }

  componentDidMount() {
    fetch(`http://localhost:3000/profile`, {
      method: 'GET',
      headers: { 'Authorization': localStorage.token }
    })
      .then(res => res.json())
      .then(userData => { this.setState({ currentUser: userData })})
      .then(this.getSingleUserMeetups)

      fetch(`http://localhost:3000/users`)
        .then(res => res.json())
        .then(allUsers => { this.setState({ allUsers: allUsers })})
  }

  render(){
    return(


            <Grid celled>
              <Grid.Row columns={1} className="ui top fixed menu">
                <Header currentUser={this.state.currentUser} currentUserMeetups={this.state.currentUserMeetups} currentUserMeetupFavs={this.state.currentUserMeetupFavs} handleFavoriteMeetup={this.handleFavoriteMeetup} handleDeleteFav={this.handleDeleteFav} handleLogOut={this.handleLogOut}/>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={4}>
                  <InputForm handleAddressSubmit={this.handleAddressSubmit} handlePlacesFetch={this.handlePlacesFetch} meetupSelection={this.state.meetupSelection} confirmMeetup={this.confirmMeetup} allUsers={this.state.allUsers} openConfirmationModal={this.state.openConfirmationModal} closeConfirmationModal={this.handleCloseConfirmationModal}
                  />
                </Grid.Column>
                <Grid.Column width={12}>
                  <Map results={this.state.results} defaultCenter={this.state.defaultCenter} addresses={this.state.addresses} openInfoWindowId={this.state.selectedResult} handleResultClick={this.handleResultClick} defaultZoom={this.state.defaultZoom}
                  handleMeetupSelection={this.handleMeetupSelection}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={4}>
                  <ResultsList results={this.state.results} isLoading={this.state.loading} handleResultClick={this.handleResultClick} meetupSelection={this.state.meetupSelection} handleMeetupSelection={this.handleMeetupSelection}/>
                </Grid.Column>
                <Grid.Column width={12}>
                  <ProfilePage currentUser={this.state.currentUser} currentUserMeetups={this.state.currentUserMeetups} currentUserMeetupFavs={this.state.currentUserMeetupFavs} handleFavoriteMeetup={this.handleFavoriteMeetup} handleDeleteFav={this.handleDeleteFav}/>
                </Grid.Column>
                <script type="text/javascript" src={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&libraries=places`}></script>
              </Grid.Row>
        </Grid>




    )
  }
}

export default MainPage;
