import React, {useState} from 'react';
import './Header.css';

export const Header = () =>{

    const [visible, setVisible] = useState(false);
    const classes = ["search-input"]

    if(visible) classes.push("active")

    const toggleVisible = () => {
        setVisible(!visible);
    }

    return(
        <div className="header-container">
            <div className="header-text">
                <p>Free-chat</p>
            </div>
            <div className="search-icon-container">
                <input type="text" className={classes.join(' ')}/>
                <i className="fa-solid fa-magnifying-glass search" onClick={toggleVisible}/>
            </div>
        </div>
    );
}