import {IConfig} from 'umi-types';
import routes from './router';

// ref: https://umijs.org/config/
const config: IConfig = {
  base: '/ant',
  publicPath: '/ant/',
  treeShaking: true,
  routes: routes,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'ant',
      dll: false,
      routes: {
        exclude: [
          /components\//,
        ],
        hardSource: true
      },
    }],
  ],
}

export default config;
