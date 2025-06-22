import { useState } from "react";
import Header from "./Header";

const Login = () => {
    const [isLogin,setisLogin] = useState('true');
    const toggle = () => {
        {setisLogin(!isLogin)}
    }
    return (
        <div>
            <Header/>
            <div>
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/8200f588-2e93-4c95-8eab-ebba17821657/web/IN-en-20250616-TRIFECTA-perspective_9cbc87b2-d9bb-4fa8-9f8f-a4fe8fc72545_small.jpg" alt="header-logo" className="absolute"/>
            </div>
            <form className="p-8 bg-black absolute w-1/4 mt-36 mx-auto right-0 left-0 text-white rounded-md bg-opacity-80">
                <h1 className="text-3xl font-bold py-4 ">{isLogin?"Sign In":"Sign Up"}</h1>
                {!isLogin &&(<input type="text" placeholder="User Name" className="p-2 my-3 w-full bg-gray-700 rounded-sm"/>)}
                <input type="text" placeholder="Email Address" className="p-2 my-3 w-full bg-gray-700 rounded-sm"/>
                <input type="password" placeholder="Password" className="p-2 my-3 w-full bg-gray-700 rounded-sm"/>
                <button className="px-4 py-2 my-4 bg-red-700 w-full rounded-md">{isLogin?"Sign In":"Sign Up"}</button>
                <p className="py-4 cursor-pointer" onClick={toggle}>{isLogin?"New to Netflix? Sign Up Now":"Already a user ? Sign In Now"}</p>
            </form>
        </div>
    )
}
export default Login;