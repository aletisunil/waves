import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({currentSong,isPlaying,setIsPlaying,audioref,songInfo,setSongInfo,songs,setCurrentSong,setSongs}) => {
  const activeLibraryHandler=(nextPrev)=>{
    const newSongs=songs.map((song)=>{
      if(song.id===nextPrev.id){
          return{
          ...song,active:true
      }
  }
      else{
          return{
          ...song,active:false
      }
  }

  })
  setSongs(newSongs)
}
  const playSongHandler=()=>{
    
    if(isPlaying){
      
      audioref.current.pause();
      setIsPlaying(!isPlaying);
    }
    else{
      
      audioref.current.play();
      setIsPlaying(!isPlaying);
    }
   };
   
   const getTime=(time)=>{
    return(
      Math.floor(time/60)+":"+("0"+Math.floor(time%60)).slice(-2)
    )
   }
   const dragHandler=(e)=>{
     audioref.current.currentTime=e.target.value;
     setSongInfo({...songInfo,currentTime:e.target.value})
   }
   const skipTrackHandler= async (direction)=>{
     let currentIndex=songs.findIndex((song)=>song.id===currentSong.id)
     if(direction==='skip-forward'){
      await setCurrentSong(songs[(currentIndex+1)%songs.length])
      activeLibraryHandler(songs[(currentIndex+1)%songs.length])
     }
     if(direction==='skip-backward'){
       if((currentIndex-1)%songs.length===-1){
        await setCurrentSong(songs[songs.length-1])
        activeLibraryHandler(songs[songs.length-1])
         if(isPlaying) audioref.current.play()
         return
       }
      await setCurrentSong(songs[songs.length-1])
      activeLibraryHandler(songs[songs.length-1])
    }
    
    if(isPlaying) audioref.current.play()
   }
  

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        
        <input onChange={dragHandler} min={0} max={songInfo.duration || 0} value={songInfo.currentTime} type="range"></input> 
      
        <p>{songInfo.duration ? getTime(songInfo.duration): "0.00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon onClick={()=>skipTrackHandler('skip-backward')}
          className="skip-backward"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause: faPlay} />
        <FontAwesomeIcon
        onClick={()=>skipTrackHandler('skip-forward')}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      
    </div>
  );
};

export default Player;
