import React from 'react';

class Email extends React.Component{

    ok=()=>{
this.props.history.push('/home')
    }
    render()
    {
        return(
            <div>
<div className="text-success mt-3 ml-3" onClick={this.ok}>BACK</div><br/>
<div className="mt-3 text-white text-center">
                PLEASE ENTER A VALID EMAIL ADDRESS
            </div>
        
            </div>
        )   
    }
}

export default Email;
