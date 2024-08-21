# Git 常用命令

## 1.初始化一个 Git 仓库

### 初始化 Git 仓库

```bash
git init
```

## 2. 拉取代码(自己玩)

第一次:

### 克隆一个 Git 仓库

```bash
git clone '仓库地址'
```

之后, 拉取他人代码:

```bash
git pull --rebase
```

## 3.提交代码

### 1. 查看仓库状态

红色字体代表有更改, 绿色字体代表已经加入缓存区(看第三步).

```bash
git status
```

### 2. 将文件添加到缓存区

分为指定文件和全部文件两种方式:

指定文件:

```bash
git add '文件路径'
```

所有文件:

```bash
git add .
```

#### 忽略某些文件

```bash
git stash -u -k
```

#### 取消忽略某些文件

```bash
git stash pop
```

### 3. 添加提交说明

```bash
git commit -m "提交说明"
```

添加完成后, 可以再次执行 `git status` 命令查看仓库状态.

### 4. 提交代码到远程仓库

::: warning
提交代码前一定要先拉取他人代码解决冲突.
:::

```bash
git push origin '本地分支名' : '远程分支名'
```

## 4.分支命令

### 1. 创建分支

```bash
git branch '分支名'
```

### 2. 切换分支

```bash
git checkout '分支名'
```

### 3. 合并分支

```bash
git merge '分支名'
```

### 4. 删除分支

```bash
git branch -d '分支名'
```

## 恢复命令

### 打印提交历史

```bash
git log
```

q 退出

### 清除缓存区

所有文件

```bash
git rm -r --cached .
```

指定文件

```bash
git rm --cached '文件路径'
```

### 回到之前的版本

上一个版本:

```bash
git reset --hard HEAD^
```

上上一个版本:

```bash
git reset --hard HEAD^^
```

指定版本:

```bash
git reset --hard '版本号'
```

这里的版本号可以用 `git log` 命令查看.

## 其他命令

### 1. 查看配置信息

```bash
git config --list
```

### 2. 设置用户名和邮箱

```bash
git config --global user.name '用户名'
git config --global user.email '邮箱'
```

### 3. 查看帮助信息

```bash
git help
```

### 4. 显示当前 Git 版本

```bash
git --version
```

### 5. 显示当前 Git 仓库的远程仓库信息

```bash
git remote -v
```

### 6. 显示当前 Git 仓库的提交历史统计信息

```bash
git shortlog
```

### 7. 显示当前 Git 仓库的提交历史统计信息(按提交者)

```bash
git shortlog -sne
```

## 快捷命令配置

1. 打开 访达 , cmd + shift + G , 输入 `~/.zshrc`, 编辑器打开此文件.

```bash
# git
alias ga="git add"
alias gaa="git add ."
alias gm="git commit -m"
alias gs="git status"
alias gpo="git push origin"
alias gpr="git pull --rebase"
alias gsu="git stash -u"
alias gspop="git stash pop"

# pnpm 快捷
alias p="pnpm"
alias pd="pnpm run dev"
alias pb="pnpm run build"
alias psb="pnpm run storybook"
alias pdoc="pnpm run docs:dev"
alias pdocb="pnpm run docs:build"
```

2. 修改后保存文件, 并在终端执行 `source ~/.zshrc` 命令使配置生效.

```bash
source ~/.zshrc
```
