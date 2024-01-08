import Header from "./Header";
import {useState,useRef} from "react";
import { checkValidData } from "../Utills/validate";
import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../Utills/firebase"
import {signInWithEmailAndPassword } from "firebase/auth";
import { BG_URL, USER_AVATAR } from "../Utills/constant";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import {addUser} from "../Utills/userSlice";

const Login = () => 
{

      const [isSignInForm,setIsSignForm ]=useState(true);
      const [errorMsg,setErrorMsg]=useState(null);
      const email=useRef(null);
      const password=useRef(null);
      const name=useRef(null);
        const toggleSignInForm=()=>{
        setIsSignForm(!isSignInForm);
       }
       const dispatch =useDispatch();

         const  handleButtonClick=()=>
         {
                  // validate the form data
                  const msg = checkValidData(email.current.value,password.current.value);
                  //console.log(msg);
                  setErrorMsg(msg);
                  if(msg)return;
     
                  if(!isSignInForm){
        //sign up logic   api from firbase signin signup.
      createUserWithEmailAndPassword(
              auth,
              email.current.value,
              password.current.value)
        .then((userCredential)=>{
         const user=userCredential.user;
         updateProfile(user, {
          displayName: name.current.value, 
          photoURL:USER_AVATAR
        }).then(() => {
          // Profile updated!
          const {uid,email, displayName,photoURL}=auth.currentUser;
          
            dispatch(
              addUser({
               uid:uid,
               email:email,
               displayName:displayName,
               photoURL:photoURL,
              })
            )
        }).catch((error) => {
          // An error occurred
          setErrorMsg(error.message)
        });
       
      })
      .catch((error)=>{
        const errorCode=error.code;
        const errorMessage=error.message;
        setErrorMsg(errorCode+"-"+errorMessage);
       });
      }
      
                 // Sign In Logic
                  else{
                   signInWithEmailAndPassword(auth, 
                    email.current.value, 
                    password.current.value)
                  .then((userCredential) => {
                 // Signed in 
                   const user = userCredential.user;
                 
                   })
                 .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  setErrorMsg(errorCode+"-"+errorMessage);
                  });
                }
         };

    return (
        <div>
           <Header/>
           <div className="fixed ">
           <img  className="h-screen object-cover md:w-screen" src={BG_URL} alt="" />
           </div>
 
           <form onSubmit={(e)=>e.preventDefault()}
           className=" w-full  md:w-4/12 absolute my-28 mx-auto right-0 left-0 p-12 bg-black text-white bg-opacity-90" >
           <h1 className="font-bold text-3xl py-4">{isSignInForm?"Sign IN":"Sign UP"}</h1>
         
           {!isSignInForm  &&
           <input  ref={name} type="text" placeholder=" Full Name" className="p-4 my-2 border-black bg-gray-500 w-full bg-opacity-35 rounded-lg" />
           }
         
           <input  ref={email}  type="text" placeholder="Email Address" className="p-4 my-2 border-black bg-gray-500 w-full bg-opacity-35 rounded-lg" />
           <input  ref={password} type="password" placeholder="Password" className="p-4 my-2 border-black  bg-gray-500 w-full bg-opacity-35 rounded-lg" />
           
           <p className="text-red-500 font-bold text-lg p-2">{errorMsg}</p>
           
            <button className="p-4 my-3 w-full bg-red-700 rounded-lg"  
            onClick={handleButtonClick}>{isSignInForm?"Sign IN":"Sign UP"}</button>
             <p className="py-2 m-2 cursor-pointer " onClick={toggleSignInForm}>
             {isSignInForm?"New to Netflix? Sign Up Now":"Already registered? Sign In Now "}</p>

           </form>
        </div>
    );
  
}

export default Login;
