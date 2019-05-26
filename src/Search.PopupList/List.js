import React from 'react';

const visibilityMap = new Map()
  .set(true,  'visible')
  .set(false, 'hidden')
;

export default function List(props) {
  const visibility = visibilityMap.get(props.available);
  return (
    <ul
      style={{
        visibility,
        height: 200,
        width: 200,
        overflowY: 'auto',
      }}
    >
      {props.children}
    </ul>
  );
};
