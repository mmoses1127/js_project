import MovingObject from "./moving_object.js";


export default class Flame extends MovingObject {
    constructor(pos, game) {
        super({
            color: 'orange', 
            radius: 130, 
            vel: [0,0],
            pos: pos, 
            game: game
        });
        this.image = '../assets/imagery/flame_ball.gif';
    }
}