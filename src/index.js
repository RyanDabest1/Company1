import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import Register from './page/Register';
import Login from './page/Login'
import Home from './page/Home'
import CreateSheet from './page/CreateSheet';
import MySheets from './page/MySheets';
import Calculate from './page/Calculate'
import UserDashboard from './page/UserDashboard';
import MergedSheets from './page/MergedSheets';
import MergedView from './page/MergedView';
const router = createBrowserRouter([
  {
    path : "/Calculate",
    element : <Calculate/>
  },
  {
    path : "/create",
    element : <CreateSheet/>
  },
  {
    path : '/register',
    element : <Register/>
  },

  {
    path : '/login',
    element : <Login/>
  },
  {
    path : '/MySheets',
    element : <MySheets/>
  },
  {
    path: '/UserDashboard',
    element : <UserDashboard/>
  },
  {
    path : '/MergedSheets',
    element: <MergedSheets/>
  },
  {
    path : '/MergedView',
    element : <MergedView/>
  },
  {
    path : '/',
    element : <Home/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

<RouterProvider router={router} />
</React.StrictMode>

);
