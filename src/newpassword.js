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
            url:'http://localhost:2077/deleteotp',
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
            url:'http://localhost:2077/updatepassword',
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