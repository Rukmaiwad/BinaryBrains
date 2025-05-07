import { Link } from "react-router-dom";
import { ReactNode, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogOutIcon, Settings, User } from "lucide-react";
import { getRole, getToken, removeUser } from "@/redux/slices/User";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { showToast } from "@/utils/toast";
import { isInvalid } from "@/utils/utils";
import { LOGOUT_ROUTE } from "@/utils/Urlpaths";
import axios from "axios";

export default function Navbar() {

  const [active, setActive] = useState('/')
  const dispatch = useAppDispatch();
  const role = useAppSelector(getRole)
  const token = useAppSelector(getToken)

  const navLinks: { title: string, url: string}[] = [
      { title: "Home",  url: "/"},
      { title: "About Us", url: "/about-us" },
      { title: "Courses", url: "/courses" },
      { title: 'Contact Us', url: '/contact-us' },
  ]

  const handleLogout = async () => {

    const response = await axios.post(LOGOUT_ROUTE, {});

    if(response.status === 200) {
      showToast({
        title: "Success",
        description: "Logged Out!",
        color: 'green',
      })
      dispatch(removeUser())
    } else {
      showToast({
        title: "Error", 
        description: response.data.messsage ?? "Error while logging out user!",
        color: 'red'
      })
    }
  }

  return (
    <nav className="navbar flex">
        <Link to={'/'} className="nav-image flex justify-end items-center" style={{ height: '100%', width: '120px'}}>
            <span className="text-pink-600 font-bold text-4xl">B</span>
            <span className="text-white text-lg">Brains</span>
        </Link>

        <div className="nav-links w-full flex items-center justify-center">
            <ul className="mt-3 hidden md:flex">
            {navLinks.map((item, index: number) => (
                <li className="mx-4 cursor-pointer" key={index}>
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
              <li>
                {
                  role === 'admin' ?
                  <Link
                      to={'/admin'}
                      className={`${
                        active === '/admin' ? "underline decoration-red-500 underline-offset-4 text-white" : "text-gray-400 no-underline"
                      }`}
                      onClick={() => setActive('/admin')}
                    >
                        {'Admin'}
                    </Link> : 
                  null
                }
              </li>
            </ul>
        </div>
        <div className="nav-profile flex justify-center items-center" style={{ height: '100%', width: '100px'}}>
            {!isInvalid(token) ? <DropdownMenu>
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
                    {!isInvalid(token) && <MenuItem 
                      children={
                        <button className="w-full flex" onClick={handleLogout}>Logout</button>
                      }
                      icon={<LogOutIcon/>}
                    />}
                </DropdownMenuContent>
            </DropdownMenu> : <div className="flex items-end text-gray-300"><Link to={'/login'}>Login</Link></div>}
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
