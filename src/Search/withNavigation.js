import React, { useEffect } from 'react';

export default function withNavigation(Component) {
  const navigationActionsMap = {
    'ArrowUp':   'onUp',
    'ArrowDown': 'onDown',
  };

  return React.forwardRef((props, ref) => {
    // Functions
    function onNavigate(e) {
      const isFocused = document.activeElement === ref.current;
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

    return (<Component {...props} ref={ref} />);
  });
};
