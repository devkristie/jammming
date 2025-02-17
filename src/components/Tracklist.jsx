import styles from '../styles/TrackList.module.css';

function TrackList({ tracks, onAdd }) {
    return (
        <section className={styles.trackListContainer}>
            {tracks.map((track) => (
                <div key={track.id} className={styles.trackFlexContainer}>
                    <article className={styles.trackContainer}>
                        <p className={styles.trackTitle}>{track.name}</p>
                        <p className={styles.trackArtist}>{track.artist}</p>
                    </article>
                    <button
                        className={styles.deleteButton}
                        onClick={() => onAdd(track)}
                    >
                        +
                    </button>
                </div>
            ))}
        </section>
    );
}

export default TrackList;
