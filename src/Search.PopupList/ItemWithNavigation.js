import React, { useEffect, useRef } from 'react';

import ItemPres from './Item';

export default function ItemWithNavigation(props) {
  const ref = useRef();
  useEffect(() => {
    if (!props.selected) return;
    ref.current.focus();
  });

  const Item = props.withNavigation(ItemPres);
  return (<Item {...props} ref={ref} />);
};
