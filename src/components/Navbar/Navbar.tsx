import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-3 bg-red-100/40 backdrop-blur-md shadow-sm">
      {/* Left: Logo & Menu */}
      <div className="flex items-center gap-6">
        <Link to="/" className="text-red-700 text-xl font-semibold">MyApp</Link>
        <div className="hidden md:flex gap-5">
          <Link to="/" className="text-red-700 hover:text-red-500 transition">Home</Link>
          <Link to="/about" className="text-red-700 hover:text-red-500 transition">About</Link>
          <Link to="/services" className="text-red-700 hover:text-red-500 transition">Services</Link>
        </div>
      </div>

      {/* Right: Avatar & Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-0 rounded-full">
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white shadow-md rounded-md">
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
