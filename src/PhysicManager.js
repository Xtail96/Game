export default class PhysicManager {
    constructor() {

    }

    update(obj, gameManager) {

        //console.log('physics update');

        if(obj.move_x === 0 && obj.move_y === 0) {
            //console.log('stop');
            return;
        }

        //let new_x = obj.pos_x + Math.floor(obj.move_x * obj.speed);
        //let new_y = obj.pos_y + Math.floor(obj.move_y * obj.speed);

        let e = this.entityAtXY(obj, gameManager);
        if(e !== null) {
            obj.onTouchEntity(e, gameManager);
        }
    }

    entityAtXY(obj, gameManager) {
        //console.log(x + ' ' + y + ' ' + obj.pos_x + ' ' + obj.pos_y);
        for (let i = 0; i < gameManager.entities.length; i++) {
            let e = gameManager.entities[i];
            if(obj.name !== e.name) {
                let e_center_x = e.pos_x + e.size_x/2;
                let e_center_y = e.pos_y + e.size_y/2;

                if((e_center_x >= obj.pos_x) && (e_center_x <= obj.pos_x + obj.size_x) &&
                    (e_center_y >= obj.pos_y) && (e_center_y <= obj.pos_y + obj.size_y)) {
                    return e;
                }

            }
        }
        return null;
    }
}