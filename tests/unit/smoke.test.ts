import { describe, expect, it } from 'vitest';

describe('foundation smoke', () => {
  it('arithmetic still works (sanity check for vitest wiring)', () => {
    expect(1 + 1).toBe(2);
  });
});
