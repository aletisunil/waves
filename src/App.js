import React,{useState,useRef} from "react";
import "./styles/app.scss";
import Player from "./components/Player";
import Song from "./components/Song";
import data from './data';
import Library from "./components/Library";
import Nav from "./components/Nav"

function App() {
  const [songInfo,setSongInfo]=useState({
    current:0,
    duration:0,
  });
  const timeUpdateHandler=(e)=>{
    const current=e.target.currentTime;
    const duration=e.target.duration;
    setSongInfo({...songInfo,current,currentTime:current,duration})
  }
  const audioref = useRef(null);
  const [LibraryStatus,setLibraryStatus]=useState(false)
  const [songs, setSongs]=useState(data());
  const [currentSong,setCurrentSong]= useState(songs[0]);
  const [isPlaying,setIsPlaying]=useState(false);
  const endSongHandler=async()=>{
    let currentIndex=songs.findIndex((song)=>song.id===currentSong.id)
    await setCurrentSong(songs[(currentIndex+1)%songs.length])
    if(isPlaying) audioref.current.play();
  }
  return (
   <div className={`App ${LibraryStatus ? "library-active": ""}`}>
      <Nav LibraryStatus={LibraryStatus} setLibraryStatus={setLibraryStatus}/>
       <Song currentSong={currentSong}/>
       <Player setSongs={setSongs} audioref={audioref} isPlaying={isPlaying} songs={songs} setCurrentSong={setCurrentSong} setIsPlaying={setIsPlaying} songInfo={songInfo} setSongInfo={setSongInfo} currentSong={currentSong}/>
      <Library LibraryStatus={LibraryStatus} audioref={audioref} isPlaying={isPlaying} songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} songs={songs}/>
      <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioref} src={currentSong.audio} onEnded={endSongHandler}></audio>
   </div>
  );
}

export default App;
