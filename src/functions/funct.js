let api = "https://auntyayeserver.onrender.com";
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

//Sheets Related (Get, Create, Delete)
export async function deleteMergedSheet(calcId, userId){
  try{
    const res = await fetch(`${api}/deleteMergedSheet?calcId=${calcId}&userId=${userId}` ,{
      method : "DELETE",
      headers : {"Content-Type": "application/json"},
    })
    if(!res.ok) {return false} else {;
    return true;
    }
  } catch (error) {
    console.log(error);
  }

}
export async function deleteSheet(calcId, userId){
  try{
    const res = await fetch(`${api}/deleteSheet?calcId=${calcId}&userId=${userId}` ,{
      method : "DELETE",
      headers : {"Content-Type": "application/json"},
    })
    if(!res.ok) {return false} else {;
    return true;
    }
  } catch (error) {
    console.log(error);
  }


}
export async function createSheet(userId, sheetName, Date, setSuccessful, setFail, setLoading, navigate){
  try{
    const res = await fetch(`${api}/createSheet`,{
      method : "POST",
      headers : {"Content-Type": "application/json"},
      body : JSON.stringify({userId, sheetName, date : Date})
    })

    if (!res.ok) {
      setFail(true);
      setSuccessful(false);
      setLoading(False);
      return false;
    } else {
    
    const outPut = await res.json();
    console.log(outPut)
    setLoading(false);
    setFail(false);
    setSuccessful(true);

    navigate("/MySheets")
    }
  } catch(error) {
    console.log(error)
    return false;
  }
}

export async function getSheets(userId ){
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

export async function getMergedSheets(userId){
  try{
    const res = await fetch(`${api}/getMergedSheets?userId=${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    if(!res.ok) return false;
    const sheets = await res.json();
    console.log(sheets)
    return sheets;
  } catch (error){
    console.log(error)
  }

}

export async function getRecentSheets(userId){
  try{
    const res = await fetch(`${api}/getRecentSheets?userId=${userId}`, {
      method : "GET",
      headers : {"Content-Type" : "application/json"}
    });
    if(!res.ok) return false;
    const sheets = await res.json();
    return sheets;
  } catch (error){
    console.log(error)
  }
}

export async function getSheetInfo(userId, calcId){
  try{
    const res = await fetch(`${api}/getSheetInfo?calcId=${calcId}&userId=${userId}`, {
      method : "GET",
      headers : {"Content-Type" : "application/json"}
    })
    if(!res.ok) return false;
    const data = await res.json();
    return data;
  } catch(error){
    console.log(error)
  }
}


//Handle Inputs

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

export async function handleInputCreateSheet(name, userId, Date, setSuccessful, setFail, setLoading, navigate){

  createSheet(userId, name, Date, setSuccessful, setFail, setLoading, navigate)
}



//Calculation related..


export async function assignCurrentCalculation(calcId){
  localStorage.setItem("calcId", calcId)
  
}

export function mergeCalculation(calcArr){
  let merged = {};
  let itemsArr = []
  let sheets = calcArr.sheets
  for(let i = 0; i < sheets.length ;i++){     
    itemsArr.push(sheets[i].items); 
  }
  localStorage.setItem("Items", JSON.stringify(itemsArr))
  for (const arr of itemsArr) {
    // Iterate through each item in the current array
    for (const item of arr) {
        const itemName = item.name;

        // If the item is not in mergedItems, initialize it with quantity 0
        if (!merged[itemName]) {
          merged[itemName] = {
                name: itemName,
                price: item.price,
                sellPrice: item.sellPrice,
                quantity: 0
            };
        }
        // Increment the quantity of the item by the quantity from the current array
        merged[itemName].quantity += item.quantity;
    }
    
}

// Convert mergedItems object to array
const mergedItemsArray = Object.values(merged);
    return mergedItemsArray;
};

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
export async function getMergedCalculationData(calcId){
  try{
    const res = await fetch(`${api}/getMergedSheetData?calcId=${calcId}`, {
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
export async function getCalculationDataInRange(userId, startDate, endDate){
  try{
    const res = await fetch(`${api}/getSheetsDataInRange?userId=${userId}&startDate=${startDate}&endDate=${endDate}`)
    if(!res.ok) return false;
    const sheets = await res.json();
    return sheets;
  } catch (error) {
    console.log(error)
  }
}

export async function saveMergedCalculation(userId, items, startDate, endDate){
  console.log(items)
  try{
    const res = await fetch(`${api}/saveMergedSheet`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          userId: userId,
          items: items,
          startDate: startDate,
          endDate : endDate,
      })
  });
  if (res.ok) {
    console.log(res);
    return true; // Return true if the save operation was successful
}
  } catch(error){
    console.log(error)
  }

}
export async function saveCalculationData(calcId, updatedItems) {
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

