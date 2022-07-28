import React from 'react';
import {Link} from "react-router-dom";

const AnswerItem = ({answer}) => {
    return (
        <div className="message">
            <div className="text-favour">
                <div className="text">
                    {answer.text}
                </div>
                {/*<div className="likes-dislikes">*/}
                {/*    {isLiked*/}
                {/*        ?<i className="fas fa-thumbs-up icon" onClick={like}/>*/}
                {/*        :<i className="far fa-thumbs-up icon" onClick={like}/>*/}
                {/*    }*/}

                {/*    <span className="votes"> {message.likes} </span>*/}
                {/*    {isDisliked*/}
                {/*        ?<i className="fas fa-thumbs-down icon" onClick={dislike}/>*/}
                {/*        :<i className="far fa-thumbs-down icon" onClick={dislike}/>*/}
                {/*    }*/}

                {/*    <span className="votes"> {message.dislikes} </span>*/}
                {/*</div>*/}
            </div>
            <div className="message-id">
                <span>#{answer.id}</span>
            </div>
        </div>
    );
};

export default AnswerItem;