"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface BlogContentProps {
  content: string
}

export function BlogContent({ content }: BlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Add syntax highlighting to code blocks if needed
    if (contentRef.current) {
      const codeBlocks = contentRef.current.querySelectorAll("pre code")
      if (codeBlocks.length > 0 && typeof window !== "undefined") {
        // This is where you could add a syntax highlighting library if needed
        console.log(`Found ${codeBlocks.length} code blocks`)
      }
    }
  }, [content])

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="blog-content"
    >
      <div
        ref={contentRef}
        className="prose prose-lg max-w-none mb-12 text-black prose-headings:text-black prose-strong:text-black
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-img:rounded-lg prose-img:shadow-md
                  prose-blockquote:border-l-primary prose-blockquote:bg-gray-50 prose-blockquote:py-1 prose-blockquote:px-4
                  prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                  prose-pre:bg-gray-900 prose-pre:text-gray-100"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </motion.article>
  )
}
