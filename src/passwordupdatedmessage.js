
import React from 'react';

class Password extends React.Component{
    fuckoff=()=>{
        this.props.history.push('/home');
    }
   
    render()
    {
        return(
            <div>
                <div className=" mt-3 text-white ml-3" onClick={this.fuckoff}>BACK</div>
            <div className="text-center mt-3 text-primary">
PASSWORD UPDATED SUCCESSFULLY
            </div>
            </div>
        )
    }
}

export default Password;