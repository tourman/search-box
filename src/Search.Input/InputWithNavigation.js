import React, { useEffect } from 'react';

import InputPres from './Input';

function InputWithNavigation(props, ref) {
  const Input = props.withNavigation(InputPres);
  return (<Input {...props} ref={ref} />);
};

export default React.forwardRef(InputWithNavigation);
