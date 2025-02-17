import { useState } from 'react';
import styles from './styles/App.module.css';

import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import TrackList from './components/Tracklist';

function App() {
    const [searchResults, setSearchResults] = useState([]);
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [playlistName, setPlaylistName] = useState('Name of playlist...');

    // Function to handle adding a track to the playlist
    const addTrack = (track) => {
        if (!playlistTracks.some((t) => t.id === track.id)) {
            setPlaylistTracks([...playlistTracks, track]);
        }
    };

    // Function to remove a track from the playlist
    const removeTrack = (track) => {
        setPlaylistTracks(playlistTracks.filter((t) => t.id !== track.id));
    };

    // Function to handle playlist renaming
    const handlePlaylistNameChange = (event) => {
      const newName = event.target.value;
      setPlaylistName(newName);
    };

    // Function to simulate saving the playlist
    const savePlaylist = () => {
        const trackUris = playlistTracks.map((track) => track.uri);
        console.log('New Playlist Name:', playlistName);  // Log the new name of the playlist
        console.log('Saving playlist with these track URIs:', trackUris);
        setPlaylistTracks([]);
        setPlaylistName('Name of playlist...');
    };

    // Function to simulate searching for tracks
    const search = (query) => {
        const mockResults = [
            { id: '1', name: 'Song One', artist: 'Artist One', uri: 'spotify:track:1a2b3c4d5e' },
            { id: '2', name: 'Song Two', artist: 'Artist Two', uri: 'spotify:track:2a2b3c4d5f' },
            { id: '3', name: 'Song Three', artist: 'Artist Three', uri: 'spotify:track:3a2b3c4d5g' },
            { id: '4', name: 'Song Four', artist: 'Artist Four', uri: 'spotify:track:1a2b3c4d5e' },
            { id: '5', name: 'Song Five', artist: 'Artist Five', uri: 'spotify:track:2a2b3c4d5f' },
            { id: '6', name: 'Song Six', artist: 'Artist Six', uri: 'spotify:track:3a2b3c4d5g' },
            { id: '7', name: 'Song Seven', artist: 'Artist Seven', uri: 'spotify:track:1a2b3c4d5e' },
            { id: '8', name: 'Song Eight', artist: 'Artist Eight', uri: 'spotify:track:2a2b3c4d5f' },
            { id: '9', name: 'Song Nine', artist: 'Artist Nine', uri: 'spotify:track:3a2b3c4d5g' },
            { id: '10', name: 'Song Ten', artist: 'Artist Ten', uri: 'spotify:track:1a2b3c4d5e' },
            { id: '11', name: 'Song Eleven', artist: 'Artist Eleven', uri: 'spotify:track:2a2b3c4d5f' },
            { id: '12', name: 'Song Twelve', artist: 'Artist Twelve', uri: 'spotify:track:3a2b3c4d5g' },
        ];
        setSearchResults(mockResults);  // Update search results with mock data
    };

    return (
        <>
            <nav className={styles.appContainer}>
                <h1>
                    <span>J</span>a
                    <u>mmm</u>ing
                </h1>
            </nav>
            <SearchBar onSearch={search} />  {/* Passing onSearch to SearchBar */}
            <section className={styles.resultsAndPlaylistContainer}>
                <SearchResults>
                    <TrackList tracks={searchResults} onAdd={addTrack} />
                </SearchResults>
                <Playlist
                    playlistName={playlistName}
                    playlistTracks={playlistTracks}
                    onRemove={removeTrack}
                    onNameChange={handlePlaylistNameChange}
                    onSave={savePlaylist}
                />
            </section>
        </>
    );
}

export default App;
