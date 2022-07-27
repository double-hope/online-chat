import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './Header/Header';
import { MessageList } from './Products/MessageList';

export function App() {
  return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<MessageList />} />
        </Routes>
      </div>
  );
}