const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

const scopes = [
    "playlist-modify-public",
    "playlist-modify-private",
    "user-library-read",
    "user-read-private"
];

const SpotifyAuth = {
    login() {
        const authUrl = `${authEndpoint}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}`;
        window.location = authUrl; // Redirect to Spotify login
    },

    getAccessToken() {
        let accessToken = localStorage.getItem("spotify_access_token");
        const expiresIn = localStorage.getItem("spotify_expires_in");
        const now = new Date().getTime();

        if (accessToken && expiresIn > now) {
            return accessToken;
        }

        const urlParams = new URLSearchParams(window.location.hash.substring(1));
        accessToken = urlParams.get("access_token");
        const expiresInSec = urlParams.get("expires_in");

        if (accessToken) {
            const expiryTime = new Date().getTime() + expiresInSec * 1000;
            localStorage.setItem("spotify_access_token", accessToken);
            localStorage.setItem("spotify_expires_in", expiryTime);
            window.history.pushState({}, document.title, "/");
            return accessToken;
        }

        return null;
    },

    // Method to get the user's Spotify ID
    getUserId() {
        const token = this.getAccessToken();
        if (!token) {
            return Promise.reject("No access token available");
        }

        return fetch("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => data.id)
            .catch((error) => {
                console.error("Error fetching user ID:", error);
                throw error;
            });
    },

    // Method to create a new playlist
    createPlaylist(userId, playlistName) {
        const token = this.getAccessToken();
        if (!token) {
            return Promise.reject("No access token available");
        }

        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: playlistName,
                description: "A playlist created via Jammming app",
                public: false,
            }),
        })
            .then((response) => response.json())
            .then((data) => data.id)
            .catch((error) => {
                console.error("Error creating playlist:", error);
                throw error;
            });
    },

    // Method to add tracks to the playlist
    addTracksToPlaylist(userId, playlistId, trackUris) {
        const token = this.getAccessToken();
        if (!token) {
            return Promise.reject("No access token available");
        }

        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uris: trackUris,
            }),
        })
            .then((response) => response.json())
            .then((data) => data)
            .catch((error) => {
                console.error("Error adding tracks to playlist:", error);
                throw error;
            });
    },
};

export default SpotifyAuth;