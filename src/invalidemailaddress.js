import React from 'react';

class Invalidemail extends React.Component{


    back=()=>{
        this.props.history.push('/home')
    }
    render()
    {
        return(
            <div>
    <div onClick={this.back} className="mt-3 ml-3 text-success">BACK</div>
                <div className="text-white mt-3 text-center">
               INVALID EMAIL ADDRESS PLEASE CHECK THE EMAIL ADDRESS YOU HAVE ENTERED.

               </div>
               <br/>

            <div className="text-white text-center">THANK YOU</div>
            </div>
           
            
        )
    }
}

export default Invalidemail;