import React from 'react';
import axios from 'axios';
class Signup extends React.Component{
    constructor()
    {
        super();
        this.state={
            name:undefined,
            password:undefined,
            userexist:undefined
        }
    }

   
    componentDidMount()
    {
        alert("Welcome to Zensark Technologies");
    }

    componentWillUnmount()
    {
        alert("Thankyou Vist Again!!")
    }

   

    name=(event)=>{
        var name=event.target.value;
    
        this.setState({name:name});

        axios({
            url:'http://localhost:2077/signupcheck',
            method:'POST',
            headers:{'Content-type':'application/json'},
            data:
            {
                name:name
            }
        })

        .then(response=>this.setState({userexist:response.data.userexist}))

        .catch(error=>console.log(error));

    }

    password=(event)=>{
        var password=event.target.value;
        
        this.setState({password:password})

    }

    signup=()=>{

        const {name,password,userexist}=this.state;

        console.log(name);

        if(userexist===false)
        {
            axios({
                url:'http://localhost:2077/signup',
                method:'POST',
                headers:{'Content-Type':'application/json'},
                data:
                {
                    name:name,
                    password:password,
                }
            })
            .then(response=>this.setState({getsignupdetails:response}))
    
            .catch(error=>console.log(error))
    // eslint-disable-next-line
            {userexist===false?this.props.history.push('/thankyou'):this.props.history.push('/thanks')};
        }

        else if(userexist===true)
        {
            alert("User with this name already exist");

            this.props.history.push('/thanks');
        }

       
    
    }
    render()
    {
        return(
            <div>
                <br/>
            
                <div className="text-center pb-2 text-primary">Signup Form</div>
                <form className="text-center" onSubmit={this.signup}>
    <input type="text" name="name" placeholder="NAME" onChange={this.name}/><br/><br/>
   <input type="Password" name="Pass" placeholder="PASSWORD" onChange={this.password}/><br/><br/>
    <button className="btn btn-success btn-sm">Submit</button>
                </form>
            </div>
        )
    }
}

export default Signup;