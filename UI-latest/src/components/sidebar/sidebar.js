import React from 'react';
import { Link, animateScroll as scroll } from "react-scroll";
import './sidebar.css'


const SideBar = () => {
    return(
        <>
        <div className='sidebar'>
            <div className='keyStats'>
                <img src="https://img.icons8.com/windows/32/000000/settings.png" className='icon'/>
                <br />
                Key Stats
            </div>

            <div className='visits'>
                <img src="https://img.icons8.com/ios/32/000000/horizontal-settings-mixer--v1.png" className='icon'/>
                <br />
                <Link
                    to="section1"
                    spy={false}
                    smooth={true}
                    offset={-180}
                    duration={500}
                        >Visits</Link>
            </div>

            <div className='customerType'>
                <img src="https://img.icons8.com/windows/32/000000/visible.png" className='icon' />
                <br />
                <Link
                    to="section2"
                    spy={false}
                    smooth={true}
                    offset={-100}
                    duration={500}
                        >Customer Type</Link>
            </div>

            <div className='customerJourney'>
                <img src="https://img.icons8.com/windows/32/000000/journey.png" className='icon' />
                <br />
                <Link
                    to="section3"
                    spy={false}
                    smooth={true}
                    offset={-120}
                    duration={500}
                        >Customer Journey</Link>
            </div>

            <div className='placeOfInterest'>
                <img src="https://img.icons8.com/windows/32/000000/place-marker.png" className='icon' />
                <br />
                <Link
                    to="section4"
                    spy={false}
                    smooth={true}
                    offset={-120}
                    duration={500}
                        >Place of Interest</Link>
            </div>
        </div>
        </>
    )
}

export default SideBar