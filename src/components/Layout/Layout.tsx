import React, { ReactChild } from 'react';

const Layout = ({ children }: { children: ReactChild }) => {
  return (
    <div>
      <header>Header</header>
      {children}
      <footer>Footer</footer>
    </div>
  );
};

export default Layout;
