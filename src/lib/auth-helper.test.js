import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { authenticate, isAuthenticated, clearJWT } from './auth-helper.js';

describe('auth-helper unit tests', () => {
  beforeEach(() => {
    const store = {};
    vi.stubGlobal('localStorage', {
      getItem: (k) => (k in store ? store[k] : null),
      setItem: (k, v) => { store[k] = String(v); },
      removeItem: (k) => { delete store[k]; }
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('stores jwt on authenticate', () => {
    const payload = { token: 'abc123', user: { name: 'Czareena', role: 'admin' } };
    let called = false;
    authenticate(payload, () => { called = true; });
    expect(called).toBe(true);
    expect(isAuthenticated()).toEqual(payload);
  });

  it('returns false when no jwt exists', () => {
    expect(isAuthenticated()).toBe(false);
  });

  it('clears jwt on clearJWT', () => {
    authenticate({ token: 'x', user: { name: 'A' } }, () => {});
    clearJWT(() => {});
    expect(isAuthenticated()).toBe(false);
  });
});
