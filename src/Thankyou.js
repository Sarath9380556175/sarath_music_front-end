import React from 'react';
import Zoom from 'react-reveal/Zoom';
import qs from 'query-string';
import axios from 'axios';
class Thankyou extends React.Component{
    constructor()
    {
        super();
        this.state={
          isvaliduser:undefined,
          username:undefined
        }
    }

    componentDidMount()
    {
       const skr=qs.parse(this.props.location.search)

      
       axios({
        url:'https://tranquil-bastion-03369.herokuapp.com/login',
        method:'POST',
        headers:{'Content-type':'application/json'},
        data:
        {
            email:skr.mobilenumber,
            password:skr.password
        }
    })

    .then(response=>this.setState({isvaliduser:response.data.login,username:response.data.userdetails.map((item)=>{return item.mobilenumber})}))

    .catch(error=>console.log(error))

    axios({
        url:'https://tranquil-bastion-03369.herokuapp.com/deleteotp',
        method:'POST',
        headers:{'Content-type':'application/json'},
        data:
        {
            otp:skr.otp
        }
    })


    }

    back=()=>{
        const {username,isvaliduser}=this.state;


    
        this.props.history.push(`/home?email=${username}&&isreal=${isvaliduser}`)
    }
    render()
    {
        return(
            <div>
                <div className="mt-3 ml-2 text-success" onClick={this.back}>BACK</div>
<Zoom cascade bottom><div className="mt-3 text-center text-white">
SUCCESSFULL
            </div></Zoom>
            </div>
            

        )
    }
}

export default Thankyou;
