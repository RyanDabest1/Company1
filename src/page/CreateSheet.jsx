import '../components/assets/css/Create.css'
import Logo from '../components/assets/LOGO.jpg'
import { Button, TextField } from '@mui/material'
import '../index.css'
import createImg from '../components/assets/createImg.png'
import { handleInputCreateSheet } from '../functions/funct'

function CreateSheet() {
    async function handleClick(e){
        e.preventDefault();
        await handleInputCreateSheet(e.target.sheetName.value, localStorage.getItem('userId'))
      }
    
  return (
    <div className="px-4 mx-auto max-w-7xl min-h-screen bg-white flex flex-col justify-center items-center">
    <header className="py-6 space-y-6">
      <div className="grid items-center gap-4">
        <a className="flex items-center space-x-2" href="/">
          <img src={Logo} className='w-[150px] h-[110px]' alt="Logo" />
        </a>
      </div>
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

function FlagIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  )
}

export default CreateSheet;