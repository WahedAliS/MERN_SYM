import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./Shared/context/auth-context";
import MainNavigation from "./Shared/Components/Navigation/MainNavigation";
import { useAuth } from "./Shared/hooks/auth-hook";


const App = () => {
  const {token,login,logout,userId}=useAuth();
 
  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/" element={<Users />} />,
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" element={<Users />} />,
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" replace={true} />} />
      </React.Fragment>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Routes>{routes}</Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
