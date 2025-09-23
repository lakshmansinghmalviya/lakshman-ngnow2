"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AnimatedElement } from "@/components/ui/animated-element"
import { BlogContent } from "@/components/blog-content"
import { useEffect, useState } from "react"

// This would normally be in a separate file or fetched from an API
const blogPosts = [
  {
    title: "Understanding Time Complexity in Algorithms",
    excerpt: "A comprehensive guide to analyzing algorithm efficiency using Big O notation and practical examples.",
    content: `
      <p>Time complexity is a fundamental concept in computer science that helps us analyze and compare the efficiency of algorithms. It provides a way to express how the runtime of an algorithm grows as the size of the input increases.</p>
      
      <h2>What is Big O Notation?</h2>
      <p>Big O notation is a mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity. In computer science, it's used to classify algorithms according to how their run time or space requirements grow as the input size grows.</p>
      
      <p>For example, if an algorithm has a time complexity of O(n), it means the algorithm's runtime grows linearly with the size of the input. If the input size doubles, the runtime will also roughly double.</p>
      
      <h2>Common Time Complexities</h2>
      <ul>
        <li><strong>O(1)</strong> - Constant time: The algorithm takes the same amount of time regardless of the input size.</li>
        <li><strong>O(log n)</strong> - Logarithmic time: The algorithm's runtime grows logarithmically with the input size.</li>
        <li><strong>O(n)</strong> - Linear time: The algorithm's runtime grows linearly with the input size.</li>
        <li><strong>O(n log n)</strong> - Linearithmic time: Common in efficient sorting algorithms like merge sort and heap sort.</li>
        <li><strong>O(n²)</strong> - Quadratic time: Often seen in algorithms with nested loops over the data.</li>
        <li><strong>O(2^n)</strong> - Exponential time: The runtime doubles with each addition to the input size.</li>
      </ul>
      
      <h2>Why Time Complexity Matters</h2>
      <p>Understanding time complexity is crucial for several reasons:</p>
      <ol>
        <li>It helps you choose the most efficient algorithm for a specific problem.</li>
        <li>It allows you to predict how your algorithm will perform with large inputs.</li>
        <li>It's a common topic in technical interviews and coding assessments.</li>
      </ol>
      
      <h2>Analyzing Time Complexity</h2>
      <p>When analyzing the time complexity of an algorithm, we focus on the dominant terms and ignore constants and lower-order terms. For example, if an algorithm has a time complexity of 3n² + 2n + 1, we simplify it to O(n²).</p>
      
      <h2>Examples</h2>
      <p>Let's look at some examples to understand time complexity better:</p>
      
      <h3>Example 1: Finding an element in an array (Linear Search)</h3>
      <pre><code>
      function linearSearch(arr, target) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === target) {
            return i;
          }
        }
        return -1;
      }
      </code></pre>
      <p>Time Complexity: O(n) - In the worst case, we might have to check every element in the array.</p>
      
      <h3>Example 2: Binary Search</h3>
      <pre><code>
      function binarySearch(sortedArr, target) {
        let left = 0;
        let right = sortedArr.length - 1;
        
        while (left <= right) {
          const mid = Math.floor((left + right) / 2);
          
          if (sortedArr[mid] === target) {
            return mid;
          }
          
          if (sortedArr[mid] < target) {
            left = mid + 1;
          } else {
            right = mid - 1;
          }
        }
        
        return -1;
      }
      </code></pre>
      <p>Time Complexity: O(log n) - With each step, we eliminate half of the remaining elements.</p>
      
      <h2>Conclusion</h2>
      <p>Time complexity is a powerful tool for analyzing and comparing algorithms. By understanding the time complexity of different algorithms, you can make informed decisions about which algorithm to use for a specific problem, especially when dealing with large inputs.</p>
      
      <p>Remember, the goal is not always to find the algorithm with the best theoretical time complexity. Factors like implementation complexity, memory usage, and the specific characteristics of your data should also be considered when choosing an algorithm.</p>
    `,
    image: "/placeholder.svg?height=600&width=1200&text=Algorithms",
    date: "April 15, 2023",
    readTime: "8 min read",
    author: "Dr. Rajesh Kumar",
    authorImage: "/placeholder.svg?height=100&width=100",
    tags: ["DSA", "Algorithms", "Computer Science"],
    relatedPosts: [
      {
        title: "Mastering Recursion in Programming",
        excerpt: "A step-by-step guide to understanding and implementing recursive algorithms effectively.",
        image: "/placeholder.svg?height=200&width=350&text=Recursion",
        slug: "mastering-recursion",
      },
      {
        title: "Introduction to Dynamic Programming",
        excerpt: "Learn how to solve complex problems by breaking them down into simpler subproblems.",
        image: "/placeholder.svg?height=200&width=350&text=Dynamic+Programming",
        slug: "dynamic-programming",
      },
    ],
    slug: "understanding-time-complexity",
  },
  {
    title: "Memory Management Techniques in Modern Operating Systems",
    excerpt:
      "Explore how operating systems handle memory allocation, paging, and virtual memory for optimal performance.",
    content: `
      <p>Memory management is one of the most critical functions of an operating system. It ensures that programs have the memory resources they need while maintaining system stability and performance.</p>
      
      <h2>Virtual Memory</h2>
      <p>Virtual memory is a memory management technique that provides an "idealized abstraction of the storage resources that are actually available on a given machine" which "creates the illusion to users of a very large (main) memory."</p>
      
      <p>The key benefits of virtual memory include:</p>
      <ul>
        <li>Programs can use more memory than is physically available</li>
        <li>Programs are isolated from each other, enhancing security</li>
        <li>Programs can be written without concern for physical memory constraints</li>
      </ul>
      
      <h2>Paging</h2>
      <p>Paging is a memory management scheme that eliminates the need for contiguous allocation of physical memory. This scheme permits the physical address space of a process to be non-contiguous.</p>
      
      <p>In a paging system:</p>
      <ul>
        <li>Memory is divided into fixed-size blocks called pages</li>
        <li>The physical memory is divided into fixed-size blocks called frames</li>
        <li>A page table maps virtual pages to physical frames</li>
      </ul>
      
      <h2>Page Replacement Algorithms</h2>
      <p>When a page fault occurs and all memory frames are currently in use, the operating system must select a page to replace. Common page replacement algorithms include:</p>
      
      <h3>First-In-First-Out (FIFO)</h3>
      <p>The oldest page in memory is selected for replacement. Simple to implement but can suffer from "Belady's anomaly" where increasing the number of frames can increase the number of page faults.</p>
      
      <h3>Least Recently Used (LRU)</h3>
      <p>The page that has not been used for the longest period of time is selected for replacement. This algorithm is based on the principle of locality and generally performs well, but can be expensive to implement.</p>
      
      <h3>Optimal Page Replacement</h3>
      <p>This algorithm replaces the page that will not be used for the longest period of time in the future. It provides the best possible performance but is impossible to implement in practice as it requires future knowledge of the reference string.</p>
      
      <h2>Segmentation</h2>
      <p>Segmentation is a memory management technique in which memory is divided into segments of different sizes. Each segment has a name and a length. The addresses specify both the segment name and the offset within the segment.</p>
      
      <p>Segmentation supports the programmer's view of memory better than paging because:</p>
      <ul>
        <li>Programs are written in terms of modules, functions, and objects</li>
        <li>Segments can grow or shrink during execution</li>
        <li>Segments can be shared among different processes</li>
      </ul>
      
      <h2>Memory Protection</h2>
      <p>Modern operating systems implement various protection mechanisms to ensure that one process cannot access the memory of another process without permission. These mechanisms include:</p>
      
      <ul>
        <li>Base and Limit Registers: Define the range of legal addresses a process can access</li>
        <li>Protection Bits: Associated with each frame or segment to control read/write/execute permissions</li>
        <li>Memory Keys: Used in some systems to provide additional protection</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Memory management is a complex but essential aspect of operating system design. The techniques discussed—virtual memory, paging, segmentation, and memory protection—work together to provide an efficient, secure, and user-friendly computing environment. Understanding these concepts is crucial for anyone working in systems programming or operating system development.</p>
    `,
    image: "/placeholder.svg?height=600&width=1200&text=OS+Memory",
    date: "March 22, 2023",
    readTime: "10 min read",
    author: "Priya Sharma",
    authorImage: "/placeholder.svg?height=100&width=100",
    tags: ["Operating Systems", "Memory Management", "Computer Science"],
    relatedPosts: [
      {
        title: "Process Management in Operating Systems",
        excerpt: "Learn about process states, scheduling algorithms, and synchronization mechanisms.",
        image: "/placeholder.svg?height=200&width=350&text=Process+Management",
        slug: "process-management",
      },
      {
        title: "File Systems in Modern OS",
        excerpt: "An overview of file system architectures and implementations.",
        image: "/placeholder.svg?height=200&width=350&text=File+Systems",
        slug: "file-systems",
      },
    ],
    slug: "memory-management-techniques",
  },
  {
    title: "Introduction to Database Normalization",
    excerpt:
      "Learn the principles of database normalization and how to apply them in your database design for data integrity.",
    content: `
      <p>Database normalization is a systematic approach to organizing data in a relational database. It involves dividing larger tables into smaller ones and defining relationships between them to minimize redundancy and improve data integrity.</p>
      
      <h2>What is Normalization?</h2>
      <p>Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity. It involves breaking down larger tables into smaller, more specialized tables and defining relationships between them.</p>
      
      <h2>The Normal Forms</h2>
      
      <h3>First Normal Form (1NF)</h3>
      <p>A table is in 1NF if:</p>
      <ul>
        <li>It has no repeating groups or arrays</li>
        <li>All column values are atomic (indivisible)</li>
        <li>Each row is unique (has a primary key)</li>
      </ul>
      
      <h3>Second Normal Form (2NF)</h3>
      <p>A table is in 2NF if:</p>
      <ul>
        <li>It is in 1NF</li>
        <li>All non-key attributes are fully functionally dependent on the primary key</li>
      </ul>
      
      <h3>Third Normal Form (3NF)</h3>
      <p>A table is in 3NF if:</p>
      <ul>
        <li>It is in 2NF</li>
        <li>It has no transitive dependencies (non-key attributes depend only on the primary key)</li>
      </ul>
      
      <h3>Boyce-Codd Normal Form (BCNF)</h3>
      <p>A table is in BCNF if:</p>
      <ul>
        <li>It is in 3NF</li>
        <li>For every functional dependency X → Y, X is a superkey</li>
      </ul>
      
      <h2>Example of Normalization</h2>
      
      <p>Consider a table with the following structure:</p>
      
      <pre><code>
      OrderDetails(OrderID, ProductID, CustomerID, CustomerName, CustomerAddress, ProductName, ProductPrice, Quantity)
      </code></pre>
      
      <p>This table has several issues:</p>
      <ul>
        <li>Customer information is repeated for each order</li>
        <li>Product information is repeated for each order detail</li>
      </ul>
      
      <p>After normalization to 3NF, we might have:</p>
      
      <pre><code>
      Customers(CustomerID, CustomerName, CustomerAddress)
      Products(ProductID, ProductName, ProductPrice)
      Orders(OrderID, CustomerID)
      OrderDetails(OrderID, ProductID, Quantity)
      </code></pre>
      
      <h2>Benefits of Normalization</h2>
      
      <ul>
        <li>Reduces data redundancy</li>
        <li>Improves data integrity</li>
        <li>Makes the database more flexible for future changes</li>
        <li>Simplifies data maintenance</li>
      </ul>
      
      <h2>When to Denormalize</h2>
      
      <p>While normalization offers many benefits, there are cases where denormalization (deliberately introducing redundancy) might be appropriate:</p>
      
      <ul>
        <li>When read performance is critical</li>
        <li>For reporting and analytical databases</li>
        <li>When the data is relatively static</li>
      </ul>
      
      <h2>Conclusion</h2>
      
      <p>Database normalization is a crucial skill for database designers. By understanding and applying the principles of normalization, you can create database structures that are efficient, maintainable, and protect the integrity of your data. However, it's important to balance normalization with performance considerations based on the specific requirements of your application.</p>
    `,
    image: "/placeholder.svg?height=600&width=1200&text=Database",
    date: "February 10, 2023",
    readTime: "7 min read",
    author: "Amit Patel",
    authorImage: "/placeholder.svg?height=100&width=100",
    tags: ["DBMS", "Database Design", "SQL"],
    relatedPosts: [
      {
        title: "SQL Query Optimization Techniques",
        excerpt: "Learn how to write efficient SQL queries that perform well even with large datasets.",
        image: "/placeholder.svg?height=200&width=350&text=SQL+Optimization",
        slug: "sql-optimization",
      },
      {
        title: "NoSQL vs SQL Databases",
        excerpt: "Understanding the key differences and when to use each database type.",
        image: "/placeholder.svg?height=200&width=350&text=NoSQL+vs+SQL",
        slug: "nosql-vs-sql",
      },
    ],
    slug: "database-normalization",
  },
  {
    title: "Mastering Recursion in Programming",
    excerpt: "A step-by-step guide to understanding and implementing recursive algorithms effectively in your code.",
    content: `
      <p>Recursion is a powerful programming technique where a function calls itself to solve a problem. It's particularly useful for tasks that can be broken down into smaller, similar subproblems.</p>
      
      <h2>Understanding Recursion</h2>
      
      <p>At its core, recursion involves a function that calls itself. Every recursive solution has two main components:</p>
      
      <h3>1. Base Case</h3>
      <p>The base case is the condition that stops the recursion. Without a proper base case, your function will call itself indefinitely, resulting in a stack overflow error.</p>
      
      <h3>2. Recursive Case</h3>
      <p>The recursive case is where the function calls itself with a modified input that brings it closer to the base case.</p>
      
      <h2>Classic Example: Factorial</h2>
      
      <p>The factorial of a non-negative integer n (denoted as n!) is the product of all positive integers less than or equal to n.</p>
      
      <pre><code>
      function factorial(n) {
        // Base case
        if (n === 0 || n === 1) {
          return 1;
        }
        
        // Recursive case
        return n * factorial(n - 1);
      }
      </code></pre>
      
      <p>How this works:</p>
      <ul>
        <li>factorial(5) = 5 * factorial(4) = 5 * 24 = 120</li>
        <li>factorial(4) = 4 * factorial(3) = 4 * 6 = 24</li>
        <li>factorial(3) = 3 * factorial(2) = 3 * 2 = 6</li>
        <li>factorial(2) = 2 * factorial(1) = 2 * 1 = 2</li>
        <li>factorial(1) = 1 (base case)</li>
      </ul>
      
      <h2>Fibonacci Sequence</h2>
      
      <p>Another classic example is calculating the nth Fibonacci number:</p>
      
      <pre><code>
      function fibonacci(n) {
        // Base cases
        if (n <= 0) return 0;
        if (n === 1) return 1;
        
        // Recursive case
        return fibonacci(n - 1) + fibonacci(n - 2);
      }
      </code></pre>
      
      <h2>Common Pitfalls</h2>
      
      <h3>Missing or Incorrect Base Case</h3>
      <p>Without a proper base case, your recursive function will continue calling itself indefinitely, resulting in a stack overflow error.</p>
      
      <h3>Inefficient Recursion</h3>
      <p>The naive recursive implementation of Fibonacci is inefficient because it recalculates the same values multiple times. This is where techniques like memoization come in.</p>
      
      <h2>Optimization Techniques</h2>
      
      <h3>Memoization</h3>
      <p>Memoization involves storing the results of expensive function calls and returning the cached result when the same inputs occur again.</p>
      
      <pre><code>
      function fibonacciMemo(n, memo = {}) {
        if (n in memo) return memo[n];
        if (n <= 0) return 0;
        if (n === 1) return 1;
        
        memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
        return memo[n];
      }
      </code></pre>
      
      <h3>Tail Recursion</h3>
      <p>Tail recursion is a special case of recursion where the recursive call is the last operation in the function. Some programming languages and compilers can optimize tail-recursive functions to avoid stack overflow.</p>
      
      <h2>When to Use Recursion</h2>
      
      <p>Recursion is particularly useful for:</p>
      <ul>
        <li>Problems that can be broken down into similar subproblems</li>
        <li>Tree and graph traversal</li>
        <li>Divide and conquer algorithms</li>
        <li>Backtracking algorithms</li>
      </ul>
      
      <h2>Conclusion</h2>
      
      <p>Recursion is a powerful technique that can lead to elegant solutions for complex problems. By understanding the core principles and avoiding common pitfalls, you can effectively use recursion in your programming toolkit. Remember to always identify clear base cases and ensure that your recursive calls move toward those base cases.</p>
    `,
    image: "/placeholder.svg?height=600&width=1200&text=Recursion",
    date: "January 5, 2023",
    readTime: "9 min read",
    author: "Neha Gupta",
    authorImage: "/placeholder.svg?height=100&width=100",
    tags: ["Programming", "Algorithms", "DSA"],
    relatedPosts: [
      {
        title: "Understanding Time Complexity in Algorithms",
        excerpt: "A comprehensive guide to analyzing the efficiency of algorithms using Big O notation.",
        image: "/placeholder.svg?height=200&width=350&text=Algorithms",
        slug: "understanding-time-complexity",
      },
      {
        title: "Dynamic Programming Fundamentals",
        excerpt: "Master the art of solving complex problems by breaking them down into overlapping subproblems.",
        image: "/placeholder.svg?height=200&width=350&text=Dynamic+Programming",
        slug: "dynamic-programming-fundamentals",
      },
    ],
    slug: "mastering-recursion",
  },
  {
    title: "Computer Networks: Understanding the OSI Model",
    excerpt:
      "A detailed explanation of the seven layers of the OSI model and their functions in network communication.",
    content: `
      <p>The Open Systems Interconnection (OSI) model is a conceptual framework that standardizes the functions of a telecommunication or computing system into seven distinct layers. Developed by the International Organization for Standardization (ISO) in 1984, it remains a fundamental tool for understanding network communications.</p>
      
      <h2>The Seven Layers of the OSI Model</h2>
      
      <h3>1. Physical Layer</h3>
      <p>The Physical Layer is responsible for the transmission and reception of unstructured raw data between a device and a physical transmission medium. It defines the electrical, mechanical, procedural, and functional specifications for activating, maintaining, and deactivating physical links.</p>
      
      <p><strong>Key functions:</strong></p>
      <ul>
        <li>Bit-level transmission</li>
        <li>Physical topology and medium specification</li>
        <li>Data encoding and signaling</li>
        <li>Physical connectors</li>
      </ul>
      
      <p><strong>Examples:</strong> Ethernet cables, fiber optic cables, wireless radio frequencies, hubs, repeaters</p>
      
      <h3>2. Data Link Layer</h3>
      <p>The Data Link Layer provides node-to-node data transfer—a link between two directly connected nodes. It detects and possibly corrects errors that may occur in the Physical Layer.</p>
      
      <p><strong>Key functions:</strong></p>
      <ul>
        <li>Framing</li>
        <li>Physical addressing (MAC)</li>
        <li>Error detection and handling</li>
        <li>Flow control</li>
      </ul>
      
      <p><strong>Examples:</strong> Ethernet, Wi-Fi, PPP, switches, bridges</p>
      
      <h3>3. Network Layer</h3>
      <p>The Network Layer provides the functional and procedural means of transferring variable length data sequences from a source to a destination via one or more networks while maintaining the quality of service requested by the Transport Layer.</p>
      
      <p><strong>Key functions:</strong></p>
      <ul>
        <li>Logical addressing (IP)</li>
        <li>Routing</li>
        <li>Path determination</li>
        <li>Packet switching</li>
      </ul>
      
      <p><strong>Examples:</strong> IP, ICMP, OSPF, routers</p>
      
      <h3>4. Transport Layer</h3>
      <p>The Transport Layer provides transparent transfer of data between end users, providing reliable data transfer services to the upper layers.</p>
      
      <p><strong>Key functions:</strong></p>
      <ul>
        <li>Segmentation and reassembly</li>
        <li>Connection-oriented communication</li>
        <li>Reliability and flow control</li>
        <li>Error recovery</li>
      </ul>
      
      <p><strong>Examples:</strong> TCP, UDP</p>
      
      <h3>5. Session Layer</h3>
      <p>The Session Layer controls the dialogues (connections) between computers. It establishes, manages, and terminates connections between local and remote applications.</p>
      
      <p><strong>Key functions:</strong></p>
      <ul>
        <li>Session establishment, maintenance, and termination</li>
        <li>Synchronization</li>
        <li>Dialog control</li>
      </ul>
      
      <p><strong>Examples:</strong> NetBIOS, RPC, PPTP</p>
      
      <h3>6. Presentation Layer</h3>
      <p>The Presentation Layer establishes context between Application Layer entities. It transforms data into the form that the application accepts.</p>
      
      <p><strong>Key functions:</strong></p>
      <ul>
        <li>Data translation</li>
        <li>Encryption/Decryption</li>
        <li>Compression</li>
      </ul>
      
      <p><strong>Examples:</strong> SSL/TLS, JPEG, MPEG</p>
      
      <h3>7. Application Layer</h3>
      <p>The Application Layer is the OSI layer closest to the end user. It provides network services directly to the applications.</p>
      
      <p><strong>Key functions:</strong></p>
      <ul>
        <li>Network applications</li>
        <li>Service advertisement</li>
        <li>User authentication</li>
      </ul>
      
      <p><strong>Examples:</strong> HTTP, FTP, SMTP, DNS</p>
      
      <h2>The OSI Model vs. TCP/IP Model</h2>
      
      <p>While the OSI model is theoretical, the TCP/IP model is the practical implementation used in today's internet. The TCP/IP model condenses the OSI layers:</p>
      
      <ul>
        <li>Link Layer (OSI Layers 1-2)</li>
        <li>Internet Layer (OSI Layer 3)</li>
        <li>Transport Layer (OSI Layer 4)</li>
        <li>Application Layer (OSI Layers 5-7)</li>
      </ul>
      
      <h2>Conclusion</h2>
      
      <p>Understanding the OSI model is crucial for network professionals as it provides a standardized way to understand and troubleshoot network issues. By breaking down network communication into distinct layers, it becomes easier to identify where problems occur and how different networking technologies interact with each other.</p>
    `,
    image: "/placeholder.svg?height=600&width=1200&text=OSI+Model",
    date: "December 12, 2022",
    readTime: "12 min read",
    author: "Vikram Singh",
    authorImage: "/placeholder.svg?height=100&width=100",
    tags: ["Computer Networks", "OSI Model", "Networking"],
    relatedPosts: [
      {
        title: "TCP/IP Protocol Suite Explained",
        excerpt: "A deep dive into the protocols that power the internet.",
        image: "/placeholder.svg?height=200&width=350&text=TCP/IP",
        slug: "tcp-ip-protocol-suite",
      },
      {
        title: "Network Security Fundamentals",
        excerpt: "Essential concepts and practices for securing computer networks.",
        image: "/placeholder.svg?height=200&width=350&text=Network+Security",
        slug: "network-security-fundamentals",
      },
    ],
    slug: "osi-model",
  },
  // Additional blog posts would be defined here
]

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug
  const [blogPost, setBlogPost] = useState<any>(null)

  useEffect(() => {
    // Find the blog post that matches the slug
    const post = blogPosts.find((post) => post.slug === slug)

    // If not found, use the first post as a fallback
    setBlogPost(post || blogPosts[0])
  }, [slug])

  if (!blogPost) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p className="text-lg">Loading content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <AnimatedElement animation="fade-up">
          <Button variant="ghost" className="mb-6 -ml-2" asChild>
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-4">
            {blogPost.tags.map((tag, index) => (
              <span key={index} className="text-xs bg-muted px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={0.2}>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 font-kolka">
            {blogPost.title}
          </h1>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={0.3}>
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={blogPost.authorImage || "/placeholder.svg"}
                  alt={blogPost.author}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium">{blogPost.author}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span className="mr-3">{blogPost.date}</span>
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{blogPost.readTime}</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={0.4}>
          <div className="mb-8 rounded-lg overflow-hidden">
            <Image
              src={blogPost.image || "/placeholder.svg"}
              alt={blogPost.title}
              width={1200}
              height={600}
              className="w-full object-cover"
            />
          </div>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={0.5}>
          <BlogContent content={blogPost.content} />
        </AnimatedElement>

        {blogPost.relatedPosts && blogPost.relatedPosts.length > 0 && (
          <AnimatedElement animation="fade-up" delay={0.6}>
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPost.relatedPosts.map((post, index) => (
                  <Card key={index} className="overflow-hidden">
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="h-48 overflow-hidden">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          width={350}
                          height={200}
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                        <p className="text-muted-foreground text-sm">{post.excerpt}</p>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedElement>
        )}
      </div>
    </div>
  )
}
