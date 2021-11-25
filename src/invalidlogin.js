import React from 'react';
import Zoom from 'react-reveal/Zoom';
class Invalidlogin extends React.Component{

    back=()=>{
        this.props.history.push('/home')
    }
    render()
    {
        return(
            <div>
                <div className="text-success ml-3 mt-2" onClick={this.back}>BACK</div>
            <Zoom cascade bottom><div className="mt-3 text-center text-white">
            USER WITH THIS MOBILE NUMBER ALREADY EXIST
        </div></Zoom>

        <Zoom cascade bottom><div className="mt-3 text-center text-white">
            PLEASE USE DIFFERENT MOBILE NUMBER
        </div></Zoom>
        </div>
        )
    }
}

export default Invalidlogin;