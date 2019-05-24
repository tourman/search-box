import React from 'react';
import Item from './Item';

const visibilityMap = new Map()
  .set(true,  'visible')
  .set(false, 'hidden')
;

export default function PopupList(props) {
  const visibility = visibilityMap.get(props.available);
  const { actions } = props;
  return (
    <ul
      style={{ visibility }}
      onClick={e => props.actions.onPreventClose(e)}
    >
      {props.items.map(item => (
        <Item
          {...item}
          actions={actions}
          key={item.name}
        />
      ))}
    </ul>  
  );
};
