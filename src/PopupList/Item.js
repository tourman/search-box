import React from 'react';
import { flowRight } from '../helpers';
import shallowEqual from 'shallow-equal/objects';

import withNavigation from './withNavigation';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = makeStyles({
  selected: {
    fontWeight: 600,
    background: 'yellow',
  },
  item: {
    transition: 'none',
  },
});

const wrapperMap = new Map()
  .set('normal', {
    Wrapper: React.Fragment,
    getProps: () => ({}),
  })
  .set('selected', {
    Wrapper: 'b',
    getProps: ({ classes }) => ({
      className: classes.selected,
    }),
  })
;

function Item(props, ref) {
  const { selected } = props;
  const classes = styles();
  const displayName = props.split.map((token, index) => {
    const { Wrapper, getProps } = wrapperMap.get(token.type);
    const props = getProps({ classes });
    return (
      <Wrapper
        key={index}
        {...props}
      >
        {token.text}
      </Wrapper>
    );
  });
  return (
    <ListItem
      className={classes.item}
      button
      component="a"
      href={props.name}
      selected={selected}
      ref={ref}
      onClick={e => {
        e.preventDefault();
        const { name } = props;
        props.actions.onClick({ name });
      }}
    >
      <ListItemText>
        {displayName}
      </ListItemText>
    </ListItem>
  );
};

function areEqual({ actions: a, ...prevProps }, { actions: b, ...nextProps }) {
  return shallowEqual(prevProps, nextProps);
}

export default flowRight([
  Item => React.memo(Item, areEqual),
  withNavigation,
  React.forwardRef,
])(Item);
