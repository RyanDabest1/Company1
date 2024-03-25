let api = "https://auntyayeserver.onrender.com";


export async function signUp(username, password, email){
  try {
    const res = await fetch(`${api}/register`,  {
        method : "POST",
        headers: { "Content-Type": "application/json"  },
        body: JSON.stringify({ username, email, password }),
    })
  
    if (!res.ok) return false;
    const user = await res.json();
  return user;
  } catch(error) {
    console.error("Error signing up:", error);
    return false;
}
}

export async function login(username, password){
  try{
    const res = await fetch(`${api}/login`, {
      method : "POST",
      headers : {"Content-Type": "application/json"},
      body: JSON.stringify({username, password})
    })
    if (!res.ok) return false;
    const userData = await res.json();
    localStorage.setItem('token', userData.token)
    localStorage.setItem('userId', userData.userId)
    console.log(userData)
  }

  catch(error) {
    console.error("Error loggin in:", error)
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

export async function handleInputSignUp(e, callBack){
  e.preventDefault();
  let email = e.target.email.value;
  let password = e.target.password.value;
  let username = e.target.username.value
  await callBack(username, password, email)
}

export async function handleInputLogin(e, callBack){
  let username = e.target.username.value;
  let password = e.target.password.value;
  await callBack(username, password);
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