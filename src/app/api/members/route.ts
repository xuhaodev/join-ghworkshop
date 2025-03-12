import { NextResponse } from 'next/server';
import { createOctokit, listTeamMembers } from '@/lib/github';

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
    const octokit = createOctokit();
    const members = await listTeamMembers(octokit, orgName, teamName);
    return NextResponse.json(members);
  } catch (error: any) {
    console.error('获取团队成员列表失败:', error);
    let errorMessage = '获取团队成员列表失败';
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}