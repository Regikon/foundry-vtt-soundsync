import { formatLog } from "./utils";

const CONTROL_PANEL_PATH = "modules/foundry-vtt-soundsync/templates/big_div.html";

export const setupUi = async () => {
    await loadTemplates([CONTROL_PANEL_PATH]);
}

export const insertControlPanel = async (playlistHtml: HTMLElement) => {
    const playlistTabHeader = playlistHtml.querySelector('.directory-header');
    if (!playlistTabHeader) {
        console.error(formatLog("Failed to find playlists tab header"));
        return;
    }
    const controlPanel = await renderTemplate(CONTROL_PANEL_PATH, {});
    playlistTabHeader.insertAdjacentHTML("beforeend", controlPanel);
}
