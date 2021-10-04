import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminPollCard from "../components/AdminPollCard"

import io from 'socket.io-client';




const AdminPoll = (props) => {
    const [AdminPoll, setAdminPoll] = useState([]);
    const [loaded, setLoaded] = useState(false)
    const [pollA, setPollA] = useState([]);

    //Connection to my backend server
    const [socket] = useState(() => io(":8000"))

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);


    const onChangeHandler = e => {
        setInput(e.target.value);
    }

    const onSubmitHandler = e => {
        e.preventDefault();
        socket.emit('chat', input)
    }


    useEffect(() => {
        console.log("Is this thing on???");
        socket.on('post chat', msg => {
            setMessages(prevmsgs => { return [msg, ...prevmsgs] })
        })
        return () => socket.disconnect(true);
    }, [socket])


    //SOCKET FOR RECEIVING POLL ANSWERS
    useEffect(() => {
        console.log("Socket for Poll");
        socket.on('pollA-client', poll => {
            console.log(poll + "is poll")
            console.log(pollA + "is pollA")
            setPollA(prevpolls => { return [...prevpolls, poll] })
        })
        return () => socket.disconnect(true);
    }, [socket])


    //API FOR LISTING ALL QUESTION CARDS
    useEffect(() => {
        axios.get("http://localhost:8000/api/instapoll/all")
            .then(res => {
                setAdminPoll(res.data.results);
            })
            .catch(err => console.log(err))
    }, [loaded])


    return (
        <div>
            its the admin poll page
            {
                AdminPoll.map((item, i) => {
                    return <AdminPollCard key={i} data={item} setLoaded={setLoaded} />
                })
            }

            <h2>this is the list of poll answers:</h2>
            {
                pollA.map((item, i) => {
                    return <div key={i}>{item}</div>
                })
            }



            <h4>Live Chat</h4>
            <form onSubmit={onSubmitHandler}>
                <input type="text" name="msg" autoComplete="off" onChange={onChangeHandler} />
                <input type="submit" value="Submit" />
            </form>
            {
                messages.map((item, i) => {
                    return <div><h5 key={i}>{item}</h5></div>
                })
            }
        </div>
    )
}
export default AdminPoll
