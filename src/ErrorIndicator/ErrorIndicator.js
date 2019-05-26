import React from 'react';

const visibilityMap = new Map()
  .set(true,  'visible')
  .set(false, 'hidden')
;

export default function ErrorIndicator(props) {
  const { error } = props;
  const visibility = visibilityMap.get(!!error);
  return (
    <span
      style={{
        visibility,
        color: 'red',
      }}
    >
      {error}
    </span>
  );
};
