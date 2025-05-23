import Link from "next/link";
export default function Home() {
  return (
    <div>
      <header className="bg-side fixed w-full shadow-md px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Enrollment System</h1>

          
          <div className="relative group">
            <div className=" text-white hover:text-blue-600 font-medium cursor-pointer">
              Login ▾
            </div>

            
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 
                            opacity-0 group-hover:opacity-100 
                            invisible group-hover:visible 
                            transition-all duration-200">
              <Link
                href="/studentLogin"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Student Login
              </Link>
              <Link
                href="/registrarLogin"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Registrar Login
              </Link>
              <Link
                href="/InstructorPortal"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Instructor Login
              </Link>
            </div>
          </div>
        </header>
        <div className="w-full flex-center h-[100vh] -300 flex-col gap-6">
            <div className="w-full h-90  p-5 flex-center flex-col gap-10">
                <div className="w-full flex-jcenter">
                    <div className="w-[200px] h-[200px]">
                        <img src="/USNE.png"/>
                    </div>
                </div>
                <div className="w-full h-20">
                      <h2 className="text-center text-5xl text-info">UNIVERSITY OF SOUTHERN NUEVA ECIJA</h2>
                </div>
            </div>
            <div className="w-full h-50  flex-center flex-col gap-7">
                <div className="w-full flex-jcenter">
                  <Link className="w-[80%] h-10" href="/studentLogin">
                    <button className="w-full h-10 bg-side text-white">College Enrollment</button>
                  </Link>
                </div>
                <div className="w-full flex-jcenter">
                  <Link className="w-[80%] h-10" href="/studentverification">
                    <button className="w-full h-10 bg-side text-white">College Admission</button>
                  </Link>
                </div>
                
            </div>
        </div>
    </div>
  );
}
