import React from 'react';
import qs from 'query-string';
import axios from 'axios';
import Zoom from 'react-reveal/Zoom'
class Music extends React.Component{

    constructor()
    {
        super();

        this.state=
        {
            songs:[],
            filtersongs:[],
            language:undefined,
            issongexist:undefined
        }
    }

    componentDidMount()
    {
      const skr=qs.parse(this.props.location.search)

      this.setState({language:skr.language})
      axios({
          url:'https://tranquil-bastion-03369.herokuapp.com/findmusicbylanguage',
          method:'POST',
          headers:{'Content-type':'application/json'},
          data:
          {
            language:skr.language
          }
      })

      .then(response=>this.setState({songs:response.data.music}))

      .catch()
    }

    songname=(event)=>{
       
   const name=event.target.value;

  

   axios({
       url:'https://tranquil-bastion-03369.herokuapp.com/findbysongname',
       method:'POST',
       headers:{'Content-type':'application/json'},
       data:
       {
           songname:name
       }
   })

   .then(response=>this.setState({filtersongs:response.data.songnames,issongexist:response.data.issongexist}))

   .catch()

   
    }
   
    render()
    {
        const {songs,language,filtersongs,issongexist}=this.state;
        return(
            <div style={{paddingTop:'80px'}}>
              
                <form className="text-center mt-3 ml-3 mr-3 fixed-top " >
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text">
          <span className="fas fa-search"></span>
      </span>
    </div>
    <input type="text" class="form-control" placeholder="SEARCH FOR YOUR FAVOURITE SONGS"  onChange={this.songname}/>
  </div>
                <br/>
                
                </form>
                
              
            

{filtersongs.length!==0&&issongexist===true?<div className="container-fluid text-center">
          
          {filtersongs.map((item)=>{
      return  <div style={{display:'inline'}}>
<img src={`../songimages/${item.image}`}  className="ml-2 mb-3" alt="NOTHING FOUND" style={{borderRadius:'50px',width:"40px" ,height:"40px"}}/>
      <audio src={`../videos/${item.audiopath}`} controls autoplayloop  className="mt-3 ml-3"  style={{boxShadow:'4px 0px 0px 4px yellow', backgroundColor:'green',color:'yellow',height:'50px'}}></audio>
      
<div style={{color:'white'}}>SONG NAME:{item.songname}</div>
<div style={{color:'white'}}>MUSIC:{item.music}</div>
<div style={{display:'inline',color:'yellow'}}>SINGERS:</div>&nbsp;
{item.singers.map((item)=>{
return <div style={{color:'white',display:'inline'}}>{item}&nbsp;</div>
})}
        <br/>  
          </div>
          })}


      </div>
:songs.length!==0?<div className="container-fluid text-center">
          
{songs.map((item)=>{
return   <Zoom top cascade><div  >
<img src={`../songimages/${item.image}`}  className="ml-2 mb-3" alt="NOTHING FOUND" style={{borderRadius:'50px',width:"40px" ,height:"40px",display:'inline-block'}}/>
<audio src={`../videos/${item.audiopath}`} controls autoplayloop  className="mt-3 ml-3"  style={{boxShadow:'4px 0px 0px 4px yellow', backgroundColor:'green',color:'yellow',height:'50px'}}></audio>

<div style={{color:'white'}}>SONG NAME:{item.songname}</div>
<div style={{color:'white'}}>MUSIC:{item.music}</div>
<div style={{display:'inline',color:'yellow'}}>SINGERS:</div>&nbsp;
{item.singers.map((item)=>{
return <div style={{color:'white',display:'inline'}}>{item}&nbsp;</div>
})}
<br/>  
</div>
</Zoom>
})}


</div>
:<Zoom><div className="mt-3 text-white text-center">SORRY NO SONGS FOUND IN {language} </div></Zoom>}

            </div>
        )
    }
}

export default Music;
