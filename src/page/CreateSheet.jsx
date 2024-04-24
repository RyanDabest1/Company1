import Logo from '../components/assets/LOGO.jpg'
import { Button, TextField } from '@mui/material'
import '../index.css'
import { Calendar } from 'primereact/calendar';
import Alert from '@mui/material/Alert';
import createImg from '../components/assets/createImg.png'
import { handleInputCreateSheet } from '../functions/funct'
import NavBar from "../components/Create/NavBar"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function CreateSheet() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [fail, setFail] = useState(false);
  const [Date, setDate] = useState(null);

    async function handleClick(e){
        e.preventDefault();
        setFail(false);
        setSuccessful(false);
        setLoading(true);
        await handleInputCreateSheet(e.target.sheetName.value, localStorage.getItem('userId'), Date, setSuccessful, setFail, setLoading, navigate)
      }
    
  return (
    <div className="px-4 mx-auto max-w-7xl min-h-screen bg-white flex flex-col justify-center items-center">
      <NavBar/>
    <header className="py-6 space-y-6">
    </header>
    <main className="flex items-center py-16 space-x-4">
      <img
        alt="Image"
        className="rounded-lg"
        height="200"
        width="350"
        src={createImg}
        style={{
          aspectRatio: "230/230",
          objectFit: "cover",
        }}
      />
      <div className="space-y-4 flex-1">
        <h1 className="text-3xl font-bold">Create a new Sheet</h1>
        <form onSubmit={handleClick} className="flex gap-3">
        <label htmlFor="Date" className='m-2'>Choose Date:</label>
        <Calendar
                            id="Date"
                            value={Date}
                            onChange={(e) => {setDate(e.value)
                            }}                           
                            dateFormat="yy/mm/dd"

                        />
        <TextField id="sheetName" placeholder="Enter a name" />
        <Button variant="contained" type='submit'>Confirm</Button>
        </form>
      </div>
    </main>
    {loading && (
      <Alert variant="filled" severity="info" className="absolute top-5">
        Creating Sheet
      </Alert>
    )}
    {successful && (
      <Alert variant="filled" severity="success" className="absolute top-5">
        Creating Successful
      </Alert>
    )}
    {fail && (
      <Alert variant="filled" severity="error" className="absolute top-5">
        Creation failed
      </Alert>
    )}
  </div>
  
  )
}

export default CreateSheet;