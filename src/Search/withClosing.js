import React, { useRef, useEffect } from 'react';

export default function withClosing(Search) {
  return function SearchWithClosing(props) {
    const { onClose } = props.actions;
    const ref = useRef();

    function onClick(e) {
      const is = ref.current === e.target;
      const has = ref.current.contains(e.target);
      if (is || has) return;
      onClose();
    }
    function onEscape(e) {
      const esc = ['Esc', 'Escape'].indexOf(e.key);
      if (!~esc) return;
      onClose();
    }

    useEffect(() => {
      document.addEventListener('keyup', onEscape);
      document.addEventListener('click', onClick);
      return () => {
        document.removeEventListener('keyup', onEscape);
        document.removeEventListener('click', onClick);
      };
    });

    return (<Search {...props} ref={ref} />);
  };
};
