import { expect } from 'chai';
import { applyOperation } from '../../src/services/operationalTransform.js';

describe('Operational Transform', () => {
  it('applies an insert operation', () => {
    const out = applyOperation('abc', { type: 'insert', index: 1, text: 'X' });
    expect(out).to.equal('aXbc');
  });

  it('applies a delete operation', () => {
    const out = applyOperation('abcd', { type: 'delete', index: 1, length: 2 });
    expect(out).to.equal('ad');
  });
});