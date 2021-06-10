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
import { ForBlock, IfBlock, WhileBlock } from '../src/scripts/blocks/InstructionBlock';
import { DataBlock } from '../src/scripts/blocks/DataBlock';
import { IsInFrontBlock, IsOnBlock } from '../src/scripts/blocks/ConditionBlock';

jest.mock('react-native-permissions', () => jest.requireActual('../node_modules/react-native-permissions/mock').default)
jest.mock('@sentry/react-native', () => ({ init: () => jest.fn() }));


it('Character alone', () => {
  const ocr = [{text: 'Bart'}];
  const blocks = parseInit(ocr);

  expect(blocks).toBeInstanceOf(CharacterBlock);
  expect(blocks.character).toBe(Characters.Bart);
  expect(blocks.nextBlock).toBe(null);
})

it('Simple jump', () => {
  const ocr = [{text: "Kevin"}, {text: "Sauter"}]
  const blocks = parseInit(ocr);

  expect(blocks).toBeInstanceOf(CharacterBlock);
  expect(blocks.character).toBe(Characters.Kevin);
  expect(blocks.nextBlock).toBeInstanceOf(JumpBlock);
  expect(blocks.nextBlock.nextBlock).toBe(null);
});

it('Missing character', () => {
  const ocr = [{text: "Avancer"}]
  expect(() => {
    parseInit(ocr);
  }).toThrow(); 
})

it('Missing instruction end', () => {
  const ocr = [{text: "Charlie"}, {text: "Repeter"}, {text: "10"}, {text: "Sauter"}]
  expect(() => {
    parseInit(ocr);
  }).toThrow(); 
})

it('Missing number', () => {
  const ocr = [{text: "Charlie"}, {text: "Repeter"}, {text: "AvanCER"}, {text: "FIN"}]
  expect(() => {
    parseInit(ocr);
  }).toThrow(); 
})

it('Simple for', () => {
  const ocr = [{text: "Charlie"}, {text: "Repeter"}, {text: "10"}, {text: "AvanCER"}, {text: "FIN"}]
  const blocks = parseInit(ocr);

  expect(blocks).toBeInstanceOf(CharacterBlock);
  expect(blocks.character).toBe(Characters.Charlie);
  
  const forBlock = blocks.nextBlock;

  expect(forBlock).toBeInstanceOf(ForBlock);
  expect(forBlock.predicateBlock).toBeInstanceOf(DataBlock);
  expect(forBlock.predicateBlock.value).toBe(10);
  expect(forBlock.execBlock).toBeInstanceOf(MoveBlock);
  expect(forBlock.execBlock.nextBlock).toBe(null);
  expect(forBlock.nextBlock).toBe(null);
})

it('Simple for corrector', () => {
  const ocr = [{text: "Charlie"}, {text: "Repeeter"}, {text: "10"}, {text: "AvanCE"}, {text: "FIN"}]
  const blocks = parseInit(ocr);

  expect(blocks).toBeInstanceOf(CharacterBlock);
  expect(blocks.character).toBe(Characters.Charlie);
  
  const forBlock = blocks.nextBlock;

  expect(forBlock).toBeInstanceOf(ForBlock);
  expect(forBlock.predicateBlock).toBeInstanceOf(DataBlock);
  expect(forBlock.predicateBlock.value).toBe(10);
  expect(forBlock.execBlock).toBeInstanceOf(MoveBlock);
  expect(forBlock.execBlock.nextBlock).toBe(null);
  expect(forBlock.nextBlock).toBe(null);
})

it('Simple While', () => {
  const ocr = [{text: "cyclops"}, {text: "tant que"}, {text: "etre devant"}, {text: "flaque"}, {text: "avancer"}, {text: "  fin  "}]
  const blocks = parseInit(ocr);

  expect(blocks).toBeInstanceOf(CharacterBlock);
  expect(blocks.character).toBe(Characters.Cyclops);

  const whileBlock = blocks.nextBlock;

  expect(whileBlock).toBeInstanceOf(WhileBlock);
  
  const predicateBlock = whileBlock.predicateBlock;
  
  expect(predicateBlock).toBeInstanceOf(IsInFrontBlock);
  expect(predicateBlock.entityBlock).toBeInstanceOf(DataBlock);
  expect(predicateBlock.entityBlock.value).toBe(Environments.Puddle);
  
  const execBlock = whileBlock.execBlock;

  expect(execBlock).toBeInstanceOf(MoveBlock);
  expect(execBlock.nextBlock).toBe(null);

  expect(whileBlock.nextBlock).toBe(null)
})

it('Simple While corrector', () => {
  const ocr = [{text: "cyclops"}, {text: "tantque"}, {text: "etre dvant"}, {text: "fllaque"}, {text: "avanceer"}, {text: "  fin  "}]
  const blocks = parseInit(ocr);

  expect(blocks).toBeInstanceOf(CharacterBlock);
  expect(blocks.character).toBe(Characters.Cyclops);

  const whileBlock = blocks.nextBlock;

  expect(whileBlock).toBeInstanceOf(WhileBlock);
  
  const predicateBlock = whileBlock.predicateBlock;
  
  expect(predicateBlock).toBeInstanceOf(IsInFrontBlock);
  expect(predicateBlock.entityBlock).toBeInstanceOf(DataBlock);
  expect(predicateBlock.entityBlock.value).toBe(Environments.Puddle);
  
  const execBlock = whileBlock.execBlock;

  expect(execBlock).toBeInstanceOf(MoveBlock);
  expect(execBlock.nextBlock).toBe(null);

  expect(whileBlock.nextBlock).toBe(null)
})

