import React from 'react';

const visibilityMap = new Map()
  .set(true,  'visible')
  .set(false, 'hidden')
;

export default function List(props) {
  const visibility = visibilityMap.get(props.available);
  return (
    <ul
      style={{ visibility }}
      onClick={e => props.actions.onClick(e)}
    >
      {props.children}
    </ul>
  );
};
