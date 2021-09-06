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
    [BlockType.Character]: {
        inactive: '#FC5958',
        active: '#FC5958'
    },
    [BlockType.Action]: {
        inactive: '#FCF47B',
        active: '#FFF802'
    },
    [BlockType.Instruction]: {
        inactive: '#77FCE1',
        active: '#19DABB'
    },
    [BlockType.SecondaryInstruction]: {
        inactive: '#77FCE1',
        active: '#19DABB'
    },
    [BlockType.Condition]: {
        inactive: '#FFA26A',
        active: '#FF9557'
    },
    [BlockType.Item]: {
        inactive: '#7A7CBA',
        active: Colors.dark_turquoise
    }, 
    [BlockType.Environment]: {
        inactive: '#39E083',
        active: Colors.dark_turquoise
    },
    [BlockType.Number]: {
        inactive: '#F5ADAB',
        active: '#FC5958'
    }
};

export default class BlockSchemaItem extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    render() {
        const colorData = blockColors[this.props.blockType];
        return (<View style={[styles.item, {backgroundColor: this.props.active ? colorData.active : colorData.inactive}]} />)
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