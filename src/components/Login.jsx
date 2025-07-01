import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidate } from "../utils/validate";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider,updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Background, GithubLogo, GoogleLogo} from "../utils/constants";
const provider = new GoogleAuthProvider();

const Login = () => {
    
    const dispatch = useDispatch();
    const [isLogin,setisLogin] = useState(true);
    const [Errormessage,setErrormessage] = useState(null);
    const email = useRef(null);
    const password = useRef(null);
    const username = useRef(null);
    const toggle = () => {
        {setisLogin(!isLogin)}
    }
    const handleGoogleSignin = () => {
        signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    dispatch(
        addUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      );

  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
    }
const handleGithubSignin =async ()=>{
const provider2 = new GithubAuthProvider();
try {
   const result = await signInWithPopup(auth, provider2);
   console.log(result);

} catch (error) {
    console.log(error);
}

}
    const handleButtonClick = () => {
        // validate the form data
        const message = checkValidate(email?.current?.value,password?.current?.value,username?.current?.value);
        setErrormessage(message);
        if(message) return;
        if(!isLogin) {
            // Write Sign up Logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log(user);
                    updateProfile(user, {
                    displayName: username.current.value, photoURL:"https://www.w3schools.com/howto/img_avatar.png"
                    }).then(() => {
                    // Profile updated!
                    // ...
                    const {uid , email , displayName , photoURL} = auth.currentUser;
                    console.log(auth.currentUser);
                    dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
                    }).catch((error) => {
                    // An error occurred
                    // ...
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrormessage(errorCode+"-"+errorMessage);
                });

        } else {
            // Write Sign in Logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrormessage(errorCode+"-"+errorMessage);
                });
        }
    }
    return (
        <div>
            <Header/>
            <div>
                <img src={Background} alt="background-image" className="absolute"/>
            </div>
            <form className="p-7 bg-black absolute w-1/4 mt-36 mx-auto right-0 left-0 text-white rounded-md bg-opacity-80" onSubmit={(e)=> e.preventDefault()}>
                <h1 className="text-3xl font-bold py-4 ">{isLogin?"Sign In":"Sign Up"}</h1>
                {!isLogin && (<input ref={username} type="text" placeholder="User Name" className="p-2 my-3 w-full bg-gray-700 rounded-sm"/>)}
                <input ref={email} type="text" placeholder="Email Address" className="p-2 my-3 w-full bg-gray-700 rounded-sm"/>
                <input ref={password} type="password" placeholder="Password" className="p-2 my-3 w-full bg-gray-700 rounded-sm"/>
                {Errormessage && (<p className="text-red-600 font-bold text-lg py-4">{Errormessage}</p>)}
                <button className="px-4 py-2 my-4 bg-red-700 w-full rounded-md" onClick={handleButtonClick}>{isLogin?"Sign In":"Sign Up"}</button>
                {isLogin && (<p className="font-bold mb-2">Sign in with:</p>)}
                {isLogin && (<div className="flex justify-between w-1/2 mx-auto">
                    <button className="bg-white rounded-full" onClick={handleGoogleSignin}><img src={GoogleLogo}className="w-10 h-10"/></button>
                    <button className="bg-white rounded-full" onClick={handleGithubSignin}><img src={GithubLogo}className="w-10 h-10 z-20"/></button>
                </div>)}
                <p className="py-2 cursor-pointer font-bold" onClick={toggle}>{isLogin?"New to Netflix? Sign Up Now":"Already a user ? Sign In Now"}</p>
            </form>
        </div>
    )
}
export default Login;