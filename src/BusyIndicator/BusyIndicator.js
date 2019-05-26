import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

const busyMap = new Map()
  .set(true,  {
    Icon: CircularProgress,
    iconProps: {
      size: 24,
    },
  })
  .set(false, {
    Icon: SearchIcon,
    iconProps: {},
  })
;

export default function BusyIndicator(props) {
  const { Icon, iconProps } = busyMap.get(props.busy);
  return (
    <IconButton>
      <Icon {...iconProps} />
    </IconButton>
  );
};
