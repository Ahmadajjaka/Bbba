import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyNativeGoogleError } from './nativeGoogleAuth';

test('classifyNativeGoogleError detects user cancellation across CredentialManager and GMS codes', () => {
  assert.equal(
    classifyNativeGoogleError({ code: 'USER_CANCELED', message: 'User cancelled Google Sign-In' }).kind,
    'cancelled'
  );
  assert.equal(
    classifyNativeGoogleError({ code: 'GMS_12501', message: '12501: SIGN_IN_CANCELLED' }).kind,
    'cancelled'
  );
});

test('classifyNativeGoogleError detects SHA-1 / DEVELOPER_ERROR / missing idToken configuration issues', () => {
  assert.equal(
    classifyNativeGoogleError({
      code: 'DEVELOPER_ERROR',
      message: 'ApiException: 10 (DEVELOPER_ERROR) SHA-1',
    }).kind,
    'sha_or_config'
  );
  assert.equal(
    classifyNativeGoogleError({ code: 'MISSING_ID_TOKEN', message: 'Missing Google ID Token' }).kind,
    'sha_or_config'
  );
});

test('classifyNativeGoogleError detects network issues cleanly', () => {
  assert.equal(
    classifyNativeGoogleError({ code: 'NETWORK_ERROR', message: 'Network error during Google Sign-In' }).kind,
    'network'
  );
});
