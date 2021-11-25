import React from 'react';

class confirmpassword extends React.Component{

    back=()=>{
        this.props.history.push('/home')
    }
    render()
    {
        return(
            <div>
                <div onClick={this.back} className="mt-3 ml-3 text-white">BACK</div>
      <div className="text-white text-center">PASSWORDS ARE NOT MATCHING PLEASE MATCH THE PASSWORDS</div>
            </div>
        )
    }
}

export default confirmpassword;