import React from 'react';

const visibilityMap = new Map()
  .set(true,  'visible')
  .set(false, 'hidden')
;

const wrapperMap = {
  normal:   React.Fragment,
  selected: 'b',
};

export default function PopupList(props) {
  const visibility = visibilityMap.get(props.available);
  return (
    <ul
      style={{ visibility }}
    >
      {props.items.map(item => {
        const displayName = item.split.map(token => {
          const Wrapper = wrapperMap.get(token.type);
          return (
            <Wrapper>
              {token.text}
            </Wrapper>
          );
        });
        return (
          <li
            key={item.name}
          >
            <a href={item.name}>{displayName}</a>
          </li>
        );
      })}
    </ul>  
  );
};
