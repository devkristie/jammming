import styles from '../styles/Track.module.css';

function Track() {
    return (
        <section className={styles.trackListContainer}>
            <input className={styles.trackInput} placeholder='Name your playlist...' />
            <div className={styles.trackFlexContainer}>
                <article className={styles.trackContainer}>
                    <p className={styles.trackTitle}>Name Of Song</p>
                    <p className={styles.trackArtist}>Name Of Artist</p>
                </article>
                <button className={styles.deleteButton}>x</button>
            </div>
            <div className={styles.trackFlexContainer}>
                <article className={styles.trackContainer}>
                    <p className={styles.trackTitle}>Name Of Song</p>
                    <p className={styles.trackArtist}>Name Of Artist</p>
                </article>
                <button className={styles.deleteButton}>x</button>
            </div>
            <div className={styles.trackFlexContainer}>
                <article className={styles.trackContainer}>
                    <p className={styles.trackTitle}>Name Of Song</p>
                    <p className={styles.trackArtist}>Name Of Artist</p>
                </article>
                <button className={styles.deleteButton}>x</button>
            </div>
            <button className={styles.saveButton}>Save To Spofity</button>
        </section>
    );
}

export default Track;