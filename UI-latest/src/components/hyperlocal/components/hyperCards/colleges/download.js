import axios from "axios"
import * as jsPDF from 'jspdf';
import * as https from 'https';

const agent = new https.Agent({  
    rejectUnauthorized: false
   });


const Download = ({ polygonCoordinates }) => {
    const pdfGenerate = (event) => {
        event.preventDefault()
        console.log(polygonCoordinates);
        if (polygonCoordinates) {
            axios.post('https://spatialapi.unmazer.ai/post_json',
                {
                    coordinates: polygonCoordinates.coordinates,
                    status: "True",
                   
                }
            ).
                then((response) => {
                    console.log(response.data.record);
                
                    //creating a doc
                    let doc =new jsPDF('landscape', 'px', 'a4', 'false')

                    let string=[];
                    
                    var i=0
                    for(const obj of response.data.record){
                        string[i] =  `${i}. College Name : ${obj.placeName}\r\n` + `   Address : ${obj.placeAddress}\r\n`
                        i++
                    }
                    let temparray=[];
                    var k=0;
                      for(var i=0;i<string.length;i+=14)
                      {
                          var str="";
                          for(var j=0;j<14;j++)
                          {       
                             str=str+string[i+j];
                          }
                          if(str!=undefined)
                          {
                            temparray[k]=str;
                            k++;
                          }
                          
                      }
                      for (var i = 0; i<temparray.length-1;i++) {
                        if(i==0)
                        {
                            temparray[i]="College List as follows:\r\n'"+temparray[i];
                        }
                        doc.text(10,10,temparray[i])
                          doc.addPage();
                    }
            
                    doc.save('CollegeList.pdf') //prompt to download the doc as CollegeList.pdf
                },
                    (Error) => {
                        console.log(Error);
                    })
        }
    }
    return (
        // Displaying the Download button
        <button onClick={pdfGenerate}>▼</button>
    )
}

export default Download