it('Simple If', () => {
  const ocr = [{text: "cyclops"}, {text: "Si"}, {text: "etre devant"}, {text: "flaque"}, {text: "avancer"}, {text: 'sauter'}, {text: "  fin  "}]
  const blocks = parseInit(ocr);

  expect(blocks).toBeInstanceOf(CharacterBlock);
  expect(blocks.character).toBe(Characters.Cyclops);

  const ifBlock = blocks.nextBlock;

  expect(ifBlock).toBeInstanceOf(IfBlock);
  
  const predicateBlock = ifBlock.predicateBlock;
  
  expect(predicateBlock).toBeInstanceOf(IsInFrontBlock);
  expect(predicateBlock.entityBlock).toBeInstanceOf(DataBlock);
  expect(predicateBlock.entityBlock.value).toBe(Environments.Puddle);
  
  const moveBlock = ifBlock.execBlock;

  expect(moveBlock).toBeInstanceOf(MoveBlock);

  const jumpBlock = moveBlock.nextBlock;
  expect(jumpBlock).toBeInstanceOf(JumpBlock);
  expect(jumpBlock.nextBlock).toBe(null);
  
  expect(ifBlock.nextBlock).toBe(null)
})

it('Simple If corrector', () => {
  const ocr = [{text: "cyclops"}, {text: "Sl"}, {text: "etredevant"}, {text: "flaqu"}, {text: "avanccer"}, {text: 'sauer'}, {text: "  fin  "}]
  const blocks = parseInit(ocr);

  expect(blocks).toBeInstanceOf(CharacterBlock);
  expect(blocks.character).toBe(Characters.Cyclops);

  const ifBlock = blocks.nextBlock;

  expect(ifBlock).toBeInstanceOf(IfBlock);
  
  const predicateBlock = ifBlock.predicateBlock;
  
  expect(predicateBlock).toBeInstanceOf(IsInFrontBlock);
  expect(predicateBlock.entityBlock).toBeInstanceOf(DataBlock);
  expect(predicateBlock.entityBlock.value).toBe(Environments.Puddle);
  
  const moveBlock = ifBlock.execBlock;

  expect(moveBlock).toBeInstanceOf(MoveBlock);

  const jumpBlock = moveBlock.nextBlock;
  expect(jumpBlock).toBeInstanceOf(JumpBlock);
  expect(jumpBlock.nextBlock).toBe(null);
  
  expect(ifBlock.nextBlock).toBe(null)
})

it('Simple For and If', () => {
  const ocr = [{text: "bart"}, {text: "repeter"}, {text: "10"}, {text: "avancer"}, {text: "si"}, {text: 'etre sur'}, {text: "cle"}, {text: "ramasser"}, {text: "fin "}, {text: "  fin"}]
  const blocks = parseInit(ocr);

  expect(blocks).toBeInstanceOf(CharacterBlock);
  expect(blocks.character).toBe(Characters.Bart);

  const forBlock = blocks.nextBlock;

  expect(forBlock).toBeInstanceOf(ForBlock);
  expect(forBlock.predicateBlock).toBeInstanceOf(DataBlock);
  expect(forBlock.predicateBlock.value).toBe(10);

  const execBlock = forBlock.execBlock;
  expect(execBlock).toBeInstanceOf(MoveBlock);

  const ifBlock = execBlock.nextBlock;
  expect(ifBlock).toBeInstanceOf(IfBlock);
  expect(ifBlock.predicateBlock).toBeInstanceOf(IsOnBlock);
  expect(ifBlock.predicateBlock.entityBlock).toBeInstanceOf(DataBlock);
  expect(ifBlock.predicateBlock.entityBlock.value).toBe(Items.Key);

  expect(ifBlock.execBlock).toBeInstanceOf(GrabBlock);
  expect(ifBlock.execBlock.nextBlock).toBe(null);

  expect(forBlock.nextBlock).toBe(null);
})

it('Simple For and If corrector', () => {
  const ocr = [{text: "bart"}, {text: "repetr"}, {text: "10"}, {text: "avanceer"}, {text: "si"}, {text: 'etre ur'}, {text: "clee"}, {text: "ramassser"}, {text: "fin "}, {text: "  fin"}]
  const blocks = parseInit(ocr);

  expect(blocks).toBeInstanceOf(CharacterBlock);
  expect(blocks.character).toBe(Characters.Bart);

  const forBlock = blocks.nextBlock;

  expect(forBlock).toBeInstanceOf(ForBlock);
  expect(forBlock.predicateBlock).toBeInstanceOf(DataBlock);
  expect(forBlock.predicateBlock.value).toBe(10);

  const execBlock = forBlock.execBlock;
  expect(execBlock).toBeInstanceOf(MoveBlock);

  const ifBlock = execBlock.nextBlock;
  expect(ifBlock).toBeInstanceOf(IfBlock);
  expect(ifBlock.predicateBlock).toBeInstanceOf(IsOnBlock);
  expect(ifBlock.predicateBlock.entityBlock).toBeInstanceOf(DataBlock);
  expect(ifBlock.predicateBlock.entityBlock.value).toBe(Items.Key);

  expect(ifBlock.execBlock).toBeInstanceOf(GrabBlock);
  expect(ifBlock.execBlock.nextBlock).toBe(null);

  expect(forBlock.nextBlock).toBe(null);
})