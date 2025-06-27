import { resyncPlayedMusic } from "./core"
import { insertControlPanel, setupUi } from "./ui";

const SYNC_DELAY = 5000; // ms

export const applyHooks = () => {
    Hooks.on("ready", () => {
        if (!game.user?.isGM) {
            return;
        }

        setupUi();
        Hooks.on("userConnected", (user, connected) => {
            if (user && connected) {
                setTimeout(resyncPlayedMusic, SYNC_DELAY);
            }
        });

        Hooks.on("pauseGame", (paused) => {
            if (!paused) {
                resyncPlayedMusic();
            }
        });

        // V12 Backwards compatible hook
        Hooks.on("renderPlaylistDirectory", (_application, html, _data) => {
            console.log(html);
            insertControlPanel(html);
        });
    });
}
