import React, { useCallback, useState } from 'react';
import './Message.css';

export const MessageItem = ({ message }) => {
    const [isAddingAnswers, setIsAddingAnswers] = useState(false);

    const handleReviewSubmit = useCallback(() => setIsAddingAnswers(false), []);

    return (
        <div className="message">
            <div className="text-favour">
                <div className="text">
                    {message.text}
                </div>
                <div className="likes-dislikes">
                    <i className="far fa-thumbs-up icon"/>
                    <span className="votes"> {message.likes} </span>
                    <i className="far fa-thumbs-down icon"/>
                    <span className="votes"> {message.dislikes} </span>
                </div>
            </div>
            <div className="message-id">
                <span>#{message.id}</span>
            </div>
        </div>
    );
};