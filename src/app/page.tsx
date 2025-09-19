'use client'

import { motion } from 'framer-motion'
import Card from '../../src/app/components/Card'
import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TooltipProps } from 'recharts'

export default function Home() {
  const [userCount, setUserCount] = useState(0)
  const [postCount, setPostCount] = useState(0)
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState<{ name: string; count: number }[]>([])
  const [userPostsData, setUserPostsData] = useState<{ name: string; value: number }[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState({ title: '', data: [] })

  useEffect(() => {
    // Fetch data from APIs
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch users
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users')
        const usersData = await usersResponse.json()
        setUsers(usersData)
        setUserCount(usersData.length)

        // Fetch posts
        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts')
        const postsData = await postsResponse.json()
        setPosts(postsData)
        setPostCount(postsData.length)

        // Prepare data for the bar chart
        const data = [
          { name: 'Users', count: usersData.length },
          { name: 'Posts', count: postsData.length },
        ]
        setChartData(data)

        // Count posts per user
        const postsPerUser: Record<number, number> = {};
        postsData.forEach((post: { userId: number }) => {
          if (postsPerUser[post.userId]) {
            postsPerUser[post.userId] += 1;
          } else {
            postsPerUser[post.userId] = 1;
          }
        });

        // Prepare data for the pie chart (top 5 users with most posts)
        const userPostsArray = Object.entries(postsPerUser)
          .map(([userId, count]) => ({ 
            name: `User ${userId}`, 
            value: count 
          }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 5);
        
        setUserPostsData(userPostsArray)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Handle card clicks
  const handleCardClick = (type: 'users' | 'posts' | 'engagement') => {
    if (type === 'users') {
      setModalContent({
        title: 'All Users',
        data: users
      })
    } else if (type === 'posts') {
      setModalContent({
        title: 'All Posts',
        data: posts.slice(0, 20) // Show first 20 posts to avoid too much data
      })
    } else if (type === 'engagement') {
      setModalContent({
        title: 'Engagement Statistics',
        data: [
          { metric: 'Active Users', value: '85%' },
          { metric: 'Post Engagement', value: '72%' },
          { metric: 'Returning Visitors', value: '64%' },
          { metric: 'Average Time on Site', value: '4m 32s' }
        ]
      })
    }
    setModalOpen(true)
  }

  // Close modal
  const closeModal = () => {
    setModalOpen(false)
  }
  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-md">
          <p className="font-medium text-gray-800">{`${label}`}</p>
          <p className="text-blue-600">{`Count: ${payload[0].value}`}</p>
        </div>
      )
    }
    return null
  }

  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div>
      <motion.h1 
        className="text-3xl font-bold text-gray-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to Dashboard
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card 
            title="Total Users" 
            content={loading ? "Loading..." : userCount.toString()} 
            className="text-center cursor-pointer"
            onClick={() => handleCardClick('users')}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card 
            title="Posts" 
            content={loading ? "Loading..." : postCount.toString()} 
            className="text-center cursor-pointer"
            onClick={() => handleCardClick('posts')}
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
            className="text-center cursor-pointer"
            onClick={() => handleCardClick('engagement')}
          />
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div 
          className="bg-white rounded-xl shadow-md p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Data Overview</h2>
          <div className="h-48 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                <p className="text-gray-500">Loading chart data...</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="count" 
                    name="Count" 
                    fill="#3b82f6" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-xl shadow-md p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Posts Distribution</h2>
          <div className="h-48 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                <p className="text-gray-500">Loading chart data...</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userPostsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {userPostsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>
      </div>

      {/* Modal for detailed view */}
      {modalOpen && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={closeModal}
        >
          <motion.div 
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{modalContent.title}</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="max-h-[60vh] overflow-y-auto">
                {modalContent.title === 'All Users' && (
                  <ul className="divide-y divide-gray-200">
                    {modalContent.data.map(user => (
                      <li key={user.id} className="py-3">
                        <h3 className="font-medium text-gray-800">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-500">{user.company?.name}</p>
                      </li>
                    ))}
                  </ul>
                )}
                
                {modalContent.title === 'All Posts' && (
                  <ul className="divide-y divide-gray-200">
                    {modalContent.data.map(post => (
                      <li key={post.id} className="py-3">
                        <h3 className="font-medium text-gray-800">{post.title}</h3>
                        <p className="text-sm text-gray-600">{post.body}</p>
                      </li>
                    ))}
                  </ul>
                )}
                
                {modalContent.title === 'Engagement Statistics' && (
                  <ul className="divide-y divide-gray-200">
                    {modalContent.data.map((item, index) => (
                      <li key={index} className="py-3 flex justify-between">
                        <span className="font-medium text-gray-800">{item.metric}:</span>
                        <span className="text-blue-600">{item.value}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}