import styles from './styles/App.module.css';

import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import TrackList from './components/Tracklist';
import Track from './components/Track';

function App() {
    return (
      <>
        <nav className={styles.appContainer}>
          <h1>
            <span>J</span>a
            <u>mmm</u>ing
          </h1>
        </nav>
        <SearchBar />
        <section className={styles.resultsAndPlaylistContainer}>
          <SearchResults>
            <TrackList />
          </SearchResults>
          <Playlist>
            <Track />
          </Playlist>
        </section>
      </>
    );
}

export default App;