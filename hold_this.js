{ this.state.results ? this.state.results.map(result => (
  <Marker key={result.id} position={{ lat: result.geometry.location.lat, lng: result.geometry.location.lng}}/>
)) : null }


const WrappedMap = withScriptjs(withGoogleMap(createMap))

function createMap() {
  return (
    <GoogleMap defaultZoom={10} defaultCenter={{ lat: 40.712613, lng: -73.943557 }}>
      {this.state.results.map(result => (
      <Marker key={result.id} position={{ lat: result.geometry.location.lat, lng: result.geometry.location.lng}}/>}
    </GoogleMap>
  )
}


<WrappedMap
googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
    loadingElement={<div style={{ height: "100%" }} />}
    containerElement={<div style={{ height: "100%" }} />}
    mapElement={<div style={{ height: "100%" }} />}
/>
------------------------------------------------------



  <div style={{ width: '100vw', height: '50vh' }}> </div>


  ---------------------------------


  this.setState({ defaultCenter: { lat: this.state.midpoint[0], lng: this.state.midpoint[1]}})

  ----------------------------

  fetch('http://localhost:3000/single_user/meetups', {
    method: 'POST',
    headers: {
      'Authorization': localStorage.token,
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body: JSON.stringify({
      name: this.state.meetupSelection,
      vicinity: this.state.meetupSelection,
      user_id: localStorage.token
    })
  })
-----------------------------------

  <Marker position={this.props.defaultCenter} icon={{url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}} label={"Midpoint"} zIndex={1}/>

  ---------------------------------
  https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={}&key=${process.env.REACT_APP_GOOGLE_KEY}

      handlePlacesPhotoFetch = (e) => {
        fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="CmRaAAAA8Ax-IjhAxaasBHhykR6Ih7hkEEIfwcJA5ihM2yimwGGVSwdv17W3zaOkNocTD6pIMw2aRhqBeX2o9e4xlMCFTnUBJ77TFEyPFNbQyF9PWSz5fl4sppVimZyNaQEX1098EhBr7UDVZ0FbB0FM8dp_EI32GhTkqgW1jdHWUBKQF6aGDcIIwPValw"&key=${process.env.REACT_APP_GOOGLE_KEY}`)
          .then(res
          )}
        )
      }

      -----------------------------

      const allUsernames = this.props.allUsers.map(user => {
        return <option key={user.id} value={user.address}>{user.username}</option>
      })

      -------------------------------------

      <select onChange={this.handleFormNameSelection} value={this.state.nameSelection} name="address1">
        {allUsernames}
      </select>
------------------------------------------------------------------------

<form onSubmit={this.handleSubmit}>
Login Page<br />
<label>Username</label>
  <input
    type="text"
    name="username"
    onChange={this.handleChange}
    value={this.state.username} />
<label>Password</label>
  <input
    type="password"
    name="password"
    onChange={this.handleChange}
    value={this.state.password} />
  <input type="submit" />
</form>
