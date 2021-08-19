import React, { useEffect } from 'react';
import Loader from './Loader';

interface LoadingProps {
  loading: boolean;
  height?: string;
}
const Loadable =
  <P extends object>(
    WrappedComponent: React.ComponentType<P>
  ): React.FC<P & LoadingProps> =>
  ({ loading, height, ...props }: LoadingProps) => {
    return loading ? (
      <Loader {...(height ? { height } : {})} />
    ) : (
      <WrappedComponent {...(props as P)} />
    );
  };

export default Loadable;
