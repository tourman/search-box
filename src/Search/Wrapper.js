import React from 'react';

function SearchWrapper(props, ref) {
  return (
    <div ref={ref}>
      {props.children}
    </div>
  );
};

export default React.forwardRef(SearchWrapper);
