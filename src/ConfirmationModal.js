import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

const ConfirmationModal = (props) => (
  <Modal open={props.openConfirmationModal}>
    <Modal.Header>Meetup Confirmation</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='large' src={props.meetupSelection.icon} />
      <Modal.Description>
        <Header>{ props.meetupSelection.name }</Header>
          { props.meetupSelection.vicinity }<br />
        
        <Button onClick={props.closeConfirmationModal}>Close</Button>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default ConfirmationModal
