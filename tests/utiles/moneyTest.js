import { currencyFormating } from '../../scripts/utils/utitility.js';

describe('test suite : format currency', () => {
  it('converts cents into dollers', () => {
    expect(currencyFormating(2005)).toEqual('20.05');
  });

  it('works with 0', () => {
    expect(currencyFormating(0)).toEqual('0.00');
  });

  it('rounds up to the nearst cent', () => {
    expect(currencyFormating(2000.5)).toEqual('20.01');
  });
});