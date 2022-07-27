import React, { useCallback, useState } from 'react';
import './Message.css';
import {GET_MESSAGES, UPDATE_DISLIKES, UPDATE_LIKES} from '../../queries';
import { useMutation } from '@apollo/client';

const updateLikesStore = ( messageId ) => (cache, { data: { updateLikes } })  => {
    const { messages } = cache.readQuery({
        query: GET_MESSAGES,
    });
    const updatedLikes = messages.messageList.map(item => {
        if (item.id === messageId) {

            return {
                ...item,
                likes: updateLikes.likes,
            };
        }

        return item;
    });

    cache.writeQuery({
        query: GET_MESSAGES,
        data: { messages: { ...messages, messageList: updatedLikes } },
    });

}

const updateDislikesStore = ( messageId ) => (cache, { data: { updateDislikes } })  => {

    const { messages } = cache.readQuery({
        query: GET_MESSAGES,
    });
    const updatedLikes = messages.messageList.map(item => {
        if (item.id === messageId) {

            return {
                ...item,
                dislikes: updateDislikes.dislikes,
            };
        }

        return item;
    });

    cache.writeQuery({
        query: GET_MESSAGES,
        data: { messages: { ...messages, messageList: updatedLikes } },
    });

}

export const MessageItem = ({ message }) => {
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
        }
    }

    return (
        <div className="message">
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
            </div>
        </div>
    );
};