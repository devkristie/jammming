import styles from '../styles/Playlist.module.css';

function Playlist({ playlistName, playlistTracks, onRemove, onNameChange, onSave }) {
    return (
        <section className={styles.playlistContainer}>
            <input
                className={styles.playlistNameInput}
                type="text"
                value={playlistName}
                onChange={onNameChange} // Handle renaming playlist
            />
            <>
                {playlistTracks.map((track) => (
                    <div className={styles.playlistTrackFlexContainer} key={track.id}>
                        <article>
                            <span className={styles.trackName}>{track.name}</span> <span className={styles.trackBy}>by</span> <span className={styles.trackArtist}>{track.artist}</span>
                        </article>
                        <button className={styles.removeButton} onClick={() => onRemove(track)}>x</button>
                    </div>
                ))}
            </>
            <button className={styles.saveButton} onClick={onSave}>Save To Spotify</button>            
        </section>
    );
}

export default Playlist;
