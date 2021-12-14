import React from 'react';
import qs from 'query-string';
import axios from 'axios';
class Loginotpverification extends React.Component{
    constructor()
    {
        super();

        this.state=
        {
              isotpvalid:undefined,
              mobilenumber:undefined,
              password:undefined,
              otp:undefined,
              emailaddress:undefined
        }
    }

    componentDidMount()
    {
        const skr=qs.parse(this.props.location.search)
        
        this.setState({mobilenumber:skr.email,password:skr.password,emailaddress:skr.loginemail})

        axios({
            url:'https://tranquil-bastion-03369.herokuapp.com/forgot',
            method:'POST',
            headers:{'Content-type':'application/json'},
            data:
            {
               
               skr:skr.email,
               useremail:skr.loginemail
             
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
        const {isotpvalid,mobilenumber,otp,password}=this.state;

    if(isotpvalid===true)
    {
        this.props.history.push(`/thankyou/?mobilenumber=${mobilenumber}&&otp=${otp}&&password=${password}`)
    }
    else if(isotpvalid===false){
       this.props.history.push('/INVALIDOTP')
    }
    }

    resend=()=>{
        const {emailaddress,mobilenumber}=this.state;


        axios({
            url:'https://tranquil-bastion-03369.herokuapp.com/forgot',
            method:'POST',
            headers:{'Content-type':'application/json'},
            data:
            {
               
               skr:mobilenumber,
               useremail:emailaddress
             
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

export default Loginotpverification;
