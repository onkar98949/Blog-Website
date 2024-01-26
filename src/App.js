import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { UserContextProvider } from './UserContext';
import CreatePost from './Pages/CreatePost';
import PostPage from './Pages/PostPage';
import EditPost from './Pages/EditPost';

function App() {
  return (
    <><UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" Component={Home} exact></Route>
          <Route path="/login" Component={Login} exact></Route>
          <Route path="/signup" Component={Signup} exact></Route>
          <Route path="/create" Component={CreatePost} exact></Route>
          <Route path="/post/:id" Component={PostPage} exact></Route>
          <Route path='/edit/:id' Component={EditPost}></Route>
        </Routes>
      </Router>
    </UserContextProvider>
    </>
  );
}

export default App;
