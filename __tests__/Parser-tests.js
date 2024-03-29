/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';


// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import jestConfig from '../jest.config';

import {parseInit} from '../src/scripts/parsing/Parser';
import CharacterBlock from '../src/scripts/blocks/CharacterBlock';
import { Characters, Environments, Items } from '../src/constants/BlockType';
import { GrabBlock, JumpBlock, MoveBlock } from '../src/scripts/blocks/ActionBlock';
import { ElIfBlock, ElseBlock, ForBlock, IfBlock, WhileBlock } from '../src/scripts/blocks/InstructionBlock';
import { EnvironmentBlock, ItemBlock, NumberBlock } from '../src/scripts/blocks/DataBlock';
import { IsInFrontBlock, IsOnBlock } from '../src/scripts/blocks/ConditionBlock';
const fr = require("../src/datas/translation.json").fr;

jest.mock('react-native-permissions', () => jest.requireActual('../node_modules/react-native-permissions/mock').default)
jest.mock('@sentry/react-native', () => ({ init: () => jest.fn() }));
jest.mock('react-native-sound', () => 'Sound')



it('Character alone', () => {
  const ocr = ['Bart'];
  const blocks = parseInit(ocr, fr)[0];

  expect(blocks).toBeInstanceOf(CharacterBlock);
  expect(blocks.character).toBe(Characters.Bart);
  expect(blocks.nextBlock).toBe(null);
})

it('Simple jump', () => {
  const ocr = ["Kevin", "Sauter"]
  const blocks = parseInit(ocr, fr)[0];

  expect(blocks).toBeInstanceOf(CharacterBlock);
  expect(blocks.character).toBe(Characters.Kevin);
  expect(blocks.nextBlock).toBeInstanceOf(JumpBlock);
  expect(blocks.nextBlock.nextBlock).toBe(null);
});

it('Missing character', () => {
  const ocr = ["Avancer"];
  expect(() => {
    parseInit(ocr, fr);
  }).toThrow(); 
})

it('Missing instruction end', () => {
  const ocr = ["Charlie", "Repeter", "10", "Sauter"];
  expect(() => {
    parseInit(ocr, fr);
  }).toThrow(); 
})

it('Missing number', () => {
  const ocr = ["Charlie", "Repeter", "Avancer", "fin instruction"];
  expect(() => {
    parseInit(ocr, fr);
  }).toThrow(); 
})

it('Simple for', () => {
  const ocr = ["Charlie", "Repeter", "10", "Avancer", "fin instruction"];
  const blocks = parseInit(ocr, fr)[0];

  expect(blocks).toBeInstanceOf(CharacterBlock);
  expect(blocks.character).toBe(Characters.Charlie);
  
  const forBlock = blocks.nextBlock;

  expect(forBlock).toBeInstanceOf(ForBlock);
  expect(forBlock.predicateBlock).toBeInstanceOf(NumberBlock);
  expect(forBlock.predicateBlock.value).toBe(10);
  expect(forBlock.execBlock).toBeInstanceOf(MoveBlock);
  expect(forBlock.execBlock.nextBlock).toBe(null);
  expect(forBlock.nextBlock).toBe(null);
})

it('Simple for corrector', () => {
  const ocr = ["Charlie", "Repeeter", "10", "AvanCE", "fin instruction"];
  const blocks = parseInit(ocr, fr)[0];

  expect(blocks).toBeInstanceOf(CharacterBlock);
  expect(blocks.character).toBe(Characters.Charlie);
  
  const forBlock = blocks.nextBlock;

  expect(forBlock).toBeInstanceOf(ForBlock);
  expect(forBlock.predicateBlock).toBeInstanceOf(NumberBlock);
  expect(forBlock.predicateBlock.value).toBe(10);
  expect(forBlock.execBlock).toBeInstanceOf(MoveBlock);
  expect(forBlock.execBlock.nextBlock).toBe(null);
  expect(forBlock.nextBlock).toBe(null);
})

it('Simple While', () => {
  const ocr = ["cyclops", "tant que", "etre devant", "flaque", "avancer", "fin instruction"];
  const blocks = parseInit(ocr, fr)[0];

  expect(blocks).toBeInstanceOf(CharacterBlock);
  expect(blocks.character).toBe(Characters.Cyclops);

  const whileBlock = blocks.nextBlock;

  expect(whileBlock).toBeInstanceOf(WhileBlock);
  
  const predicateBlock = whileBlock.predicateBlock;
  
  expect(predicateBlock).toBeInstanceOf(IsInFrontBlock);
  expect(predicateBlock.entityBlock).toBeInstanceOf(EnvironmentBlock);
  expect(predicateBlock.entityBlock.value).toBe(Environments.Puddle);
  
  const execBlock = whileBlock.execBlock;

  expect(execBlock).toBeInstanceOf(MoveBlock);
  expect(execBlock.nextBlock).toBe(null);

  expect(whileBlock.nextBlock).toBe(null)
})

