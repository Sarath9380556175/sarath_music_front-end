import React from 'react';

class Notification extends React.Component{

    back=()=>{
        this.props.history.push('/home')
    }
    render()
    {
        return(
            <div>
                <div className="mt-3 ml-3 text-white" onClick={this.back}>BACK</div>
                <div className="mt-3 text-center text-white">NOTIFICATION SENT SUCCESSFULLY</div>
            </div>
        )
    }
}

export default Notification;