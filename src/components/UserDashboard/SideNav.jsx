import React from 'react';
import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';


const pages = ["MySheets", "create", "MergedSheets"];


const SideNavbar = ({username, loadingState}) => {
  const navigate = useNavigate();
const [loading, setLoading] = useState(true);
useEffect(() => {
  setLoading(loadingState);
  if(!localStorage.getItem("isLoggedIn")){
    navigate("/Login")
  }
},[])

  const sideNavbarStyle = {
    width: '250px',
    height: '100%',
    backgroundColor: 'black', // Example background color
    position: 'fixed',
    top: 0,
    left: 0,
    overflowX: 'hidden',
    paddingTop: '20px',
  };

  const linkStyle = {
    display: 'block',
    padding: '10px 20px',
    textDecoration: 'none',
    color: '#fff', // Example text color
  };

  return (
    <div style={sideNavbarStyle}>
      { loading ? (<></>) : ( username ? (
       <Typography variant="h5" component="div" color={"white"} style={{margin : "10px"}}>
          Hello! {username}
        </Typography>
      ) : (<></>))
}
      <NavLink to="/" style={linkStyle} activeClassName="active-link" exact>
        Home
      </NavLink>
    {
      pages.map(page => (
      <NavLink to={`/${page}`}style={linkStyle} activeClassName="active-link">
        {page}
      </NavLink>
      ))
}
      {/* Add more NavLink components for additional links */}
    </div>
  );
};

export default SideNavbar;
