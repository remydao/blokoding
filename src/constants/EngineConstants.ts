import { Dimensions } from 'react-native';

const EngineConstants = {
    MAX_WIDTH: Dimensions.get("screen").width,
    MAX_HEIGHT: Dimensions.get("screen").height,
    NUM_CELLS_SHOWN: 3,
    CELL_SIZE: Dimensions.get("screen").width / 3,
}

export default EngineConstants;