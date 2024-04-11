import React from "react";
import SideNavbar from "../components/UserDashboard/SideNav";
import "../components/assets/css/UserDashboard.css"; // Import CSS file for styling
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"

let User;
let userName;
let ID;
function UserDashboard() {
  const [gettingUserData, setGettingUserData] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Dashboard";
    if(localStorage.getItem("isLoggedIn")){
      User = JSON.parse(localStorage.getItem("User"))
      const {id, username} = User;
      ID = id;
      userName = username;
      console.log(userName)
      setGettingUserData(false)
    } else {
      navigate("/Login")
      
    }
  }, []);

  return (
    <div className="dashboard-container">
      <div className="nav-bar">
        { gettingUserData ? (<></>) : (
        <SideNavbar username={userName} loadingState={gettingUserData} />
)}
      </div>
      <div className="main-content">
        <div className="middle-content">Middle Content</div>
        <div className="right-content">Right Content</div>
      </div>
    </div>
  );
}

export default UserDashboard;
