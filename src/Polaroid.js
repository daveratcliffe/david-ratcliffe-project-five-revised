import { Component } from 'react';

class Polaroid extends Component {
  constructor() {
    super();
    this.state = {
      polaroidClass: true,
    }
  }
   polaroidFlip = () => {
      this.setState ({
        polaroidClass: !this.state.polaroidClass
      })

    }
   
  render() {
    return (
      <li key={this.props.story.fireKey}>
        <div onClick={this.polaroidFlip} className={this.state.polaroidClass ? 'polaroid': 'polaroid flipped'}>
          <div className="polaroidSide sideFront">
            <p className="turnText">Turn to read the story -&gt;</p>
            <div className="stashedImgContainer">
              <img src={this.props.story.image} alt={this.props.story.altText}/>
            </div>
          </div>
          <div className="polaroidSide sideBack">
            <p>{this.props.story.story} <strong> — {this.props.story.name} </strong></p>
          </div>
        </div>
      </li>
    )
  }
}
export default Polaroid;