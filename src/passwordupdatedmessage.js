
import React from 'react';
import axios from 'axios'
import qs from 'query-string'
class Password extends React.Component{
    
    componentDidMount()
    {

        const rmr=qs.parse(this.props.location.search)

        axios({
            url:'http://localhost:2077/updatepassword',
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
                <div className=" mt-3 text-white ml-3" onClick={this.fuckoff}>BACK</div>
            <div className="text-center mt-3" style={{color:'yellow'}}>
PASSWORD UPDATED SUCCESSFULLY
            </div>
            </div>
        )
    }
}

export default Password;
