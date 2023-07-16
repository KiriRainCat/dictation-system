# 柒夜雨猫的简易雅思写作信息默写系统 ~(｡≧3≦)ﾉ ⌒☆

此系统包含了：

- 默写列表预览
- 可选择性的进行默写
- 默写字数统计
- 自动批改结果（根据文本相似度计算）
- 待增加... 咕咕咕~

---

## 推荐的 IDE 设置

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)（最好使用 Take Over 模式，关闭 VsCode 自带的 TS/JS 支持）

## 安装依赖

```sh
npm install
```

### 启动 Vite Dev 服务器

```sh
npm run dev
```

### 检查类型 & 打包生产环境文件

```sh
npm run build
```

### 使用 [Cypress](https://www.cypress.io/) 进行组件测试

```sh
npm run test:unit
```

### 使用 [Cypress](https://www.cypress.io/) 进行 e2e 测试

```sh
npm run test:e2e
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e:prod
```

### 使用 [Prettier](https://prettier.io/) 进行格式化

```sh
npm run format
```

### 使用 [ESLint](https://eslint.org/) 代码规范检查

```sh
npm run lint
```
