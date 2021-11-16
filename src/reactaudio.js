import React from 'react';
import '@vime/core/themes/default.css';
import axios from 'axios'
import { Player, Audio, DefaultUi} from '@vime/react';
import Zoom from 'react-reveal/Zoom'
import qs from 'query-string'
import 'react-h5-audio-player/lib/styles.css';
class Audios extends React.Component{
    
    constructor()
    {
        super();

        this.state=
        {
            songs:[],
            filtersongs:[],
            language:undefined,
            issongexist:undefined,
            moviesong:[],
            ismovieexist:undefined
          
        }
    }

    componentDidMount()
    {
      
        const skr=qs.parse(this.props.location.search)

        this.setState({language:skr.language})
      axios({
          url:'http://localhost:2077/findmusicbylanguage',
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
          url:'http://localhost:2077/findbymoviename',
          method:'POST',
          headers:{'Content-type':'application/json'},
          data:
          {
            moviename:name
          }
      })
   
      .then(response=>this.setState({moviesong:response.data.moviesongs,ismovieexist:response.data.ismovieexist}))
   
      .catch()
     
        axios({
            url:'http://localhost:2077/findbysongname',
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
      const {songs,language,filtersongs,issongexist,moviesong,ismovieexist}=this.state;
   
        return(
         
            <div style={{paddingTop:'80px'}}>
                 <form className="text-center mt-3 ml-3 mr-3 fixed-top" >
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text">
          <span className="fas fa-search"></span>
      </span>
    </div>
    <input type="text" class="form-control " placeholder="SONG NAMES OR MOVIE NAMES"  onChange={this.songname}/>
  </div>
                <br/>
                
                </form>


                {moviesong.length!==0&&ismovieexist===true?<div className="container-fluid text-center">
          
          {moviesong.map((item)=>{
      return  <div style={{display:'inline'}}>
<img src={`../songimages/${item.image}`}  className="ml-2 mb-3" alt="NOTHING FOUND" style={{borderRadius:'50px',width:"40px" ,height:"40px"}}/>
<Player >
    <Audio crossOrigin="" Poster="../songimages/chellama.jpg">
      <source 
        data-src={`../videos/${item.audiopath}`}

        type="audio/mp3"
      />
      
       
    </Audio>
    <br/>

    {/* We've replaced the `<Ui />` component. */}
    {/* We can turn off any features we don't want via properties. */}
    <DefaultUi noClickToPlay>
      {/* We can place our own UI components here to extend the default UI. */}
    </DefaultUi>
    
  </Player>

  <div style={{color:'white'}}>MOVIE NAME:{item.moviename}</div>
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

:filtersongs.length!==0 && issongexist===true?<div className="container-fluid text-center">
          
{filtersongs.map((item)=>{
return  <Zoom top cascade><div  >
<img src={`../songimages/${item.image}`}  alt="NOTHING FOUND" style={{borderRadius:'50px',width:"40px" ,height:"40px",display:'inline-block'}}/>
<Player>
    <Audio crossOrigin="" Poster="../songimages/chellama.jpg" >
      <source
        data-src={`../videos/${item.audiopath}`}
        
        type="audio/mp3"
      />
      
       
    </Audio>
    <br/>

    {/* We've replaced the `<Ui />` component. */}
    {/* We can turn off any features we don't want via properties. */}
    <DefaultUi noClickToPlay>
      {/* We can place our own UI components here to extend the default UI. */}
    </DefaultUi>
    
  </Player>

  <div style={{color:'white'}}>MOVIE NAME:{item.moviename}</div>
<div style={{color:'white'}}>SONG NAME:{item.songname}</div>
<div style={{color:'white'}}>MUSIC:{item.music}</div>
<div style={{display:'inline',color:'yellow'}}>SINGERS:</div>&nbsp;
{item.singers.map((item)=>{
return <div>
<div style={{color:'white',display:'inline'}}>{item}&nbsp;</div>
<br/> 
</div>
})}
<br/>  
</div>
</Zoom>
})}


</div>

:songs.length!==0?<div className="container-fluid text-center">
          
{songs.map((item)=>{
return  <Zoom top cascade><div  >
<img src={`../songimages/${item.image}`}  alt="NOTHING FOUND" style={{borderRadius:'50px',width:"40px" ,height:"40px",display:'inline-block'}}/>
<Player>
    <Audio crossOrigin="" Poster="../songimages/chellama.jpg" >
      <source
        data-src={`../videos/${item.audiopath}`}
        
        type="audio/mp3"
      />
      
       
    </Audio>
    <br/>

    {/* We've replaced the `<Ui />` component. */}
    {/* We can turn off any features we don't want via properties. */}
    <DefaultUi noClickToPlay>
      {/* We can place our own UI components here to extend the default UI. */}
    </DefaultUi>
    
  </Player>

  <div style={{color:'white'}}>MOVIE NAME:{item.moviename}</div>
<div style={{color:'white'}}>SONG NAME:{item.songname}</div>
<div style={{color:'white'}}>MUSIC:{item.music}</div>
<div style={{display:'inline',color:'yellow'}}>SINGERS:</div>&nbsp;
{item.singers.map((item)=>{
return <div>
<div style={{color:'white',display:'inline'}}>{item}&nbsp;</div>
<br/> 
</div>
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

export default Audios;