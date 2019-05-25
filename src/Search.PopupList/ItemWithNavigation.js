import React, { useEffect, useRef } from 'react';

import Item from './Item';

export default function ItemWithNavigation(props) {
  const ref = useRef();
  useEffect(() => {
    if (!props.selected) return;
    ref.current.focus();
  });

  return (
    <Item
      {...props}
      ref={ref}
    />
  );
};
