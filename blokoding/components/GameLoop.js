import EngineConstants from '../constants/EngineConstants'

const GameLoop = (entities, { touches, events, dispatch }) => {
    let bg0 = entities.background0;
    let bg1 = entities.background1;
    let player = entities.player;

    if (player.isMoving)
    {
        // Move background 0
        bg0.position[0] -= 1;
        if (bg0.position[0] + EngineConstants.MAX_WIDTH < 0)
            bg0.position[0] += EngineConstants.MAX_WIDTH * 2;



        // Move background 1
        bg1.position[0] -= 1;
        if (bg1.position[0] + EngineConstants.MAX_WIDTH < 0)
            bg1.position[0] += EngineConstants.MAX_WIDTH * 2;
    
        console.log("bg0 pos x: " + bg0.position[0] + " w: " + bg0.width + "       bg1 pos x: " + bg1.position[0] + " w: " + bg1.width);
    }

    return entities;
}

export { GameLoop };