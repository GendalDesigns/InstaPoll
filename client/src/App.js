import './App.css';
import {BrowserRouter, Link, Switch, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios'
import {useEffect, useState} from 'react'
import Main from './views/Main'
import UserPoll from './views/UserPoll'
import AdminPoll from './views/AdminPoll'
import CreatePoll from './views/CreatePoll';

//Sockets Tutorial/Nicole Tutorial Stuff
import io from 'socket.io-client';

function App() {
  //Connection to my backend server
  const [socket] = useState(() => io(":8000"))
  const [loaded, setLoaded] = useState(false)


  return (
    <div className="App">
      <h2>InstaPoll</h2>
      <BrowserRouter>
        <div className="header">
          <Link to="/create">Add new poll</Link>
          <Link to="/">Home</Link>
        </div>
        <Switch>

          <Route exact path="/">
            <Main socket={socket}/>
          </Route>

          <Route exact path="/user">
            <UserPoll socket={socket}/>
          </Route>

          <Route exact path="/admin">
            <AdminPoll socket={socket} setLoaded={setLoaded}/>
          </Route>

          <Route exact path="/create">
            <CreatePoll/>
          </Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

//create admin poll component
//create user poll component (same thing?)

//create ability to check on/off polls


// MVP:
// - polls can appear/disappear based on a checkbox
// - An admin can create a poll
// - an admin can adjust the question, but not the answer
// - users can reply to polls, and the answer is shared to admin

// Stretch goals:
// - fancy CSS
// - pose true/false question
// - display data in real-time