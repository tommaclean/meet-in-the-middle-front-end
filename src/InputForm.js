import React from 'react'
import { Button, Checkbox, Form, Dropdown, Header, Item } from 'semantic-ui-react'
import ConfirmationModal from './ConfirmationModal'
import Geocode from 'react-geocode';
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);

class InputForm extends React.Component {

  state = {
      address1: "",
      address2: "",
      address3: "",
      address1Coor: [],
      address2Coor: [],
      address3Coor: [],
      lats: [],
      lngs: [],
      midpoint: [],
      input1Choice: true,
      input2Choice: true,
      input3Choice: true,
      openConfirmationModal: false

  }

  handleAddressUserChange = (e, data) => {
    this.setState({ [data.name]: data.value })
  }

  handleAddressTypingChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleInput1Choice = (e) => {
    // Switching from Address to User and back
    e.preventDefault()
    this.setState({ input1Choice: !this.state.input1Choice })
  }

  handleInput2Choice = (e) => {
      // Switching from Address to User and back
    e.preventDefault()
    this.setState({ input2Choice: !this.state.input2Choice })
  }

  handleInput3Choice = (e) => {
      // Switching from Address to User and back
    e.preventDefault()
    this.setState({ input3Choice: !this.state.input3Choice })
  }

  handleFormNameSelection = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleAddressSubmit = (e) => {
    e.preventDefault()
    if ([this.state.address1, this.state.address2, this.state.address3] === "") {
      alert("Have you entered valid addresses for each user?");
      return false;
    }

    let promise1 = Geocode.fromAddress(this.state.address1).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          let lat1 = lat
          let lng1 = lng
          this.setState({ lats: [...this.state.lats, lat], lngs: [...this.state.lngs, lng], address1Coor: [...this.state.address1Coor, lat, lng]})
          console.log(lat1, lng1, "address 1")
        },
        error => {
          console.error(error, "address 1");
        }
      );

    let promise2 = Geocode.fromAddress(this.state.address2).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          let lat2 = lat
          let lng2 = lng
          this.setState({ lats: [...this.state.lats, lat2], lngs: [...this.state.lngs, lng2], address2Coor: [...this.state.address2Coor, lat, lng] })
          console.log(lat2, lng2, "address 2");
        },
        error => {
          console.error(error, "address 2");
        }
      );

    let promise3 = Geocode.fromAddress(this.state.address3).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          this.setState({ lats: [lat, ...this.state.lats], lngs: [lng, ...this.state.lngs], address3Coor: [...this.state.address3Coor, lat, lng] })
          console.log(lat, lng, "address 3");
        },
        error => {
          console.error(error, "address 3");
        }
      );


      Promise.all([promise1, promise2, promise3]).then(() => this.handleMidpointCalculation())

  }

  handleMidpointCalculation = () => {
      if (this.state.address1 === "" || this.state.address2 === "" || this.state.address3 === "") {
        alert("Hey why don't you go back and input some REAL addresses, buddy?")
      } else {
      let latSum = this.state.lats.reduce((previous, current) => current += previous);
      let latAvg = latSum / 3;

      let lngSum = this.state.lngs.reduce((previous, current) => current += previous);
      let lngAvg = lngSum / 3;

      this.setState({ midpoint: [...this.state.midpoint, latAvg] })
      this.setState({ midpoint: [...this.state.midpoint, lngAvg] })

      this.props.handlePlacesFetch(this.state)
      this.handleResetState()
    }
  }

  handleResetState = (e) => {
    this.setState({ address1: "", address2: "", address3: "" })
  }
  render(){
    const allUsernames = this.props.allUsers.map(user => ({
      key: user.id,
      text: user.username,
      value: user.address,
    }))

    return(

      <div>
        <Form>
        <Header as='h2'>
              MeetInTheMiddle
              <Header.Subheader>
                Enter three addresses (or choose three users) to find the best place to meet!
              </Header.Subheader>
            </Header>
            <Form.Field>
                { this.state.input1Choice ?
                  <div><img src="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"/>Address 1:
                  <input type="text" name="address1" value={this.state.address1} onChange={this.handleAddressTypingChange}/>
                  <Button size='small' className="ui blue button" onClick={this.handleInput1Choice} name="input1Choice" value={this.state.input1Choice}>Switch to User</Button></div>
                 :
                  <div><img src="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"/>User 1:

                  <Dropdown placeholder='Select Friend' fluid selection options={allUsernames} onChange={this.handleAddressUserChange} name="address1"/>


                  <Button size='small' className="ui olive button" onClick={this.handleInput1Choice} name="input1Choice" value={this.state.input1Choice}>Switch to Address</Button></div>

                }
            </Form.Field>
            <Form.Field>
              { this.state.input2Choice ?
              <div>
                <img src="http://maps.google.com/mapfiles/ms/icons/pink-dot.png"/>Address 2:
                <input type="text" name="address2" value={this.state.address2} onChange={this.handleAddressTypingChange}/>
                <Button size='small' className="ui blue button" onClick={this.handleInput2Choice} name="input2Choice" value={this.state.input2Choice}>Switch to User</Button>
              </div> :

              <div>
                <img src="http://maps.google.com/mapfiles/ms/icons/pink-dot.png"/>User 2:
                  <Dropdown placeholder='Select Friend' fluid selection options={allUsernames} onChange={this.handleAddressUserChange} name="address2"/>

                <Button size='small' className="ui olive button" onClick={this.handleInput2Choice} name="input2Choice" value={this.state.input2Choice}>Switch to Address</Button>
              </div>
              }
            </Form.Field>
            <Form.Field>
              { this.state.input3Choice ?
              <div>
                <img src="http://maps.google.com/mapfiles/ms/icons/green-dot.png"/>Address 3:
                <input type="text" name="address3" value={this.state.address3} onChange={this.handleAddressTypingChange}/>
                <Button size='small' className="ui blue button" onClick={this.handleInput3Choice} name="input3Choice" value={this.state.input3Choice}>Switch to User</Button>
              </div> :

              <div>
                <img src="http://maps.google.com/mapfiles/ms/icons/green-dot.png"/>User 3:
                  <Dropdown placeholder='Select Friend' fluid selection options={allUsernames} onChange={this.handleAddressUserChange} name="address3"/>
                <Button size='small' className="ui olive button" onClick={this.handleInput3Choice} name="input3Choice" value={this.state.input3Choice}>Switch to Address</Button>
              </div>
              }
            </Form.Field>
              <Button size='small' className="ui green button" type="submit" value="Submit" onClick={this.handleAddressSubmit}>Search</Button>





                <ConfirmationModal openConfirmationModal={this.props.openConfirmationModal} closeConfirmationModal={this.props.closeConfirmationModal} meetupSelection={this.props.meetupSelection}/>
              </Form>
              { this.props.meetupSelection.name ?
                <div className="meetupSpot">
                <Item.Group>
                <Item>
                <Item.Image size='tiny' src={this.props.meetupSelection.icon} />
                <Item.Content>
                <Item.Meta>Selected Meetup Spot</Item.Meta>
                <Item.Header>{ this.props.meetupSelection.name }</Item.Header>
                <Item.Description>
                { this.props.meetupSelection.vicinity }
                </Item.Description>
                <Item.Extra>Rating: { this.props.meetupSelection.rating } </Item.Extra>
                <Button size='small' onClick={() => this.props.confirmMeetup(this.props.meetupSelection)} className="ui red basic button">
                <i className="icon user"></i>
                Confirm this Meetup
                </Button>
                </Item.Content>
                </Item>
                </Item.Group>
                </div>
                :
                null
              }
            </div>
    )
  }
}

export default InputForm
