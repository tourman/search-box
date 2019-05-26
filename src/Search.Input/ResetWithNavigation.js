import React, { useRef } from 'react';

import ResetPres from './Reset';

export default function ResetWithNavigation(props) {
  const ref = useRef();
  const Reset = props.withNavigation(ResetPres);
  return (<Reset {...props} ref={ref} />);
};
