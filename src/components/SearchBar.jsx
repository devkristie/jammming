import { useState } from 'react';
import styles from '../styles/SearchBar.module.css';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSearchChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (query) {
            onSearch(query);  // Calling onSearch passed from App
        }
    };

    return (
        <form className={styles.searchBar} onSubmit={handleSearchSubmit}>
            <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                placeholder="Search for a song..."
            />
            <button className={styles.searchButton}>Search</button>
        </form>
    );
}

export default SearchBar;
