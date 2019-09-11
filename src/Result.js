import React from 'react'
import { Button, Item } from 'semantic-ui-react'


class Result extends React.Component {

  render(){
    return(
      <Item.Group>
        <Item>
        <Item.Image size='mini' src={this.props.icon} />

        <Item.Content>
          <Item.Header>{ this.props.name }</Item.Header>
            <Item.Meta>Description</Item.Meta>
          <Item.Description>
            { this.props.vicinity }
          </Item.Description>
          <Item.Extra>Rating: { this.props.rating } </Item.Extra>
          <div onClick={() => this.props.handleMeetupSelection(this.props)}>
          <Button animated='fade' basic color='blue' size='tiny'>
            <Button.Content visible>Make this the meetup location!</Button.Content>
            <Button.Content hidden>DO IT! IT WILL BE FUN!</Button.Content>
          </Button>
          </div>
        </Item.Content>
        </Item>
      </Item.Group>
    )
  }
}

export default Result
