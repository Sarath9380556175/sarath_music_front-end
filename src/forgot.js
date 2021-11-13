import axios from 'axios';
import React from 'react';
import qs from 'query-string';

class Forgot extends React.Component{
    constructor()
    {
        super();
        this.state=
        {
            isotpvalid:undefined
        }
    }
    
     componentDidMount()
    {
const skr=qs.parse(this.props.location.search)

axios({
    url:'http://localhost:2077/forgot',
    method:'POST',
    headers:{'Content-type':'application/json'},
    data:
    {
       email:skr.useremail
    }
})

    }

    otpinput=(event)=>{

        const otp=event.target.value;

        sessionStorage.setItem('otp',otp);

        axios({
            url:'https://tranquil-bastion-03369.herokuapp.com/isotpvalid',
            method:'POST',
            headers:{'Content-type':'application/json'},
            data:
            {
                otp:otp
            }
        })

        .then(response=>this.setState({isotpvalid:response.data.otp}))

        .catch(error=>console.log(error))

    }

    skr=()=>{
        const {isotpvalid}=this.state;

    if(isotpvalid===true)
    {
        this.props.history.push('/newpassword')
    }
    else if(isotpvalid===false){
        alert("OTP IS INVALID");
    }
    }
    render()
    {
        return(
            <div>
                <form className="text-center" >
                <input type="password" maxLength="4" placeholder="OTP" required className="mt-3 pl-3" onChange={this.otpinput}/><br/><br/>
                <div className="btn btn-success" onClick={this.skr}>OK</div>
                </form>
 
            </div>
        )
    }
}

export default Forgot;
