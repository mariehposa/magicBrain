import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation'; 
import Logo from './Components/Logo/Logo';
import ImageForm from './Components/ImageForm/ImageForm';
import Rank from './Components/Rank/Rank';
import Particle from './Components/Particles';
import Clarifai from 'clarifai';
import Facerecognition from './Components/Facerecognition/Facerecognition';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';


const app = new Clarifai.App({
 apiKey: '50a83f946ce64f638be120daddd3427d'
});

class App extends Component {
  constructor(){
    super();
    this.state = {
      input:'', //a var name used to catch the input
      imageUrl:'', //var name used to catch the url
      box: {},//var name used to catch the face objects values
      route:'signin', //a var name used to link signin page to homepage
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  calculateFaceLocation = (dataz) => {
   const clarifaiFace = dataz.outputs[0].data.regions[0].region_info.bounding_box;
   const image = document.getElementById("imageInput");
   const width = Number(image.width);
   const height = Number(image.height);
   return{
      leftCol: clarifaiFace.left_col * width,
      rightCol: width-(clarifaiFace.right_col * width),
      topRow: clarifaiFace.top_row * height,
      bottomRow: height-(clarifaiFace.bottom_row * height)
    }
  } 

  displayFaceBox = (boxz) =>{
    this.setState({box: boxz});
  }

  onInputChange = (event)=> {//a function
    this.setState({input: event.target.value}); //input is transferred into event to get hold of the url
  }

  onPictureSubmit =()=> {// a function
    this.setState({imageUrl: this.state.input}); //imageurl is transferred into input 
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response =>{
      if(response){
        fetch('http://localhost:2000/image',{
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ //converts what is inside the body(javascript objectsi.e email and password) to json before transferring to the backend
            id: this.state.user.id
          })
        })

        .then(response =>response.json()) //to update the entry count of the user
        .then(count =>{
         this.setState(Object.assign(this.state.user, {entries: count})) 
        })
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    }) 
    .catch(err => console.log(err));  
  }

  onRoute =(routes) =>{ //a function used to link signin, register and homepage together
    if(routes === 'home'){
      this.setState({isSignedIn: true})
    }
    else if(routes === 'register'){
      this.setState({isSignedIn: false})
    }
    this.setState({route : routes}); //route parameters e.g home, is transferred to routes when called by components. it links page after running the if statements
  }

  loadUser = (data) =>{
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  render() {
    return (
      <div className="App">
        <Particle />
        <Navigation isSignedIn={this.state.isSignedIn} onRoute={this.onRoute}/>
        <Logo />
        { this.state.route === 'home'  // if route = home then,
          ? <div>
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageForm onInputChange={this.onInputChange} onPictureSubmit={this.onSubmit} />
              <Facerecognition box={this.state.box} imageUrl={this.state.imageUrl} /> 
            </div>  
          : ( this.state.route === 'register'   //else if route = register,then goto register, else goto route.
              ? <Register loadUser={this.loadUser} onRoute={this.onRoute}/>
              : <SignIn loadUser={this.loadUser} onRoute={this.onRoute} />
            )
        }
      </div>             
    );
  }
}

export default App;
