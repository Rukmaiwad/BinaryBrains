import { Link } from "react-router-dom";
import { ReactNode, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Settings, User } from "lucide-react";

export default function Navbar() {

  const [active, setActive] = useState(window.location.pathname)

  const navLinks: { title: string, url: string}[] = [
      { title: "Home",  url: "/"},
      { title: "About Us", url: "/about-us" },
      { title: "Courses", url: "/courses" },
      { title: 'Contact Us', url: '/contact-us' }
  ]

  return (
    <nav className="navbar flex">
        <div className="nav-image flex justify-end items-center " style={{ height: '100%', width: '120px'}}>
            <span className="text-pink-600 font-bold text-4xl">B</span>
            <span className="text-white text-lg">Brains</span>
        </div>

        <div className="nav-links w-full flex items-center justify-center">
            <ul className="flex mt-3">
            {navLinks.map((item) => (
                <li className="mx-2">
                    <Link
                      key={item.url}
                      to={item.url}
                      className={`${
                        active === item.url ? "underline decoration-red-500 underline-offset-4 text-white" : "text-gray-400 no-underline"
                      }`}
                      onClick={() => setActive(item.url)}
                    >
                        {item.title}
                    </Link>
                </li>
              ))}
            </ul>
        </div>
        <div className="nav-profile flex justify-center items-center" style={{ height: '100%', width: '100px'}}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" className="rounded-3xl" alt="User Avatar" height={45} width={45} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40 bg-white border border-gray-200 rounded-sm mt-3" style={{ zIndex: 1000}}>
                    <MenuItem children={
                      <Link to={'/profile'}>Profile</Link>
                    } icon={<User/>} separator/>
                    <MenuItem children="Settings" icon={<Settings/>}/>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </nav>
  );
}

export const MenuItem = ({ children, icon, separator }: { children: ReactNode, icon: unknown, separator?: boolean}) => {
  return (
      <>
        <DropdownMenuItem className="p-2 hover:bg-gray-600 cursor-pointer focus:outline-none focus:ring-0 bg-black text-white m-0">
          <div className="flex gap-2 items-center">
              {icon as ReactNode} {children}
          </div>
        </DropdownMenuItem>
        {separator ? <DropdownMenuSeparator className="h-[1px] bg-gray-700 my-1" /> : null}
    </>
  )
}
