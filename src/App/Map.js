import React, { PureComponent } from 'react'
import {timingFunctionExpand, timingFunctionCollapse} from './animation'

const View = (props) => (
  <div className="map-menu-container">
    <div className="close-button" onClick={props.close} />
  </div>
)

export default class MapView extends PureComponent {

  constructor() {
    super()
    this.close = this.close.bind(this)
  }

  componentDidMount() {
    let mapMenuContainer = document.querySelector('.map-menu-container')
    let closeButton = document.querySelector('.close-button')

    let timeScale = 0.6

    let options  = {
      duration: 500 / timeScale,
      easing: timingFunctionExpand,
    }

    let flip = new window.FLIP.group([
      {...options, element: mapMenuContainer },
    ]);


    setTimeout(() => {
      flip.first()
      flip.last('last')
      flip.invert()
      flip.play()
    }, 400)
    setTimeout(() => {
      closeButton.classList.add('last')
    }, 800)
  }

  close = () => {
    let mapMenuContainer = document.querySelector('.map-menu-container')
    let closeButton = document.querySelector('.close-button')
    let dim = document.querySelector('.dim')

    let timeScale = 0.6

    let options  = {
      duration: 500 / timeScale,
      easing: timingFunctionCollapse,
    }

    let flip = new window.FLIP.group([
      {...options, element: mapMenuContainer },
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

    setTimeout(() => this.props.toggleMap(), 1400)
  }

  render() {
    return <View close={this.close} />
  }
}

