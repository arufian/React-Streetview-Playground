import React from 'react'
import GoogleMapsLoader from 'google-maps'
import {timingFunctionExpand, timingFunctionCollapse} from '../animation'

export default class StreetView extends React.PureComponent {


  googleMaps

  constructor() {
    super()
    this.close = this.close.bind(this)
  }

  componentDidMount() {
    GoogleMapsLoader.KEY = 'AIzaSyCEfGJevExxNCKaeJ4635hmULC9EAEkifU'
    GoogleMapsLoader.load((gmaps) => {
      this.googleMaps = gmaps
      let a = new gmaps.maps.StreetViewPanorama(
        document.getElementById('street-view'),
        {
          position: {lat: -0.6476226, lng: 130.3141979},
          pov: {heading: 165, pitch: 0},
          zoom: 1,
          fullscreenControl: false
        }
      )
    })
    let sreetViewContainer = document.querySelector('.street-view-container')
    let closeButton = document.querySelector('.close-button')
    let streetViewDiv = document.querySelector('#street-view')

    let timeScale = 0.6

    let options  = {
      duration: 800 / timeScale,
      easing: timingFunctionExpand,
    }

    let flip = new window.FLIP.group([
      {...options, element: sreetViewContainer },
    ]);


    setTimeout(() => {
      flip.first()
      flip.last('last')
      flip.invert()
      flip.play()
    }, 400)
    setTimeout(() => {
      closeButton.classList.add('last')
      streetViewDiv.style.opacity = 1
    }, 1000)
  }

  close() {
    
    let sreetViewContainer = document.querySelector('.street-view-container')
    let closeButton = document.querySelector('.close-button')

    let timeScale = 0.6

    let options  = {
      duration: 600 / timeScale,
      easing: timingFunctionCollapse,
    }

    let flip = new window.FLIP.group([
      {...options, element: sreetViewContainer },
    ]);

    setTimeout(() => {
      closeButton.classList.remove('last')
    }, 200)

    setTimeout(() => {
      flip.first()
      flip.removeClass('last')
      flip.last()
      flip.invert()
      flip.play()
    }, 800)

    setTimeout(() => {
      this.props.close()
      GoogleMapsLoader.release()
    }, 1400)
  }


  render() {
    return (
      <div className="street-view-container">
        <div id="street-view"></div>
        <div className="close-button" onClick={this.close} />
          {/* <div id="street-view"></div>
            <script>
              var panorama;
              function initialize() {
                panorama = new google.maps.StreetViewPanorama(
                    document.getElementById('street-view'),
                    {
                      position: {lat: -0.6476226, lng: 130.3141979},
                      pov: {heading: 165, pitch: 0},
                      zoom: 1
                    });
              }
            </script>
            <script async defer
                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCEfGJevExxNCKaeJ4635hmULC9EAEkifU&callback=initialize">
            </script> */}
        <div className="loading-txt"> Loading </div>
      </div>
    )
  }
}


