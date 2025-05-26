import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_ROUTES = ['/', '/registrarLogin', "/studentLogin", "/InstructorPortal","/studentverification", "/InstructorProfileVerification","/StudentAdmission","/otp"];

const ROLE_API_ACCESS = {
  registrar: ['/api/registrar'],
  instructor: ['/api/instructor'],
  student: ['/api/Student'],
};
const EXCLUDED_API_PATHS = ['/api/refreshToken', '/api/registrarLogin', "/api/studentLogin", ,"/api/instructor/instructorprofileverification","/api/Student/otpverify", "/api/Student/otp",  "/api/Logout", "/api/getUser", "/api/instructorLogin"];
async function verifyJWT(token) {
  const secret = new TextEncoder().encode(process.env.SECRET_KEY);
  return await jwtVerify(token, secret);
}

export default async function middleware(req) {
  const { pathname } = req.nextUrl; 
  const token = req.cookies.get('accessToken')?.value;
  const Reftoken = req.cookies.get('refreshToken')?.value;
    const isPublicPage = PUBLIC_ROUTES.includes(pathname)

    console.log("punlib: ", isPublicPage);
    
  if (pathname.startsWith('/api')) {
      if (EXCLUDED_API_PATHS.some(p => pathname.startsWith(p))) {
      return NextResponse.next(); 
    }
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      const { payload } = await verifyJWT(token);
      const role = payload.role;
      const allowedApis = ROLE_API_ACCESS[role] || [];
      const isAllowed = allowedApis.some((prefix) => pathname.startsWith(prefix));
      if (!isAllowed) {
        return NextResponse.redirect(new URL("/Dashboard", req.url))
      }
    } catch (err) {
      console.error('JWT validation failed (API):', err.message);
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    return NextResponse.next();
  }

console.log("token:", token);

  if (!token) {
    if (!isPublicPage) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  }
  try {
    const  verified  = await verifyJWT(token);
    console.log("verified:", verified);
    
    if (!verified) throw new Error("Invalid token");

    if (isPublicPage && pathname !== '/Dashboard') {
      return NextResponse.redirect(new URL('/Dashboard', req.url));
    }
 
  } catch (error) {
    console.error('JWT validation failed (Page):', error?.message || error);
    const  verified  = await verifyJWT(Reftoken);

    if(isPublicPage) {
      return NextResponse.redirect(new URL('/Dashboard', req.url));
    }
    if(!verified){
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next()
  }
   return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/|.*\\.(?:png|jpg|jpeg|svg|webp|ico|css|js|map)$|favicon\\.ico$).*)',
  ],
};

