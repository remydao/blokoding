import React, {Component} from 'react';
import { View, StyleSheet, ImagePropTypes } from 'react-native';
import EngineConstants from '../constants/EngineConstants';
import CharacterBlock from '../scripts/blocks/CharacterBlock';


interface IProps {
    actions: CharacterBlock
}

interface IState {

}

export default class BlockSchema extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    render() {

        const blockList = [];
        let actions = this.props.actions;
        while (actions) {
            console.log("test");
            blockList.push((<View style={styles.block} />));
            actions = actions.nextBlock;
        }

        return (
            <View style={styles.container}>
                { blockList }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: EngineConstants.MAX_HEIGHT * 0.02,
        left: EngineConstants.MAX_HEIGHT * 0.02,
        zIndex: 1
    },
    block: {
        height: 30,
        width: 30,
        borderRadius: 10,
        margin: 2.5,
        backgroundColor: 'black'
    }
});