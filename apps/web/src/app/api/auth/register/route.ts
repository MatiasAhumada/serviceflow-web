import { NextRequest, NextResponse } from "next/server";
import { authApiService } from "@/services";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await authApiService.register(body);
    return NextResponse.json(response);
  } catch (error: unknown) {
    const err = error as {
      response?: { data?: { message?: string }; status?: number };
    };
    return NextResponse.json(
      { error: err.response?.data?.message || "Registration failed" },
      { status: err.response?.status || 400 },
    );
  }
}
