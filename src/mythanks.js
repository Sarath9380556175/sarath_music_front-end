import React from 'react';
import Zoom from 'react-reveal/Zoom';
class Mythanks extends React.Component{
    
constructor()
{
    super();

    this.state=
    {
        mobilenumber:undefined
    }
}

componentDidMount()
{
  const skr=qs.parse(this.props.location.search);

  this.setState({mobilenumber:skr.mobilenumber})
}

    back=()=>{

        const {mobilenumber}=this.state;

        this.props.history.push(`/home?email=${mobilenumber}`)
    }

    render()
    {
        return(
            <div>
                <div className="text-success ml-3 mt-2" onClick={this.back}>BACK</div>
            <Zoom cascade bottom><div className="mt-3 text-center text-white">
            SUCCESSFULL
        </div></Zoom>
        </div>
        )
    }
}

export default Mythanks;
