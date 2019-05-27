import React, { useEffect } from 'react';

export default function withNavigation(Search) {
  const navigationActionsMap = {
    'ArrowUp':   'onUp',
    'ArrowDown': 'onDown',
  };

  function SearchWithNavigation(props, ref) {
    // Functions
    function onNavigate(e) {
      const is = ref.current === document.activeElement;
      const has = ref.current.contains(document.activeElement);
      const isFocused = is || has;
      if (!isFocused) return;
      const action = navigationActionsMap[e.key];
      if (!action) return;
      props.actions[action]();
      e.preventDefault();
    }

    // Hooks
    useEffect(() => {
      document.addEventListener('keydown', onNavigate);
      return () => {
        document.removeEventListener('keydown', onNavigate);
      };
    });

    return (<Search {...props} ref={ref} />);
  }

  return React.forwardRef(SearchWithNavigation);
};
