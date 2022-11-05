import Form from "./Form.js";
import IconButton from "./IconButton.js";
import { icons } from "../modules/Icons.js";
import { dates } from "../modules/Dates.js";

class InputTime extends Form {
    constructor(data) {
        super(data);

        Object.assign(this, data);

        this.isOpen = false;

        this.create();
    }

    create() {
        this.field = this.createField();
        this.wrapper = this.createWrapper();
        this.labelEl = this.createLabel();
        this.inputEl = this.createInput();

        this.field.appendChild(this.wrapper);
        this.wrapper.appendChild(this.labelEl);
        this.wrapper.appendChild(this.inputEl);

        if (this.message && !this.manualErrorHandling) {
            this.field.appendChild(this.createMessage());
        }

        const iconButtonPalette = new IconButton({
            type: "button",
            ariaLabel: "Icono calendario",
            buttonSize: "medium",
            svgSize: "medium",
            icon: icons.get("clock"),
            onClick: () => {
                this.inputEl.focus();
            },
        });

        const adornmentRight = iconButtonPalette.get();
        this.wrapper.appendChild(this.createAdornment(adornmentRight, "right"));
    }

    createInput() {
        const input = document.createElement("input");
        input.classList.add("mio-input");
        input.type = "text";
        input.name = this.input.name;
        input.id = this.input.id;
        input.value = this.formatValue();
        input.readOnly = true;

        if (this.input.placeholder) {
            input.placeholder = this.input.placeholder;
        }

        input.addEventListener("focus", this.handleFocus.bind(this));

        return input;
    }

    handleFocus() {
        this.field.classList.add("active");
        this.field.classList.add("focus");

        if (this.onFocus) {
            this.onFocus();
        }
    }

    handleBlur() {
        if (!this.input.value) {
            this.field.classList.remove("active");
        }
        this.field.classList.remove("focus");

        if (this.onBlur) {
            this.onBlur();
        }
    }

    setValue(value) {
        this.input.value = value;
        this.inputEl.value = this.formatValue();
        this.field.classList.add("active");
        this.removeMessage();
    }

    formatValue() {
        let value = this.input.value;

        if (!value) {
            return "";
        }

        if (dates.isValidDate(value)) {
            const hour = value.getHours();
            const minute = value.getMinutes();

            return dates.timeToString(hour, minute);
        }

        if (value.includes("/") || value.includes("-")) {
            value = value.split(" ")[1];
        }

        if (!dates.isValidTime(value)) {
            return "";
        }

        if (value.includes(":")) {
            value = value.split(":");
        }

        if (value.length === 2 || value.length === 3) {
            const hour = Number(value[0]);
            const minute = Number(value[1]);

            return dates.timeToString(hour, minute);
        } else {
            return "";
        }
    }
}

export default InputTime;
