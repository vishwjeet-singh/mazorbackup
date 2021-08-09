import React, { useRef, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"

import {db} from "../firebase"

export default function Deduct(email)
{
    
    
    const docRef=db.collection('Userdata').doc(email)
            docRef.get().then(docSnap=>{

                if (docSnap.exists) {
              
                    var result=docSnap.data().credit;
                    result-=10;
                    
                 if(result>0)
                 {
                    docRef.update({
                   
                        credit:result
                       })

                 }
                 else if(result<=0)
                 {
                    docRef.update({
                   
                        credit:0
                       })
                 }
                   
                } else {
                   
                    console.log("No such document!");
                }
            
        
            })



}