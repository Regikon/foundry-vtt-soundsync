const printFailed = () => {
	console.log("Foundry VTT Sound Sync: Failed to synchronize.");
}

const resyncPlaylist = async (playlist) => {
	const playingSounds = playlist.sounds.filter((sound) => sound.playing);
	const soundsStopMessages = playingSounds.map((sound) => {
		return {
			"playing": false,
			"_id": sound.id,
			"pausedTime": sound.sound.currentTime,
		}
	});
	const soundStartMessages = playingSounds.map((sound) => {
		return {
			"playing": true,
			"_id": sound.id,
		}
	});

	playlist = await playlist.update({
		"sounds": soundsStopMessages,
		"_id": playlist.id,
		"playing": false,
	});

	await playlist.update({
		"sounds": soundStartMessages,
		"_id": playlist.id,
		"playing": true
	});
}

const resyncPlayedMusic = async () => {
	const playingPlaylists = game.playlists.playing;
	try {
		for (const playlist of playingPlaylists) {
			await resyncPlaylist(playlist);
		}
	} catch {
		printFailed();
	}
}


Hooks.on("userConnected", (user, connected) => {
	if (user && connected) {
		if (game.user.isGM) {
			setTimeout(resyncPlayedMusic, 5000)
		}
	}
})

Hooks.on("pauseGame", (paused) => {
	if (!paused && game.user.isGM) {
		resyncPlayedMusic();
	}
})
