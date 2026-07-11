import { headers } from 'next/headers';

/**
 * Reads the nonce from the request headers set by proxy.ts
 * This is used in Server Components to access the per-request nonce
 */
export async function getNonce(): Promise<string> {
  const headersList = await headers();
  return headersList.get('x-nonce') || '';
}
