import axios from 'axios';
import React from 'react';

class Newpasword extends React.Component{

    constructor()
    {
        super();

        this.state=
        {
            Newpasword:undefined

        }
    }
    componentDidMount()
    {
        const otp=sessionStorage.getItem('otp');
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

        const {Newpasword}=this.state;

        const email=localStorage.getItem('useremail');
        axios({
            url:'https://tranquil-bastion-03369.herokuapp.com/updatepassword',
            method:'POST',
            headers:{'Content-type':'application/json'},
            data:
            {
                email:email,
                password:Newpasword
            }
        })

        this.props.history.push('/passwordupdated');
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
