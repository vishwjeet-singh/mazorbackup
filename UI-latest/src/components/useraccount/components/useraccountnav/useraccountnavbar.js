import { Link } from 'react-router-dom'
const UseraccountNav = ({ setDisplay }) => {
    return (
        <div className='navbar'>
            <div className='links'>
                <Link to='/'>Foot-Insights</Link> &nbsp;
                <Link to='/hyperlocal'>Hyperlocal Intelligence</Link>&nbsp;
                <Link to='/advertising'>Advertising</Link>&nbsp;
        
            </div>


            <div className='right-side'>
            <a href='#' className='useraccount active' onClick={() => { setDisplay('useraccountMain') }}>
                <img src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-4--v1.png" className='profilePic' />
                </a> &nbsp;
            
            XYZ Corp 
            </div>
        </div>
    )
}

export default UseraccountNav