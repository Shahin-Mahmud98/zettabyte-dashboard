'use client'

import { motion } from 'framer-motion'
import Card from '../../src/app/components/Card'
export default function Home() {
  return (
    <div>
      <motion.h1 
        className="text-3xl font-bold text-gray-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to Your Dashboard
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card 
            title="Total Users" 
            content="0" 
            className="text-center"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card 
            title="Posts" 
            content="0" 
            className="text-center"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card 
            title="Engagement" 
            content="100%" 
            className="text-center"
          />
        </motion.div>
      </div>
      
      <motion.div 
        className="bg-white rounded-xl shadow-md p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Activity Overview</h2>
        <div className="h-48 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Chart visualization would go here</p>
        </div>
      </motion.div>
    </div>
  )
}