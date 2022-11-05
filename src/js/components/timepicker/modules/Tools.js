export const tools = (() => {
    const animationend = async (target) => {
        return new Promise((resolve) => {
            target.addEventListener("animationend", resolve, { once: true });
        });
    };

    return {
        animationend,
    };
})();
