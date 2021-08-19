import React from 'react';

interface Props {
  height?: string;
}

const Loader = ({ height }: Props) => {
  return (
    <div {...(height ? { style: { height: height } } : {})}>Loading !</div>
  );
};

export default Loader;
