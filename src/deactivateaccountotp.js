import React from 'react';
import qs from 'query-string';
import axios from 'axios';
class Deactivateotp extends React.Component{

constructor()
{
    super();
    this.state=
    {
        email:undefined,
        otp:undefined,
        isotpvalid:undefined

    }
}

componentDidMount()
{
const skr=qs.parse(this.props.location.search)

this.setState({email:skr.email})

axios({
    url:'https://tranquil-bastion-03369.herokuapp.com/deactivateotpverification',
    method:'POST',
    headers:{'Content-type':'application/json'},
    data:
    {
        email:skr.email
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

    const {isotpvalid,otp,email}=this.state;

    if(isotpvalid===true)
    {
        this.props.history.push(`/deactivatestatus/?otp=${otp}&&email=${email}`)
    }

    else if(isotpvalid===false)
    {
        this.props.history.push('/notdeactivatestatus')
    }
}

resendotp=()=>{

    const {email}=this.state;
    axios({
        url:'https://tranquil-bastion-03369.herokuapp.com/deactivateotpverification',
        method:'POST',
        headers:{'Content-type':'application/json'},
        data:
        {
            email:email
        }
    })

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

export default Deactivateotp;
