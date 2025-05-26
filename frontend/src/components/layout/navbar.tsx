"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, User, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { removeToken, removeRefreshToken } from "@/lib/utils/cookie-auth";
import { useRouter } from "next/navigation";

interface NavbarLink {
  label: string;
  href: string;
  isActive: boolean;
}

const NAV_LINKS: NavbarLink[] = [
  { label: "Logs", href: "/dashboard/logs", isActive: true },
  { label: "Users", href: "/dashboard/users", isActive: true },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    removeRefreshToken();
    router.push('/login');
  };

  return (
    <nav className="w-[80%] mx-auto border-b border-gray-200 bg-gray-50 rounded-lg sticky top-3 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <Link href="/dashboard">
            <div className="flex items-center">
              <motion.span 
                className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent tracking-tight"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              REVERSE PROXY
            </motion.span>
                  </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.ul 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex gap-8 text-sm font-mono text-gray-700"
        >
          {NAV_LINKS.map((link, index) => (
            <motion.li 
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              aria-disabled={!link.isActive}
              className={cn(
                "transition-colors hover:text-blue-600",
                !link.isActive && "text-gray-400 cursor-not-allowed"
              )}
            >
              <a
                href={link.href}
                className={cn(
                  "transition-colors hover:text-blue-600",
                  !link.isActive && "text-gray-400 cursor-not-allowed pointer-events-none"
                )}
              >
                {link.label}
              </a>
            </motion.li>
          ))}
        </motion.ul>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                aria-label="User" 
                className="border-gray-200"
              >
                <User className="h-5 w-5 text-gray-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem 
                className="text-red-600 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-4 py-4 space-y-4 bg-gray-50 border-t border-gray-200">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="block text-sm font-mono text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 