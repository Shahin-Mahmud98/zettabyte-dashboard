'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useFetch from '../../app/hooks/useFetch'
import LoadingSpinner from '../../app/posts/page'
import Modal from '../../app/components/Modal'

interface User {
  id: number
  name: string
  email: string
  phone: string
  website: string
  company: {
    name: string
  }
  address: {
    street: string
    city: string
  }
}

export default function UsersPage() {
  const { data: users, loading, error } = useFetch<User[]>(
    'https://jsonplaceholder.typicode.com/users'
  )
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (user: User) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedUser(null)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Users</h1>
      
      {loading && <LoadingSpinner />}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          <p>Error: {error}</p>
        </div>
      )}
      
      {!loading && !error && users && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <motion.tr 
                  key={user.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => openModal(user)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.company.name}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <AnimatePresence>
        {isModalOpen && selectedUser && (
          <Modal onClose={closeModal}>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedUser.name}</h2>
            <div className="space-y-3">
              <p><span className="font-semibold">Email:</span> {selectedUser.email}</p>
              <p><span className="font-semibold">Phone:</span> {selectedUser.phone}</p>
              <p><span className="font-semibold">Website:</span> {selectedUser.website}</p>
              <p><span className="font-semibold">Company:</span> {selectedUser.company.name}</p>
              <p><span className="font-semibold">Address:</span> {selectedUser.address.street}, {selectedUser.address.city}</p>
            </div>
            <button 
              onClick={closeModal}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Close
            </button>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}