import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/core';

const octokit = new Octokit({
  auth: process.env.GITHUB_AUTH_TOKEN
});

export async function GET() {
  const orgName = process.env.GITHUB_ORG_NAME;
  const teamName = process.env.GITHUB_TEAM_NAME;

  if (!orgName || !teamName) {
    return NextResponse.json(
      { error: '环境变量未正确配置' },
      { status: 500 }
    );
  }

  try {
    const response = await octokit.request(`GET /orgs/${orgName}/teams/${teamName}/members`, {
      org: orgName,
      team_slug: teamName,
      per_page: 100,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error listing team members:', error);
    return NextResponse.json(
      { error: '获取团队成员列表失败' },
      { status: 500 }
    );
  }
}