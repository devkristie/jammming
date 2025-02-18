const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;  // Corrected to use VITE_ prefix
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;  // Corrected to use VITE_ prefix

const scopes = [
    "playlist-modify-public",
    "playlist-modify-private",
    "user-library-read",
    "user-read-private"
];

const SpotifyAuth = {
    login() {
        const authUrl = `${authEndpoint}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}`;
        window.location = authUrl;  // Redirect to Spotify login
    },

    getAccessToken() {
        let accessToken = localStorage.getItem("spotify_access_token");
        const expiresIn = localStorage.getItem("spotify_expires_in");
        const now = new Date().getTime();

        // If the access token is still valid, return it
        if (accessToken && expiresIn > now) {
            return accessToken;
        }

        // If no valid access token, check the URL fragment
        const urlParams = new URLSearchParams(window.location.hash.substring(1));
        accessToken = urlParams.get("access_token");
        const expiresInSec = urlParams.get("expires_in");

        if (accessToken) {
            const expiryTime = new Date().getTime() + expiresInSec * 1000;
            localStorage.setItem("spotify_access_token", accessToken);
            localStorage.setItem("spotify_expires_in", expiryTime);
            window.history.pushState({}, document.title, "/"); // Remove token from URL

            return accessToken;
        }

        return null;
    }
};

export default SpotifyAuth;
