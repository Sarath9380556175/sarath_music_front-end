import React from 'react';
import Zoom from 'react-reveal/Zoom';

class Thank extends React.Component{
    

  

    back=()=>{
        
        this.props.history.push(`/home`)
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

export default Thank;
