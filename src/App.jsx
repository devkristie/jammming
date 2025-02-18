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

    const savePlaylist = () => {
        if (!accessToken) {
            console.log("No access token available, please log in.");
            return;
        }
    
        // Get the user ID
        SpotifyAuth.getUserId()
            .then(userId => {
                if (userId) {
                    // Create the playlist on Spotify
                    return SpotifyAuth.createPlaylist(userId, playlistName)
                        .then(playlistId => {
                            if (playlistId) {
                                // Add the tracks to the new playlist
                                const trackUris = playlistTracks.map(track => track.uri);
                                return SpotifyAuth.addTracksToPlaylist(userId, playlistId, trackUris);
                            } else {
                                throw new Error('Could not create playlist');
                            }
                        });
                } else {
                    throw new Error('Could not get user ID');
                }
            })
            .then(() => {
                // Reset the state after saving
                setPlaylistTracks([]);
                setPlaylistName('Name of playlist...');
                console.log('Playlist saved to Spotify!');
            })
            .catch(err => {
                console.log('Error saving playlist:', err);
            });
    };

    // Function to search for tracks using the Spotify API
    const search = (query) => {
        const token = accessToken; // Ensure you have the token
        if (!token) {
            console.log("No access token available");
            return;
        }

        fetch(`https://api.spotify.com/v1/search?type=track&q=${query}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data && data.tracks && data.tracks.items) {
                    const tracks = data.tracks.items.map((track) => ({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0]?.name,
                        uri: track.uri,
                    }));
                    setSearchResults(tracks); // Update the search results
                } else {
                    console.error("No tracks found or API response is malformed");
                }
            })
            .catch((error) => {
                console.error("Error fetching Spotify search results:", error);
            });
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
