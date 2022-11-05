import Hours from "./Hours.js";
import Minutes from "./Minutes.js";
import { dates } from "../modules/Dates.js";

class Time {
    constructor(data) {
        Object.assign(this, data);

        this.init();
    }

    init() {
        this.hours = new Hours();
        this.minutes = new Minutes();

        this.checkValue();
    }

    checkValue() {
        if (!this.value) {
            this.hours.init();
            this.minutes.init();
            return;
        }

        if (dates.isValidDate(this.value)) {
            this.hours.current = this.value.getHours();
            this.hours.selected = this.value.getHours();
            this.hours.set();

            this.minutes.current = this.value.getMinutes();
            this.minutes.selected = this.value.getMinutes();
            this.minutes.set();
            return;
        }

        if (this.value.includes("/") || this.value.includes("-")) {
            this.value = this.value.split(" ")[1];
        }

        if (!dates.isValidTime(this.value)) {
            this.hours.init();
            this.minutes.init();
            return;
        }

        if (this.value.includes(":")) {
            this.value = this.value.split(":");
        }

        if (this.value.length === 2 || this.value.length === 3) {
            this.hours.current = Number(this.value[0]);
            this.hours.selected = Number(this.value[0]);
            this.hours.set();

            this.minutes.current = Number(this.value[1]);
            this.minutes.selected = Number(this.value[1]);
            this.minutes.set();
        } else {
            this.hours.init();
            this.minutes.init();
        }
    }

    set() {
        this.hours.set();
        this.minutes.set();
    }

    setValue(value) {
        this.value = value;
        this.clear();
        this.checkValue();
    }

    setSelected() {
        this.hours.setSelected();
        this.minutes.setSelected();
    }

    reset() {
        this.hours.setCurrent();
        this.minutes.setCurrent();
    }

    clear() {
        this.hours.clear();
        this.minutes.clear();
    }

    toString() {
        return dates.timeToString(this.hours.current, this.minutes.current);
    }
}

export default Time;
