import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "@octokit/core";

interface InviteRequestBody {
  username: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json() as InviteRequestBody;
    const { username } = body;
    
    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    const orgName = process.env.GITHUB_ORG as string;
    const teamName = process.env.GITHUB_TEAM as string;

    try {
      // Get team ID
      const teamsResponse = await octokit.request('GET /orgs/{org}/teams', {
        org: orgName
      });
      
      // Find the team by name
      const team = teamsResponse.data.find(team => team.name === teamName);
      
      if (!team) {
        return NextResponse.json({ error: `Team ${teamName} not found` }, { status: 404 });
      }

      // Invite user to organization
      await octokit.request('POST /orgs/{org}/invitations', {
        org: orgName,
        email: undefined, // Use undefined instead of null
        role: 'direct_member',
        team_ids: [team.id],
        invitee_id: undefined, // Use undefined instead of null
        invitee_username: username 
      });

      return NextResponse.json({ 
        success: true,
        message: `Successfully invited ${username} to ${orgName}`
      });

    } catch (error) {
      console.error("GitHub API error:", error);
      return NextResponse.json({ 
        error: "Failed to invite user to organization" 
      }, { status: 500 });
    }

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}