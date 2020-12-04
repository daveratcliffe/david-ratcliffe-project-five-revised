import { Component, Fragment } from  'react';
import axios from 'axios';
import firebase from './firebase.js';
import './App.css';

class PictureGenerator extends Component {
  constructor() {
    super();
    this.state = {
      picture: '',
      altText: '',
      userInput: '',
      userName: '',
    }
  }

getRandomImage = () => {

    axios({
      method: 'GET',
      url: 'https://api.unsplash.com/photos/random',
      responseType: 'json',
      params: {
        client_id: '-j_epipWtt2oE7lw_so3EUbm0Uvo0n0OaR--12TsBMw',
        orientation: 'squarish',
        dpr: 2,
        ar: 'w=380%26ar=1:1%26fit=crop'
      }
    }).then((apiResponse) => {
      if (apiResponse.data.urls.regular) {
        this.setState({
          picture: apiResponse.data.urls.regular,
          altText: apiResponse.data.alt_description
        })
      } else {
        return console.error('Looks like our image host is having a creative block. Try again later.')
      }
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const dbRef = firebase.database().ref();
    const newObj = {
      image: this.state.picture,
      story:this.state.userInput,
      altText: this.state.altText,
      name: this.state.userName
    }
    dbRef.push(newObj)
    document.querySelector('textarea').value ='';
    this.setState({
      userInput: '',
      userName: ''
    })
    const inspImgContainer = document.querySelector('.selectImgContainer');
    inspImgContainer.src='';
    inspImgContainer.alt='';
  }
  handleInputChange = (e) => {
    this.setState({
      userInput: e.target.value
    })
  }
  handleNameChange = (e) => {
    this.setState({
      userName: e.target.value
    })
  }
  hideLabel = () => {
    const hiddenLabel = document.querySelector('.storyLabel');
    hiddenLabel.classList.add('srOnly')
  }
  showLabel = () => {
    const showLabel = document.querySelector('storyLabel');
    showLabel.classList.remove('srOnly')
  }
render() {

  const { picture, altText } = this.state;
  return (
    <Fragment>
      <header>
        <div className="wrapper">
          
          <h1>Worth a Thousand</h1>
          <p className="instructions">Choose an image. Write a story. Share your creativity.</p>

          <div className="generatorFlex">
            <div className="imgFlex">
              <img className="selectImgContainer" src={picture} alt={altText}/>

              <button onClick={this.getRandomImage}>Choose Your Inspiration</button>
            </div>
            <form onSubmit={this.handleSubmit}>
              <input placeholder="Name" id="name" type="text" onChange={this.handleNameChange}></input>
              <label className="srOnly" htmlFor="name">Name</label>
                <div className="inputContainer">
                  <div id='textBox'>
                    <textarea
                      type="text" 
                      id="theStory"
                      maxLength="1000"
                      required={true}
                      placeholder="Your story starts here..."
                      onChange={this.handleInputChange}></textarea>

                    <label className="storyLabel srOnly" htmlFor="theStory">Write your story here.</label>
                    <p className="counter" >{this.state.userInput.length}/1000</p>
                  </div>
                  <button>Add Your Story</button>
              </div>
            </form>
          </div>
        </div>
      </header>
    </Fragment>
    )
  }
}

export default PictureGenerator;