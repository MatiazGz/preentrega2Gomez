import "./NavBar.css";
import React from "react";
function navbar () {
    
    
    return (<nav>
        <div className="navcont"><p>Real State</p>
            <ul className="navitems">
                <li><a href="">Ventas</a></li>
                <li><a href="">Alquileres</a></li>
            </ul> 
        </div>

        </nav>)
};

export default navbar;