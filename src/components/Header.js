import {signOut } from "firebase/auth";
import {auth} from "../Utills/firebase";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../Utills/userSlice";
import { LOGO_URL } from "../Utills/constant";
import { toggleGptSearchView } from "../Utills/gptSlice";
import { SUPPORTED_LANGUAGES } from "../Utills/constant";
import { changeLanguage } from "../Utills/configSlice";

const Header = () => {

     const dispatch=useDispatch();
     const user=useSelector(store=>store.user);
     const navigate=useNavigate();
     const showGptSearch=useSelector((store)=>store.gpt.showGptSearch)
    
     const handleSignOut=()=>{
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
            navigate("/error");
          });
     }



     useEffect(()=>{
   const unsubscribe=onAuthStateChanged(auth,(user)=>{
         if(user){
            // user sign In
            const {uid,email,displayName,photoURL}=user;
            dispatch(addUser({uid:uid,
            email:email,displayName:displayName,
            photoURL: photoURL,
         }));
           navigate("/browse");
         }
         else{
               //user signed out
               dispatch(removeUser());
               navigate("/");
            }
      });
          // unsubscribe when component un mounts
           return ()=>unsubscribe();
      },[]);

     const handleGptSearchClick=()=>{
         //toggle gpt search
         dispatch(toggleGptSearchView());

     }

     const handleLanguageChange=(e)=>
     {
       dispatch(changeLanguage(e.target.value));
     }


    return (
        <div className="absolute my-3 px-6 py-8 bg-gradient-to-b from-black z-10 w-full  flex  flex-col md:flex-row justify-between rounded-xl  ">
           <img  className="w-28 h-10 mx-auto  md:mx-0 my-0 py-0" src={LOGO_URL} alt="logo" />
       
       {user &&  (
         <div className="flex p-6 py-0 my-0 justify-between">
            {showGptSearch && (<select className="p-2 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
              {SUPPORTED_LANGUAGES.map(lang=> <option  key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
            </select>)}
          <button className="py-1 px-6 mx-4 my-2 text-white bg-red-600 rounded-xl"   
          onClick={handleGptSearchClick}
          >{showGptSearch?"Home Page":"GPT Search"} </button>
          <img  className="w-12 h-12 px-1 opacity-80"
           src={user?.photoURL} alt="" />
           <button  onClick={handleSignOut} className="font-bold text-white">Sing Out</button>

         </div>
       )}
        </div>
       

       
    );
}

export default Header;
