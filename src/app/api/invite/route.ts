import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "@octokit/core";

// Define proper types instead of using 'any'
interface InviteRequestBody {
  username: string;
}

interface APIErrorResponse {
  error: string;
  message?: string;
  documentation_url?: string;
}

// Either remove this interface if not needed or use it in the return type
type APIResponse = {
  success: boolean;
  message?: string;
};

export async function POST(request: NextRequest): Promise<NextResponse<APIResponse>> {
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
        email: undefined,
        role: 'direct_member',
        team_ids: [team.id],
        invitee_id: undefined,
        invitee_username: username 
      });

      return NextResponse.json({ 
        success: true,
        message: `Successfully invited ${username} to ${orgName}`
      });

    } catch (error) {
      const apiError = error as APIErrorResponse;
      console.error("GitHub API error:", apiError);
      return NextResponse.json({ 
        error: apiError.message || "Failed to invite user to organization" 
      }, { status: 500 });
    }

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}