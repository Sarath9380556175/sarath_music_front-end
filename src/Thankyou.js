import React from 'react';
import Zoom from 'react-reveal/Zoom';
import qs from 'query-string';
class Thankyou extends React.Component{
    constructor()
    {
        super();
        this.state={
          email:undefined
        }
    }

    componentDidMount()
    {
       const skr=qs.parse(this.props.location.search)

       this.setState({email:skr.email})
    }

    back=()=>{
        const {email}=this.state;
        this.props.history.push(`/home?email=${email}`)
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

export default Thankyou;
