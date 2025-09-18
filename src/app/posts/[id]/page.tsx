'use client'

import { useParams } from 'next/navigation'
import useFetch from '../../hooks/useFetch'
import LoadingSpinner from '../../components/LoadingSpinner'
import Link from 'next/link'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}


export default function PostDetailPage() {
  const params = useParams()
  const { id } = params
  
  const { data: post, loading, error } = useFetch<Post>(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  )

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-500">Error: {error}</div>

  return (
    <div>
      <Link href="/posts" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Posts
      </Link>
      
      {post && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{post.title}</h1>
          <p className="text-gray-600">{post.body}</p>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Post Details</h2>
            <p><span className="font-medium">Post ID:</span> {post.id}</p>
            <p><span className="font-medium">User ID:</span> {post.userId}</p>
          </div>
        </div>
      )}
    </div>
  )
}