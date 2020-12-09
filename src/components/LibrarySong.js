import React from "react";


const LibrarySong=({song,songs,setCurrentSong,id,key,audioref,isPlaying,setSongs})=>{
    
    
    const selectSongHandler=async()=>{
        const selectedSong=songs.filter(state=> state.id===id)
        await setCurrentSong(selectedSong[0])
        const newSongs=songs.map((song)=>{
            if(song.id===id){
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
        audioref.current.play()
        if(isPlaying) audioref.current.play()

    };
    
    return(
        <div onClick={selectSongHandler} className={`library-song ${song.active ? 'selected':""}`}>
            <img alt={song.artist} src={song.cover}></img>
            <div className="song-description">
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
            </div>
        </div>
       
    )
} 

export default LibrarySong;
