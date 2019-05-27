import React, { useEffect, useRef } from 'react';

export default function withNavigation(Item) {
  return function ItemWithNavigation(props) {
    const { selected } = props;
    const ref = useRef();
    useEffect(() => {
      if (!selected) return;
      ref.current.focus();
    }, [ selected ]);
    return (<Item {...props} ref={ref} />);
  };
};
