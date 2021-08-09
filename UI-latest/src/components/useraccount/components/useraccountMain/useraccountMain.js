import UseraccountSideBar from '../useraccountsidebar/useraccountsidebar'
import './useraccountMain.css'
import gearbutton from './loadingicon.gif'
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';
import {  Button, Card, Alert,Container} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import { useAuth } from "../useraccountMain/contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react"
import {db} from "../useraccountMain/firebase";

const UseraccountMain = ({ display, setDisplay }) => {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [result,setresult]=useState();

  async function handleLogout() {
    
    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  useEffect(()=>{
    const docRef=db.collection('Userdata').doc(currentUser.email)
  docRef.get().then(docSnap=>{

    if (docSnap.exists) {
   var result=docSnap.data().credit;
      setresult(result);
    }
  })
  },[result])
  
    return (
        <div className='main'>
            <UseraccountSideBar display={display} setDisplay={setDisplay} />
            {display === 'useraccountMain' &&
             <Container
             className="d-flex align-items-center justify-content-center"
             style={{ minHeight: "100vh" }}
           >
            
            <div className="w-100" style={{ maxWidth: "400px" }}>
                 <Card>
                 <Card.Body>
                   <h2 className="text-center mb-4">User Profile DashBoard-Unmazer</h2>
                   {error && <Alert variant="danger">{error}</Alert>}
                  <p>
                   <strong>Email:</strong>{currentUser.email}  </p>
                   {result!=null? <p><strong>Credits Remaining:</strong>{result}</p>:null}
                 
                 
                 </Card.Body>
               </Card>
               <div className="w-100 text-center mt-2">
                 <Button onClick={handleLogout} className="w-100" type="submit">
                   Log Out
                 </Button>
               </div>
               </div>
  </Container>
            }
            
        </div>
    )
}
export default UseraccountMain
