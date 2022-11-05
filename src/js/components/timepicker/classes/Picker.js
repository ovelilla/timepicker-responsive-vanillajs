import Hourspicker from "./Hourspicker";
import Minutespicker from "./Minutespicker";

class Picker {
    constructor(data) {
        Object.assign(this, data);
    }

    init() {
        this.picker = this.create();
    }

    get() {
        return this.picker;
    }

    render() {
        this.destroy();
        this.init();
    }

    create() {
        const picker = document.createElement("div");
        picker.classList.add("picker");

        const body = document.createElement("div");
        body.classList.add("body");
        picker.appendChild(body);

        this.hourspicker = new Hourspicker({
            time: this.time,
        });
        body.appendChild(this.hourspicker.get());

        this.minutespicker = new Minutespicker({
            time: this.time,
        });
        body.appendChild(this.minutespicker.get());


        const footer = document.createElement("footer");
        picker.appendChild(footer);

        this.cancelBtn = document.createElement("button");
        this.cancelBtn.textContent = "Cancelar";
        this.cancelBtn.ariaLabel = "Cancelar";
        this.cancelBtn.addEventListener("click", () => {
            this.onCancel();
        });
        footer.appendChild(this.cancelBtn);

        this.acceptBtn = document.createElement("button");
        this.acceptBtn.textContent = "Aceptar";
        this.acceptBtn.ariaLabel = "Aceptar";
        this.acceptBtn.addEventListener("click", () => {
            this.onAccept("hola");
        });
        footer.appendChild(this.acceptBtn);

        return picker;
    }
  
    destroy() {
        if (this.picker) {
            this.picker.remove();
        }
    }
}

export default Picker;
