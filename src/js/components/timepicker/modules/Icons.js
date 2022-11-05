export const icons = (() => {
    const icons = [
        {
            name: "clock",
            paths: [
                {
                    d: "M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z",
                },
                {
                    d: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z",
                },
            ],
        },
    ];

    const createIcon = (icon) => {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", `${icon.width || 16}`);
        svg.setAttribute("height", `${icon.height || 16}`);
        svg.setAttribute("fill", "currentColor");
        svg.setAttribute("viewBox", `0 0 ${icon.width || 16} ${icon.height || 16}`);
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

        icon.paths.forEach((path) => {
            const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
            if (path.fillRule) {
                pathElement.setAttribute("fill-rule", path.fillRule);
            }
            pathElement.setAttribute("d", path.d);
            svg.appendChild(pathElement);
        });

        return svg;
    };

    const get = (name) => {
        const icon = icons.find((icon) => icon.name === name);
        if (!icon) {
            return null;
        }
        return createIcon(icon);
    };

    return {
        get,
    };
})();
