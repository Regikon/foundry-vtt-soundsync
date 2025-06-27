export const formatLog = (msg: string) => {
    return `Foundry VTT Sound Sync | ${msg}.`;
}

export const htmlToNode = (html: string) => {
    const template = document.createElement('template');
    template.innerHTML = html;
    if (template.content.childNodes.length < 1) {
        throw new Error("HTML must be a single node");
    }
    return template.content.firstChild as HTMLElement;
}
