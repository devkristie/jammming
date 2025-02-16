import styles from '../styles/SearchResults.module.css';

function SearchResults({children}) {
    return (
        <>
            <section className={styles.searchResultsContainer}>
                <h2>{children}</h2>
            </section>
        </>
    );
}

export default SearchResults;