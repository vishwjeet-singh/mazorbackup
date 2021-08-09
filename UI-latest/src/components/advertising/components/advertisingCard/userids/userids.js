import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const UserIds = ()=>{
    const location = useLocation()
    const useridsList = location.state?.useridsList

    useEffect(()=>{
        //executed whenever collegelist changes
    },[useridsList]) 

    return (
        <div className="App">
        </div>
      );
}

export default UserIds