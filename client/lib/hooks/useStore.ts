import { useMemo } from 'react';
import { initializeStore } from 'store';

function useStore(initialState: any) {
  return useMemo(() => initializeStore(initialState), [initialState]);
}

export default useStore;
