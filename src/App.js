import './App.css';
import { Component, Fragment } from 'react';
import firebase from './firebase.js';
import PictureGenerator from './PictureGenerator'
import Polaroid from './Polaroid';

class App extends Component {
 constructor() {
    super();
    this.state = {
      allStories: []
    }
  }
  componentDidMount() {
    // call the firebase database
    const dbRef = firebase.database().ref();
    // get all the value from the database back
    dbRef.on('value', (data) => {
      const firebaseDataObj = data.val();
      console.log(firebaseDataObj);
    //make an empty array to store the database data after it's sorted through
      let storyArray = [];
     // use a for in loop to sepreate story objects from the returned data
      for (let propertyKey in firebaseDataObj) {
        const storyObject = firebaseDataObj[propertyKey];
      
        storyObject.fireKey = propertyKey
        storyArray.push(storyObject)
      }
      this.setState({
        allStories: storyArray
      })
    })
  }
 
  render() {
    console.log(this.state.allStories);
    return (
      <Fragment>
        <PictureGenerator />
            <ul className="wrapper">
          { 
          // putting the database information on the page
            this.state.allStories.map((stories) => {
              return (
                <Polaroid story={stories}/>
              )
            })
          }
        </ul>
      </Fragment>
    )
  }
}
export default App;
