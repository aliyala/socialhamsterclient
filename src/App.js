import './App.css';
import Users from './components/Users';
import Posts from './components/Posts';
import PostsDetailed from './components/PostsDetailed';
import { ApolloProvider } from '@apollo/client';
import client from './client';
import React, { useState } from 'react';

const App = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div className="tabs">
        <div
          className={`tab ${activeTab === 0 ? 'active' : ''}`}
          onClick={() => handleTabClick(0)}
        >
          Users
        </div>
        <div
          className={`tab ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => handleTabClick(1)}
        >
          Posts overview
        </div>
        <div
          className={`tab ${activeTab === 2 ? 'active' : ''}`}
          onClick={() => handleTabClick(2)}
        >
          Posts and comments
        </div>
      </div>
      <div className="tab-content">
        {activeTab === 0 && <Users/>}
        {activeTab === 1 && <Posts/>}
        {activeTab === 2 && <PostsDetailed/>}
      </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
