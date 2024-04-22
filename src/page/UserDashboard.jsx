import React from "react";
import SideNavbar from "../components/UserDashboard/SideNav";
import "../components/assets/css/UserDashboard.css"; // Import CSS file for styling
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import InfoCard from "../components/UserDashboard/InfoCard";
import RecentSheetsCard from "../components/UserDashboard/RecentSheets";
import GetProfitsCard from "../components/UserDashboard/GetProfits";
import NavBar from "../components/UserDashboard/NavBar";
let User;
let userName;
let ID;

function UserDashboard() {
  const [gettingUserData, setGettingUserData] = useState(true);
  const [isPhoneSize, setIsPhoneSize] = useState(false);

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

    function handleResize() {
      setIsPhoneSize(window.innerWidth <= 800); // Adjust the breakpoint as needed
    }

    // Initial check for screen size on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <>
            {isPhoneSize ? <NavBar/> : (<></>)}

    <div className="dashboard-container">
        { gettingUserData ? (<></>) : (
          !isPhoneSize ? (
        <div className="nav-bar">
        <SideNavbar username={userName} loadingState={gettingUserData} />
        </div>
): (<></>))}
      <div className="main-content">
        <div className="middle-content">
          <InfoCard></InfoCard>

  <div className="lower-middle">
  <div className="leftMid-content">
    <RecentSheetsCard></RecentSheetsCard>
  </div>
  <div className="rightMid-content">
<GetProfitsCard></GetProfitsCard>  
</div>  </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default UserDashboard;
