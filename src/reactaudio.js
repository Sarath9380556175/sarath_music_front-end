import React from 'react';



 
import  { isWidthUp } from '@material-ui/core/withWidth';



import './Home.css';
import '@vime/core/themes/default.css';
import axios from 'axios'
import { Player, Audio, DefaultUi} from '@vime/react';
import Zoom from 'react-reveal/Zoom'
import qs from 'query-string'
import 'react-h5-audio-player/lib/styles.css';
import SpeechToText from 'speech-to-text';


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
            singerpagecounts:[],
            page:1,
            allsongspagecount:undefined,
            findingsongsbymovienamespagecount:undefined,
            findingsongbysongname:undefined,
            findingsongsbysinger:undefined,
            findsongsbymusicdirector:undefined,
            error: '',
     interimText: '',
    finalisedText: [],
    listening: false,
    languages: 'en-US',
    words:undefined,
    sarathmoviepagecounts:[],
    tarunsongpagecounts:[],
    hemanthmusicpagecounts:[],
    ramanasingerpagecounts:[],
    sarathpagecount:undefined,
    tarunpagecount:undefined,
    hemanthpagecount:undefined,
    ramanapagecount:undefined,
    pages:1,
    songpage:1,
    musicpage:1,
    singerpage:1,
    sarathpage:1,
    tarunpage:1,
    hemanthpage:1,
    ramanapage:1  
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

      .then(response=>this.setState({songs:response.data.music,pagecounts:response.data.pagecounts,allsongspagecount:response.data.pagecount}))

      .catch()

    }


    onAnythingSaid = text => {
      this.setState({ interimText: text });

      this.setState({words:text})

console.log(text)

      const {language}=this.state;
      axios({
        url:'https://tranquil-bastion-03369.herokuapp.com/findbymoviename',
        method:'POST',
        headers:{'Content-type':'application/json'},
        data:
        {
          moviename:text,
          language:language
         
        }
    })
 
    .then(response=>this.setState({moviesong:response.data.moviesongs,sarathpage:1,ismovieexist:response.data.ismovieexist,sarathmoviepagecounts:response.data.pagecounts,sarathpagecount:response.data.pagecount,moviepagecounts:[],songnamepagecounts:[],musicpagecounts:[],singerpagecounts:[]}))
 
    .catch()
   
      axios({
          url:'https://tranquil-bastion-03369.herokuapp.com/findbysongname',
          method:'POST',
          headers:{'Content-type':'application/json'},
          data:
          {
              songname:text,
              language:language
          }
      })
   
      .then(response=>this.setState({filtersongs:response.data.songnames,tarunpage:1,issongexist:response.data.issongexist,tarunsongpagecounts:response.data.pagecounts,tarunpagecount:response.data.pagecount,moviepagecounts:[],songnamepagecounts:[],musicpagecounts:[],singerpagecounts:[]}))
   
      .catch()

  

      axios({
        url:'https://tranquil-bastion-03369.herokuapp.com/findbymusicdirector',
        method:'POST',
        headers:{'Content-type':'application/json'},
        data:
        {
          musicdirector:text,
          language:language
        }
    })
 
    .then(response=>this.setState({musicsongs:response.data.musicdirector,hemanthpage:1, isdirectorexist:response.data.isdirectorexist,hemanthmusicpagecounts:response.data.pagecounts,hemanthpagecount:response.data.pagecount,moviepagecounts:[],songnamepagecounts:[],musicpagecounts:[],singerpagecounts:[]}))
 
    .catch()

    axios({
      url:'https://tranquil-bastion-03369.herokuapp.com/findbysinger',
      method:'POST',
      headers:{'Content-type':'application/json'},
      data:
      {
        singername:text,
        language:language
      }
  })

  .then(response=>this.setState({singersogs:response.data.singernames,ramanapage:1, issingerexist:response.data.issingerexist,ramanasingerpagecounts:response.data.pagecounts,ramanapagecount:response.data.pagecount,moviepagecounts:[],songnamepagecounts:[],musicpagecounts:[],singerpagecounts:[]}))

  .catch()



  axios({
    url:'https://tranquil-bastion-03369.herokuapp.com/findmusicbylanguage',
    method:'POST',
    headers:{'Content-type':'application/json'},
    data:
    {
      language:language
    }
})

.then(response=>this.setState({songs:response.data.music,pagecounts:response.data.pagecounts,allsongspagecount:response.data.pagecount,moviepagecounts:[],songnamepagecounts:[],musicpagecounts:[],singerpagecounts:[],page:1}))

.catch()



    };
  
    onEndEvent = () => {
      if (!isWidthUp('sm', this.props.width)) {
        this.setState({ listening: false });
      } else if (this.state.listening) {
        this.startListening();
      }
    };
  
    onFinalised = text => {
      this.setState({
        finalisedText: [text, ...this.state.finalisedText],
        interimText: ''
      });
    };
  
    startListening = () => {


      try {
        this.listener = new SpeechToText(
          this.onFinalised,
          this.onEndEvent,
          this.onAnythingSaid,
          this.state.languages
        );
        this.listener.startListening();
        this.setState({ listening: true });
      } catch (err) {
        console.log('yoyoy');
        console.log(err);
      }

      
    };
  
   

    songname=(event)=>{
       
        const name=event.target.value;
        this.setState({searchnames:name})
 
    }

    search=()=>{

      const {searchnames,language}=this.state;

      if(searchnames!==undefined)
      {
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
   
      .then(response=>this.setState({moviesong:response.data.moviesongs,ismovieexist:response.data.ismovieexist,moviepagecounts:response.data.pagecounts,findingsongsbymovienamespagecount:response.data.pagecount,sarathmoviepagecounts:[],tarunsongpagecounts:[],hemanthmusicpagecounts:[],ramanasingerpagecounts:[],pages:1}))
   
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
     
        .then(response=>this.setState({filtersongs:response.data.songnames,issongexist:response.data.issongexist,songnamepagecounts:response.data.pagecounts,findingsongbysongname:response.data.pagecount,sarathmoviepagecounts:[],tarunsongpagecounts:[],hemanthmusicpagecounts:[],ramanasingerpagecounts:[],songpage:1}))
     
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
   
      .then(response=>this.setState({musicsongs:response.data.musicdirector,isdirectorexist:response.data.isdirectorexist,musicpagecounts:response.data.pagecounts,findsongsbymusicdirector:response.data.pagecount,sarathmoviepagecounts:[],tarunsongpagecounts:[],hemanthmusicpagecounts:[],ramanasingerpagecounts:[],musicpage:1}))
   
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
 
    .then(response=>this.setState({singersogs:response.data.singernames,issingerexist:response.data.issingerexist,singerpagecounts:response.data.pagecounts,findingsongsbysinger:response.data.pagecount,sarathmoviepagecounts:[],tarunsongpagecounts:[],hemanthmusicpagecounts:[],ramanasingerpagecounts:[],singerpage:1}))
 
    .catch()
 }
    }
         next=()=>{

          const {language,allsongspagecount,page}=this.state;

          const mypage=page+1;

          if(mypage<=allsongspagecount)
          {
            this.setState({page:mypage}) 
          

             

            axios({
              url:'https://tranquil-bastion-03369.herokuapp.com/findmusicbylanguage',
              method:'POST',
              headers:{'Content-type':'application/json'},
              data:
              {
                language:language,
                page:mypage
  
              }
          })
    
          .then(response=>this.setState({songs:response.data.music}))

          .catch()
          
        }
            
          }


          prev=()=>{
            const {language,page}=this.state;

            const mypage=page-1;
  
            if(mypage>0)
            {
              this.setState({page:mypage}) 
            }
  
               
  
              axios({
                url:'https://tranquil-bastion-03369.herokuapp.com/findmusicbylanguage',
                method:'POST',
                headers:{'Content-type':'application/json'},
                data:
                {
                  language:language,
                  page:mypage
    
                }
            })
      
            .then(response=>this.setState({songs:response.data.music}))
  
            .catch()
            
            
              
          }

          songnameprev=()=>{
const {searchnames,language,songpage}=this.state;

const mypage=songpage-1;

if(mypage>0)
{
  this.setState({songpage:mypage})
}
            axios({
              url:'https://tranquil-bastion-03369.herokuapp.com/findbysongname',
              method:'POST',
              headers:{'Content-type':'application/json'},
              data:
              {
                  songname:searchnames,
                  language:language,
                  page:mypage
              }
          })
       
          .then(response=>this.setState({filtersongs:response.data.songnames,issongexist:response.data.issongexist}))
       
          .catch()
            
          }
        
     

        songnamenext=()=>{
          const {searchnames,language,songpage,findingsongbysongname}=this.state;
          
          const mypage=songpage+1;
          
          if(mypage<=findingsongbysongname)
        
          {
            this.setState({songpage:mypage})
          
                      axios({
                        url:'https://tranquil-bastion-03369.herokuapp.com/findbysongname',
                        method:'POST',
                        headers:{'Content-type':'application/json'},
                        data:
                        {
                            songname:searchnames,
                            language:language,
                            page:mypage
                        }
                    })
                 
                    .then(response=>this.setState({filtersongs:response.data.songnames,issongexist:response.data.issongexist}))
                 
                    .catch()
                      
                    }
        }
               

          
          movienameprev=()=>{
            const {searchnames,language,pages}=this.state;

            const mypage=pages-1;

            if(mypage>0)
            {
              this.setState({pages:mypage})
            }
            axios({
              url:'https://tranquil-bastion-03369.herokuapp.com/findbymoviename',
              method:'POST',
              headers:{'Content-type':'application/json'},
              data:
              {
                moviename:searchnames,
                language:language,
                page:mypage

              }
          })
       
          .then(response=>this.setState({moviesong:response.data.moviesongs,ismovieexist:response.data.ismovieexist,moviepagecounts:response.data.pagecounts}))
       
          .catch()
                      }



                      movienamenext=()=>{
                        const {searchnames,language,findingsongsbymovienamespagecount,pages}=this.state;
            
                        const mypage=pages+1;
            
                        if(mypage<=findingsongsbymovienamespagecount)
                        {
                          this.setState({pages:mypage})
                        
                        axios({
                          url:'https://tranquil-bastion-03369.herokuapp.com/findbymoviename',
                          method:'POST',
                          headers:{'Content-type':'application/json'},
                          data:
                          {
                            moviename:searchnames,
                            language:language,
                            page:mypage
            
                          }
                      })
                   
                      .then(response=>this.setState({moviesong:response.data.moviesongs,ismovieexist:response.data.ismovieexist,moviepagecounts:response.data.pagecounts}))
                   
                      .catch()
                                  }
                                }

                      
                      
          musicprev=()=>{
            const {searchnames,language,musicpage}=this.state;

const mypage=musicpage-1;

if(mypage>0)
{

  this.setState({musicpage:mypage})
}


              axios({
                          url:'https://tranquil-bastion-03369.herokuapp.com/findbymusicdirector',
                          method:'POST',
                          headers:{'Content-type':'application/json'},
                          data:
                          {
                            musicdirector:searchnames,
                            language:language,
                              page:mypage
                          }
                      })
                   
                      .then(response=>this.setState({musicsongs:response.data.musicdirector,isdirectorexist:response.data.isdirectorexist}))
                   
                      .catch()
                        
                      }
                    
                 


                    musicnext=()=>{
                      const {searchnames,language,musicpage,findsongsbymusicdirector}=this.state;
          
          const mypage=musicpage+1;
          
          if(mypage<=findsongsbymusicdirector)
          {
          this.setState({musicpage:mypage})
          
          
          
                        axios({
                                    url:'https://tranquil-bastion-03369.herokuapp.com/findbymusicdirector',
                                    method:'POST',
                                    headers:{'Content-type':'application/json'},
                                    data:
                                    {
                                      musicdirector:searchnames,
                                      language:language,
                                        page:mypage
                                    }
                                })
                             
                                .then(response=>this.setState({musicsongs:response.data.musicdirector,isdirectorexist:response.data.isdirectorexist}))
                             
                                .catch()
                                  
                                }
                              } 
                           
          
                      
                      
          singerprev=()=>{
            const {searchnames,language,singerpage}=this.state;

            const mypage=singerpage-1;

            if(mypage>0)
            {
this.setState({singerpage:mypage})
            }
            
                        axios({
                          url:'https://tranquil-bastion-03369.herokuapp.com/findbysinger',
                          method:'POST',
                          headers:{'Content-type':'application/json'},
                          data:
                          {
                            singername:searchnames,
                            language:language,
                              page:mypage
                          }
                      })
                   
                      .then(response=>this.setState({singersogs:response.data.singernames,issingerexist:response.data.issingerexist}))
                   
                      .catch()
                        
                      }
                    
                 
                     

                    singernext=()=>{
                      const {searchnames,language,singerpage,findingsongsbysinger}=this.state;
          
                      const mypage=singerpage+1;
          
                      if(mypage<=findingsongsbysinger)
                      {
                        this.setState({singerpage:mypage})
                      
          
                      
                                  axios({
                                    url:'https://tranquil-bastion-03369.herokuapp.com/findbysinger',
                                    method:'POST',
                                    headers:{'Content-type':'application/json'},
                                    data:
                                    {
                                      singername:searchnames,
                                      language:language,
                                        page:mypage
                                    }
                                })
                             
                                .then(response=>this.setState({singersogs:response.data.singernames,issingerexist:response.data.issingerexist}))
                             
                                .catch()
                                  
                                }
                              
                              }



              sarathnext=()=>{



                const {words,language,sarathpagecount,sarathpage}=this.state;
            
                const mypage=sarathpage+1;
    
                if(mypage<=sarathpagecount)
                {
                  this.setState({sarathpage:mypage})
                
                axios({
                  url:'https://tranquil-bastion-03369.herokuapp.com/findbymoviename',
                  method:'POST',
                  headers:{'Content-type':'application/json'},
                  data:
                  {
                    moviename:words,
                    language:language,
                    page:mypage
    
                  }
              })
           
              .then(response=>this.setState({moviesong:response.data.moviesongs,ismovieexist:response.data.ismovieexist,moviepagecounts:response.data.pagecounts}))
           
              .catch()
                          }

              }    
              
              
              sarathprev=()=>{


                const {words,language,sarathpage}=this.state;

                const mypage=sarathpage-1;
    
                if(mypage>0)
                {
                  this.setState({sarathpage:mypage})
                }
                axios({
                  url:'https://tranquil-bastion-03369.herokuapp.com/findbymoviename',
                  method:'POST',
                  headers:{'Content-type':'application/json'},
                  data:
                  {
                    moviename:words,
                    language:language,
                    page:mypage
    
                  }
              })
           
              .then(response=>this.setState({moviesong:response.data.moviesongs,ismovieexist:response.data.ismovieexist,moviepagecounts:response.data.pagecounts}))
           
              .catch()

              }


              tarunprev=()=>{
                const {words,language,tarunpage}=this.state;
                
                const mypage=tarunpage-1;
                
                if(mypage>0)
                {
                  this.setState({tarunpage:mypage})
                }
                            axios({
                              url:'https://tranquil-bastion-03369.herokuapp.com/findbysongname',
                              method:'POST',
                              headers:{'Content-type':'application/json'},
                              data:
                              {
                                  songname:words,
                                  language:language,
                                  page:mypage
                              }
                          })
                       
                          .then(response=>this.setState({filtersongs:response.data.songnames,issongexist:response.data.issongexist}))
                       
                          .catch()
                            
                          }
                        
                     
                
                        tarunnext=()=>{
                          const {words,language,tarunpage,tarunpagecount}=this.state;
                          
                          const mypage=tarunpage+1;
                          
                          if(mypage<=tarunpagecount)
                        
                          {
                            this.setState({tarunpage:mypage})
                          
                                      axios({
                                        url:'https://tranquil-bastion-03369.herokuapp.com/findbysongname',
                                        method:'POST',
                                        headers:{'Content-type':'application/json'},
                                        data:
                                        {
                                            songname:words,
                                            language:language,
                                            page:mypage
                                        }
                                    })
                                 
                                    .then(response=>this.setState({filtersongs:response.data.songnames,issongexist:response.data.issongexist}))
                                 
                                    .catch()
                                      
                                    }
                        }
                               
                


                        hemanthprev=()=>{
                          const {words,language,hemanthpage}=this.state;
              
              const mypage=hemanthpage-1;
              
              if(mypage>0)
              {
              
                this.setState({hemanthpage:mypage})
              }
              
              
                            axios({
                                        url:'https://tranquil-bastion-03369.herokuapp.com/findbymusicdirector',
                                        method:'POST',
                                        headers:{'Content-type':'application/json'},
                                        data:
                                        {
                                          musicdirector:words,
                                          language:language,
                                            page:mypage
                                        }
                                    })
                                 
                                    .then(response=>this.setState({musicsongs:response.data.musicdirector,isdirectorexist:response.data.isdirectorexist}))
                                 
                                    .catch()
                                      
                                    }
                                  
                               
              
              
                                  hemanthnext=()=>{
                                    const {words,language,hemanthpage,hemanthpagecount}=this.state;
                        
                        const mypage=hemanthpage+1;
                        
                        if(mypage<=hemanthpagecount)
                        {
                        this.setState({hemanthpage:mypage})
                        
                        
                        
                                      axios({
                                                  url:'https://tranquil-bastion-03369.herokuapp.com/findbymusicdirector',
                                                  method:'POST',
                                                  headers:{'Content-type':'application/json'},
                                                  data:
                                                  {
                                                    musicdirector:words,
                                                    language:language,
                                                      page:mypage
                                                  }
                                              })
                                           
                                              .then(response=>this.setState({musicsongs:response.data.musicdirector,isdirectorexist:response.data.isdirectorexist}))
                                           
                                              .catch()
                                                
                                              }
                                            } 
                                         
                        

             
          ramanaprev=()=>{
            const {words,language,ramanapage}=this.state;

            const mypage=ramanapage-1;

            if(mypage>0)
            {
this.setState({ramanapage:mypage})
            }
            
                        axios({
                          url:'https://tranquil-bastion-03369.herokuapp.com/findbysinger',
                          method:'POST',
                          headers:{'Content-type':'application/json'},
                          data:
                          {
                            singername:words,
                            language:language,
                              page:mypage
                          }
                      })
                   
                      .then(response=>this.setState({singersogs:response.data.singernames,issingerexist:response.data.issingerexist}))
                   
                      .catch()
                        
                      }
                    
                 
                     

                    ramananext=()=>{
                      const {words,language,ramanapage,ramanapagecount}=this.state;
          
                      const mypage=ramanapage+1;
          
                      if(mypage<=ramanapagecount)
                      {
                        this.setState({ramanapage:mypage})
                      
          
                      
                                  axios({
                                    url:'https://tranquil-bastion-03369.herokuapp.com/findbysinger',
                                    method:'POST',
                                    headers:{'Content-type':'application/json'},
                                    data:
                                    {
                                      singername:words,
                                      language:language,
                                        page:mypage
                                    }
                                })
                             
                                .then(response=>this.setState({singersogs:response.data.singernames,issingerexist:response.data.issingerexist}))
                             
                                .catch()
                                  
                                }
                              
                              }



                               
        
    render()
    {
      const {sarathpagecount,tarunpagecount,hemanthpagecount,ramanapagecount,sarathmoviepagecounts,tarunsongpagecounts,hemanthmusicpagecounts,ramanasingerpagecounts,  interimText,findingsongbysongname,findingsongsbymovienamespagecount,findingsongsbysinger,findsongsbymusicdirector,pagecounts,songnamepagecounts,moviepagecounts,musicpagecounts,singerpagecounts, songs,language,filtersongs,issongexist,moviesong,ismovieexist,musicsongs,isdirectorexist,singersogs,issingerexist}=this.state;
   
      
        return(
         
            <div style={{paddingTop:'80px'}}>
                 <form className="text-center mt-3 ml-3 mr-3 fixed-top"   >
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text">
          <span className="fas fa-search" onClick={this.search}></span>
      </span>
    </div>
    <input type="text" class="form-control " placeholder={interimText}  onChange={this.songname} />

    <div
                color="primary"
                onClick={() => this.startListening()}
                variant="contained"
           style={{color:'red',fontSize:'20px',background:'white',borderRadius:'2px'}}
                className="fas fa-microphone pl-2 pr-2 pt-2"
              >
               
              </div>

             
  </div>
              
          
              
  
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

 
  
      <div style={{color:'white'}}>MOVIE NAME:{item.moviename[0]}</div>
  
  
    
   
      <div style={{color:'white'}}>SONG NAME:{item.songname[0]}</div>
  
 



       <div style={{color:'white'}}>MUSIC:{item.music[0]}</div>
  
  


    <div style={{color:'yellow'}}>SINGERS:</div>
    
    <div style={{color:'white'}}>{item.singers[0]}</div>
  

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


      <div style={{color:'white'}}>MOVIE NAME:{item.moviename[0]}</div>
  
 
    
  
       <div style={{color:'white'}}>SONG NAME:{item.songname[0]}</div>
  
 



       <div style={{color:'white'}}>MUSIC:{item.music[0]}</div>
  
 


        <div style={{color:'yellow'}}>SINGERS:</div>

        <div style={{color:'white'}}>{item.singers[0]}</div>
  
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

  
  <div style={{color:'white'}}>MOVIE NAME:{item.moviename[0]}</div>
  
 
    
  
       <div style={{color:'white'}}>SONG NAME:{item.songname[0]}</div>
  
 



       <div style={{color:'white'}}>MUSIC:{item.music[0]}</div>
  
 


        <div style={{color:'yellow'}}>SINGERS:</div>

        <div style={{color:'white'}}>{item.singers[0]}</div>

  
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

  <div style={{color:'white'}}>MOVIE NAME:{item.moviename[0]}</div>
  
 
    
  
       <div style={{color:'white'}}>SONG NAME:{item.songname[0]}</div>
  
 



       <div style={{color:'white'}}>MUSIC:{item.music[0]}</div>
  
 


        <div style={{color:'yellow'}}>SINGERS:</div>

        <div style={{color:'white'}}>{item.singers[0]}</div>

  
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

  <div style={{color:'white'}}>MOVIE NAME:{item.moviename[0]}</div>
  
 
    
  
  <div style={{color:'white'}}>SONG NAME:{item.songname[0]}</div>





  <div style={{color:'white'}}>MUSIC:{item.music[0]}</div>




   <div style={{color:'yellow'}}>SINGERS:</div>

   <div style={{color:'white'}}>{item.singers[0]}</div>
   <br/>  
</div>
</Zoom>
})}



