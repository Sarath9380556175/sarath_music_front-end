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
                <img src="songimages/companylogo.png" className="fixed-top fuck" width="100%" height="630px" alt="Nothing Found"/>
            </div>
        )
    }
}

export default Page;