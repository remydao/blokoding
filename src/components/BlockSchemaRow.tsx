import React, {Component} from 'react';
import { View, StyleSheet, ImagePropTypes } from 'react-native';
import { BlockType } from '../constants/BlockType';
import EngineConstants from '../constants/EngineConstants';
import BlockSchemaItem from './BlockSchemaItem';

interface IProps {
    itemList: JSX.Element[]
}

interface IState {

}

export default class BlockSchemaRow extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.props.itemList[0].props.blockType = BlockType.Action;
    }

    render() {
        return (
            <View style={styles.row}>
                { this.props.itemList }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row'
    }
});