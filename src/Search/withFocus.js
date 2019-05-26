import React, { useRef } from 'react';

export default function withFocus(Search) {
  function SearchWithFocus(props, ref) {
    const inputRef = useRef();
    const { actions } = props;
    actions.onFocus = () => inputRef.current.focus();
    return (<Search {...props} actions={actions} inputRef={inputRef} ref={ref} />);
  }

  return React.forwardRef(SearchWithFocus);
};
