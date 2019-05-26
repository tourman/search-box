import React, { useEffect } from 'react';

export default function withClosing(Search) {
  function SearchWithClosing(props, ref) {
    const { onClose } = props.actions;

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
  }

  return React.forwardRef(SearchWithClosing);
};
