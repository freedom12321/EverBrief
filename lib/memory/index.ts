import type { MemoryAdapter } from './adapter';
import { MockMemoryAdapter } from './mock-adapter';
import { EverMemOSAdapter } from './evermemos-adapter';

let memoryAdapter: MemoryAdapter;

export function getMemoryAdapter(): MemoryAdapter {
  if (memoryAdapter) {
    return memoryAdapter;
  }

  const apiKey = process.env.EVERMEM_API_KEY;
  const baseUrl = process.env.EVERMEM_BASE_URL;

  if (apiKey && baseUrl) {
    console.log('Using EverMemOS adapter');
    memoryAdapter = new EverMemOSAdapter({ apiKey, baseUrl });
  } else {
    console.log('Using Mock adapter (EverMemOS credentials not found)');
    memoryAdapter = new MockMemoryAdapter();
  }

  return memoryAdapter;
}

export type { MemoryAdapter } from './adapter';
export { MockMemoryAdapter, EverMemOSAdapter };
