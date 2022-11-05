import InputTime from "./InputTime";
import Panel from "./Panel";
import Time from "./Time";
import Picker from "./Picker";

class Timepicker {
    constructor(data) {
        Object.assign(this, data);

        this.init();
    }

    init() {
        this.inputTime = new InputTime({
            label: this.label,
            input: this.input,
            error: this.error,
            message: this.message,
            onFocus: () => {
                this.panel.open();
                this.picker.render();
                this.panel.render(this.picker.get());
            },
            onBlur: () => {},
        });

        this.panel = new Panel({
            input: this.inputTime,
            onOpen: () => {
                this.inputTime.blur();
            },
            onClose: () => {
                this.inputTime.handleBlur();
                this.time.reset();
                this.picker.destroy();
            },
        });

        this.time = new Time({
            value: this.input.value,
        });

        this.picker = new Picker({
            time: this.time,
            onCancel: () => {
                this.panel.close();
            },
            onAccept: () => {
                this.time.clear();
                this.time.setSelected();
                this.time.set();
                this.panel.close();
                this.inputTime.setValue(this.time.toString());

                this.onSelect(this.time.toString());
            },
        });
    }

    get() {
        return this.inputTime.get();
    }

    getValue() {
        return this.inputTime.getValue();
    }

    setValue(value) {
        this.inputTime.setValue(value);
        this.time.setValue(value);
    }

    destroy() {
        this.inputTime.destroy();
        this.panel.destroy();
        this.time.destroy();
        this.picker.destroy();

        delete this;
    }
}

export default Timepicker;
