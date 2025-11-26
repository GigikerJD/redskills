import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "./Layout";
import { Home } from "../pages/Home";
import { Dashboard } from "../pages/Dashboard";
import { Settings } from "../pages/Settings";
import { Profile } from "../pages/Profile";
import { Forms } from "../pages/Forms";
import { ProtectedRoute } from "./AuthGuard";

const pages = [
  { path: "/", component: <Home /> },
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/settings", component: <Settings /> },
  { path: "/profile", component: <Profile /> },
  { path: "/forms", component: <Forms /> },
];

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" caseSensitive element={<Layout />}>
      {pages.map((page) => {
        if (page.path === "/") {
          return <Route key={page.path} index caseSensitive element={<Home/>} />;
        }
        return (
          <Route
            key={page.path}
            path={page.path}
            caseSensitive
            element={<ProtectedRoute>{page.component}</ProtectedRoute>}
          />
        );
      })}
    </Route>
  )
);

export default router;