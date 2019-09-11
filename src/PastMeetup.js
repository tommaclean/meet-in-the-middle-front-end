import React from 'react'
import { Item } from 'semantic-ui-react'

class PastMeetup extends React.Component {
  render(){
    console.log(this.props);
    return(
        <Item>
          <Item.Image size='mini' src='https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png' />
          <Item.Content>
            <Item.Header>{ this.props.name }</Item.Header>
            <Item.Meta>{ this.props.vicinity }</Item.Meta>
            <Item.Description>
            </Item.Description>
            <Item.Extra onClick={() => this.props.handleFavoriteMeetup(this.props)}><i className="heart red icon"></i>Favorite this Meetup</Item.Extra>
          </Item.Content>
        </Item>
    )
  }
}

export default PastMeetup
