const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const authEndpoint = "https://accounts.spotify.com/authorize";
const scopes = [
  "playlist-modify-public", 
  "playlist-modify-private"
];

const SpotifyAuth = {
  getAccessToken() {
    let accessToken = localStorage.getItem("spotify_access_token");
    const expiresIn = localStorage.getItem("spotify_expires_in");
    const now = new Date().getTime();

    if (accessToken && expiresIn > now) {
      return accessToken; // Return saved token if it's still valid
    }

    // If there's no token or it's expired, check the URL
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    accessToken = urlParams.get("access_token");
    const expiresInSec = urlParams.get("expires_in");

    if (accessToken) {
      // Calculate the expiry time and save it
      const expiryTime = now + expiresInSec * 1000;
      localStorage.setItem("spotify_access_token", accessToken);
      localStorage.setItem("spotify_expires_in", expiryTime);

      // Remove token from URL for security
      window.history.pushState({}, document.title, window.location.pathname);

      return accessToken;
    }

    return null;
  },

  login() {
    const authUrl = `${authEndpoint}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}`;
    window.location = authUrl; // Redirect to Spotify login
  }
};

export default SpotifyAuth;