</div>

:<Zoom><div className="mt-3 text-white text-center">SORRY NO SONGS FOUND IN {language} </div></Zoom>}



{sarathmoviepagecounts.length===0 && tarunsongpagecounts.length===0 && hemanthmusicpagecounts.length===0 && ramanasingerpagecounts.length===0?


<div>
  
  <div class="center">
    <div className="pagination">
{pagecounts.length!==0 &&songnamepagecounts.length===0 &&moviepagecounts.length===0&&musicpagecounts.length===0&&singerpagecounts.length===0 && sarathmoviepagecounts.length===0 && tarunsongpagecounts.length===0 && hemanthmusicpagecounts.length===0 && ramanasingerpagecounts.length===0? 

<div>
    <button onClick={this.prev} className="btn btn-sm">PREV</button>

   <button onClick={this.next} className="btn btn-sm">NEXT</button>

  

</div>

:null}
</div>
</div>
<div class="center">
    <div className="pagination">
{songnamepagecounts.length!==0 &&findingsongbysongname>1 ? 

<div>
    <button onClick={this.songnameprev} className="btn btn-sm">PREV</button>

   <button onClick={this.songnamenext} className="btn btn-sm">NEXT</button>

</div>

:null}
</div>
</div>



<div class="center">
    <div className="pagination">
{moviepagecounts.length!==0 && findingsongsbymovienamespagecount>1? 
<div>

<button onClick={this.movienameprev} className="btn btn-sm">PREV</button>

   <button onClick={this.movienamenext} className="btn btn-sm">NEXT</button>

  </div>


:null}
</div>
</div>



<div class="center">
    <div className="pagination">
{musicpagecounts.length!==0 &&findsongsbymusicdirector>1 ? 
   

<div>

<button onClick={this.musicprev} className="btn btn-sm">PREV</button>

   <button onClick={this.musicnext} className="btn btn-sm">NEXT</button>

  </div>

:<div style={{display:'none'}}>ok</div>}
</div>
</div>

<div class="center">
    <div className="pagination">
{singerpagecounts.length!==0 && findingsongsbysinger>1 ? 

<div>

<button onClick={this.singerprev} className="btn btn-sm">PREV</button>

   <button onClick={this.singernext} className="btn btn-sm">NEXT</button>

  </div>


:null}    
</div>
</div>
  </div>
  :<div style={{display:'none'}}> ok</div>}




