export default class EventsManager{
    constructor(canvas) {
        this.canvas = canvas;
        this.mouse_x = 0;
        this.mouse_y = 0;
        this.cursorPositionChanged = false;
    }

    setup() {
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    }

    onMouseMove(e) {
        this.mouse_x = e.clientX;
        this.mouse_y = e.clientY;
        this.cursorPositionChanged = true;
    }
}