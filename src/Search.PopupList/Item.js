import React from 'react';

const wrapperMap = new Map()
  .set('normal', React.Fragment)
  .set('selected', 'b')
;

export default function Item(props) {
  const displayName = props.split.map((token, index) => {
    const Wrapper = wrapperMap.get(token.type);
    return (
      <Wrapper
        key={index}
      >
        {token.text}
      </Wrapper>
    );
  });
  return (
    <li
      key={props.name}
    >
      <a
        href={props.name}
        onClick={e => {
          e.preventDefault();
          const { name } = props;
          props.actions.onSelect({ name });
        }}
      >
        {displayName}
      </a>
    </li>
  );
};
