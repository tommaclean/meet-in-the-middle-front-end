import React from 'react'
import ResultCard from './ResultCard'
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';

class Map extends React.Component {

  state = {
    isOpen: false,
    gestureHandling: 'greedy'
  }

  createMap = () => {

    return (
      <GoogleMap defaultZoom={this.props.defaultZoom} defaultCenter={this.props.defaultCenter} gestureHandling={this.state.gestureHandling}>
      {this.props.results.map(((result, index) => {
        return <Marker key={result.id} onClick={() => this.props.handleMeetupSelection(result)} position={{ lat: result.geometry.location.lat, lng: result.geometry.location.lng }} label={(index + 1).toString()} zIndex={0}>
        <Marker position={{ lat: this.props.defaultCenter.lat, lng: this.props.defaultCenter.lng }} zIndex={0} icon="http://maps.google.com/mapfiles/ms/icons/orange-dot.png"/>

          { (this.props.openInfoWindowId === result.id ) ? <InfoWindow onClose={this.handleMarkerClick}>
            <div>
              <ResultCard result={result} />
            </div>
          </InfoWindow>
          :
          null
        }
        </Marker>
      }))}
      </GoogleMap>
      )
    }

  render(){

    const WrappedMap = withScriptjs(withGoogleMap(this.createMap))
    return(
      <div style={{ width: '73vw', height: '70vh' }}>
      <WrappedMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
      /></div>
    )
  }
}

export default Map
