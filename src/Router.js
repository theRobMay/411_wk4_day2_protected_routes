import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import cookie from 'cookie';
import Home from './components/Home';
import About from './components/About';
import Car from './components/Car';
import Login from './components/Login';

const checkAuth = () => {
    const cookies = cookie.parse(document.cookie);
    // * Checking cookie object to see if cookies.loggedIn is truthy.
    return cookies['loggedIn'] ? true : false;
};

const ProtectedRoute = (props) => {
    // # Destructure the props object.
    // # Using the rest pattern to add the rest of the props assigned when we call the component.
    const { component: Component, ...rest } = props;
    console.log(rest);
    // # Using Component variable assigned above to render a component if logged in.
    // # If user is not logged in they are pointed back to the login page using the "Navigate" component from react-router.
    // # Also unpacking the rest of the props into the component by using the spread operator.
    return checkAuth() === true ? <Component /> : <Navigate to='/login' />;
};

const Router = () => {
    return (
        <Routes>
            {/* Setting component prop to Home for protected home route */}
            <Route
                path='/'
                element={
                    <ProtectedRoute
                        component={Home}
                        isTacoGood='true'
                        size='Large Please'
                    />
                }
            />
            <Route path='/login' element={<Login />} />
            <Route path='/about' element={<ProtectedRoute component={About} />} />
            <Route path='/car/:id' element={<ProtectedRoute component={Car} />} />
        </Routes>
    );
};

export default Router;