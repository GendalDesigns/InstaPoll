import React, { useState } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const CreatePoll = (props) => {

    const history = useHistory();

    const [form, setForm] = useState({
        question: "",
    })
    const [errors, setErrors] = useState({});


    const onChangeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        axios.post("http://localhost:8000/api/InstaPoll/create", form)
            .then(res=>{
                console.log(res.data);
                if(res.data.results){
                    history.push('/admin');
                }
                else{
                    setErrors(res.data.err.errors);
                }
            })
            .catch(err => console.log(err))
    }

    return(
        <div className="w-50 mx-auto p-3">
            <form onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <input name="question" className="form-control" type="text" placeholder="question" onChange={onChangeHandler} />
                    <span className="alert-danger">{errors.question && errors.question.message}</span>
                </div>

                {/* <div className="form-group">
                    <input name="answer" className="form-control" type="number" placeholder="answer name" onChange={onChangeHandler} />
                    <span className="alert-danger">{errors.answer && errors.answer.message}</span>
                </div> */}

                <input type="submit" className="btn btn-primary"/>
            </form>
        </div>
    )
}
export default CreatePoll