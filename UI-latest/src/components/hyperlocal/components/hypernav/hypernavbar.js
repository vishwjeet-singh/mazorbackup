import React, { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom'
import { useAuth } from "../../../useraccount/components/useraccountMain/contexts/AuthContext";
import {db} from "../../../useraccount/components/useraccountMain/firebase";

const HyperNav = ({ setDisplay }) => {
    const { currentUser, logout } = useAuth()
    const [result,setresult]=useState();
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
        <div className='navbar'>
            <div className='links'>
                <Link to='/'>Foot-Insights</Link> &nbsp;
                <a href='#' className='hyperlocal-intelligence active' onClick={() => { setDisplay('hyperMain') }}>Hyperlocal Intelligence</a> &nbsp;
                <Link to='/advertising'>Advertising</Link>&nbsp;
                
               
            
            </div>


            <div className='right-side'>
            <p style={{color:"#4C56BA", marginRight:"30px",marginTop:"10px"}} ><b >Credit Remaining </b>
                {result}</p>&nbsp;
               
            <Link to='/useraccount'>
                <img src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-4--v1.png" className='profilePic' />
                </Link>&nbsp;
            
            XYZ Corp
            </div>
        </div>
    )
}

export default HyperNav