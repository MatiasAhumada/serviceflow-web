import { NextRequest, NextResponse } from "next/server";
import { authApiService } from "@/services";

export async function POST(request: NextRequest) {
  try {
    await authApiService.logout();
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: true });
  }
}
