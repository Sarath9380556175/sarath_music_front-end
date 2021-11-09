import React from 'react';
import Zoom from 'react-reveal/Zoom';
class Mythanks extends React.Component{
    


    back=()=>{
        this.props.history.push('/home')
    }
    render()
    {
        return(
            <div>
                <div className="text-white ml-3 mt-2" onClick={this.back}>BACK</div>
            <Zoom cascade bottom><div className="mt-3 text-center" style={{color:'yellow'}}>
            Successfull
        </div></Zoom>
        </div>
        )
    }
}

export default Mythanks;
