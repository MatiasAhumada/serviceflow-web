import { handlers } from "@/lib/auth";
import { mockBackend } from "@/lib/auth";
import clientAxios from "@/lib/axios";
import { API_ROUTES } from "@/constants/routes.constants";
import { NextRequest, NextResponse } from "next/server";

// Manejar rutas de NextAuth
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const nextauth = searchParams.get('nextauth');
  
  // Si es una ruta personalizada
  if (nextauth?.includes('login') && request.method === 'POST') {
    return handleLogin(request);
  }
  if (nextauth?.includes('logout') && request.method === 'POST') {
    return handleLogout(request);
  }
  
  // Delegar a NextAuth
  return handlers.GET(request);
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Rutas personalizadas
  if (path.includes('/login')) {
    return handleLogin(request);
  }
  if (path.includes('/logout')) {
    return handleLogout(request);
  }
  
  // Delegar a NextAuth
  return handlers.POST(request);
}

// Handler para login personalizado
async function handleLogin(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Opción 1: Usar clientAxios para backend real
    // const response = await clientAxios.post(API_ROUTES.AUTH.LOGIN, {
    //   email: body.email,
    //   password: body.password,
    // });
    // return NextResponse.json(response.data);
    
    // Opción 2: Usar mock backend
    const user = await mockBackend.login(body.email, body.password);
    return NextResponse.json(user);
    
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }
}

// Handler para logout personalizado
async function handleLogout(request: NextRequest) {
  try {
    // Opción 1: Usar clientAxios para backend real
    // await clientAxios.post(API_ROUTES.AUTH.LOGOUT);
    
    // Opción 2: Usar mock backend
    await mockBackend.logout();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ success: true });
  }
}