import React from 'react';

const visibilityMap = new Map()
  .set(true,  'visible')
  .set(false, 'hidden')
;

export default function BusyIndicator(props) {
  const visibility = visibilityMap.get(props.busy);
  return (
    <span
      style={{ visibility }}
    >
      Loading...
    </span>
  );
};
