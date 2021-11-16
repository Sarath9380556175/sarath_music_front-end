import axios from 'axios';
import React from 'react';
import qs from 'query-string'

class Forgot extends React.Component{
    constructor()
    {
        super();
        this.state=
        {
            isotpvalid:undefined,
            email:undefined,
            mail:undefined,
            otp:undefined
        }
    }

    componentDidMount()
    {
const skr=qs.parse(this.props.location.search)
this.setState({email:skr.useremail,mail:skr.mymail})

const otp = Math.floor(1000 + Math.random() * 9000);
var options = {
    method: 'POST',
    url: 'https://sms77io.p.rapidapi.com/sms',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'x-rapidapi-host': 'sms77io.p.rapidapi.com',
      'x-rapidapi-key': '72203f99d0msh2f36949da9383c8p13ad7cjsn8de13c368bb7'
    },
    data: {
      to: '+919380556175',
      p: 'euzYrVA7HkCbnnAJQR9AzxzfwPO4JYGw',
      text:`OTP for forgot password is:${otp}`
    }
  };
  
  axios.request(options).then(function (response) {
      console.log(response.data);
  }).catch(function (error) {
      console.error(error);
  });
  


  
  

axios({
    url:'https://tranquil-bastion-03369.herokuapp.com/forgot',
    method:'POST',
    headers:{'Content-type':'application/json'},
    data:
    {
       
       skr:skr.useremail,
       useremail:skr.mymail
    }
})

    }

    otpinput=(event)=>{

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

    }

    skr=()=>{
        const {isotpvalid,email,otp}=this.state;

    if(isotpvalid===true)
    {
        this.props.history.push(`/newpassword/?email=${email}&&otp=${otp}`)
    }
    else if(isotpvalid===false){
        alert("OTP IS INVALID");
    }
    }

    resend=()=>{

        const {email,mail}=this.state;

        axios({
            url:'https://tranquil-bastion-03369.herokuapp.com/forgot',
            method:'POST',
            headers:{'Content-type':'application/json'},
            data:
            {
            
               skr:email,
               useremail:mail
            }
        })

    }
    render()
    {
        return(
            <div>
                <form className="text-center" >
                <input type="password" maxLength="6" placeholder="OTP" required className="mt-3 pl-3" onChange={this.otpinput}/><br/><br/>
                <div className="btn btn-success pl-3 pr-3" onClick={this.skr}>OK</div><br/><br/>
                <div className="text-white" style={{fontStyle:'revert'}} onClick={this.resend}>resend otp</div>
                </form>
 
            </div>
        )
    }
}

export default Forgot;
