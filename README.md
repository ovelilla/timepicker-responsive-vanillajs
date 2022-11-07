# timepicker-responsive-vanillajs
Responsive vanilla JavaScript timepicker


Demo: https://heroic-fenglisu-107281.netlify.app


![](timepicker.gif)


```
import Timepicker from "./components/timepicker";

const values = {
    // time: "2022-10-16 16:45:22",
    // time: "16:42:44",
    // time: "16:28",
    // time: new Date("2022-10-16"),
    // time: new Date("2022-10-16 16:19:10"),
    time: "",
};

const errors = {
    time: "",
};

const container = document.querySelector(".container");

const form = document.createElement("form");
form.classList.add("mio-form");
container.appendChild(form);

const timepicker = new Timepicker({
    label: {
        text: "Hora",
        for: "time",
    },
    input: {
        name: "time",
        id: "time",
        value: values.time,
        readOnly: true,
        format: "long",
    },
    error: errors.time.length > 0,
    message: errors.time,
    onSelect: (time) => {
        values.time = time;
        errors.time = "";
    },
});
form.appendChild(timepicker.get());
```
