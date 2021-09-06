import React, {Component} from 'react';
import { View, StyleSheet, ImagePropTypes } from 'react-native';
import EngineConstants from '../constants/EngineConstants';
import CharacterBlock from '../scripts/blocks/CharacterBlock';
import BlockSchemaItem from './BlockSchemaItem';
import BlockSchemaRow from './BlockSchemaRow';


interface IProps {
    blockList: JSX.Element[]
}

interface IState {

}

export default class BlockSchema extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                { this.props.blockList }
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