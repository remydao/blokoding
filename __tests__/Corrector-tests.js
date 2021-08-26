import 'react-native';
import React from 'react';
import App from '../App';


// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import jestConfig from '../jest.config';
import { checkVisionResp, dropProblematicTokens } from '../src/scripts/corrector/corrector';
import { Actions, Characters, Instructions } from '../src/constants/BlockType';

jest.mock('react-native-permissions', () => jest.requireActual('../node_modules/react-native-permissions/mock').default)
jest.mock('@sentry/react-native', () => ({ init: () => jest.fn() }));

it('Corrector simple', () => {
    const ocr = 'bar';
    const res = checkVisionResp(ocr, Object.values(Characters));
  
    expect(res).toStrictEqual('bart');
});

it('Corrector medium', () => {
    const ocr = 'repeeter'
    const res = checkVisionResp(ocr, Object.values(Instructions));
  
    expect(res).toStrictEqual('repeter');
})

it('Corrector hard', () => {
    const ocr = 'sauter_';
    const res = checkVisionResp(ocr, Object.values(Actions));

    expect(res).toStrictEqual('sauter');
})


it('Corrector fin with instructions', () => {
    const ocr = 'fin';
    const res = checkVisionResp(ocr, Object.values(Instructions));

    expect(res).toBe(null);
})


it('Corrector problematic tokens', () => {
    const ocr = [{text: "x"}, {text: "Bart"}];

    const res = dropProblematicTokens(ocr);

    expect(res.length).toBe(1);
    expect(res[0].text).toStrictEqual('Bart');
})