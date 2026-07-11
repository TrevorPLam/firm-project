"use client";

import { createContext, useContext } from 'react';

/**
 * React context for providing the nonce to Client Components
 * This is needed because Client Components cannot read headers directly
 */
const NonceContext = createContext<string>('');

/**
 * Provider component to make the nonce available to Client Components
 * Use this in a Server Component that has access to the nonce
 */
export function NonceProvider({ 
  nonce, 
  children 
}: { 
  nonce: string; 
  children: React.ReactNode 
}) {
  return <NonceContext.Provider value={nonce}>{children}</NonceContext.Provider>;
}

/**
 * Hook for Client Components to access the nonce
 * Returns empty string if used outside of NonceProvider
 */
export function useNonce(): string {
  return useContext(NonceContext);
}
