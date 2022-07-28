import React, { useState } from 'react';
import './Message.css';
import { UPDATE_DISLIKES, UPDATE_LIKES} from '../../queries';
import { useMutation } from '@apollo/client';
import { updateLikesStore, updateDislikesStore} from '../../helpers/helpers';
import {Link} from "react-router-dom";

export const MessageItem = ({ message, setAnswer, setAnsweredMessage }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);

    const id = message.id;
    let likes = message.likes;
    let dislikes = message.dislikes;

    const [updateLikes, { _loading, _error }] = useMutation(UPDATE_LIKES, {
        update: updateLikesStore(id),
    });

    const [updateDislikes, { loading, error }] = useMutation(UPDATE_DISLIKES, {
        update: updateDislikesStore(id),
    });

    const like = () => {
        if(!isLiked){
            if(isDisliked){
                dislikes--;
                updateDislikes({
                    variables: {
                        message: { id , dislikes}
                    }
                });
            }
            likes++;
            updateLikes({
                variables: {
                    message: { id , likes}
                }
            });
            setIsLiked(true);
            setIsDisliked(false);
        } else {
            likes--;
            updateLikes({
                variables: {
                    message: { id , likes}
                }
            });
            setIsLiked(false);
        }
    }

    const dislike = () => {
        if(!isDisliked){
            if(isLiked){
                likes--;
                updateLikes({
                    variables: {
                        message: { id, likes }
                    }
                });
            }
            dislikes++;
            updateDislikes({
                variables: {
                    message: { id , dislikes }
                }
            });
            setIsLiked(false);
            setIsDisliked(true);
        } else {
            dislikes--;
            updateDislikes({
                variables: {
                    message: { id , dislikes }
                }
            });
            setIsDisliked(false);
        }
    }

    const messageAnswer = () => {
        setAnswer(true);
        setAnsweredMessage(message);
    }

    return (
        <div className="message" onDoubleClick={messageAnswer}>
            <div className="text-favour">
                <div className="text">
                    {message.text}
                </div>
                <div className="likes-dislikes">
                    {isLiked
                        ?<i className="fas fa-thumbs-up icon" onClick={like}/>
                        :<i className="far fa-thumbs-up icon" onClick={like}/>
                    }

                    <span className="votes"> {message.likes} </span>
                    {isDisliked
                        ?<i className="fas fa-thumbs-down icon" onClick={dislike}/>
                        :<i className="far fa-thumbs-down icon" onClick={dislike}/>
                    }

                    <span className="votes"> {message.dislikes} </span>
                </div>
            </div>
            <div className="message-id">
                <span>#{message.id}</span>
                {message.answers.length
                    ?<div className="link-container"><Link to={`/answers/${message.id}`}>Replies</Link></div>
                    :<></>
                }
            </div>
        </div>
    );
};