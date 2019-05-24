import React from 'react';

const visibilityMap = new Map()
  .set(true,  'visible')
  .set(false, 'hidden')
;

const wrapperMap = new Map()
  .set('normal', React.Fragment)
  .set('selected', 'b')
;

export default function PopupList(props) {
  const visibility = visibilityMap.get(props.available);
  return (
    <ul
      style={{ visibility }}
      onClick={e => props.actions.onPreventClose(e)}
    >
      {props.items.map(item => {
        const displayName = item.split.map((token, index) => {
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
            key={item.name}
          >
            <a
              href={item.name}
              onClick={e => {
                e.preventDefault();
                const { name } = item;
                props.actions.onSelect({ name });
              }}
            >
              {displayName}
            </a>
          </li>
        );
      })}
    </ul>  
  );
};
