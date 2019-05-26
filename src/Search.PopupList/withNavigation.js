import React, { useEffect, useRef } from 'react';

export default function withNavigation(Item) {
  return function ItemWithNavigation(props) {
    const ref = useRef();
    useEffect(() => {
      if (!props.selected) return;
      ref.current.focus();
    });
    return (<Item {...props} ref={ref} />);
  };
};
