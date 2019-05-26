import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';

const visibilityMap = new Map()
  .set(true,  'visible')
  .set(false, 'hidden')
;

function Reset(props, ref) {
  const visibility = visibilityMap.get(props.available);
  return (
    <IconButton
      ref={ref}
      style={{ visibility }}
      onClick={e => props.actions.onClick(e)}
    >
      <CancelIcon />
    </IconButton>
  );
};

export default React.forwardRef(Reset);
