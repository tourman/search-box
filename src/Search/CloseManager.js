import React, { useRef, useEffect } from 'react';

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
  const preventCloseRef = useRef(false);
  useEffect(() => {
    document.addEventListener('click', onClick);
    document.addEventListener('keyup', onEscape);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keyup', onEscape);
    };
  });

  // Functions
  function onPreventClose() {
    preventCloseRef.current = true;
  }
  function onEscape(e) {
    const esc = ['Esc', 'Escape'].indexOf(e.key);
    if (!~esc) return;
    props.actions.onClose();
  }
  function onClick() {
    preventCloseRef.current || props.actions.onClose();
    preventCloseRef.current = false;
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
