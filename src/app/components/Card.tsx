import { motion } from 'framer-motion'

interface CardProps {
  title: string
  content: string
  className?: string
  onClick?: () => void
}

const Card = ({ title, content, className = '', onClick }: CardProps) => {
  return (
    <motion.div 
      className={`bg-white rounded-xl shadow-md p-6 cursor-pointer card-hover ${className}`}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </motion.div>
  )
}

export default Card