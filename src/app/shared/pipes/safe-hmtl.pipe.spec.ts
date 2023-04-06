import { SafeHmtlPipe } from './safe-hmtl.pipe';

describe('SafeHmtlPipe', () => {
  it('create an instance', () => {
    const pipe = new SafeHmtlPipe();
    expect(pipe).toBeTruthy();
  });
});
