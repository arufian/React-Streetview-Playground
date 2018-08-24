import React from 'react'

export default class BGView extends React.PureComponent {
  render() {
    return (
      <div id="bg-img" className={this.props.className} style={this.props.style}>
        <div className="welcome-txt">{this.props.text}</div>
        {this.props.children}
      </div>
    )
  }
}


