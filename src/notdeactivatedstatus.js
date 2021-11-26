import React from 'react';

class Notdeactivatestatus extends React.Component{

    back=()=>{
        this.props.history.push('/home')
    }
    render()
    {
        return(
            <div>
                <div onClick={this.back} className="mt-3 ml-3 text-success">BACK</div>
   <div className="text-center text-white">YOUR ACCOUNT WAS NOT SUCCESSFULLY DEACTIVATED</div><br/>
   <div className="text-center text-white">THANK YOU</div>
            </div>
        )
    }
}

export default Notdeactivatestatus;
