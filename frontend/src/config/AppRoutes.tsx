import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "./Layout";
import { Home } from "../pages/Home";
import { Dashboard } from "../pages/Dashboard";
import { Settings } from "../pages/Settings";
import { Profile } from "../pages/Profile";
import { Forms } from "../pages/Forms";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" caseSensitive element={<Layout/>}>
            <Route index caseSensitive  element={<Home/>}/>
            <Route path="/dasboard" caseSensitive element={<Dashboard/>}/>
            <Route path="/settings" caseSensitive element={<Settings/>}/>
            <Route path="/profile" caseSensitive element={<Profile/>}/>
            <Route path="/" caseSensitive element={<Forms/>} />
        </Route>
    )
)

export default router;