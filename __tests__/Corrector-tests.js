import 'react-native';
import React from 'react';
import App from '../App';


// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import jestConfig from '../jest.config';
import { checkVisionResp } from '../src/scripts/corrector/corrector';

jest.mock('react-native-permissions', () => jest.requireActual('../node_modules/react-native-permissions/mock').default)
jest.mock('@sentry/react-native', () => ({ init: () => jest.fn() }));

it('Corrector simple', () => {
    const ocr = ['Bart', 'avanceer'];
    checkVisionResp(ocr, ['Bart', 'Avancer']);
  
    expect(ocr).toStrictEqual(['Bart', 'Avancer']);
});

it('Corrector medium', () => {
    const ocr = ['Bar', 'repaater', '10', 'Saute', 'etre devant', 'fiN'];
    checkVisionResp(ocr, ['Bart', 'Repeter', '10', 'Sauter', 'etre devant', 'fin']);
  
    expect(ocr).toStrictEqual(['Bart', 'Repeter', '10', 'Sauter', 'etre devant', 'fin']);
})

it('Corrector hard', () => {
    const ocr = ['Kev', 'AVANCER ', '50', 'Sauter_', "etre sur", 'fin', 'fin'];
    checkVisionResp(ocr, ['Kevin', 'Avancer', '50', 'Sauter', "etre sur", 'fin', 'fin'])

    expect(ocr).toStrictEqual(['Kevin', 'Avancer', '50', 'Sauter', "etre sur", 'fin', 'fin']);
})