import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import NavBar from "../components/HomePage/NavBar";
import SheetCard from "../components/MergedSheets/SheetCard";
import { useNavigate } from "react-router-dom";
import { getMergedSheets } from "../functions/funct";

let data;
let sheets;

const MergedSheets = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Fetch sheet data from the database using useEffect
  useEffect(() => {
    async function startUp(){
        let userId = localStorage.getItem('userId');
        
        data = await getMergedSheets(userId);
        sheets = data.sheets
        console.log(sheets)
        setLoading(false);
    }
    if(localStorage.getItem("isLoggedIn")){
      startUp()
    } else {
      navigate("/Login")
    }
  }, []);

  return (
    <>
        <Stack spacing={3}>

    <NavBar />
    {loading ? (
      <div>Loading...</div>
    ) : (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Stack spacing={3} style={{ maxWidth: "800px", width: "100%", padding: "0 20px" }}>
        {sheets.map((sheet) => (
              <SheetCard startDate={sheet.startDate} endDate={sheet.endDate} id={sheet._id}/>
            ))}
        </Stack>
      </div>
    )}
    </Stack>
  </>
  );
};

export default MergedSheets;
