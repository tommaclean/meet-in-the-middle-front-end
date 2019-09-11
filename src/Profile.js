import React from 'react';


class Profile extends React.Component {
  render(){
    return(
      <div>
        <div><strong>Current User:</strong> <br />
          { this.props.currentUser.name }
        </div>
        <div><strong>Past Meetups:</strong> <br />
          { this.props.currentUserMeetups }
        </div>
      </div>
    )

  }
}

export default Profile
