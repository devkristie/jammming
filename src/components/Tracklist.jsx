import styles from '../styles/TrackList.module.css';

function TrackList() {
    return (
        <section className={styles.trackListContainer}>
            <h2>Results</h2>
            <div className={styles.trackFlexContainer}>
                <article className={styles.trackContainer}>
                    <p className={styles.trackTitle}>Name Of Song</p>
                    <p className={styles.trackArtist}>Name Of Artist</p>
                </article>
                <button className={styles.deleteButton}>+</button>
            </div>
            <div className={styles.trackFlexContainer}>
                <article className={styles.trackContainer}>
                    <p className={styles.trackTitle}>Name Of Song</p>
                    <p className={styles.trackArtist}>Name Of Artist</p>
                </article>
                <button className={styles.deleteButton}>+</button>
            </div>
            <div className={styles.trackFlexContainer}>
                <article className={styles.trackContainer}>
                    <p className={styles.trackTitle}>Name Of Song</p>
                    <p className={styles.trackArtist}>Name Of Artist</p>
                </article>
                <button className={styles.deleteButton}>+</button>
            </div>
        </section>
    );
}

export default TrackList;