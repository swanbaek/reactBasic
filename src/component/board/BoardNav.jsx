import React from 'react';
import {Link} from 'react-router-dom'

const BoardNav = (props) => {
    const {items, onMode} = props;
    return (
        <ul className="nav mt-3 justify-content-center">
            <li className="nav-item">
            
            </li> 
            {
                items? items.map((item, i)=>{
                    //item=> List, Write
                    let itemMode=item.toLowerCase();
                    return(
	        <li className="nav-item" key={i}>
            <Link className="nav-link bg-dark text-white" to="#"
             onClick={()=>{
                 onMode(itemMode);
             }}>{item}</Link>
            </li>
                    )
                }):''
            }

        </ul>
    );
};

export default BoardNav;