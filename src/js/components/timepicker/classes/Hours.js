class Hours {
    constructor(data) {
        Object.assign(this, data);

        this.hours = [];

        this.current = null;
        this.selected = null;
    }

    init() {
        this.current = new Date().getHours();
        this.selected = new Date().getHours();

        this.set();
    }

    get() {
        return this.hours;
    }

    set() {
        for (let i = 0; i < 24; i++) {
            let hour = (24 + i + this.selected - 4) % 24;
            let type = "hidden";

            if (hour === (24 + this.selected - 2) % 24) {
                type = "prev-last";
            } else if (hour === (24 + this.selected - 1) % 24) {
                type = "prev";
            } else if (hour === this.selected) {
                type = "current";
            } else if (hour === (24 + this.selected + 1) % 24) {
                type = "next";
            } else if (hour === (24 + this.selected + 2) % 24) {
                type = "next-last";
            }

            this.add({ hour, type });
        }
    }

    next() {
        this.current = (24 + this.current + 1) % 24;
    }

    prev() {
        this.current = (24 + this.current - 1) % 24;
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

    add(hour) {
        this.hours = [...this.hours, hour];
    }

    clear() {
        this.hours = [];
    }
}

export default Hours;