it('Simple While corrector', () => {
  const ocr = ["cyclops", "tantque", "etre dvant", "fllaque", "avanceer", "fin instruction"];
  const blocks = parseInit(ocr, fr)[0];

  expect(blocks).toBeInstanceOf(CharacterBlock);
  expect(blocks.character).toBe(Characters.Cyclops);

  const whileBlock = blocks.nextBlock;

  expect(whileBlock).toBeInstanceOf(WhileBlock);
  
  const predicateBlock = whileBlock.predicateBlock;
  
  expect(predicateBlock).toBeInstanceOf(IsInFrontBlock);
  expect(predicateBlock.entityBlock).toBeInstanceOf(EnvironmentBlock);
  expect(predicateBlock.entityBlock.value).toBe(Environments.Puddle);
  
  const execBlock = whileBlock.execBlock;

  expect(execBlock).toBeInstanceOf(MoveBlock);
  expect(execBlock.nextBlock).toBe(null);

  expect(whileBlock.nextBlock).toBe(null)
})

it('Simple If', () => {
  const ocr = ["cyclops", "Si", "etre devant", "flaque", "avancer", 'sauter', "fin instruction"];
  const blocks = parseInit(ocr, fr)[0];

  expect(blocks).toBeInstanceOf(CharacterBlock);
  expect(blocks.character).toBe(Characters.Cyclops);

  const ifBlock = blocks.nextBlock;

  expect(ifBlock).toBeInstanceOf(IfBlock);
  
  const predicateBlock = ifBlock.predicateBlock;
  
  expect(predicateBlock).toBeInstanceOf(IsInFrontBlock);
  expect(predicateBlock.entityBlock).toBeInstanceOf(EnvironmentBlock);
  expect(predicateBlock.entityBlock.value).toBe(Environments.Puddle);
  
  const moveBlock = ifBlock.execBlock;

  expect(moveBlock).toBeInstanceOf(MoveBlock);

  const jumpBlock = moveBlock.nextBlock;
  expect(jumpBlock).toBeInstanceOf(JumpBlock);
  expect(jumpBlock.nextBlock).toBe(null);
  
  expect(ifBlock.nextBlock).toBe(null)
})

it('Simple If corrector', () => {
  const ocr = ["cyclops", "Sl", "etredevant", "flaqu", "avanccer", 'sauer', "fin instruction"];
  const blocks = parseInit(ocr, fr)[0];

  expect(blocks).toBeInstanceOf(CharacterBlock);
  expect(blocks.character).toBe(Characters.Cyclops);

  const ifBlock = blocks.nextBlock;

  expect(ifBlock).toBeInstanceOf(IfBlock);
  
  const predicateBlock = ifBlock.predicateBlock;
  
  expect(predicateBlock).toBeInstanceOf(IsInFrontBlock);
  expect(predicateBlock.entityBlock).toBeInstanceOf(EnvironmentBlock);
  expect(predicateBlock.entityBlock.value).toBe(Environments.Puddle);
  
  const moveBlock = ifBlock.execBlock;

  expect(moveBlock).toBeInstanceOf(MoveBlock);

  const jumpBlock = moveBlock.nextBlock;
  expect(jumpBlock).toBeInstanceOf(JumpBlock);
  expect(jumpBlock.nextBlock).toBe(null);
  
  expect(ifBlock.nextBlock).toBe(null)
})

it('Simple For and If', () => {
  const ocr = ["bart", "repeter", "10", "avancer", "si", 'etre  sur', "cle", "ramasser", "fin instruction", "fin instruction"];
  const blocks = parseInit(ocr, fr)[0];

  expect(blocks).toBeInstanceOf(CharacterBlock);
  expect(blocks.character).toBe(Characters.Bart);

  const forBlock = blocks.nextBlock;

  expect(forBlock).toBeInstanceOf(ForBlock);
  expect(forBlock.predicateBlock).toBeInstanceOf(NumberBlock);
  expect(forBlock.predicateBlock.value).toBe(10);

  const execBlock = forBlock.execBlock;
  expect(execBlock).toBeInstanceOf(MoveBlock);

  const ifBlock = execBlock.nextBlock;
  expect(ifBlock).toBeInstanceOf(IfBlock);
  expect(ifBlock.predicateBlock).toBeInstanceOf(IsOnBlock);
  expect(ifBlock.predicateBlock.entityBlock).toBeInstanceOf(ItemBlock);
  expect(ifBlock.predicateBlock.entityBlock.value).toBe(Items.Key);

  expect(ifBlock.execBlock).toBeInstanceOf(GrabBlock);
  expect(ifBlock.execBlock.nextBlock).toBe(null);

  expect(forBlock.nextBlock).toBe(null);
})

