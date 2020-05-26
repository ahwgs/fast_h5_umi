import { createRef } from 'react';
import { NavigationBarOption } from '@/common/types';

export const navigationRef = createRef();

export const setOptions = (options: NavigationBarOption) => {
  navigationRef?.current?.setOption(options);
};
