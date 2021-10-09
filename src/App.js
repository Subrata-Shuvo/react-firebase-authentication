import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut, FacebookAuthProvider   } from "firebase/auth";
import initializeAuthentication from './Firebase/firebase.inititalize';
import { useState } from 'react';

initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// const [user, setUser] = useState({})

function App() {
  const [user,  setUser] = useState({})
  const auth = getAuth(); 
  const handleGoogleSignIn = () =>{
  signInWithPopup(auth, googleProvider)
  .then(result =>{
    const {displayName, email, photoURL}= result.user;
    const loggedInUser = {
      name: displayName,
      email: email,
      img: photoURL
    };
    setUser(loggedInUser);
  }) 
  }

  const handleGithubSignIn = ()=>{
    signInWithPopup(auth, githubProvider)
    .then(result=>{
      const {displayName, photoURL, email}  = result.user;
      const loggedInUser = {
        name: displayName,
        photo: photoURL, 
        email: email
      }
      setUser(loggedInUser);
    })
  }

  const handleFacebookSignin =()=>{
    signInWithPopup(auth, facebookProvider)
    .then(result =>{
     
      const {displayName, photoURL, email}  = result.user;
      console.log(result.user)
  
      const loggedInUser = {
        name: displayName,
        photo: photoURL, 
        email: email
      }
      setUser(loggedInUser);
    })
  }

  const handleSignOut = ()=>{
    signOut(auth)
    .then(() =>{
      setUser({});
    })
  }
  return (
    <div className="App">
      
      {!user.name ?
        <div>
      <button onClick={handleGoogleSignIn}>Google sign in</button> 
      
      <button onClick={handleGithubSignIn}>Github sign in</button>
      
      <button onClick={handleFacebookSignin}>Facbook sign in</button>

      </div> :

      <button onClick={handleSignOut}>Sign out</button>}

      {
        user.name && <div>
          <h2>Welcome {user.name}</h2>
          <p>I know your email {user.email}</p>
          <img src={user.img} alt="kichu ache" />
        </div>
      }
    </div>
  );
}

export default App;
