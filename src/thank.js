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
                <div className="mt-3 ml-2 text-white" onClick={this.back}>BACK</div>
<Zoom cascade bottom><div className="mt-3 text-center" style={{color:'yellow'}}>
                Successfull
            </div></Zoom>
            </div>
            

        )
    }
}

export default Thank;
