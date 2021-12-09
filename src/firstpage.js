import React from 'react';
import '../src/fuck.css';
class Page extends React.Component{
    constructor()
    {
        super();
        this.state=
        {
            time:0
        }
    }

    componentDidMount()
    {
       

      setTimeout(()=>{
       
        
            this.props.history.push('/home')
        

      },5000)

      
    }



    render()
    {
        return(
            <div>
                <img src="songimages/musiclogo.png" className="fixed-top pt-3 pb-3" width="100%" height="100%" alt="Nothing Found"/>
            </div>
        )
    }
}

export default Page;
