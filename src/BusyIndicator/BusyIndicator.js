import React from 'react';

import SyncIcon from '@material-ui/icons/Sync';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

const busyMap = new Map()
  .set(true,  SyncIcon)
  .set(false, SearchIcon)
;

export default function BusyIndicator(props) {
  const Icon = busyMap.get(props.busy);
  return (
    <IconButton>
      <Icon />
    </IconButton>
  );
};
