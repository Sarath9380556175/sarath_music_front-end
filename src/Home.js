import React from 'react';
import './Home.css';
import Modal from 'react-modal';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import Zoom from 'react-reveal/Zoom'
import Bounce from 'react-reveal/Bounce'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
 
 import qs from 'query-string';
const customStyles = {
      
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'

      
    
    
  };
  

  
class Skr extends React.Component{
    constructor()
    {
        super();

        this.state={
            signup:false,
            name:undefined,
            password:undefined,
            userexist:undefined,
            login:false,
            isvaliduser:undefined,
            facebookusername:undefined,
            facebookuserimage:undefined,
            googleusername:undefined,
            googleuserimage:undefined,
            googleuserloogedin:false,
            names:undefined,
            username:undefined,
            adminusername:undefined,
            notification:false,
            notificationmessage:undefined,
            isadminverified:undefined,
            admin:false,
            mails:[],
            attachments:[],
            help:false,
            youremail:undefined,
            songname:undefined,
            moviename:undefined,
            languageselection:undefined,
            songsrequestedmails:[],
            requestedsongs:false,
            lakshmi:false,
           images:[]

        }
    }
componentDidMount()
{
    const skr=qs.parse(this.props.location.search)

    this.setState({username:skr.email})

    axios({
        url:'https://tranquil-bastion-03369.herokuapp.com/mails',
        method:'POST',
        headers:{'Content-type':'application/json'}
    })

    .then(response=>this.setState({mails:response.data.mail}))

    .catch(error=>console.log(error));

 axios({
        url:'https://tranquil-bastion-03369.herokuapp.com/images',
        method:'POST',
        headers:{'Content-type':'application/json'}
    })

    .then(response=>this.setState({images:response.data.images}))

    .catch(error=>console.log(error));



    axios({
        url:'https://tranquil-bastion-03369.herokuapp.com/songsrequestedmails',
        method:'POST',
        headers:{'Content-type':'application/json'}
    })

    .then(response=>this.setState({songsrequestedmails:response.data.mails}))

    .catch(error=>console.log(error));

}


    skr=()=>{
       
        this.setState({signup:true})
    }

