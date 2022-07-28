import React, { useState } from 'react';
import './Header.css';
import {useQuery} from "@apollo/client";
import {GET_FILTERED_MESSAGES} from "../../queries";
import {orderBy, orderByDislikes, orderByLikes} from "../../constants";
import {Sorting} from "../../common/enums/sortingEnum";

export const Header = ({ setData, setSorting }) =>{

    const [params, setParams] = useState('');
    const [searchVisible, setSearchVisible] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const searchClasses = ["search-input"]
    const menuClasses = ["sort-by"]

    if(searchVisible) searchClasses.push("active")
    if(menuVisible) menuClasses.push("activeMenu")

    const toggleSearchVisible = () => {
        setSearchVisible(!searchVisible);
    }

    const toggleMenuVisible = () => {
        setMenuVisible(!menuVisible);
    }

    const { loading, error, data } = useQuery(GET_FILTERED_MESSAGES,{
        variables: { filter: params, orderBy },
    });

    const search = (e) => {
        setParams(e.target.value);
        setData(data);
    }

    const chooseSorting = (e) => {
        toggleMenuVisible();
        switch (e.target.innerText){
            case Sorting.DATE:
                setSorting(orderBy);
                break;
            case Sorting.LIKES:
                setSorting(orderByLikes);
                break;
            case Sorting.DISLIKES:
                setSorting(orderByDislikes);
                break;
            default:
                setSorting(orderBy);
                break;
        }
    }

    return(
        <div className="header-container">
            <div className="burger-menu">
                <i className="fa-solid fa-burger menu" onClick={toggleMenuVisible}/>
                <div className={menuClasses.join(' ')}>
                    <ul onClick={chooseSorting}>
                        <li>date</li>
                        <li>likes</li>
                        <li>dislikes</li>
                    </ul>
                </div>
            </div>
            <div className="header-text">
                <p>Free-chat</p>
            </div>
            <div className="search-icon-container">
                <input type="text" placeholder="Find..." value={params} onChange={e => search(e)} className={searchClasses.join(' ')}/>
                <i className="fa-solid fa-magnifying-glass search" onClick={toggleSearchVisible}/>
            </div>
        </div>
    );
}