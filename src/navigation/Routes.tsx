import React from 'react';

import {App as WatermarkApp} from 'scenes/watermark/App';
import {DummyComponentForTest} from 'components';

const SHOW_DUMMY_COMPONENT = false;

interface RoutesProps {}
export const Routes: React.FC<RoutesProps> = ({}) => {
  if (SHOW_DUMMY_COMPONENT) {
    return <DummyComponentForTest />;
  }

  return <WatermarkApp />;
};
