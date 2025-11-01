// Configure DOM matchers to work in Vitest
import '@testing-library/jest-dom/vitest';

declare const globalThis: {
  qTest: boolean;
  qRuntimeQrl: boolean;
  qDev: boolean;
  qInspector: boolean;
};

// These have to run before qdev.ts loads. `beforeAll` is too late
globalThis.qTest = false; // Forces Qwik to run as if it was in a Browser
globalThis.qRuntimeQrl = true;
globalThis.qDev = true;
globalThis.qInspector = false;
