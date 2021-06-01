import Cells from "./Cells";
import Themes from "./Themes";

const Maps = {
    level1:{
        theme: Themes.Workshop,
        map: [Cells.Win]
    },
    level2:{
        theme: Themes.Workshop,
        map: [Cells.Empty, Cells.Win] 
    },
    foret1: {
        theme: Themes.Forest,
        map: [Cells.Empty, Cells.Key, Cells.Empty, Cells.Key, Cells.Empty, Cells.Puddle, Cells.Empty, Cells.Win]
    },
    foret2: {
        theme: Themes.Forest,
        map: [Cells.Empty, Cells.Puddle, Cells.Empty, Cells.Puddle, Cells.Empty, Cells.Puddle, Cells.Empty, Cells.Puddle, Cells.Win]
    }
}

export default Maps