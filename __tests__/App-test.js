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
import { Characters } from '../src/constants/BlockType';
import { JumpBlock } from '../src/scripts/blocks/ActionBlock';

jest.mock('react-native-permissions', () => jest.requireActual('../node_modules/react-native-permissions/mock').default)

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
