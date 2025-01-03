---
layout: page
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/16713018?v=4',
    name: 'mobytang',
    title: '联系人',
    links: [
      { icon: 'github', link: 'https://github.com/baobaomi900901' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      关于我们
    </template>
    <template #lead>
      KingAutomate 是一个自动化工具集，旨在帮助开发者提升工作效率，提升软件质量，提升软件交付效率。
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>
