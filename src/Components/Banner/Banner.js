import React, { useEffect, useState } from 'react'
import {API_KEY,imageUrl} from '../../constants/constant'
import YouTube from 'react-youtube'
import axios from '../../axios'
import './Banner.css'


function Banner() {
  
  const [movie, setMovie] = useState()
  const [urlId,setUrlId] = useState('')
  useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response) => {
      console.log(response.data.results[0]);
      setMovie(response.data.results[0])
      
    })
  },[])
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleMovie = (id) => {
    console.log(id);
    axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response => {
      if(response.data.results.length!==0){
        setUrlId(response.data.results[0])
      } else {
        console.log('Array is empty')
      }
    })

  }
  return (
    

    <div style = {{backgroundImage: `url(${movie ? imageUrl+movie.backdrop_path : ""})`}} className='banner'>
        <div className='content'>
            <h1 className='title'>{movie ? movie.title : ""}</h1>
            <div className='banner_buttons'>
                <button className='button'>Play</button>
                <button className='button'>My List</button>
            </div>
            <h1 onClick={() =>handleMovie(movie.id) } className='discription'>{movie ? movie.overview : ""}</h1> 
        </div>
        <div className='fade_button'>
            
        </div>
        {urlId && <YouTube videoId={urlId.key} opts={opts} />}
    </div>
  )
}

export default Banner