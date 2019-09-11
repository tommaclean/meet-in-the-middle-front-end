import React from 'react'
import Result from './Result'


class ResultsList extends React.Component {

  render() {
    const details = this.props.results.map((result, index) => {
      return <Result id={result.id} result={result} name={result.name} rating={result.rating} vicinity={result.vicinity} key={result.id} labelNum={(index + 1).toString()} icon={result.icon} handleMeetupSelection={this.props.handleMeetupSelection} />
    })

    const newDetails = this.props.results.map(result => ({
      image: result.icon,
      header: result.name,
      description: result.vicinity
    }))


    return (
      <div>
        <h1 className="ui header">Search Results</h1>
        { details }
      </div>

    )
  }
}

export default ResultsList
