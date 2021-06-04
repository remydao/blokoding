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
import { Characters, Environments } from '../src/constants/BlockType';
import { JumpBlock, MoveBlock } from '../src/scripts/blocks/ActionBlock';
import { ForBlock, WhileBlock } from '../src/scripts/blocks/InstructionBlock';
import { DataBlock } from '../src/scripts/blocks/DataBlock';
import { IsInFrontBlock } from '../src/scripts/blocks/ConditionBlock';

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