import React, {Component} from 'react';
import { View, StyleSheet, ImagePropTypes } from 'react-native';
import { BlockType } from '../constants/BlockType';
import Colors from '../constants/Colors';
import EngineConstants from '../constants/EngineConstants';

interface IProps {
    blockType: BlockType,
    active: Boolean
}

interface IState {

}

const blockColors = {
    [BlockType.Character]: '#FC5958',
    [BlockType.Action]: '#FFF802',
    [BlockType.Instruction]: '#19DABB',
    [BlockType.SecondaryInstruction]: '#19DABB',
    [BlockType.Condition]: '#FF9557',
    [BlockType.Item]: '#6C63FF', 
    [BlockType.Environment]: '#39E083',
    [BlockType.Number]: '#F5ADAB',
};

export default class BlockSchemaItem extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    render() {
        // const colorData = blockColors[this.props.blockType];
        return (<View style={[styles.item, {backgroundColor: blockColors[this.props.blockType], opacity: this.props.active ? 1 : .4}]} />)
    }
}

const styles = StyleSheet.create({
    item: {
        height: 30,
        width: 30,
        borderRadius: 10,
        margin: 2.5,
    }
});