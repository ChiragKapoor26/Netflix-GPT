import { useEffect, useState } from "react";
import clsx from "clsx";
import {signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { netFlixLogo } from "../utils/constants";
import { ToggleGptSearch } from "../utils/GptSlice";
import { supportedLanguages } from "../utils/constants";
import { changeLanguage } from "../utils/langSlice";

const Header = () => {
    const [hasScrolled, setHasScrolled] = useState(false);
    const [gptButton,setgptButton] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const gpt = useSelector(store => store.Gpt.showGptSearch);
    const handleSignOut = () => {
        signOut(auth).then(() => {
        }).catch((error) => {
        // An error happened.
        });
    }
    const handleGptToggle = () => {
        dispatch(ToggleGptSearch());
    }
    const handleLangChange = (e) => {
        dispatch(changeLanguage(e.target.value));
    }
    useEffect(()=>{
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                const {uid , email , displayName , photoURL} = user;
                dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
            });
            return () => unsubscribed();
    },[])
    return (
        <div
            className={clsx(
                "absolute z-10 w-full px-8 justify-center transition-all duration-300 flex flex-col md:flex-row md:justify-between items-center bg-gradient-to-b from-black py-4"
            )}
        >
            <img
                src={netFlixLogo}
                className={clsx(
                    "object-contain cursor-pointer transition-all duration-300",
                    hasScrolled ? "w-32" : "w-44"
                )}
                alt="Logo"
            />
            { user && (<div className="flex items-center gap-2">
                {gpt&&(<select className="bg-black hidden md:inline-block text-white transition-duration-300 border-none hover:border-none p-2 opacity-70 text-lg md:text-balance" onChange={handleLangChange}>
                    {supportedLanguages.map(lang => <option key={lang.identifier}value={lang.identifier}className="p-0 text-sm opacity-70">{lang.name}</option>)}
                </select>)}
                <button className="py-2 px-4 mx-4 my-2 bg-red-700 text-white rounded-lg" onClick={handleGptToggle}>{gpt?'Home':'Smart Search'}</button>
                <img alt="user-image" src={user?.photoURL||''} className="w-10 rounded-full hidden md:inline-block"/>
                <p className="text-white font-bold hidden md:inline-block">{user?.displayName}</p>
                <button className="text-white font-bold bg-red-800 p-2 rounded-md" onClick={handleSignOut}>Sign Out</button>
            </div>)}
        </div>
    );
};

export default Header;