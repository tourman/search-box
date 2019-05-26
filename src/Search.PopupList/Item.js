import React from 'react';
import { flowRight } from '../helpers';

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
  .set('normal', React.Fragment)
  .set('selected', 'b')
;

function Item(props, ref) {
  const { selected } = props;
  const classes = styles();
  const displayName = props.split.map((token, index) => {
    const Wrapper = wrapperMap.get(token.type);
    return (
      <Wrapper
        key={index}
        className={classes.selected}
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

export default flowRight([
  withNavigation,
  React.forwardRef,
])(Item);
