import { resyncPlayedMusic } from "./core";
import { formatLog, htmlToNode } from "./utils";

const CONTROL_PANEL_PATH = "modules/foundry-vtt-soundsync/templates/control_panel.html";

export const setupUi = async () => {
    await loadTemplates([CONTROL_PANEL_PATH]);
}

// Plain HTML injection preferred over Application api
// because it is much simpler and Application would be an overkill.
const renderControlPanel = async () => {
    const html = await renderTemplate(CONTROL_PANEL_PATH, {});
    const controlPanel = htmlToNode(html);
    controlPanel.querySelector('.soundsync__sync-button')?.addEventListener('click', resyncPlayedMusic);
    return controlPanel;
}

export const insertControlPanel = async (playlistHtml: HTMLElement | JQuery) => {
    // jQuery protection (to be compatible with foundry v12)
    if (!(playlistHtml instanceof HTMLElement)) {
        playlistHtml = (playlistHtml as JQuery)[0];
    }
    const playlistTabHeader = (playlistHtml as HTMLElement).querySelector('.directory-header');
    if (!playlistTabHeader) {
        console.error(formatLog("Failed to find playlists tab header"));
        return;
    }
    const controlPanel = await renderControlPanel();
    playlistTabHeader.appendChild(controlPanel);
}
