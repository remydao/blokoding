import Cells from "./Cells";
import Themes from "./Themes";

export default Maps = {
    level1:{
        theme: Themes.Workshop,
        map: ["W"] 
    },
    level2:{
        theme: Themes.Workshop,
        map: ["e", "W"] 
    },
    foret1: {
        theme: Themes.Workshop,
        map: [Cells.Empty, Cells.Bush, Cells.Key, Cells.Empty, Cells.Key, Cells.Empty, Cells.Empty, Cells.Win] 
    },
    foret2: {
        theme: Themes.Forest,
        map: ["e", "e", "e", "e", "e", "e", "e", "W"]
    }
}
