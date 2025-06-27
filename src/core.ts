import { formatLog } from "./utils";

const resyncPlaylist = async (playlist: Playlist) => {
    const playingSounds = playlist.sounds.filter((sound) => sound.playing);
    const soundsStopMessages = playingSounds.map((sound) => {
        return {
            "playing": false,
            "_id": sound.id,
            "pausedTime": sound.sound?.currentTime,
        }
    });
    const soundsStartMessages = playingSounds.map((sound) => {
        return {
            "playing": true,
            "_id": sound.id,
        }
    });

    const stopResult = await playlist.update({
        "sounds": soundsStopMessages,
        "_id": playlist.id,
        "playing": false,
    });
    if (!stopResult) {
        console.error(formatLog("Failed to stop currently running playlists."));
        return;
    }

    const startResult = await playlist.update({
        "sounds": soundsStartMessages,
        "_id": playlist.id,
        "playing": true
    });
    if (!startResult) {
        console.error(formatLog("Failed to start paused playlists."));
    }
}

export const resyncPlayedMusic = async () => {
    console.debug(formatLog("Resynchronizing the playlists"));
    const playingPlaylists = game.playlists?.playing;
    if (!playingPlaylists) {
        return;
    }
    try {
        for (const playlist of playingPlaylists) {
            await resyncPlaylist(playlist);
        }
    } catch {
        console.error(formatLog("Got unexpected error when synchronizing the playlists"));
    }
}
