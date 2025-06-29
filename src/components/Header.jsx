import { useEffect, useState } from "react";
import clsx from "clsx";

const Header = () => {
    const [hasScrolled, setHasScrolled] = useState(false);

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
                "fixed top-0 z-10 w-full px-8 transition-all duration-300",
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
        </div>
    );
};

export default Header;