import React from 'react';

class Invalidotp extends React.Component{

    ok=()=>{
this.props.history.push('/home')
    }
    render()
    {
        return(
            <div>
<div className="text-success mt-3 ml-3" onClick={this.ok}>BACK</div><br/>
<div className="mt-3 text-white text-center">
                INVALID OTP CREDENTIALS
            </div>
        
            </div>
        )   
    }
}

export default Invalidotp;