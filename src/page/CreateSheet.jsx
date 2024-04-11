import Logo from '../components/assets/LOGO.jpg'
import { Button, TextField } from '@mui/material'
import '../index.css'
import createImg from '../components/assets/createImg.png'
import { handleInputCreateSheet } from '../functions/funct'
import NavBar from "../components/Create/NavBar"
function CreateSheet() {
    async function handleClick(e){
        e.preventDefault();
        await handleInputCreateSheet(e.target.sheetName.value, localStorage.getItem('userId'))
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
        <TextField id="sheetName" placeholder="Enter a name" />
        <Button variant="contained" type='submit'>Confirm</Button>
        </form>
      </div>
    </main>
  </div>
  
  )
}

export default CreateSheet;