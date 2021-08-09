import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const Colleges = ()=>{
    const location = useLocation()
    const collegeList = location.state?.collegeList

    useEffect(()=>{
        //executed whenever collegelist changes
    },[collegeList]) 

    return (
        <div className="App">
        </div>
      );
}

export default Colleges