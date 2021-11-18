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
            ismovieexist:undefined,
            musicsongs:[],
            isdirectorexist:undefined,
            singersogs:[],
            issingerexist:undefined,
            searchnames:undefined,
            pagecounts:[],
            songnamepagecounts:[],
            moviepagecounts:[],
            musicpagecounts:[],
            singerpagecounts:[]
          
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

      .then(response=>this.setState({songs:response.data.music,pagecounts:response.data.pagecounts}))

      .catch()
    }


  

    
    
    songname=(event)=>{
       
    

        const name=event.target.value;

    
        this.setState({searchnames:name})

     
    }

    search=()=>{

      const {searchnames,language}=this.state;
        axios({
          url:'https://tranquil-bastion-03369.herokuapp.com/findbymoviename',
          method:'POST',
          headers:{'Content-type':'application/json'},
          data:
          {
            moviename:searchnames,
                 language:language
          }
      })
   
      .then(response=>this.setState({moviesong:response.data.moviesongs,ismovieexist:response.data.ismovieexist,moviepagecounts:response.data.pagecounts}))
   
      .catch()
     
        axios({
            url:'https://tranquil-bastion-03369.herokuapp.com/findbysongname',
            method:'POST',
            headers:{'Content-type':'application/json'},
            data:
            {
                songname:searchnames,
                   language:language
            }
        })
     
        .then(response=>this.setState({filtersongs:response.data.songnames,issongexist:response.data.issongexist,songnamepagecounts:response.data.pagecounts}))
     
        .catch()



        axios({
          url:'https://tranquil-bastion-03369.herokuapp.com/findbymusicdirector',
          method:'POST',
          headers:{'Content-type':'application/json'},
          data:
          {
            musicdirector:searchnames,
                 language:language
          }
      })
   
      .then(response=>this.setState({musicsongs:response.data.musicdirector,isdirectorexist:response.data.isdirectorexist,musicpagecounts:response.data.pagecounts}))
   
      .catch()

      axios({
        url:'https://tranquil-bastion-03369.herokuapp.com/findbysinger',
        method:'POST',
        headers:{'Content-type':'application/json'},
        data:
        {
          singername:searchnames,
               language:language
        }
    })
 
    .then(response=>this.setState({singersogs:response.data.singernames,issingerexist:response.data.issingerexist,singerpagecounts:response.data.pagecounts}))
 
    .catch()


   

         }

         skr=(number)=>{

          const {language}=this.state;

         
            axios({
              url:'https://tranquil-bastion-03369.herokuapp.com/findmusicbylanguage',
              method:'POST',
              headers:{'Content-type':'application/json'},
              data:
              {
                language:language,
                page:number
  
              }
          })
    
          .then(response=>this.setState({songs:response.data.music}))

          .catch()
          

          
           
             

          }

        
          songpages=(songpagenumber)=>{
const {searchnames}=this.state;
            axios({
              url:'https://tranquil-bastion-03369.herokuapp.com/findbysongname',
              method:'POST',
              headers:{'Content-type':'application/json'},
              data:
              {
                  songname:searchnames,
                  page:songpagenumber
              }
          })
       
          .then(response=>this.setState({filtersongs:response.data.songnames,issongexist:response.data.issongexist}))
       
          .catch()
            
          }
     

          
          moviepages=(pagenumber)=>{
            const {searchnames}=this.state;
            axios({
              url:'https://tranquil-bastion-03369.herokuapp.com/findbymoviename',
              method:'POST',
              headers:{'Content-type':'application/json'},
              data:
              {
                moviename:searchnames,
                page:pagenumber

              }
          })
       
          .then(response=>this.setState({moviesong:response.data.moviesongs,ismovieexist:response.data.ismovieexist,moviepagecounts:response.data.pagecounts}))
       
          .catch()
                      }
                 

                      
                      
          musicpages=(songpagenumber)=>{
            const {searchnames}=this.state;
                        axios({
                          url:'https://tranquil-bastion-03369.herokuapp.com/findbymusicdirector',
                          method:'POST',
                          headers:{'Content-type':'application/json'},
                          data:
                          {
                            musicdirector:searchnames,
                              page:songpagenumber
                          }
                      })
                   
                      .then(response=>this.setState({musicsongs:response.data.musicdirector,isdirectorexist:response.data.isdirectorexist}))
                   
                      .catch()
                        
                      }
                 

                      
                      
          singerpages=(songpagenumber)=>{
            const {searchnames}=this.state;
                        axios({
                          url:'https://tranquil-bastion-03369.herokuapp.com/findbysinger',
                          method:'POST',
                          headers:{'Content-type':'application/json'},
                          data:
                          {
                            singername:searchnames,
                              page:songpagenumber
                          }
                      })
                   
                      .then(response=>this.setState({singersogs:response.data.singernames,issingerexist:response.data.issingerexist}))
                   
                      .catch()
                        
                      }
                 
            
       
        
    render()
    {
      const { pagecounts,songnamepagecounts,moviepagecounts,musicpagecounts,singerpagecounts, songs,language,filtersongs,issongexist,moviesong,ismovieexist,musicsongs,isdirectorexist,singersogs,issingerexist}=this.state;
   
        return(
         
            <div style={{paddingTop:'80px'}}>
                 <form className="text-center mt-3 ml-3 mr-3 fixed-top" >
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text">
          <span className="fas fa-search" onClick={this.search}></span>
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

:musicsongs.length!==0 && isdirectorexist===true?<div className="container-fluid text-center">
          
{musicsongs.map((item)=>{
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

:singersogs.length!==0 && issingerexist===true?<div className="container-fluid text-center">
          
{singersogs.map((item)=>{
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

<br/>
<div>
    <div className="pagination justify-content-center">
{pagecounts.length!==0 &&songnamepagecounts.length===0 &&moviepagecounts.length===0&&musicpagecounts.length===0&&singerpagecounts.length===0? pagecounts.map(item=>{

    return  <li className="page-item"><p  className="page-link"  style={{display:'inline-block'}} onClick={()=>this.skr(item)}>{item}</p></li>

}) 



:null}

</div>
</div>

<div>
    <div className="pagination justify-content-center">
{songnamepagecounts.length!==0 ? songnamepagecounts.map(item=>{

    return  <li className="page-item"><p  className="page-link"  style={{display:'inline-block'}} onClick={()=>this.songpages(item)}>{item}</p></li>

}) 



:null}

</div>
</div>


<div>
    <div className="pagination justify-content-center">
{moviepagecounts.length!==0 ? moviepagecounts.map(item=>{

    return  <li className="page-item"><p  className="page-link"  style={{display:'inline-block'}} onClick={()=>this.moviepages(item)}>{item}</p></li>

}) 



:null}

</div>
</div>


<div>
    <div className="pagination justify-content-center">
{musicpagecounts.length!==0 ? musicpagecounts.map(item=>{

    return  <li className="page-item"><p  className="page-link"  style={{display:'inline-block'}} onClick={()=>this.musicpages(item)}>{item}</p></li>

}) 



:null}

</div>
</div>


<div>
    <div className="pagination justify-content-center">
{singerpagecounts.length!==0 ? singerpagecounts.map(item=>{

    return  <li className="page-item"><p  className="page-link"  style={{display:'inline-block'}} onClick={()=>this.singerpages(item)}>{item}</p></li>

}) 



:null}

</div>
</div>
    
            </div>
        )
    }
}

export default Audios;
