import React, { useRef } from 'react';

export default function withRef(Search) {
  return function SearchWithRef(props) {
    const ref = useRef();
    return (<Search {...props} ref={ref} />);
  };
};
