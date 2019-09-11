import React from 'react'


class ResultCard extends React.Component {
  render() {
    console.log(this.props);
    return(
      <div onClick={this.props.handleMeetupSelection}>
        <strong>{ this.props.result.name }</strong><br />
        { this.props.result.vicinity }<br />
        
      </div>
    )
  }
}

export default ResultCard
