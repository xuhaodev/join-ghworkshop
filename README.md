# GitHub Copilot Workshop 自助加入工具

这是一个使用 [Next.js](https://nextjs.org) 框架开发的应用，帮助用户快速获取 GitHub Copilot Business 的试用权限并加入工作坊。

## 应用功能

这个应用提供以下功能：

- **用户添加**: 允许用户通过输入 GitHub 用户名加入指定的 GitHub 组织团队
- **成员列表**: 展示已加入工作坊的所有成员，支持搜索筛选
- **操作指南**: 提供详细的图文操作指导，帮助用户完成注册流程
- **GitHub 团队管理**: 通过 GitHub API 自动发送团队邀请

## 开始使用

首先，运行开发服务器：

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
# 或
bun dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 用法指南

1. **输入 GitHub 用户名**: 在输入框中填写您的 GitHub 用户名（不是邮箱，不需要@符号）
2. **点击"加入工作坊"按钮**: 系统将向您的 GitHub 账户发送邀请
3. **接受邀请**:
   - 进入 GitHub.com，在组织页面中选择您被邀请的组织
   - 在组织页面中找到邀请后点击"接受邀请"
   - 点击"加入"完成加入流程（不用勾选 Ask for...）
4. **开始使用**: 在您的代码编辑器中安装 GitHub Copilot 插件，登录 GitHub 账户后即可使用 AI 辅助编码

## 环境变量配置

在项目根目录创建 `.env.local` 文件，配置以下环境变量：

```
# GitHub API 配置
GITHUB_AUTH_TOKEN=your_github_personal_access_token
GITHUB_ORG_NAME=your_organization_name
GITHUB_TEAM_NAME=your_team_name
```

### 环境变量说明

| 变量名 | 必填 | 描述 |
|--------|------|------|
| GITHUB_AUTH_TOKEN | 是 | GitHub 个人访问令牌，需要有管理组织成员的权限 |
| GITHUB_ORG_NAME | 是 | GitHub 组织名称 |
| GITHUB_TEAM_NAME | 是 | 组织中的团队名称，用户将被添加到该团队 |

## 部署说明

### Azure 静态 Web 应用部署

项目已配置 GitHub Actions 工作流，可自动部署到 Azure 静态 Web 应用。

### Docker 部署

项目包含 Dockerfile，可以构建 Docker 镜像进行部署：

```bash
docker build -t join-ghworkshop .
docker run -p 3000:3000 -e GITHUB_AUTH_TOKEN=xxx -e GITHUB_ORG_NAME=xxx -e GITHUB_TEAM_NAME=xxx join-ghworkshop
```

### Azure 容器注册表(ACR)

项目已配置 GitHub Actions 工作流，可自动构建并推送 Docker 镜像到 Azure 容器注册表：

```yaml
name: Build and Push to ACR
# 在 dev 分支的推送和 PR 时触发
```

## 技术栈

- Next.js 15.2.2
- React 19.0.0
- Octokit (GitHub API 客户端)
- TailwindCSS 4.x
- TypeScript

## 了解更多

要了解更多关于 Next.js 的信息，请查看以下资源：

- [Next.js 文档](https://nextjs.org/docs) - 了解 Next.js 功能和 API
- [学习 Next.js](https://nextjs.org/learn) - 交互式 Next.js 教程
