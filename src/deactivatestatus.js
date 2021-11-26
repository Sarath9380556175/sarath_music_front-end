import React from 'react';
import axios from 'axios';
import qs from 'query-string'
class Deactivatestatus extends React.Component{

    componentDidMount()
    {
        const kkr=qs.parse(this.props.location.search)

axios({
    url:'http://localhost:2077/deactivateaccount',
    method:'POST',
    headers:{'Content-type':'application/json'},
    data:
    {
        email:kkr.email
    }

    
})

        axios({
            url:'http://localhost:2077/deleteotp',
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
        this.props.history.push('/home')
    }
    render()
    {
        return(
            <div>
                <div onClick={this.back} className="mt-3 ml-3 text-success">BACK</div><br/>
    <div className="text-center text-white">YOUR ACCOUNT WAS SUCCESSFULLY DEACTIVATED</div><br/>
   <div className="text-center text-white">THANK YOU</div>
            </div>
        )
    }
}

export default Deactivatestatus;