import React from 'react';

const visibilityMap = new Map()
  .set(true,  'visible')
  .set(false, 'hidden')
;

export default function Reset(props) {
  const visibility = visibilityMap.get(props.available);
  return (
    <button
      style={{ visibility }}
      onClick={e => props.actions.onClick(e)}
    >
      Reset
    </button>
  );
};
