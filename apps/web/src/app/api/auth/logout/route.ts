import { NextResponse } from "next/server";
import { authApiService } from "@/services";

export async function POST() {
  try {
    await authApiService.logout();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
