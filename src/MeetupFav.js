import React from 'react'
import { Item } from  'semantic-ui-react'

class MeetupFav extends React.Component {
  render(){
    return(
      <Item>
        <Item.Image size='mini' src='https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png' />
        <Item.Content>
          <Item.Header>{ this.props.name }</Item.Header>
          <Item.Meta>{ this.props.vicinity }</Item.Meta>
          <Item.Description>
          </Item.Description>
          <Item.Extra onClick={() => this.props.handleDeleteFav(this.props)}><i className="ban icon"></i>Delete Favorite</Item.Extra>
        </Item.Content>
      </Item>
    )
  }
}

export default MeetupFav
