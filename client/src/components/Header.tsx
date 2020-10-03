import Link from 'next/link';
import React, { memo } from 'react';

function Header() {
  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
      </nav>
    </header>
  );
}

export default memo(Header);
