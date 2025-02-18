import { useState, useEffect } from 'react';
import styles from './styles/App.module.css';

import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import TrackList from './components/Tracklist';

import SpotifyAuth from './utils/SpotifyAuth';

function App() {
    const [searchResults, setSearchResults] = useState([]);
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [playlistName, setPlaylistName] = useState('Name of playlist...');
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const token = SpotifyAuth.getAccessToken();
        if (!token) {
            SpotifyAuth.login();
        } else {
            setAccessToken(token);
        }
    }, []);

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
        setPlaylistName(event.target.value);
    };

    // Function to simulate saving the playlist
    const savePlaylist = () => {
        if (!accessToken) {
            console.log("No access token available, please log in.");
            return;
        }

        const trackUris = playlistTracks.map((track) => track.uri);
        console.log('New Playlist Name:', playlistName);  
        console.log('Saving playlist with these track URIs:', trackUris);
        
        setPlaylistTracks([]);
        setPlaylistName('Name of playlist...');
    };

    // Function to handle searching for tracks via Spotify API
    const search = async (query) => {
        if (!accessToken) {
            console.log("No valid access token, please log in.");
            return;
        }

        const endpoint = `https://api.spotify.com/v1/search?type=track&q=${query}`;
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        try {
            const response = await fetch(endpoint, { headers });
            if (!response.ok) {
                throw new Error('Failed to fetch data from Spotify');
            }

            const data = await response.json();
            const tracks = data.tracks.items.map((track) => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
            }));

            setSearchResults(tracks);
        } catch (error) {
            console.error("Error fetching Spotify data:", error);
        }
    };

    return (
        <>
            <nav className={styles.appContainer}>
                <h1>
                    <span>J</span>a
                    <u>mmm</u>ing
                </h1>
            </nav>
            <SearchBar onSearch={search} />
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
