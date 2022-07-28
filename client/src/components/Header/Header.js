import React, {useEffect, useState} from 'react';
import './Header.css';
import {useQuery} from "@apollo/client";
import {GET_FILTERED_MESSAGES, GET_MESSAGES} from "../../queries";
import {orderBy} from "../../constants";

export const Header = ({ setData }) =>{

    const [params, setParams] = useState('');
    const [visible, setVisible] = useState(false);
    const classes = ["search-input"]

    if(visible) classes.push("active")

    const toggleVisible = () => {
        setVisible(!visible);
    }

    const { loading, error, data } = useQuery(GET_FILTERED_MESSAGES,{
        variables: { filter: params, orderBy },
    });

    const search = (e) => {
        setParams(e.target.value);
        setData(data);
    }

    return(
        <div className="header-container">
            <div className="header-text">
                <p>Free-chat</p>
            </div>
            <div className="search-icon-container">
                <input type="text" placeholder="Find..." value={params} onChange={e => search(e)} className={classes.join(' ')}/>
                <i className="fa-solid fa-magnifying-glass search" onClick={toggleVisible}/>
            </div>
        </div>
    );
}