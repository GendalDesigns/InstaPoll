import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Socket } from 'socket.io-client';




//Sockets Tutorial/Nicole Tutorial Stuff
import io from 'socket.io-client';

const UserPoll = (props) => {
    // const [poll, setPoll] = useState([]);
    // const [loaded, setLoaded] = useState(false)
    // const { question, answer } = props.data;
    const [pollQ, setPollQ] = useState([]);
    const [pollA, setPollA] = useState("");
    const [input, setInput] = useState("");
    const [socket] = useState(() => io(":8000"))
    const [messages, setMessages] = useState([]);


    const onChangeHandler = e => {
        setInput(e.target.value);
    }
    const onPollChangeHandler = e => {
        setPollA(e.target.value);
    }

    const onSubmitHandler = e => {
        e.preventDefault();
        socket.emit('chat', input)
    }


    const onPollSubmitHandler = e => {
        e.preventDefault();
        console.log(e)
        socket.emit('pollA-server', pollA)

    }

    //SOCKET FOR MESSAGES
    useEffect(() => {
        console.log("Socket for Messages");
        socket.on('post chat', msg => {
            console.log(msg)
            setMessages(prevmsgs => { return [msg, ...prevmsgs] })
        })
        return () => socket.disconnect(true);
    }, [socket])


    //SOCKET FOR RECEIVING POLL QUESTIONS
    // useEffect(() => {
    //     console.log("Socket for Poll");
    //     socket.on('pollQ-client', poll => {
    //         console.log(poll)
    //         // setPollQ(prevpolls => { return [poll, ...prevpolls] })
    //     })
    //     return () => socket.disconnect(true);
    // }, [socket])


    //PULLING ALL POLLS
    useEffect(() => {
        axios.get("http://localhost:8000/api/instapoll/all")
            .then(res => {
                setPollQ(res.data.results);
                console.log(res.data.results)
                console.log("poll question refresh")
            })
            .catch(err => console.log(err))
    }, [socket])



    return (
        <div>
            its the UserPoll page
            {
                pollQ.map((item, i) => {
                    return (
                        
                            item.active ?
                                <div key={i}>
                                    <div>{item.question}</div>
                                    <form onSubmit={onPollSubmitHandler}>
                                        <input type="text" onChange={onPollChangeHandler}></input>
                                        <input type="submit" value="Submit Answer" />
                                    </form>
                                </div>
                                : null
                    )
                })
            }
            <h4>Live Chat</h4>
            <form onSubmit={onSubmitHandler}>
                <input type="text" name="msg" autoComplete="off" onChange={onChangeHandler} />
                <input type="submit" value="Submit" />
            </form>
            {
                messages.map((item, i) => {
                    return <div key={i}><h5>{item}</h5></div>
                })
            }

            {/* {
                pollQ.map((item, i) => {
                    return <div><h5 key={i}>{item}</h5></div>
                })
            } */}


            {/* <h4>{question}</h4> */}
            {/* {
                if (toggleChecked) {

                    //emit card to all users
                    //swap out H5 for input box
                }
            } */}
            {/* <input type="text" onChange={onChangeHandler}>{answer}</input> */}


        </div>
    )
}
export default UserPoll
