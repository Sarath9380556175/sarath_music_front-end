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



</BrowserRouter>
            </div>
        )
    }
}

export default Router;