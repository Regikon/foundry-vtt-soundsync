import { resyncPlayedMusic } from "./core"

const SYNC_DELAY = 5000; // ms

export const applyHooks = () => {
    Hooks.on("userConnected", (user, connected) => {
        if (user && connected) {
            if (game.user?.isGM) {
                setTimeout(resyncPlayedMusic, SYNC_DELAY);
            }
        }
    })

    Hooks.on("pauseGame", (paused) => {
        if (!paused && game.user?.isGM) {
            resyncPlayedMusic();
        }
    })
}
