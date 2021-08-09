import React, { useEffect, useState,useRef} from 'react';
import axios from "axios";
import * as https from 'https';
import { CSVLink } from "react-csv";


const Download = ({ polygonCoordinates ,gender}) => {
    const [ fileData, setFileData ] = useState([]);
    const agent = new https.Agent({  
        rejectUnauthorized: false
       });
    const headers = [
   
        { label: "User Id", key: "userid" },
      
      ];
      const csvLink = useRef()
    const pdfGenerate = async(event) => {
        event.preventDefault()
        console.log(polygonCoordinates);
        if (polygonCoordinates) {
            await axios.post('https://home.unmazer.ai/post_json',
                {
                    coordinates: polygonCoordinates.coordinates,
                    status: "False",
                  
                
                   
                }
            ).
                then((response) => {
                   
                    
                   
                    let string=[];
                    
                    
                    if(gender==="Male")
                        {
                            let i=0;
                            let j=0;
                            for(const obj of response.data.Gender){
                                
                                if(obj==="MALE")
                                {
                                    string[i]= {userid:`${response.data.Mobile_Ad_Id[j]}`}; 
                                    i++;
                                }
                                
                               j++; 
                            }
                             
                        } 
                    else if(gender==="Female")
                    {
                        let i=0;
                            let j=0;
                            for(const obj of response.data.Gender){
                                
                                if(obj==="FEMALE")
                                {
                                    string[i]= {userid:`${response.data.Mobile_Ad_Id[j]}`}; 
                                    i++;
                                }
                                
                               j++; 
                            }
                         
                    }
                    else 
                    {
                          let i=0
                         
                            for(const obj of response.data.Mobile_Ad_Id){
                                         
                                string[i]= {userid:`${obj}`}; 
                                i++;
                            }
                       
                        

                    }
                    
                    
               
                    setFileData(string);


                },
                    (Error) => {
                        console.log(Error);
                    })
                    csvLink.current.link.click()
        }
    }
    return (
        <div>
            
        <button onClick={pdfGenerate}><img src="https://img.icons8.com/material-rounded/24/000000/download--v1.png"/></button>
        <CSVLink
            data={fileData}
            headers={headers}
            filename='UserIds.csv'
            className='hidden'
            ref={csvLink}
            target='_blank'
         />
           
         </div>
    )
}

export default Download