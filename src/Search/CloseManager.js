import React, { useEffect } from 'react';

function extendChildrenToPreventClose({ props, onPreventClose }) {
  return React.Children.map(props.children, child => React.cloneElement(
    child,
    {
      actions: {
        ...child.props.actions,
        onPreventClose,
      },
    }
  ));
};

export default function CloseManager(props) {
  // Hooks
  useEffect(() => {
    document.addEventListener('click', onClick);
    document.addEventListener('keyup', onEscape);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keyup', onEscape);
    };
  });

  // Functions
  function onClose() {
    props.actions.onFocus();
    props.actions.onClose();
  }
  function onPreventClose(e) {
    e.nativeEvent.stopImmediatePropagation();
  }
  function onEscape(e) {
    const esc = ['Esc', 'Escape'].indexOf(e.key);
    if (!~esc) return;
    onClose();
  }
  function onClick() {
    onClose();
  }

  // Arrange
  const children = extendChildrenToPreventClose({
    props,
    onPreventClose,
  });

  return (
    <>
      {children}
    </>
  );
};
