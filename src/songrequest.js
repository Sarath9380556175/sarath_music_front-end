import React from 'react';
import qs from 'query-string';
import axios from 'axios';
class Requestsong extends React.Component{
    constructor()
    {
        super();
        this.state=
        {
            
            email:undefined,
            songname:undefined,
            moviename:undefined,
            language:undefined
        }
    }

    componentDidMount()
    {
        const skr=qs.parse(this.props.location.search)


            axios({
                url:'http://localhost:2077/songsrequest',
                method:'POST',
                headers:{'Content-type':'application/json'},
                data:
                {
                    email:skr.email,
                    songname:skr.moviename,
                    moviename:skr.songname,
                    language:skr.language,

                }
            })

            this.setState({email:skr.email,songname:skr.songname,moviename:skr.moviename,language:skr.language})

          
           
    }

    back=()=>{
     
        this.props.history.push('/home');
    }
    render()
    {
        const {email,songname,moviename,language}=this.state;
        return(
            <div>
                <div className="text-white mt-3 ml-3" onClick={this.back}>BACK</div>
{email===undefined||songname===undefined||moviename===undefined||language===undefined?<div className="text-white mt-3 text-center">SORRY!WE ARE UNABLE TO REACH YOU PLEASE SEND YOUR REQUEST AGAIN!!</div>: <div className="text-white mt-3 text-center">SUCCESSFULL OUR TEAM WILL ADD THE REQUESTED SONG FOR YOU THANKYOU</div>}
            </div>
        )
    }
}

export default Requestsong;