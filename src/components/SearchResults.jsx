import styles from '../styles/SearchResults.module.css';
//import TrackList from './Tracklist'; Dont think this is needed, need to confirm

function SearchResults({ children }) {
    return (
        <section className={styles.searchResultsContainer}>
            <h2>Search Results</h2>
            {children}  {/* Rendering the TrackList that is passed as children */}
        </section>
    );
}

export default SearchResults;
