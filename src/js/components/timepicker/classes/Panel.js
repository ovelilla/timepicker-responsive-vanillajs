import { tools } from "../modules/Tools";

class Panel {
    constructor(data) {
        Object.assign(this, data);

        this.isOpen = false;
        this.isClose = false;
    }

    async open() {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        this.timepicker = this.create();
        document.body.appendChild(this.timepicker);

        this.onOpen();
        this.position();

        this.timepicker.classList.add("in");
        await tools.animationend(this.timepicker);
    }

    render(el) {
        this.timepicker.firstChild.appendChild(el);
    }

    create() {
        const timepicker = document.createElement("div");
        timepicker.classList.add("timepicker");
        timepicker.addEventListener("mousedown", this.checkClose.bind(this));
        timepicker.addEventListener("touchstart", this.checkClose.bind(this), { passive: true });
        timepicker.addEventListener("click", () => {
            if (this.isClose) {
                this.close();
            }
        });
        this.resize = this.handleResize.bind(this);
        window.addEventListener("resize", this.resize);

        const content = document.createElement("div");
        content.classList.add("content");
        content.addEventListener("click", (e) => e.stopPropagation());
        timepicker.appendChild(content);

        return timepicker;
    }

    position() {
        if (document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)) {
            document.body.classList.add("noscroll");
        }

        const input = this.input.get();
        const rect = input.getBoundingClientRect();

        if (innerWidth < 768) {
            this.timepicker.firstChild.removeAttribute("style");
            return;
        }

        this.observer = new MutationObserver(() => {
            if (rect.top + this.timepicker.firstChild.offsetHeight + input.offsetHeight > window.innerHeight) {
                this.timepicker.firstChild.style.top = `${rect.top - this.timepicker.firstChild.offsetHeight - 4}px`;
            } else {
                this.timepicker.firstChild.style.top = `${rect.top + input.offsetHeight + 2}px`;
            }
        });
        this.observer.observe(this.timepicker.firstChild, { attributes: true });

        this.timepicker.firstChild.style.left = `${rect.left}px`;
        this.timepicker.firstChild.style.width = `${rect.width}px`;
    }

    checkClose(e) {
        if (e.target === this.timepicker) {
            this.isClose = true;
        }
    }

    async close() {
        this.isOpen = false;
        this.isClose = false;

        document.body.classList.remove("noscroll");
        this.timepicker.classList.add("out");

        await tools.animationend(this.timepicker);

        this.onClose();
        this.destroy();
    }

    handleResize() {
        this.position();
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        window.removeEventListener("resize", this.resize);
        this.timepicker.remove();
    }
}

export default Panel;
