import { generateSidebar } from 'vitepress-sidebar';
import { nav, headMenuLabel } from './navs.json';

const navs = {};
const sidebars = {};

const langMap = new Map(headMenuLabel.map((item) => [item.id, item]));

nav.forEach((item, index) => {
  const langObj = langMap.get(item.text);

  for (const lang in langObj) {
    if (lang !== 'id') {
      const newObj = { ...item, text: langObj[lang] };
      if (item.link) {
        newObj.link = `${lang === 'zh' ? '' : `/${lang}`}${item.link}`;
        newObj.isChildrenMenu = item.isChildrenMenu;
      }
      if (Array.isArray(navs[lang])) {
        navs[lang].push(newObj);
      } else {
        navs[lang] = [newObj];
      }
    }
  }
});

for (const lang in navs) {
  if (lang !== 'zh') {
    sidebars[lang] = setSidebar(navs[lang]);
  } else {
    sidebars[lang] = setSidebar(nav);
  }
}

function setSidebar(nav) {
  let sidebars = {};
  nav.forEach((item, index) => {
    const { text, link, isChildrenMenu } = item;

    if (!link) return;

    const scanStartPath = link.slice(1);
    const resolvePath = link;
    const menuName = link.split('/')[link.split('/').length - 1];
    const SidebarItemObj = {
      documentRootPath: '/docs',
      scanStartPath,
      resolvePath,
      useTitleFromFileHeading: true,
      useTitleFromFrontmatter: true,
      useFolderTitleFromIndexFile: true,
      useFolderLinkFromIndexFile: true,
      folderLinkNotIncludesFileName: true,
      sortMenusByFrontmatterDate: true, // 启用日期排序
      sortMenusOrderByDescending: true // 升序
    };
    const SidebarObj = {
      [link]: {
        base: link,
        items: isChildrenMenu
          ? []
          : [
              {
                text: 'README',
                items: generateSidebar(SidebarItemObj)
              }
            ]
      }
    };

    sidebars = {
      ...sidebars,
      ...SidebarObj
    };
  });

  return sidebars;
}

export { navs, sidebars };
