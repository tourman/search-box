import React from 'react';

const wrapperMap = new Map()
  .set('normal', React.Fragment)
  .set('selected', 'b')
;

const backgroundMap = new Map()
  .set(true, '#f0f0f0')
;

function Item(props, ref) {
  const background = backgroundMap.get(props.selected);
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
      style={{ background }}
    >
      <a
        ref={ref}
        href={props.name}
        onClick={e => {
          e.preventDefault();
          const { name } = props;
          props.actions.onClick({ name });
        }}
      >
        {displayName}
      </a>
    </li>
  );
};

export default React.forwardRef(Item);
