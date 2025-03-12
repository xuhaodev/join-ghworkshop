import { NextResponse } from 'next/server';
import { Octokit } from '@octokit/core';

const octokit = new Octokit({
  auth: process.env.GITHUB_AUTH_TOKEN
});

export async function POST(request: Request) {
  const orgName = process.env.GITHUB_ORG_NAME;
  const teamName = process.env.GITHUB_TEAM_NAME;

  if (!orgName || !teamName) {
    return NextResponse.json(
      { error: '环境变量未正确配置' },
      { status: 500 }
    );
  }

  try {
    const { username } = await request.json();
    
    if (!username) {
      return NextResponse.json(
        { error: '用户名不能为空' },
        { status: 400 }
      );
    }

    const response = await octokit.request(`PUT /orgs/${orgName}/teams/${teamName}/memberships/${username}`, {
      org: orgName,
      team_slug: teamName,
      username: username,
      role: 'member',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    return NextResponse.json({ success: true, data: response.data });
  } catch (error: any) {
    console.error('Error inviting team member:', error);
    const errorMessage = error.response?.data?.message || '邀请用户失败';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}