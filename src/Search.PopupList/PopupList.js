import React from 'react';

import List from './List';
import Item from './Item';

export default function PopupList(props) {
  const { actions, available, withNavigation } = props;
  const listActions = {
    ...actions,
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
          withNavigation={withNavigation}
        />
      ))}
    </List>
  );
};
