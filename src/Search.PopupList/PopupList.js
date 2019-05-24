import React, { useRef, useEffect } from 'react';

const visibilityMap = new Map()
  .set(true,  'visible')
  .set(false, 'hidden')
;

const wrapperMap = new Map()
  .set('normal', React.Fragment)
  .set('selected', 'b')
;

export default function PopupList(props) {
  const allowCloseRef = useRef(true);
  function onEscape(e) {
    const esc = ['Esc', 'Escape'].indexOf(e.key);
    if (!~esc) return;
    props.actions.onClose();
  }
  function onClick() {
    allowCloseRef.current && props.actions.onClose();
    allowCloseRef.current = true;
  }
  useEffect(() => {
    document.addEventListener('click', onClick);
    document.addEventListener('keyup', onEscape);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keyup', onEscape);
    };
  });
  const visibility = visibilityMap.get(props.available);
  return (
    <ul
      style={{ visibility }}
      onClick={() => {
        allowCloseRef.current = false;
      }}
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
