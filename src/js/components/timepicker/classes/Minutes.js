class Time {
    constructor(data) {
        Object.assign(this, data);

        this.minutes = [];

        this.current = null;
        this.selected = null;
    }

    init() {
        this.current = new Date().getMinutes();
        this.selected = new Date().getMinutes();

        this.set();
    }

    get() {
        return this.minutes;
    }

    set() {
        for (let i = 0; i < 60; i++) {
            let minute = (60 + i + this.selected - 4) % 60;
            let type = "hidden";

            if (minute === (60 + this.selected - 2) % 60) {
                type = "prev-last";
            } else if (minute === (60 + this.selected - 1) % 60) {
                type = "prev";
            } else if (minute === this.selected) {
                type = "current";
            } else if (minute === (60 + this.selected + 1) % 60) {
                type = "next";
            } else if (minute === (60 + this.selected + 2) % 60) {
                type = "next-last";
            }

            this.add({ minute, type });
        }
    }

    next() {
        this.current = (60 + this.current + 1) % 60;
    }

    prev() {
        this.current = (60 + this.current - 1) % 60;
    }

    getSelected() {
        return this.selected;
    }

    setSelected() {
        this.selected = this.current;
    }

    setCurrent() {
        this.current = this.selected;
    }

    add(minute) {
        this.minutes = [...this.minutes, minute];
    }

    clear() {
        this.minutes = [];
    }
}

export default Time;