    name=(event)=>{
        var name=event.target.value;
    
        this.setState({name:name});

        axios({
            url:'https://tranquil-bastion-03369.herokuapp.com/signupcheck',
            method:'POST',
            headers:{'Content-type':'application/json'},
            data:
            {
                email:name
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

        if(userexist===false)
        {
            axios({
                url:'https://tranquil-bastion-03369.herokuapp.com/signup',
                method:'POST',
                headers:{'Content-Type':'application/json'},
                data:
                {
                    email:name,
                    password:password,
                }
            })
            .then(response=>this.setState({getsignupdetails:response}))
    
            .catch(error=>console.log(error))
    // eslint-disable-next-line
            {userexist===false?this.props.history.push('/thank'):this.props.history.push('/thanks')};
        }

        else if(userexist===true)
        {
            alert("USER WITH THIS E-MAIL ALREADY EXIST");

            this.props.history.push('/thanks');
        }

       
    
    }

    close=()=>{
        this.setState({signup:false});
    }

    login=()=>{
this.setState({login:true})
    }

    closed=()=>{
        this.setState({login:false})
    }

    names=(event)=>{
        const names=event.target.value;

      this.setState({names:names})

      localStorage.setItem('useremail',names)
    
    }

    logins=()=>{
        const {isvaliduser,username}=this.state;

       if(isvaliduser===true)
       {
        this.props.history.push(`/thankyou/?email=${username}`);
       }
       else if(isvaliduser===false)
       {
        this.props.history.push(`/thanks`);
       }

}

responseGoogle=(response)=>{
    this.setState({googleusername:response.profileObj.name,googleuserimage:response.profileObj.imageUrl,login:false,googleuserloogedin:true})
}



responseFacebook=(response)=>{
    this.setState({facebookusername:response.name,facebookuserimage:response.picture.data.url,login:false})
    }

    logout=()=>{
        this.setState({googleusername:undefined,username:undefined,googleuserimage:undefined,facebookusername:undefined,facebookuserimage:undefined})
    }

    pass=(event)=>{
        const {names}=this.state;
        const password=event.target.value;

        axios({
            url:'https://tranquil-bastion-03369.herokuapp.com/login',
            method:'POST',
            headers:{'Content-type':'application/json'},
            data:
            {
                email:names,
                password:password
            }
        })

        .then(response=>this.setState({isvaliduser:response.data.login,username:response.data.userdetails.map((item)=>{return item.email})}))

        .catch(error=>console.log(error))

    }

    forgot=()=>{
const email=localStorage.getItem('useremail');



axios({
    url:'https://tranquil-bastion-03369.herokuapp.com/forgot',
    method:'POST',
    headers:{'Content-type':'application/json'},
    data:
    {
       email:email
    }
})

this.props.history.push('/forgot')


    }

    telugu=()=>{

        this.props.history.push('/music/?language=TELUGU')
    }

    hindi=()=>{

        this.props.history.push('/music/?language=HINDI')
    }

    tamil=()=>{

        this.props.history.push('/music/?language=TAMIL')
    }

    malayalam=()=>{

        this.props.history.push('/music/?language=MALAYALAM')
    }

    kannada=()=>{

        this.props.history.push('/music/?language=KANNADA')
    }

    admin=()=>{

        this.setState({admin:true})
      
    }
    notice=(event)=>{
        const notifications=event.target.value;

        this.setState({notificationmessage:notifications})
    }

    attachment=(event)=>{

        const attachments=event.target.value;

      

        this.setState({attachments:attachments})

    }
    notification=()=>{
        const {mails,notificationmessage,attachments}=this.state;
        axios({
            url:'https://tranquil-bastion-03369.herokuapp.com/notifications',
            method:'POST',
            headers:{'Content-type':'application/json'},
            data:
            {
                mails:mails,
                notification:notificationmessage,
                image:attachments
            }
        })

        this.props.history.push('/notification')

    }

    notificationclose=()=>{
        this.setState({notification:false})
    }

    adminusername=(event)=>{

        const adminusername=event.target.value;
        this.setState({adminusername:adminusername})


    }

    adminpassword=(event)=>{
        const {adminusername}=this.state;
const adminpassword=event.target.value;

axios({
    url:'https://tranquil-bastion-03369.herokuapp.com/admin',
    method:'POST',
    headers:{'Content-type':'application/json'},
    data:
    {
        username:adminusername,
        password:adminpassword
    }
})

.then(response=>this.setState({isadminverified:response.data.isadminverified}))


    }

   

    adminclose=()=>{
        this.setState({admin:false})
    }

    tkr=()=>{
        const {isadminverified}=this.state;

        if(isadminverified===true)
        {
            this.setState({notification:isadminverified,admin:false})
        }

    else if(isadminverified===false)
    {
        this.setState({notification:isadminverified})
        alert('INVALID ADMIN DETAILS')
    }

      
    }

    ramana=()=>{

        const {isadminverified}=this.state;

        if(isadminverified===true)
        {
            this.setState({lakshmi:isadminverified,requestedsongs:false})
        }

    else if(isadminverified===false)
    {
        this.setState({lakshmi:isadminverified})
        alert('INVALID ADMIN DETAILS')
    }

    }

    help=()=>{
        this.setState({help:true})
    }

    helpclose=()=>{
        this.setState({help:false})
    }

    youremail=(event)=>{
        const youremail=event.target.value;
        console.log(youremail)
        this.setState({youremail:youremail})

    }

    moviename=(event)=>{
const moviename=event.target.value;
console.log(moviename)
this.setState({moviename:moviename})
    }

    songname=(event)=>{
const songname=event.target.value;
console.log(songname)
this.setState({songname:songname})
    }

    languageselection=(event)=>{
     const languageselection=event.target.value;
    this.setState({languageselection:languageselection})
    }

    fuck=()=>{
        document.getElementById("sarath").style.border="3px solid orange";
        document.getElementById("sarath").style.color="green";
    }

    ukp=()=>{
        document.getElementById("tarun").style.border="3px solid blue";
        document.getElementById("tarun").style.color="black";
    }

    mkp=()=>{
        document.getElementById("hemanth").style.border="3px solid green";
        document.getElementById("hemanth").style.color="yellow";
    }

    songsrequest=()=>{

        const {youremail,moviename,songname,languageselection}=this.state;
this.props.history.push(`/songrequest/?email=${youremail}&&moviename=${moviename}&&songname=${songname}&&language=${languageselection}`)
    }

    requestedsongs=()=>{
        this.setState({requestedsongs:true})
    }
    requestedclose=()=>{
        this.setState({requestedsongs:false})
    }

    requested=()=>{
        this.setState({lakshmi:false})
    }
    bujala=()=>{
        const {songsrequestedmails}=this.state;
        axios({
            url:'https://tranquil-bastion-03369.herokuapp.com/requestedsongnotification',
            method:'POST',
            headers:{'Content-type':'application/json'},
            data:
            {
                mails:songsrequestedmails
            }
        })

        this.props.history.push('/thankyouss')
 
    }
    render()
    {
        const {help,images,lakshmi,requestedsongs,isadminverified,admin,notification,signup,login,facebookusername,facebookuserimage,googleuserimage,googleusername,isvaliduser,username}=this.state;
      
        return(
        <div>
         
        <div className="skr" style={{textAlign:'center'}}>
        <Bounce bottom cascade><img src="songimages/companylogo.png" className="mr-3" alt="Nothing Found" style={{textAlign:'left',borderRadius:'50px'}} width="50px" height="50px"/></Bounce>
        </div>

           <div className="skr" style={{textAlign:'right'}}>
          
        
            <Zoom left cascade><div style={{display:'inline'}} className="mr-3 " onClick={this.admin}>ADMIN</div></Zoom>
            
                {username===undefined?null:<div style={{display:'inline'}} className="mr-3">{username}</div>}
                {googleusername===undefined?null:<div style={{display:'inline'}} className="mr-3">{googleusername}</div>}
                {googleuserimage===undefined?null:<img src={googleuserimage} width="30px" height="30px" alt="nothing found" style={{borderRadius:'50px',textAlign:'left'}} className="mr-3"/>}
            {facebookusername===undefined?null:<div style={{display:'inline'}} className="mr-3">{facebookusername}</div>}
            {facebookuserimage===undefined?null:<img src={facebookuserimage} width="30px" height="30px" alt="nothing found" style={{borderRadius:'50px',textAlign:'left'}} className="mr-3"/>}
               
               {googleusername===undefined &&facebookusername===undefined &&username===undefined?<div style={{display:'inline'}} className="mr-3 " onClick={this.login}>Login</div>
 
               :<div className="text-center mr-2" style={{display:'inline'}} onClick={this.logout}>Logout</div>
                }


                <div className="text-center mr-2" style={{display:'inline'}} onClick={this.skr}>Signup</div>  
            </div>
           
            <Modal
          isOpen={signup}
            style={customStyles} 
            >
                 <div style={{textAlign:'right'}} onClick={this.close}>close</div>
         <div className="text-center pb-2 text-primary">Signup Form</div>
        <form className="text-center" onSubmit={this.signup}>
           
    <input type="email" name="email" placeholder="E-MAIl" onChange={this.name} required/><br/><br/>
   <input type="Password" name="Pass" placeholder="PASSWORD" onChange={this.password} required/><br/><br/>
    <button className="btn btn-success btn-sm">Submit</button>
                </form>

            </Modal>


            <Modal
          isOpen={login}
            style={customStyles}
            >
                 
                 <div style={{textAlign:'right'}} onClick={this.closed}>close</div>
        <form className="text-center" onSubmit={this.logins}>
        <GoogleLogin
                clientId="336603315194-94ji26ii9qsm0uvfbocv0j7v95bpitms.apps.googleusercontent.com"
    buttonText="Login with Google"
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
    cookiePolicy={'single_host_origin'}
               />
                <br/>
                <br/>
              

<FacebookLogin
    appId="150776153820438"
    fields="name,email,picture"
    callback={this.responseFacebook} 
/>
<br/>
<br/>
<div className="text-center pb-2 text-primary">Login Form</div>
    <input type="email" name="email" placeholder="E-MAIL" onChange={this.names} required/><br/><br/>
    <input type="password" name="pass" placeholder="Password" onChange={this.pass} required/>&nbsp;&nbsp;
    {isvaliduser===true?<div style={{display:'inline'}}>&#10004;</div>:null}
    <br/><br/>
    <button className="btn btn-success btn-sm">Submit</button><br/>
    <div onClick={this.forgot} className="btn btn-link">Forgot Password</div><br/><br/>
                </form>
              
            </Modal>

      {isadminverified===true?<Modal
          isOpen={notification}
            style={customStyles}
            >
                 
                 <div style={{textAlign:'right'}} onClick={this.notificationclose}>close</div>
        <form className="text-center" onSubmit={this.notification}>
     
<br/>
    <input type="text" name="notification" placeholder="NOTIFICATION" onChange={this.notice} required/><br/><br/>
    <input type="text" name="attachments" placeholder="ATTAACHMENTS" onChange={this.attachment} required/><br/><br/>
  
    
    <button className="btn btn-success btn-sm">Submit</button><br/>
       </form>
              
            </Modal>

      :null}
          

          


            <Modal
          isOpen={admin}
            style={customStyles}
            >
                 
                 <div style={{textAlign:'right'}} onClick={this.adminclose}>close</div>
        <form className="text-center">
     
<br/>
<div className="text-center text-success">ADMIN</div>
<br/>
    <input type="text" name="username" placeholder="ADMIN" onChange={this.adminusername} required/><br/><br/>
    <input type="text" name="password" placeholder="PASSWORD" onChange={this.adminpassword} required/><br/><br/>
    <div className="btn btn-success" onClick={this.tkr}>submit</div>
    
       </form>
              
            </Modal>



            <Modal
          isOpen={requestedsongs}
            style={customStyles}
            >
                 
                 <div style={{textAlign:'right'}} onClick={this.requestedclose}>close</div>
        <form className="text-center">
     
<br/>
<div className="text-center text-success">ADMIN</div>
<br/>
    <input type="text" name="username" placeholder="ADMIN" onChange={this.adminusername} required/><br/><br/>
    <input type="text" name="password" placeholder="PASSWORD" onChange={this.adminpassword} required/><br/><br/>
    <div className="btn btn-success" onClick={this.ramana}>submit</div>
    
       </form>
              
            </Modal>




            <Modal
          isOpen={lakshmi}
            style={customStyles}
            >
                 
                 <div style={{textAlign:'right'}} onClick={this.requested}>close</div>
        <form className="text-center">
     
<br/>
<div className="text-center text-success">UPDATE REQUESTED SONGS</div>
<br/>
    <div className="btn btn-success" onClick={this.bujala}>submit</div>
    
       </form>
              
            </Modal>


          
            <Modal
          isOpen={help}
            style={customStyles}
            >
                 
                 <div style={{textAlign:'right'}} onClick={this.helpclose}>close</div>
        <form className="text-center" onSubmit={this.songsrequest}>
     
<br/>
<div className="text-center text-success">USER REQUESTED SONGS</div>
<br/>
<input type="email" name="email" id="sarath" placeholder="EMAIL ADDRESS" required onClick={this.fuck} className="pt-1 pb-1" onChange={this.youremail} /><br/><br/>
    
<input type="text" name="username" id="tarun" placeholder="MOVIE NAME"  required onClick={this.ukp} className="pt-1 pb-1"  onChange={this.moviename} /><br/><br/>
<input type="text" name="password" id="hemanth" placeholder="SONG NAME" required  onClick={this.mkp} className="pt-1 pb-1"  onChange={this.songname} /><br/><br/>
<select  className="pt-1 pb-1" style={{width:'190px'}}  onChange={this.languageselection}>
    <option selected>LANGUAGE</option>
    <option>TELUGU</option>
    <option>HINDI</option>
    <option>TAMIL</option>
    <option>MALAYALAM</option>
    <option>KANNADA</option>

</select>
<br/>
<br/>
    
    <button className="btn btn-success">submit</button>
    
       </form>
              
            </Modal>

  
            <Carousel showThumbs={false} showIndicators={false}>
  
         {images.length!==0?images.map((item)=>{
             return <div >
             <img src={`songimages/${item.imagename}`} className="rmr" alt="Nothing Found"   />
             <p className="legend">{item.imagetitle}</p>
         </div>
         }):null}
              
</Carousel>



 
            <div  style={{textAlign:'right'}} className="mt-3">
          
        
          <div style={{display:'inline'}} className="mr-3 text-white" onClick={this.requestedsongs}>SONGS</div>
          
     <div style={{display:'inline'}} className="mr-3 mt-3 text-white srh"  onClick={this.help}>HELP</div>
     </div>
            <div className="mt-3 text-center" style={{color:'white'}}>SELECT YOUR FAVOURITE LANGUAGE</div>
<br/>
            <div className="text-center">
                <div style={{display:'inline',color:'yellow'}} onClick={this.telugu}>TELUGU</div>&nbsp;&nbsp;
                <div style={{display:'inline',color:'yellow'}} onClick={this.hindi}>HINDI</div>
            </div>
            <br/>
            <div className="text-center">
                <div style={{display:'inline',color:'yellow'}} onClick={this.tamil}>TAMIL</div>&nbsp;&nbsp;
                <div style={{display:'inline',color:'yellow'}} onClick={this.malayalam}>MALAYALAM</div><br/><br/>
                <div style={{display:'inline',color:'yellow'}} className="text-center" onClick={this.kannada}>KANNADA</div>
            </div>
          
            <br/>
        
            </div>

        )
    }
}

export default Skr;

