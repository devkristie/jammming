import styles from '../styles/SearchBar.module.css';

function SearchBar() {
  return (
    <>
        <form className={styles.searchBar}>
            <input type="text" placeholder="Search for a song..." />
            <button className={styles.searchButton}>Search</button>
        </form>    
    </>
  );
}

export default SearchBar;