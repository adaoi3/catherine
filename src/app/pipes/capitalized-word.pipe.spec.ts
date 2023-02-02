import { CapitalizedWordPipe } from './capitalized-word.pipe';

describe('CapitalizedWordPipe', () => {
  it('create an instance', () => {
    const pipe = new CapitalizedWordPipe();
    expect(pipe).toBeTruthy();
  });
});
