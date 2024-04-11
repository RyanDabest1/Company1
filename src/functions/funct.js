let api = "http://localhost:3001";
import { fetchCredentials } from "../components/utils/userData";

//Get credentials

export async function getCredentials(userId){
  try{
    const res = await fetch(`${api}/getCredentials?userId=${userId}`, {
      method : "GET",
      headers : {"Content-Type" : "application/json"}
    })
    if (!res.ok) return false;
    return res.json()
  } catch (error){
    console.log(error)
  }
}

//Login and signup
export async function signUp(username, password, email, setSuccessful, setFail, setLoading, navigate){
  try {
    const res = await fetch(`${api}/register`,  {
        method : "POST",
        headers: { "Content-Type": "application/json"  },
        body: JSON.stringify({ username, email, password }),
    })
  
    if (!res.ok) {
      setLoading(false);
      setFail(true);
      return false;
    }
    
  const user = await res.json();
  setLoading(false);
  setFail(false);
  setSuccessful(true);
  setTimeout(5000, navigate("/Login"))
  } catch(error) {
    setLoading(false);
    setFail(true);

    console.error("Error signing up:", error);
    return false;
}
}

export async function login(username, password, setSuccessful, setFail, setLoading, navigate){
  try{
    const res = await fetch(`${api}/login`, {
      method : "POST",
      headers : {"Content-Type": "application/json"},
      body: JSON.stringify({username, password})
    })
    if (!res.ok) { 
      setLoading(false);
      setFail(true);
      return false; 
    }
    const userData = await res.json();
    localStorage.setItem('token', userData.token)
    localStorage.setItem('userId', userData.userId)
    localStorage.setItem('isLoggedIn', true);
    fetchCredentials(userData)
    setLoading(false);
    setFail(false);
    setSuccessful(true);
    setTimeout(5000, navigate("/"));    
  }

  catch(error) {
    console.error("Error loggin in:", error)
    setFail(true);
    return false
  }
}

export async function createSheet(userId, sheetName){
  try{
    const res = await fetch(`${api}/createSheet`,{
      method : "POST",
      headers : {"Content-Type": "application/json"},
      body : JSON.stringify({userId, sheetName})
    })

    if (!res.ok) return false;
    const outPut = await res.json();
    console.log(outPut)
  } catch(error) {
    console.log(error)
    return false;
  }
}

export async function getSheets(userId, ){
  try{
    const res = await fetch(`${api}/getSheets?userId=${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    if(!res.ok) return false;
    const sheets = await res.json();
    return sheets;
  } catch (error){
    console.log(error)
  }
}

export async function handleInputSignUp(e, callBack, setSuccessful, setFail, setLoading, navigate){
  e.preventDefault();
  let email = e.target.email.value;
  let password = e.target.password.value;
  let username = e.target.username.value
  await callBack(username, password, email, setSuccessful, setFail, setLoading, navigate)
}

export async function handleInputLogin(e, callBack, setSuccessful, setFail, setLoading, navigate){
  let username = e.target.username.value;
  let password = e.target.password.value;
  await callBack(username, password, setSuccessful, setFail, setLoading, navigate);
}

export async function handleInputCreateSheet(name, userId){
  console.log(name);
  createSheet(userId, name)
}



//Calculation related..

export async function assignCurrentCalculation(calcId){
  localStorage.setItem("calcId", calcId)
}

export async function getCalculationData(calcId){
  try{
    const res = await fetch(`${api}/getSheetsData?calcId=${calcId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    if(!res.ok) return false;

    const sheet = await res.json();
    return sheet;


  } catch (error){
    console.log(error)
  }
}

export async function saveCalculationData(calcId, updatedItems) {
  console.log(calcId)
  try {
      const res = await fetch(`${api}/saveSheet`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              calcId: calcId,
              rowData: updatedItems
          })
      });

      if (res.ok) {
          console.log(res);
          return true; // Return true if the save operation was successful
      } else {
          console.error(res);
          return false; // Return false if the save operation failed
      }
  } catch (error) {
      console.error('Error saving calculation data:', error);
      return false; // Return false if an error occurred during the save operation
  }
}