import React from 'react';

import List from './List';
import Item from './Item';

export default function PopupList(props) {
  const { actions, available } = props;
  const listActions = {
    ...actions,
    onClick(e) {
      props.actions.onPreventClose(e);
    },
  };
  const itemActions = {
    ...actions,
    onClick({ name }) {
      props.actions.onSelect({ name });
      props.actions.onFocus();
    },
  };
  return (
    <List
      available={available}
      actions={listActions}
    >
      {props.items.map(item => (
        <Item
          {...item}
          actions={itemActions}
          key={item.name}
        />
      ))}
    </List>
  );
};
