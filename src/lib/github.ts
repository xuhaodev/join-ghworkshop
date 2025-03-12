import { Octokit } from '@octokit/core';

// Create and configure Octokit instance
export function createOctokit() {
  return new Octokit({
    auth: process.env.GITHUB_AUTH_TOKEN
  });
}

// List GitHub team members
export async function listTeamMembers(octokit: Octokit, org: string, team: string) {
  try {
    const response = await octokit.request(`GET /orgs/${org}/teams/${team}/members`, {
      org: org,
      team_slug: team,
      per_page: 100,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    return response.data;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? 
      (error as any).response?.data || error.message : 
      'Unknown error';
    console.error('获取团队成员失败:', errorMessage);
    throw error;
  }
}

// Invite a user to the team
export async function inviteTeamMember(octokit: Octokit, orgName: string, teamName: string, username: string) {
  try {
    const response = await octokit.request(`PUT /orgs/${orgName}/teams/${teamName}/memberships/${username}`, {
      org: orgName,
      team_slug: teamName,
      username: username,
      role: 'member',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    console.log('成功邀请团队成员:', response.data);
    return response.data;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? 
      (error as any).response?.data || error.message : 
      'Unknown error';
    console.error('邀请团队成员失败:', errorMessage);
    throw error;
  }
}

// Get team by name
export async function getTeamByName(octokit: Octokit, orgName: string, teamName: string) {
  try {
    const teamsResponse = await octokit.request('GET /orgs/{org}/teams', {
      org: orgName
    });
    
    const team = teamsResponse.data.find(team => team.name === teamName);
    if (!team) {
      throw new Error(`团队 ${teamName} 未找到`);
    }
    
    return team;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? 
      (error as any).response?.data || error.message : 
      'Unknown error';
    console.error('获取团队信息失败:', errorMessage);
    throw error;
  }
}

// List seats assigned to the organization
export async function listAssignedSeats(octokit: Octokit, orgName: string) {
  try {
    const response = await octokit.request(`GET /orgs/${orgName}/copilot/billing/seats`, {
      org: orgName,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    return response.data;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? 
      (error as any).response?.data || error.message : 
      'Unknown error';
    console.error('获取席位分配失败:', errorMessage);
    throw error;
  }
}
