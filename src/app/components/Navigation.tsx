'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navigation = () => {
  const pathname = usePathname()
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', href: '/', icon: '📊' },
    { id: 'posts', label: 'Posts', href: '/posts', icon: '📝' },
    { id: 'users', label: 'Users', href: '/users', icon: '👥' },
  ]

  return (
    <nav className="bg-white shadow-md rounded-lg mb-8">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-bold text-gray-800">Zettabyte Dashboard</h1>
        <div className="flex space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                pathname === item.href 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation