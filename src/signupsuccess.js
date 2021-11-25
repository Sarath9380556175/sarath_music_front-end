import React from 'react';
import Zoom from 'react-reveal/Zoom';
import axios  from 'axios';
import qs from 'query-string'
class Signupsuccess extends React.Component{
    
componentDidMount()
{

    const kkr=qs.parse(this.props.location.search)
    axios({
        url:'https://tranquil-bastion-03369.herokuapp.com/signup',
        method:'POST',
        headers:{'Content-type':'application/json'},
        data:
        {
            email:kkr.mobilenumber,
            useremail:kkr.email,
            password:kkr.password
        }
    })

    .then(response=>this.setState({getsignupdetails:response}))
    
            .catch(error=>console.log(error))



            axios({
                url:'https://tranquil-bastion-03369.herokuapp.com/deleteotp',
                method:'POST',
                headers:{'Content-type':'application/json'},
                data:
                {
                    otp:kkr.otp
                }
            })

            .then(response=>this.setState({deletedotpdetails:response}))
    
            .catch(error=>console.log(error))

}
  
    back=()=>{
        
        this.props.history.push(`/home`)
    }
    render()
    {
        return(
            <div>
                <div className="mt-3 ml-2 text-success" onClick={this.back}>BACK</div>
<Zoom cascade bottom><div className="mt-3 text-center text-white">
                Successfull
            </div></Zoom>
            </div>
            

        )
    }
}

export default Signupsuccess;
