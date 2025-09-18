'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import useFetch from '../../app/hooks/useFetch'
import Card from '../../app/components/Card'
import Link from 'next/link'

// ✅ Create or import a proper spinner component
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export default function PostsPage() {
  const [showError, setShowError] = useState(false)
  const { data: posts, loading, error, refetch } = useFetch<Post[]>(
    showError
      ? 'https://jsonplaceholder.typicode.com/invalid-posts' // will trigger error
      : 'https://jsonplaceholder.typicode.com/posts' // correct endpoint
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Posts</h1>
        <button
          onClick={() => setShowError(!showError)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {showError ? 'Load Correct Data' : 'Simulate Error'}
        </button>
      </div>

      {loading && <LoadingSpinner />}

      {error && (
        <motion.div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p>Error: {error}</p>
          <button
            onClick={refetch}
            className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
          >
            Retry
          </button>
        </motion.div>
      )}

      {!loading && !error && posts && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {posts.slice(0, 9).map((post) => (
            <motion.div
              key={post.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <Link href={`/posts/${post.id}`}>
                <Card
                  title={post.title}
                  content={post.body.substring(0, 100) + '...'}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
