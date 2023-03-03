const getDefaultChatBackgroundValue = async () => {
    let svg = await (await fetch("../static/media/default-chat-bg.svg")).text();
    svg = svg.replace(/\>[\t\s\n ]+\</g, "><"); // replace all BETWEEN tags
    svg = svg.replace(/#/g, "%23");
    svg = svg.replace(/"/g, "'");
    let color = getComputedStyle(document.body).getPropertyValue("--accent-primary");
    let style = `<style>.s0{fill:rgba(${color}, 0.2)}</style>`;
    svg = svg.replace("</svg>",style + `</svg>`);
    return `url("data:image/svg+xml;charset=UTF-8,${svg}")`;
}
