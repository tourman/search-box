import React from 'react';

const visibilityMap = new Map()
  .set(true,  'visible')
  .set(false, 'hidden')
;

function Reset(props, ref) {
  const visibility = visibilityMap.get(props.available);
  return (
    <button
      ref={ref}
      style={{ visibility }}
      onClick={e => props.actions.onClick(e)}
    >
      Reset
    </button>
  );
};

export default React.forwardRef(Reset);
