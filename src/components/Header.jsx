import { useEffect, useState } from "react";
import clsx from "clsx";
import {signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { netFlixLogo } from "../utils/constants";

const Header = () => {
    const [hasScrolled, setHasScrolled] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const handleSignOut = () => {
        signOut(auth).then(() => {
        }).catch((error) => {
        // An error happened.
        });
    }
    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 32);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

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
                "fixed top-0 z-10 w-full px-8 transition-all duration-300 flex justify-between items-center",
                hasScrolled
                    ? "bg-black py-1 opacity-90"
                    : "bg-gradient-to-b from-black py-4"
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
                <img alt="user-image" src={user?.photoURL} className="w-10 rounded-full"/>
                <p className="text-white font-bold">{user?.displayName}</p>
                <button className="text-white font-bold bg-red-800 p-2 rounded-md" onClick={handleSignOut}>Sign Out</button>
            </div>)}
        </div>
    );
};

export default Header;