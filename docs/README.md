# colibri

ajax proxy v2

## pnpm monorepo

```shell
# 全局依赖
pnpm install typescript -D -W
# 局部依赖
pnpm install -D rollup -r --filter colibri-lib
# link 机制
pnpm install coli-lib -r --filter shell-chrome
# 启动与开发
# 一个 monorepo 往往是一个整体的项目，所以我们需要同时执行多个指令，在 pnpm 中，可以通过-C进行配置
pnpm -C ./packages/colibri-lib watch & pnpm -C ./packages/shell-chrome dev
```
