
import React from 'react';
import axios from 'axios'
import qs from 'query-string'
class Password extends React.Component{

    componentDidMount()
    {

        const rmr=qs.parse(this.props.location.search)

        axios({
            url:'https://tranquil-bastion-03369.herokuapp.com/updatepassword',
            method:'POST',
            headers:{'Content-type':'application/json'},
            data:
            {
                email:rmr.email,
                password:rmr.newpassword
            }
        })
    }
    fuckoff=()=>{
        this.props.history.push('/home');
    }
   
    render()
    {
        return(
            <div>
                <div className=" mt-3 text-success ml-3" onClick={this.fuckoff}>BACK</div>
            <div className="text-center mt-3 text-white">
PASSWORD UPDATED SUCCESSFULLY
            </div>
            </div>
        )
    }
}

export default Password;
