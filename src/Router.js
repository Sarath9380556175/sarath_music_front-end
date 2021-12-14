import React from 'react';
import {Route,BrowserRouter} from 'react-router-dom';
import Skr from './Home';
import Signup from './Signup';
import Thankyou from './Thankyou';
import Thanks from './Thanks';
import Forgot from './forgot';
import Newpasword from './newpassword';
import Password from './passwordupdatedmessage';
import Music from './music';
import Thank from './thank';
import Notification from './notificationupdate';
import Email from './emailupdate';
import Page from './firstpage';
import Requestsong from './songrequest';
import Mythanks from './mythanks';
import Audios from './reactaudio';
import Invalidemail from './invalidemailaddress';
import Invalidlogin from './invalidlogin';
import confirmpassword from './confirmpassword';
import Signupotpverification from './signupotpverification';
import Signupsuccess from './signupsuccess';
import Deactivateotp from './deactivateaccountotp';
import Deactivatestatus from './deactivatestatus';
import Notdeactivatestatus from './notdeactivatedstatus';
import Loginotpverification from './loginotpverification';
import Invalidotp from './invalidotp';
class Router extends React.Component{
    render()
    {
        return(
            <div>
<BrowserRouter>
<Route exact path="/" component={Page}/>
<Route exact path="/home" component={Skr}/>
<Route exact path="/signup" component={Signup}/>
<Route exact path="/thankyou" component={Thankyou}/>
<Route exact path="/thanks" component={Thanks}/>
<Route exact path="/forgot" component={Forgot}/>
<Route exact path="/newpassword" component={Newpasword}/>
<Route exact path="/passwordupdated" component={Password}/>
<Route exact path="/music" component={Music}/>
<Route exact path="/thank" component={Thank}/>
<Route exact path="/notification" component={Notification}/>
<Route exact path="/invalidemail" component={Email}/>
<Route exact path="/songrequest" component={Requestsong}/>
<Route exact path="/thankyouss" component={Mythanks}/>
<Route exact path="/audio" component={Audios}/>
<Route exact path="/invalidmail" component={Invalidemail}/>
<Route exact path="/invalidlogin" component={Invalidlogin}/>
<Route exact path="/invalidconfirmpassword" component={confirmpassword}/>
<Route exact path="/signupotp" component={Signupotpverification}/>
<Route exact path="/signupsuccess" component={Signupsuccess}/>
<Route exact path="/deactivatechecking" component={Deactivateotp}/>
<Route exact path="/deactivatestatus" component={Deactivatestatus}/>
<Route exact path="/notdeactivatestatus" component={Notdeactivatestatus}/>
<Route exact path="/loginverification" component={Loginotpverification}/>
<Route exact path="/INVALIDOTP" component={Invalidotp}/>
</BrowserRouter>
            </div>
        )
    }
}

export default Router;
