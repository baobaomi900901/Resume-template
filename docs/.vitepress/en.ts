import { defineConfig, defineConfigWithTheme } from 'vitepress';
import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';
const paragraphIds = require('./markdown-it-paragraph-ids.cjs');
import { generateSidebar } from 'vitepress-sidebar';

import MiniSearch from 'minisearch';
import escookConfig from '@escook/vitepress-theme/config';
import { containerPreview, componentPreview } from './plugin/demo-preview';
import { genApiDoc } from './plugin/api-doc.config';
import { setLanguage, nav, sidebar } from './setMenu.js';

const suffixes = (term, minLength) => {
  if (term == null) {
    return;
  }
  const tokens = [];
  for (let i = 0; i <= term.length - minLength; i++) {
    tokens.push(term.slice(i));
  }
  return tokens;
};

export default defineConfigWithTheme({
  // 3. specify the configuration to inherit via extended
  extends: escookConfig,
  lang: 'en',
  title: 'KingAutoMate',
  description: '个人知识站',
  vite: {
    plugins: [genApiDoc()],
    resolve: {
      // 自定义替换默认组件
      alias: [
        {
          find: /^.*\/VPLocalSearchBox\.vue$/,
          replacement: fileURLToPath(new URL('./components/MyCustomSearchBox.vue', import.meta.url))
        },
        {
          find: '~',
          replacement: path.resolve(__dirname, '../../')
        },
        {
          find: /^.*\/VPNavBarTitle\.vue$/,
          replacement: fileURLToPath(new URL('./components/CVPNavBarTitle.vue', import.meta.url))
        },
        {
          find: /^.*\/VPHome\.vue$/,
          replacement: fileURLToPath(new URL('./components/CVPHome.vue', import.meta.url))
        }
      ]
    },
    ssr: {
      noExternal: ['ksw-vue-icon', '@ksware/ksw-ux', 'vue-i18n']
    }
  },

  // 优化搜索引擎结果
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/klogo.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh' }],
    [
      'meta',
      {
        property: 'og:title',
        content: 'KSW Design | 基于 KSW Design 设计体系的 Vue3 组件库，用于研发企业级中后台产品。'
      }
    ],
    ['meta', { property: 'og:site_name', content: 'KSW Design' }]
    // ['meta', { property: 'og:image', content: 'https://vitepress.dev/vitepress-og.jpg' }],
    // ['meta', { property: 'og:url', content: 'https://vitepress.dev/' }],
    // ['script', { src: 'https://cdn.usefathom.com/script.js', 'data-site': 'AZBRSFGG', 'data-spa': 'auto', defer: '' }]
  ],

  themeConfig: {
    logo: { src: 'logo.png', width: 32, height: 32 },
    // omit other configuration items...
    // 社交链接
    socialLinks: [{ icon: 'github', link: 'https://github.com/baobaomi900901' }],

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    nav,

    outline: {
      level: 'deep',
      label: '页面导航'
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        },
        // disableDetailedView: true,
        detailedView: true,
        miniSearch: {
          options: {
            processTerm: (term) => suffixes(term, 2)
          },
          searchOptions: {
            processTerm: MiniSearch.getDefault('processTerm')
          }
        }
      }
    }

    // confetti: false,

    // musicBall: {
    //   src: "https://img3.tukuppt.com/newpreview_music/09/01/62/5c89fd22dea6948307.mp3",
    //   // visible: true, // 是否显示音乐图标
    //   // autoplay: true, // 是否自动播放
    // },
  },

  // locales: {
  //   root: {
  //     label: 'Chinese',
  //     lang: 'zh'
  //   },
  //   en: {
  //     label: 'English',
  //     lang: 'en'
  //   }
  // },

  cleanUrls: true,
  markdown: {
    config: (md) => {
      md.use(paragraphIds);
      md.use(containerPreview);
      md.use(componentPreview);
    }
  }
});
