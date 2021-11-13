import axios from 'axios';
import React from 'react';
import qs from 'query-string';
class Newpasword extends React.Component{

    constructor()
    {
        super();

        this.state=
        {
            Newpasword:undefined,
              email:undefined

        }
    }
    componentDidMount()
    {
        const otp=sessionStorage.getItem('otp');
        
           const tkr=qs.parse(this.props.location.search)

        this.setState({email:tkr.email})
        
        axios({
            url:'https://tranquil-bastion-03369.herokuapp.com/deleteotp',
            method:'POST',
            headers:{'Content-type':'application/json'},
            data:
            {
                otp:otp
            }
        })

        
    }

    update=()=>{

         const {Newpasword,email}=this.state;


        this.props.history.push(`/passwordupdated/?newpassword=${Newpasword}&&email=${email}`);
    }

    Newpasword=(event)=>{
        const password=event.target.value;

        this.setState({Newpasword:password})

       

    }
    render()
    {
        return(
            <div>
<form className="mt-3 text-center" onSubmit={this.update}>
    <input type="password" name="newpassword" placeholder="NEW PASSWORD" onChange={this.Newpasword}/><br/><br/>
    <button className="btn btn-success btn-sm">UPDATE</button>
</form>
            </div>
        )
    }
}

export default Newpasword;
