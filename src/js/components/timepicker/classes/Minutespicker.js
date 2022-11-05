class Minutespicker {
    constructor(data) {
        Object.assign(this, data);

        this.isMove = false;

        this.init();
    }

    init() {
        this.minutespicker = this.create();
    }

    get() {
        return this.minutespicker;
    }

    render() {
        this.destroy();
        this.init();
    }

    create() {
        const minutespicker = document.createElement("div");
        minutespicker.classList.add("column", "right");
        minutespicker.addEventListener("mousedown", this.handleStart.bind(this));
        minutespicker.addEventListener("touchstart", this.handleStart.bind(this), { passive: true });

        const viewerRight = document.createElement("div");
        viewerRight.classList.add("viewer");
        minutespicker.appendChild(viewerRight);

        this.minutesEl = document.createElement("div");
        this.minutesEl.classList.add("minutes");
        viewerRight.appendChild(this.minutesEl);

        this.time.minutes.get().forEach((minute) => {
            const minuteEl = document.createElement("div");
            minuteEl.classList.add("minute", minute.type);
            minuteEl.textContent = minute.minute.toString().padStart(2, "0");
            this.minutesEl.appendChild(minuteEl);
        });

        return minutespicker;
    }

    handleStart(e) {
        this.isMove = true;

        this.move = this.handleMove.bind(this);
        this.end = this.handleEnd.bind(this);

        document.addEventListener("mousemove", this.move);
        document.addEventListener("touchmove", this.move, { passive: true });
        document.addEventListener("mouseup", this.end);
        document.addEventListener("touchend", this.end, { passive: true });

        const y = e.clientY ?? e.touches[0].clientY;

        this.startY = y;
        this.currentY = y;
        this.startTop = this.minutesEl.offsetTop;

        this.startTime = new Date();

        this.reset();
    }

    handleMove(e) {
        if (!this.isMove) {
            return;
        }

        const y = e.clientY ?? e.touches[0].clientY;

        this.currentMoveY = y - this.currentY;
        this.totalMoveY = y - this.startY;

        this.paint();
    }

    handleEnd() {
        if (!this.isMove) {
            return;
        }

        this.isMove = false;

        this.minutesEl.style.top = `${this.startTop}px`;

        this.endTime = new Date();
        this.elapsedTime = this.endTime.getTime() - this.startTime.getTime();
        this.pixelsPerTime = Math.abs(this.totalMoveY / this.elapsedTime);
        this.directionY = Math.sign(this.totalMoveY / this.elapsedTime);

        requestAnimationFrame(this.loop.bind(this));

        document.removeEventListener("mousemove", this.move);
        document.removeEventListener("touchmove", this.move);
        document.removeEventListener("mouseup", this.end);
        document.removeEventListener("touchend", this.end);
    }

    loop(timeStamp) {
        if (this.isMove) {
            return;
        }

        if (!this.oldTimeStamp) {
            this.oldTimeStamp = timeStamp;
        }

        this.timePassed = timeStamp - this.oldTimeStamp;
        this.oldTimeStamp = timeStamp;

        this.currentMoveY += this.pixelsPerTime * this.timePassed * this.directionY;
        this.reduction = this.reduction * this.reductionRatio;
        this.pixelsPerTime = this.pixelsPerTime - this.reduction;

        this.paint();

        if (this.pixelsPerTime < 0) {
            this.minutesEl.style.top = -100 + "px";
            return;
        }

        requestAnimationFrame(this.loop.bind(this));
    }

    paint() {
        this.minutesEl.style.top = `${this.startTop + this.currentMoveY}px`;

        const top = this.minutesEl.offsetTop;

        if (top < -130) {
            this.minutesEl.appendChild(this.minutesEl.firstChild);
            this.time.minutes.next();
        }

        if (top > -70) {
            this.minutesEl.prepend(this.minutesEl.lastChild);
            this.time.minutes.prev();
        }

        if (top < -130 || top > -70) {
            this.minutesEl.style.top = -100 + "px";

            this.currentY = this.currentY + this.currentMoveY;
            this.currentMoveY = 0;

            this.minutesEl.childNodes.forEach((el, i) => {
                el.classList.remove("prev-last", "prev", "current", "next", "next-last", "hidden");
                el.classList.add(this.time.minutes.get()[i].type);
            });
        }
    }

    reset() {
        this.currentMoveY = 0;
        this.totalMoveY = 0;
        this.oldTimeStamp = null;
        this.reduction = 0.01;
        this.reductionRatio = 1.02;
    }

    destroy() {
        if (this.minutespicker) {
            this.minutespicker.remove();
        }
    }
}

export default Minutespicker;
