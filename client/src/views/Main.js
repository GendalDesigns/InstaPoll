import React, { useState } from "react";
// import axios from "axios";
import {Link} from 'react-router-dom';



const Main = (props) => {


    return (
        <div>
            <Link to={`/user/`}>User Poll</Link>
            <b> | </b>
            <Link to={`/admin/`}>Admin Poll</Link>
        </div>
    )
}
export default Main
