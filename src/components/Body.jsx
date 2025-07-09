import Login from "./Login"
import Browser from "./Browser"
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import MovieDetails from "./MovieDetails";
const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element:<Login/>
        },
        {
            path: "/browse",
            element:<Browser/>
        },
        {
            path : "/movie/:id",
            element:<MovieDetails/>
        }
    ]);
    return (
        <div className="scrollbar-hide">
            <RouterProvider router={appRouter}/>
        </div>
    )
}
export default Body;