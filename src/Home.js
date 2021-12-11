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
            images:[],
            useremail:false,
            myusermail:undefined,
            googleemail:undefined,
            skrmail:undefined,
            emailid:undefined,
            yellanur:undefined,
            requestedmails:undefined,
            atp:undefined,
            mobilenumbers:[],
            ramcharan:undefined,
            valid:undefined,
            validpassword:undefined,
             deactivate:false,
            canwedeactivate:undefined,
            deactivateemail:undefined
    
           
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

    document.getElementById("allubhai").innerHTML="ok";

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


    axios({
        url:'https://tranquil-bastion-03369.herokuapp.com/sendmobilenumbers',
        method:'POST',
        headers:{'Content-type':'application/json'}
      
    })

    .then(response=>this.setState({mobilenumbers:response.data.mobilenumber}))

    .catch(error=>console.log(error));


    axios({
        url:'https://tranquil-bastion-03369.herokuapp.com/sendmails',
        method:'POST',
        headers:{'Content-type':'application/json'}
      
    })

    .then(response=>this.setState({requestedmails:response.data.mailids}))

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

        const {name,userexist,googleemail,password,valid,validpassword}=this.state;


        if(valid===false)
        {
            this.props.history.push('/invalidmail')
        }

        else if(validpassword===false)
        {
            this.props.history.push('/invalidconfirmpassword')
        }

       else if(userexist===false)
        {
           
    // eslint-disable-next-line
            {userexist===false?this.props.history.push(`/signupotp/?email=${googleemail}&&password=${password}&&mobilenumber=${name}`):this.props.history.push('/invalidlogin')};
            
        }

        else if(userexist===true)
        {
            alert("USER WITH THIS MOBILE NUMBER ALREADY EXIST");

            this.props.history.push('/invalidlogin');
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

        .then(response=>this.setState({isvaliduser:response.data.login,username:response.data.userdetails.map((item)=>{return item.mobilenumber})}))

        .catch(error=>console.log(error))

    }

    forgot=()=>{
this.setState({useremail:true,login:false})
    }

    telugu=()=>{

        this.props.history.push('/audio/?language=TELUGU')
    }

    hindi=()=>{

        this.props.history.push('/audio/?language=HINDI')
    }

    tamil=()=>{

        this.props.history.push('/audio/?language=TAMIL')
    }

    malayalam=()=>{

        this.props.history.push('/audio/?language=MALAYALAM')
    }

    kannada=()=>{

        this.props.history.push('/audio/?language=KANNADA')
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
        const {notificationmessage,attachments,mails,ramcharan}=this.state;
        axios({
            url:'https://tranquil-bastion-03369.herokuapp.com/notifications',
            method:'POST',
            headers:{'Content-type':'application/json'},
            data:
            {
                mobilenumber:ramcharan,
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
        document.getElementById("hemanth").style.color="black";
    }

    songsrequest=()=>{

        const {youremail,moviename,songname,languageselection,emailid}=this.state;
this.props.history.push(`/songrequest/?email=${youremail}&&moviename=${moviename}&&songname=${songname}&&language=${languageselection}&&emailid=${emailid}`)
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
        const {yellanur,atp}=this.state;
        axios({
            url:'https://tranquil-bastion-03369.herokuapp.com/requestedsongnotification',
            method:'POST',
            headers:{'Content-type':'application/json'},
            data:
            {
                mails:yellanur,
                email:atp
            }
        })

        this.props.history.push('/thankyouss')
 
    }

   pushpa=()=>{
       this.props.history.push('/audio')
   }

   emailclose=()=>{
       this.setState({useremail:false})
   }

   usermail=(event)=>{
       const usermail=event.target.value;
       this.setState({myusermail:usermail})
   }

   forgotpassword=()=>{

    const {myusermail,skrmail}=this.state;

   this.props.history.push(`/forgot/?useremail=${myusermail}&&mymail=${skrmail}`)

   }

   UKP=(event)=>{
 const googleemail=event.target.value;
 this.setState({googleemail:googleemail})


 axios({
    url:`https://verify.gmass.co/verify?email=${googleemail}&key=a8fe3531-66bf-4de0-8fc7-feec0688775a`,
    method:'get'

 })
 
 .then(response =>this.setState({valid:response.data.Valid}))
 .catch(error => {
  console.log(error);
 })

 
}

   SKRMAIL=(event)=>{

    const skrmail=event.target.value;

    this.setState({skrmail:skrmail})

   }

   EMAILID=(event)=>{

    const emailid=event.target.value;

    this.setState({emailid:emailid})

   }

   zensark=(event)=>{
const {songsrequestedmails,requestedmails}=this.state;

    const zen=event.target.value;

   this.setState({yellanur:songsrequestedmails[zen],atp:requestedmails[zen]})
   

   }

   rrr=(event)=>{
       const {mobilenumbers}=this.state;
 const ntr=event.target.value;

 this.setState({ramcharan:mobilenumbers[ntr]})

   }

   pleasesignup=()=>{
       this.setState({signup:true})
   }

   pleaselogin=()=>{
       this.setState({login:true})
   }

   confirms=(event)=>{
       const {password}=this.state;

       const confirmpassword=event.target.value;

       if(password===confirmpassword)
       {
           this.setState({validpassword:true})
       }
       else if(password !== confirmpassword)
       {
        this.setState({validpassword:false})
       }
       


   }
      
       deactivate=()=>{
this.setState({deactivate:true})
   }

   
deactivateclose=()=>{
    this.setState({deactivate:false})
}

emailuser=(event)=>{
    const deactivateemail=event.target.value;

    this.setState({deactivateemail:deactivateemail})

    axios({
        url:'https://tranquil-bastion-03369.herokuapp.com/deactivateemail',
        method:'POST',
        headers:{'Content-type':'application/json'},
        data:
        {
            email:deactivateemail
        }
    })

    .then(response=>this.setState({canwedeactivate:response.data.canwedeactivate}))

    .catch()
}

netfair=()=>{

    const {canwedeactivate,deactivateemail}=this.state;

    if(canwedeactivate===true)
    {
        this.props.history.push(`/deactivatechecking/?email=${deactivateemail}`)
    }

    else if(canwedeactivate===false)
    {
        this.props.history.push('/invalidemail')
    }

}

    render()
    {
        const {validpassword,deactivate, valid, useremail,help,images,lakshmi,requestedsongs,isadminverified,admin,notification,signup,login,facebookusername,facebookuserimage,googleuserimage,googleusername,isvaliduser,username}=this.state;
      
        return(
        <div>
         <audio src="videos/jabili.mp4" className="hemanth" controls autoPlay loop id="allubhai"/>
           <nav className="navbar navbar-expand-md-sm-lg bg-success navbar-dark">
           {username!==undefined?<div style={{display:'inline'}} className="mr-2 text-white">{username}</div>:googleusername!==undefined?<div>
           <img src={googleuserimage} width="30px" height="30px" alt="nothing found" style={{borderRadius:'50px',textAlign:'left'}} className="mr-3"/>
               <div style={{display:'inline'}} className="mr-2 pt-1 text-white">{googleusername}</div>
               </div>
               :facebookusername!==undefined?
               <div>
                   <img src={facebookuserimage} width="30px" height="30px" alt="nothing found" style={{borderRadius:'50px',textAlign:'left'}} className="mr-3"/>
                   <div style={{display:'inline'}} className="mr-2 pt-1 text-white ">{facebookusername}</div>
               </div>
           :<Bounce bottom cascade><img src="songimages/companylogo.png" className="mr-3" alt="Nothing Found" style={{textAlign:'left',borderRadius:'50px'}} width="50px" height="50px"/></Bounce>}
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span className="navbar-toggler-icon"></span>
  </button>


  <div className="collapse navbar-collapse" id="collapsibleNavbar">
    <ul className="navbar-nav">
      <li className="nav-item pt-3 bujala" style={{textAlign:'right'}}>
      <Zoom left cascade><div style={{display:'inline'}} className="text-white" onClick={this.admin}>ADMIN</div></Zoom>
      </li>
    
    
            
              
                
             
            
               {googleusername===undefined &&facebookusername===undefined &&username===undefined?  <li className="nav-item pt-3 bujala" style={{textAlign:'right'}}><div style={{display:'inline'}} className="text-white pr-1" onClick={this.login}>Login</div></li>
 
               : <li className="nav-item pt-3 bujala" style={{textAlign:'right'}}><div className="text-white" style={{display:'inline'}} onClick={this.logout}>Logout</div></li>
                }


<li className="nav-item pt-3 bujala" style={{textAlign:'right'}}><div className="text-white" style={{display:'inline'}} onClick={this.skr}>Signup</div></li>  
      
       <li className="nav-item pt-3 bujala" style={{textAlign:'right'}}><div className="text-white" style={{display:'inline'}} onClick={this.deactivate}>Deactivate Account</div></li>  
        
                </ul>
  </div>
</nav>
         
            <Modal
          isOpen={signup}
            style={customStyles} 
            >
                 <div style={{textAlign:'right'}} onClick={this.close}>close</div>
         <div className="text-center pb-2 text-primary">Signup Form</div>
        <form className="text-center" onSubmit={this.signup}>
    <input type="email" name="myemail" placeholder="E-MAIL ADDRESS"   onChange={this.UKP}required/>
    {valid===true?<div style={{display:'inline'}}>&nbsp;&#10004;</div>:valid===false?<div style={{display:'inline'}}>&nbsp;&#10060;</div>:null}
    <br/><br/>  
    <input type="tel" name="email" pattern="[0-9]{10}" placeholder="MOBILE NUMBER" maxLength='10'  onChange={this.name}required/><br/><br/>
   <input type="Password" name="Pass" placeholder="PASSWORD" onChange={this.password} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required/><br/><br/>
   <input type="password" name="confirm password" placeholder="CONFIRM PASSWORD" onChange={this.confirms} required/>
   {validpassword===true?<div style={{display:'inline'}}>&nbsp;&#10004;</div>:validpassword===false?<div style={{display:'inline'}}>&nbsp;&#10060;</div>:null}
   <br/>
   <br/>
<br/>

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
    <input type="tel" name="email" placeholder="MOBILE NUMBER" pattern="[0-9]{10}" maxLength='10' onChange={this.names} required/><br/><br/>
    <input type="password" name="pass" placeholder="Password" onChange={this.pass} required/>&nbsp;&nbsp;
    {isvaliduser===true?<div style={{display:'inline'}}>&#10004;</div>:isvaliduser===false?<div style={{display:'inline'}}>&#10060;</div>:null}
    <br/><br/>
    <button className="btn btn-success btn-sm">Submit</button><br/>
    <div onClick={this.forgot} className="btn btn-link">Forgot Password</div><br/><br/>
                </form>

            </Modal>


            <Modal
          isOpen={useremail}
            style={customStyles}
            >
                 
                 <div style={{textAlign:'right'}} onClick={this.emailclose}>close</div>
        <form className="text-center" onSubmit={this.forgotpassword}>
     
<br/>
<input type="email" name="youremail" placeholder="E-MAIL ADDRESS"  onChange={this.SKRMAIL} required/><br/><br/>

    <input type="tel" name="useremail" pattern="[0-9]{10}" placeholder="MOBILE NUMBER" maxLength='10' onChange={this.usermail} required/><br/><br/>
    <button className="btn btn-success btn-sm">Submit</button><br/>
       </form>
              
            </Modal>


      {isadminverified===true?<Modal
          isOpen={notification}
            style={customStyles}
            >
                 
                 <div style={{textAlign:'right'}} onClick={this.notificationclose}>close</div>
        <form className="text-center" onSubmit={this.notification}>
     
<br/>
 <input type="number" name="mobilenumbers" min="0" max="1000000000" onChange={this.rrr}/><br/><br/>
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
          isOpen={deactivate}
            style={customStyles}
            >
                 
                 <div style={{textAlign:'right'}} onClick={this.deactivateclose}>close</div>
        <form className="text-center">
     
<br/>
<div className="text-center text-success">ADMIN</div>
<br/>
    <input type="email" name="useremail" placeholder="EMAIL ADDRESS" onChange={this.emailuser} required/><br/><br/>
    <div className="btn btn-success" onClick={this.netfair}>submit</div>
    
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
<input type="number" name="count" min="0" max="1000000" onChange={this.zensark}/><br/><br/>
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
<input type="email" name="emails" id="saraths" placeholder="EMAIL ADDRESS"  required onChange={this.EMAILID} className="pt-1 pb-1"/><br/><br/>
<input type="tel" name="email" id="sarath" pattern="[0-9]{10}" placeholder="MOBILE NUMBER"  maxLength='10' required onClick={this.fuck} className="pt-1 pb-1" onChange={this.youremail} /><br/><br/>
    
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

     
            <Carousel showThumbs={false} showIndicators={false} infiniteLoop={true} autoPlay={true}>
  
         {images.length!==0?images.map((item)=>{
             return <div>
             <img src={`songimages/${item.imagename}`} className="rmr" alt="Nothing Found"   />
             <p className="legend">{item.imagetitle}</p>
         </div>
         }):null}
              
</Carousel>

 {username!==undefined|| googleusername!==undefined || facebookusername!==undefined?<div  style={{textAlign:'right'}} className="mt-3">
    
          <div style={{display:'inline',fontStyle:'italic',fontSize:'14px',fontFamily:'cursive'}} className="mr-3 text-white" onClick={this.requestedsongs}>ADMIN</div>
          
     <div style={{display:'inline',fontStyle:'italic',fontSize:'14px',fontFamily:'cursive'}} className="mr-3 mt-3 text-white srh"  onClick={this.help}>REQUEST ANY SONG</div>
     </div>:null}
<br/>
     {username!==undefined|| googleusername!==undefined || facebookusername!==undefined?<div>
     <div className="mt-3 text-center" style={{color:'white',fontStyle:'italic',fontSize:'18px',fontFamily:'serif'}} >SELECT YOUR FAVOURITE LANGUAGE</div>
<br/>
            <div className="text-center">
                <div style={{display:'inline',color:'yellow',fontFamily:'cursive',fontStyle:'italic',fontSize:'14px'}} onClick={this.telugu}>TELUGU</div>&nbsp;&nbsp;
                <div style={{display:'inline',color:'yellow',fontFamily:'cursive',fontStyle:'italic',fontSize:'14px'}} onClick={this.hindi}>HINDI</div>
            </div>
            <br/>
            <div className="text-center">
                <div style={{display:'inline',color:'yellow',fontFamily:'cursive',fontStyle:'italic',fontSize:'14px'}} onClick={this.tamil}>TAMIL</div>&nbsp;&nbsp;
                <div style={{display:'inline',color:'yellow',fontFamily:'cursive',fontStyle:'italic',fontSize:'14px'}} onClick={this.malayalam}>MALAYALAM</div><br/><br/>
                <div style={{display:'inline',color:'yellow',fontFamily:'cursive',fontStyle:'italic',fontSize:'14px'}} className="text-center" onClick={this.kannada}>KANNADA</div>
            </div>
            </div>:<div>
                <br/>
                <br/>
                <br/>
                
                <div className="text-center text-white">Please <div style={{display:'inline',color:'yellow'}} onClick={this.pleasesignup}>Signup</div> or <div style={{display:'inline',color:'yellow'}} onClick={this.pleaselogin} >Login</div> to Listen the songs</div></div>}
            </div>

        )
    }
}

export default Skr;

