import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './Header/Header';
import { MessageList } from './Messages/MessageList';
import AnswersList from './Answers/AnswersList';
import './styles.css';

export function App() {
  return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<MessageList />} />
            <Route path="/answers/:id" element={<AnswersList />} />
        </Routes>
      </div>
  );
}