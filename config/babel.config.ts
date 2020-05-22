/*
 * babel插件配置
 * @Author: ahwgs
 * @Date: 2020-05-23 01:15:34
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-05-23 01:54:22
 */

import path from 'path';
import hasha from 'hasha';

const generateScopedName = (name: string, filename: string) => {
  const hash = hasha(filename + name, { algorithm: 'md5' });
  const basename = path.basename(filename, '.less');
  return `${basename}-${name}-${hash.slice(0, 5)}`;
};

export default [
  [
    'react-css-modules',
    {
      generateScopedName,
      filetypes: {
        '.less': {
          syntax: 'postcss-less',
          plugins: ['postcss-nested'],
        },
      },
      autoResolveMultipleImports: true,
    },
  ],
  ['lodash'],
];