it('Simple For and If corrector', () => {
  const ocr = ["bart", "repetr", "10", "avanceer", "si", 'etre ur', "clee", "ramassser", "fin instruction", "fin instruction"];
  const blocks = parseInit(ocr, fr)[0];

  expect(blocks).toBeInstanceOf(CharacterBlock);
  expect(blocks.character).toBe(Characters.Bart);

  const forBlock = blocks.nextBlock;

  expect(forBlock).toBeInstanceOf(ForBlock);
  expect(forBlock.predicateBlock).toBeInstanceOf(NumberBlock);
  expect(forBlock.predicateBlock.value).toBe(10);

  const execBlock = forBlock.execBlock;
  expect(execBlock).toBeInstanceOf(MoveBlock);

  const ifBlock = execBlock.nextBlock;
  expect(ifBlock).toBeInstanceOf(IfBlock);
  expect(ifBlock.predicateBlock).toBeInstanceOf(IsOnBlock);
  expect(ifBlock.predicateBlock.entityBlock).toBeInstanceOf(ItemBlock);
  expect(ifBlock.predicateBlock.entityBlock.value).toBe(Items.Key);

  expect(ifBlock.execBlock).toBeInstanceOf(GrabBlock);
  expect(ifBlock.execBlock.nextBlock).toBe(null);

  expect(forBlock.nextBlock).toBe(null);
})

it ("Simple if elif", () => {
  const ocr = ["Bart", "si", "etre devant", "flaque", "sauter", "ou si", "etre sur", "cle", "ramasser", "fin instruction"];

  const blocks = parseInit(ocr, fr)[0];

  expect(blocks).toBeInstanceOf(CharacterBlock);
  expect(blocks.character).toBe(Characters.Bart);

  const ifBlock = blocks.nextBlock;
  expect(ifBlock).toBeInstanceOf(IfBlock);
  expect(ifBlock.predicateBlock).toBeInstanceOf(IsInFrontBlock);
  expect(ifBlock.predicateBlock.entityBlock).toBeInstanceOf(EnvironmentBlock);
  expect(ifBlock.predicateBlock.entityBlock.value).toBe(Environments.Puddle);

  expect(ifBlock.execBlock).toBeInstanceOf(JumpBlock);

  const nextIfBlock = ifBlock.nextIfBlock;

  expect(nextIfBlock).toBeInstanceOf(ElIfBlock);
  expect(nextIfBlock.predicateBlock).toBeInstanceOf(IsOnBlock);
  expect(nextIfBlock.predicateBlock.entityBlock).toBeInstanceOf(ItemBlock);
  expect(nextIfBlock.predicateBlock.entityBlock.value).toBe(Items.Key);

  expect(nextIfBlock.execBlock).toBeInstanceOf(GrabBlock);
})


it ("Simple if else", () => {
  const ocr = ["Bart", "si", "etre devant", "flaque", "sauter", "sinon", "ramasser", "fin instruction"];

  const blocks = parseInit(ocr, fr)[0];

  expect(blocks).toBeInstanceOf(CharacterBlock);
  expect(blocks.character).toBe(Characters.Bart);

  const ifBlock = blocks.nextBlock;
  expect(ifBlock).toBeInstanceOf(IfBlock);
  expect(ifBlock.predicateBlock).toBeInstanceOf(IsInFrontBlock);
  expect(ifBlock.predicateBlock.entityBlock).toBeInstanceOf(EnvironmentBlock);
  expect(ifBlock.predicateBlock.entityBlock.value).toBe(Environments.Puddle);

  expect(ifBlock.execBlock).toBeInstanceOf(JumpBlock);

  const elseBlock = ifBlock.nextIfBlock;

  expect(elseBlock).toBeInstanceOf(ElseBlock);
  expect(elseBlock.execBlock).toBeInstanceOf(GrabBlock);
})