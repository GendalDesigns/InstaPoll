import axios from 'axios';
import React, { useState } from 'react';
// import { Socket } from 'socket.io-client';
// import { Link } from 'react-router-dom';
// import io from 'socket.io-client';


const AdminPollCard = (props) => {
    const { question, answer, _id, socket } = props.data;
    // const [checked, setChecked] = useState(false);
    const [pollA, setPollA] = useState("");

    const [checked, setChecked] = useState(false)

    const [active, setActive] = useState({
        active: checked
    })

    const toggleChecked = (e) => {
        console.log(e)
        setActive({active:e.target.checked});
        setChecked(!checked);
        console.log("checked is "+checked)
        console.log("active is "+active.active)
        // if (checked) {
        //     Socket.emit('pollQ-server',UserPollCard)
        // }

        // e.preventDefault();
        axios.patch(`http://localhost:8000/api/instapoll/update/${_id}`, active)
            .then(res=>{
                console.log(res.data.results);
                props.setLoaded(prevState => !prevState);
                        })
            .catch(err => console.log(err))
    }


        //SOCKET FOR RECEIVING POLLANSWERS
        // useEffect(() => {
        //     console.log("Socket for Poll");
        //     socket.on('pollA-client', poll => {
        //         console.log(poll)
        //         // setPollQ(prevpolls => { return [poll, ...prevpolls] })
        //     })
        //     return () => socket.disconnect(true);
        // }, [socket])

    const onDeleteHandler = (_id) => {
        console.log(_id);

        axios.delete(`http://localhost:8000/api/InstaPoll/delete/${_id}`)
            .then(res => {
                console.log(res);
                props.setLoaded(prevState => !prevState);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="pollCard">
            <h4>Q: {question}</h4>
            {/* {
                if (toggleChecked) {

                    //emit card to all users
                    //swap out H5 for input box
                }
            } */}
            <h5>A: {answer}</h5>
            <input type="checkbox" name="active" checked={checked} onChange={toggleChecked}/>
            <button className="delete" onClick={() => onDeleteHandler(props.data._id)}>x</button>
        </div>
    )
}

export default AdminPollCard;