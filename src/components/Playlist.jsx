import styles from '../styles/Playlist.module.css';

function Playlist({children}) {
    return (
        <>
            <section className={styles.playlistContainer}>
                <h2>{children}</h2>
            </section>
        </>
    );
}

export default Playlist;