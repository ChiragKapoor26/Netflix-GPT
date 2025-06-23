import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidate } from "../utils/validate";

const Login = () => {
    const [isLogin,setisLogin] = useState('true');
    const [message,setmessage] = useState(null);
    const email = useRef(null);
    const password = useRef(null);
    const username = useRef(null);
    const toggle = () => {
        {setisLogin(!isLogin)}
    }
    const handleButtonClick = () => {
        // validate the form data
        const message = checkValidate(email.current.value,password.current.value,username.current.value);
        setmessage(message);
    }
    return (
        <div>
            <Header/>
            <div>
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/8200f588-2e93-4c95-8eab-ebba17821657/web/IN-en-20250616-TRIFECTA-perspective_9cbc87b2-d9bb-4fa8-9f8f-a4fe8fc72545_small.jpg" alt="header-logo" className="absolute"/>
            </div>
            <form className="p-8 bg-black absolute w-1/4 mt-36 mx-auto right-0 left-0 text-white rounded-md bg-opacity-80" onSubmit={(e)=> e.preventDefault()}>
                <h1 className="text-3xl font-bold py-4 ">{isLogin?"Sign In":"Sign Up"}</h1>
                {!isLogin &&(<input ref={username} type="text" placeholder="User Name" className="p-2 my-3 w-full bg-gray-700 rounded-sm"/>)}
                <input ref={email} type="text" placeholder="Email Address" className="p-2 my-3 w-full bg-gray-700 rounded-sm"/>
                <input ref={password} type="password" placeholder="Password" className="p-2 my-3 w-full bg-gray-700 rounded-sm"/>
                {message&&(<p className="text-red-600 font-bold text-lg py-4">{message}</p>)}
                <button className="px-4 py-2 my-4 bg-red-700 w-full rounded-md" onClick={handleButtonClick}>{isLogin?"Sign In":"Sign Up"}</button>
                <p className="py-4 cursor-pointer font-bold" onClick={toggle}>{isLogin?"New to Netflix? Sign Up Now":"Already a user ? Sign In Now"}</p>
            </form>
        </div>
    )
}
export default Login;