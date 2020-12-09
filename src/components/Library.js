import React from 'react';
import LibrarySong from './LibrarySong';


const Library=({songs,setCurrentSong,audioref,isPlaying,setSongs,LibraryStatus})=>{
    return(
        <div className={`library ${LibraryStatus? "active-library":""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song=>(
                    <LibrarySong song={song} isPlaying={isPlaying} setSongs={setSongs} setCurrentSong={setCurrentSong} songs={songs} id={song.id} audioref={audioref} key={song.id}/>
                ))}
            
            </div>
        </div>
    )
}

export default Library;