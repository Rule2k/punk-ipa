import React, { useEffect } from 'react';
import Loader from './Loader';

interface LoadingProps {
  loading: boolean;
}
const Loadable =
  <P extends object>(
    WrappedComponent: React.ComponentType<P>
  ): React.FC<P & LoadingProps> =>
  ({ loading, ...props }: LoadingProps) => {
    return loading ? <Loader /> : <WrappedComponent {...(props as P)} />;
  };

export default Loadable;
