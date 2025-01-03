import DefaultTheme from 'vitepress/theme';
import './custom.css';
import '~/tailwind.css';
import IframeResizer from '@iframe-resizer/vue/iframe-resizer.vue';
import { KswIcon } from 'ksw-vue-icon';

// export default {
//   extends: DefaultTheme,
//   enhanceApp({ app }) {
//     // 注册自定义全局组件
//     app.component("IframeResizer", IframeResizer);
//   },
// };

import { h } from 'vue';
import type { Theme } from 'vitepress';
// 1. import vitepress theme
import escookTheme from '@escook/vitepress-theme';
// 2. import matching CSS styles (this step cannot be omitted)
import '@escook/vitepress-theme/style.css';
// import your custom styles
import './style.css';

import { Container } from '../plugin/container/index';
import DocTitle from '../components/DocTitle.vue';

/*
 *  npm
 */
import install from '@ksware/ksw-ux';
import '@ksware/ksw-ux/kingsware-ui/style.css';

export default {
  ...DefaultTheme,
  // 3. specify the theme to inherit and perform secondary extensions based on this theme
  extends: escookTheme,
  Layout: () => {
    return h(escookTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp(ctx) {
    // expand custom features...
    ctx.app.use(install);
    ctx.app.use(KswIcon);
    ctx.app.component('demo-preview', Container);
    ctx.app.component('DocTitle', DocTitle);
  }
} satisfies Theme;
