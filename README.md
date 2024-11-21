# 个人博客系统


## 项目结构

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   ├── pages/
│   ├── plugins/
│   ├── store/
│   ├── styles/
│   ├── utils/
│   └── config.json
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

网站配置保存在 `config.json` 文件。

## 命令

| Command        | Action                                       |
| :------------- | :------------------------------------------- |
| `npm i`       | 安装依赖                        |
| `npm dev`     | 启动开发环境 `localhost:4321`  |
| `npm build`   | 打包到 `./dist/`      |
| `npm preview` | 部署前的本地预览 |
| `npm format`  | 使用 Prettier 格式化代码                   |
