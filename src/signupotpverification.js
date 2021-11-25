import axios from 'axios';
import React from 'react';
import qs from 'query-string';
class Signupotpverification extends React.Component{

    constructor()
    {
        super();
        this.state=
        {
email:undefined,
mobilenumber:undefined,
password:undefined,
isotpvalid:undefined,
otp:undefined
        }
    }

    componentDidMount()
    {

const skr=qs.parse(this.props.location.search)

this.setState({
email:skr.email,
mobilenumber:skr.mobilenumber,
password:skr.password

})

        axios({
            url:'https://tranquil-bastion-03369.herokuapp.com/signupotpverification',
            method:'POST',
            headers:{'Content-type':'application/json'},
            data:
            {
                email:skr.email
            }

        })
    }

    resendotp=()=>{

        const {email}=this.state;
        axios({
            url:'https://tranquil-bastion-03369.herokuapp.com/signupotpverification',
            method:'POST',
            headers:{'Content-type':'application/json'},
            data:
            {
                email:email
            }

        })
    }

    otp=(event)=>{

const otp=event.target.value;
        axios({
            url:'https://tranquil-bastion-03369.herokuapp.com/isotpvalid',
            method:'POST',
            headers:{'Content-type':'application/json'},
            data:
            {
                otp:otp
            }
        })

        .then(response=>this.setState({isotpvalid:response.data.otp,otp:otp}))

        .catch(error=>console.log(error))

        this.setState({otp:otp})

        
    }

    skr=()=>{

        const {isotpvalid,email,mobilenumber,password,otp}=this.state;

        if(isotpvalid===true)
        {
             this.props.history.push(`/signupsuccess/?email=${email}&&password=${password}&&mobilenumber=${mobilenumber}&&otp=${otp}`)
        }
        else if(isotpvalid===false)
        {
            alert("OTP IS INVALID")
        }

    }
    render()
    {
        return(
            <div>
   <form className="text-center mt-3">
       <input type="password" name="otp" placeholder="e.g 298450" onChange={this.otp} maxLength="6" required/><br/><br/>
       <button className="btn btn-success btn-sm" onClick={this.skr}>submit</button>
   </form>
<br/>
<br/>
   <div className="text-center text-primary" onClick={this.resendotp}>resend otp</div>
            </div>
        )
    }
}

export default Signupotpverification;
