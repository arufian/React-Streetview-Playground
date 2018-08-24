import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import '../css/style.css'
import MapMenu from './Map'
import Logo from './logo'
import StreetView from './StreetView'
import Spot from './Spots/hoc'

class App extends Component {

  state = {
    dimClass: "",
    showStreetView: false
  }

  spotRefs = []
  containerDiv
  scrolledNum = 0
  windowHeight = window.innerHeight
  isTransformed = false

  staticTransform = () => {
    return [
      { transform: `translate3d(0px, 0px, 0px)` },
      { transform: `translate3d(0px, ${this.windowHeight}px, 0px)` },
      { transform: `translate3d(0px, ${this.windowHeight}px, 0px)` },
      { transform: `translate3d(0px, ${this.windowHeight}px, 0px)` },
      { transform: `translate3d(0px, ${this.windowHeight}px, 0px)` },
    ]
  } 

  constructor() {
    super()
    this.toggleMap = this.toggleMap.bind(this)
    this.scrollDown = this.scrollDown.bind(this)
    this.openStreetView = this.openStreetView.bind(this)
    this.closeStreetView = this.closeStreetView.bind(this)
    for(let i = 0; i < 5; i++) {
      this.spotRefs.push(React.createRef())
    }
  }

  toggleMap = () => {

    if(this.state.dimClass === "dim") {
      this.setState({
        dimClass: ""
      })
      return
    }
    
    this.setState({
      dimClass: "dim"
    })
  }

  scrollDown = () => {
    if(this.scrolledNum === 4) return
    ++this.scrolledNum
    let dom1 = ReactDOM.findDOMNode(this.spotRefs[this.scrolledNum - 1].current)
    let dom2 = ReactDOM.findDOMNode(this.spotRefs[this.scrolledNum].current)
    dom1.style.transform = `translate3d( 0, -${this.windowHeight / 2}px, 0)`
    dom2.style.transform = `translate3d( 0, 0px, 0)`
  }

  scrollUp = () => {
    if(this.scrolledNum === 0) return
    --this.scrolledNum
    let dom1 = ReactDOM.findDOMNode(this.spotRefs[this.scrolledNum + 1].current)
    let dom2 = ReactDOM.findDOMNode(this.spotRefs[this.scrolledNum].current)
    dom1.style.transform = `translate3d( 0, ${this.windowHeight}px, 0)`
    dom2.style.transform = `translate3d( 0, 0px, 0)`
  }

  componentDidMount() {
    this.containerDiv = document.querySelector('.container')

    let mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    window.addEventListener(mousewheelevent, (e) => {
      e.stopImmediatePropagation()
      e.preventDefault()
      e.returnValue = false
      if(!this.isTransformed) {
        let deltaku = e.deltaY ? -(e.deltaY) : e.wheelDelta ? e.wheelDelta : -(e.detail)
        if(deltaku < 0) this.scrollDown()
        else this.scrollUp()
        this.isTransformed = true
        setTimeout(() => this.isTransformed = false, 1000)
        return false
      }
    }, false)
  }

  openStreetView = () => {
    this.setState({
      showStreetView: true
    })
  }

  closeStreetView = () => {
    this.setState({
      showStreetView: false
    })
  }

  render() {

    const { dimClass, showStreetView } = this.state

    const transformList = this.staticTransform()

    return (
      <div className="container">
        <div id="bg-img" ref={this.spotRefs[0]} style={{...transformList[0]}}>
          <div className="welcome-txt">
            デモサイト
          </div>
          <div className="start-btn" onClick={this.scrollDown}>START</div>
        </div>
        <Spot className="spot1" text="観光地１" ref={this.spotRefs[1]} style={{...transformList[1]}} >
          <div className="start-btn" onClick={this.openStreetView}>探検する</div>
        </Spot>
        <Spot className="spot2" text="観光地2" ref={this.spotRefs[2]} style={{...transformList[2]}} />
        <Spot className="spot3" text="観光地3" ref={this.spotRefs[3]} style={{...transformList[3]}} />
        <Spot className="spot4" text="観光地4" ref={this.spotRefs[4]} style={{...transformList[4]}} />
        <div className="pin-container" onClick={this.toggleMap}>
          <div className="pin"></div>
          <div className="pulse"></div>
        </div>
        <div className={dimClass}></div>
        {dimClass === "dim" && 
          <MapMenu toggleMap={this.toggleMap} />
        }
        { showStreetView && 
          <StreetView close={this.closeStreetView} />
        }
      </div>
    );
  }
}

export default App;
