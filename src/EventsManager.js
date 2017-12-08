export default class EventsManager{
    constructor(canvas) {
        this.canvas = canvas;
        this.bind = [];
        this.actions = [];
        this.mouse_x = 0;
        this.mouse_y = 0;
        this.onMousePressed = false;
        this.cursorPositionChanged = false;
    }

    setup() {
        //console.log('setup events manager');

        this.bind.push('cursorPositionChanged');
        this.bind.push('stopMove');

        this.actions.push(false);
        this.actions.push(false);

        //console.log(this.actions);
        //this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        //this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseDown.bind(this));
    }

    onMouseMove(e) {
        this.mouse_x = e.clientX;
        this.mouse_y = e.clientY;
        this.cursorPositionChanged = true;
    }

    onMouseDown(e) {
        console.log('mouse down');
        //console.log(this.actions);
        this.mouse_x = e.clientX;
        this.mouse_y = e.clientY;
        //this.actions[0] = true;
        //this.actions[1] = false;
        this.onMousePressed = true;
    }

    onMouseUp(e) {
        console.log('mouse up');
        this.mouse_x = e.clientX;
        this.mouse_y = e.clientY;
        //this.actions[0] = true;
        //this.actions[1] = false;
        this.onMousePressed = false;
    }
}