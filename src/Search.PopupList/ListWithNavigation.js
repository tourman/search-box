import React, { useEffect } from 'react';

import List from './List';

const navigationActionsMap = {
  'ArrowUp':   'onUp',
  'ArrowDown': 'onDown',
};

export default function ListWithNavigation(props) {
  // Functions
  function onNavigate(e) {
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

  return (
    <List
      {...props}
    />
  );
};
