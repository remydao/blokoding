import 'react-native';
import React from 'react';
import App from '../App';


// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import jestConfig from '../jest.config';
import { modifyCoordinates } from '../src/scripts/corrector/coordinates';

jest.mock('react-native-permissions', () => jest.requireActual('../node_modules/react-native-permissions/mock').default)
jest.mock('@sentry/react-native', () => ({ init: () => jest.fn() }));

it('Coordinates simple', () => {
    var ocr = [{ "bounding": { "left": 1508, "top": 864}, "text": "Avancer" }, { "bounding": { "left": 848, "top": 961 }, "text": "Bart" }];
    modifyCoordinates(ocr);
  
    expect(ocr[0].text).toStrictEqual('Bart')
    expect(ocr[1].text).toStrictEqual('Avancer')
});

it('Coordinates not modified', () => {
    var ocr = [{ "bounding": { "left": 1508, "top": 400}, "text": "Avancer" }, { "bounding": { "left": 848, "top": 961 }, "text": "Bart" }];
    modifyCoordinates(ocr);
  
    expect(ocr[0].text).toStrictEqual('Avancer')
    expect(ocr[1].text).toStrictEqual('Bart')
});