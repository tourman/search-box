import React, { useRef, useEffect } from 'react';

export default function withFocus(Search) {
  function SearchWithFocus(props, ref) {
    const inputRef = useRef();
    useEffect(() => {
      inputRef.current.focus();
    }, [ props.input.focusCounter ])
    return (<Search {...props} inputRef={inputRef} ref={ref} />);
  }

  return React.forwardRef(SearchWithFocus);
};
