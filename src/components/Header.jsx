import { useEffect, useState } from "react";
import clsx from "clsx";
import {signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    const [hasScrolled, setHasScrolled] = useState(false);
    const navigate = useNavigate();
    const user = useSelector(store => store.user);
    console.log(user?.photoURL);
    const handleSignOut = () => {
        signOut(auth).then(() => {
  // Sign-out successful.
  navigate("/");
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
                src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
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