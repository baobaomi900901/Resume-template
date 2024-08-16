import { defineConfig } from "vitepress";
import { nav } from "./nav";
import { sidebar } from "./sidebar";
import paragraphIds from "./markdown-it-paragraph-ids.js";
import MiniSearch from "minisearch";
import { fileURLToPath, URL } from "node:url";
import path from "node:path";

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

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  srcDir: "docs",
  vite: {
    plugins: [],
    resolve: {
      alias: [
        {
          find: /^.*\/VPLocalSearchBox\.vue$/,
          replacement: fileURLToPath(
            new URL("./MyCustomSearchBox.vue", import.meta.url)
          ),
        },
        {
          find: "~",
          replacement: path.resolve(__dirname, "../../"),
        },
      ],
    },
    ssr: {
      noExternal: ["ksw-vue-icon"],
    },
  },
  themeConfig: {
    logo: "/logo.png",
    // 导航栏
    nav,
    sidebar,
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],

    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭",
            },
          },
        },
        // disableDetailedView: true,
        detailedView: true,
        miniSearch: {
          options: {
            processTerm: (term) => suffixes(term, 2),
          },
          searchOptions: {
            processTerm: MiniSearch.getDefault("processTerm"),
          },
        },
      },
    },
  },
  markdown: {
    image: {
      lazyLoading: true,
    },
    config: (md) => {
      md.use(paragraphIds);
    },
  },
});