{sarathmoviepagecounts.length!==0 || tarunsongpagecounts.length!==0 || hemanthmusicpagecounts.length!==0 || ramanasingerpagecounts.length!==0?

<div>

<div class="center">
    <div className="pagination">
{sarathmoviepagecounts.length!==0 && sarathpagecount>1 ? 

<div>

<button onClick={this.sarathprev} className="btn btn-sm">PREV</button>

   <button onClick={this.sarathnext} className="btn btn-sm">NEXT</button>

  </div>


:null}    
</div>
</div>

<div class="center">
    <div className="pagination">
{tarunsongpagecounts.length!==0 && tarunpagecount>1 ? 

<div>

<button onClick={this.tarunprev} className="btn btn-sm">PREV</button>

   <button onClick={this.tarunnext} className="btn btn-sm">NEXT</button>

  </div>


:null}    
</div>
</div>


<div class="center">
    <div className="pagination">
{hemanthmusicpagecounts.length!==0 && hemanthpagecount>1 ? 

<div>

<button onClick={this.hemanthprev} className="btn btn-sm">PREV</button>

   <button onClick={this.hemanthnext} className="btn btn-sm">NEXT</button>

  </div>


:null}    
</div>
</div>


<div class="center">
    <div className="pagination">
{ramanasingerpagecounts.length!==0  && ramanapagecount>1 ? 

<div style={{display:'inline'}}>

<button onClick={this.ramanaprev} className="btn btn-sm">PREV</button>

   <button onClick={this.ramananext} className="btn btn-sm">NEXT</button>

  </div>

:null}    
</div>
</div>

  </div>
:null}



  
            </div>
        )
    }
}

export default Audios;
