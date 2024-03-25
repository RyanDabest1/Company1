import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import NavBar from "../components/HomePage/NavBar";
import SheetCard from "../components/MySheets/SheetCard";
import { getSheets } from "../functions/funct";



let data;
let sheets;

const MySheets = () => {
  // Dummy sheet data for demonstration (replace with data from the database)
  
  const [loading, setLoading] = useState(true)

  // Fetch sheet data from the database using useEffect
  useEffect(() => {
    async function startUp(){
        let userId = localStorage.getItem('userId');
        
        data = await getSheets(userId);
        sheets = data.sheets
        console.log(sheets)
        setLoading(false);
    }
    startUp()
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
              <SheetCard sheetName={sheet.sheetName} id={sheet._id} />
            ))}
        </Stack>
      </div>
    )}
    </Stack>
  </>
  );
};

export default MySheets;
