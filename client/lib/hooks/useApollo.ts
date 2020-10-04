import initializeApollo from 'lib/apollo';
import { useMemo } from 'react';

function useGraphQLClient(initialState: any) {
  return useMemo(() => initializeApollo(initialState), [initialState]);
}

export default useGraphQLClient;
