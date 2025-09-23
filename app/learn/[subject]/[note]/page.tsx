"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Download, FileText, Clock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedElement } from "@/components/ui/animated-element"
import { MorphingBlob } from "@/components/ui/floating-element"
import Link from "next/link"

// This would ideally come from a database or API
const notes = [
  {
    title: "DSA Cheat Sheet",
    subject: "Data Structures & Algorithms",
    description: "Quick reference for common data structures and algorithms",
    pages: 12,
    downloadable: true,
    color: "purple",
    pdfLink: "https://www.example.com/dsa-cheatsheet.pdf",
    content: `
      <h1>Data Structures & Algorithms Cheat Sheet</h1>
      
      <h2>Time Complexity Analysis</h2>
      <p>Understanding Big O notation is crucial for analyzing algorithm efficiency:</p>
      <ul>
        <li>O(1) - Constant time: Operations that take the same amount of time regardless of input size</li>
        <li>O(log n) - Logarithmic time: Divide and conquer algorithms like binary search</li>
        <li>O(n) - Linear time: Operations that process each element once</li>
        <li>O(n log n) - Linearithmic time: Efficient sorting algorithms like merge sort</li>
        <li>O(n²) - Quadratic time: Nested iterations, simple sorting algorithms</li>
        <li>O(2^n) - Exponential time: Recursive algorithms that solve all subproblems</li>
      </ul>
      
      <h2>Common Data Structures</h2>
      <h3>Arrays</h3>
      <p>Continuous memory allocation with constant-time access by index.</p>
      <p>Time Complexities:</p>
      <ul>
        <li>Access: O(1)</li>
        <li>Search: O(n)</li>
        <li>Insertion/Deletion (at end): O(1)</li>
        <li>Insertion/Deletion (at arbitrary position): O(n)</li>
      </ul>
      
      <h3>Linked Lists</h3>
      <p>Nodes connected by pointers, allowing dynamic size changes.</p>
      <p>Time Complexities:</p>
      <ul>
        <li>Access: O(n)</li>
        <li>Search: O(n)</li>
        <li>Insertion/Deletion (at beginning): O(1)</li>
        <li>Insertion/Deletion (at arbitrary position): O(n)</li>
      </ul>
    `,
  },
  {
    title: "Big O Notation Explained",
    subject: "Data Structures & Algorithms",
    description: "Comprehensive guide to understanding time and space complexity",
    pages: 8,
    downloadable: true,
    color: "purple",
    pdfLink: "https://www.example.com/big-o-notation.pdf",
    content: `
      <h1>Understanding Big O Notation</h1>
      
      <p>Big O notation is a mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity. In computer science, it's used to classify algorithms according to how their run time or space requirements grow as the input size grows.</p>
      
      <h2>Why Big O Matters</h2>
      <p>When developing algorithms, especially for large datasets, efficiency is crucial. Big O helps us:</p>
      <ul>
        <li>Compare algorithms objectively</li>
        <li>Predict performance as data scales</li>
        <li>Make informed implementation choices</li>
        <li>Identify bottlenecks in our code</li>
      </ul>
      
      <h2>Common Big O Complexities</h2>
      
      <h3>O(1) - Constant Time</h3>
      <p>The operation takes the same amount of time regardless of the input size.</p>
      <pre><code>
      function getFirstElement(array) {
        return array[0]; // Always takes the same time
      }
      </code></pre>
      
      <h3>O(log n) - Logarithmic Time</h3>
      <p>The operation's time increases logarithmically as input size grows. Common in divide-and-conquer algorithms.</p>
      <pre><code>
      function binarySearch(sortedArray, target) {
        let left = 0;
        let right = sortedArray.length - 1;
        
        while (left <= right) {
          const mid = Math.floor((left + right) / 2);
          if (sortedArray[mid] === target) return mid;
          if (sortedArray[mid] < target) left = mid + 1;
          else right = mid - 1;
        }
        
        return -1;
      }
      </code></pre>
    `,
  },
  {
    title: "Computer Architecture Fundamentals",
    subject: "Computer Organization & Architecture",
    description: "Overview of computer architecture principles",
    pages: 15,
    downloadable: true,
    color: "teal",
    pdfLink: "https://www.example.com/computer-architecture.pdf",
    content: `
      <h1>Computer Architecture Fundamentals</h1>
      
      <h2>Von Neumann Architecture</h2>
      <p>The foundation of most modern computers, consisting of:</p>
      <ul>
        <li>Central Processing Unit (CPU)</li>
        <li>Memory Unit</li>
        <li>Input/Output System</li>
        <li>System Bus</li>
      </ul>
      
      <h2>CPU Components</h2>
      <h3>Control Unit (CU)</h3>
      <p>Directs the operation of the processor by telling the computer's memory, arithmetic/logic unit, and input/output devices how to respond to program instructions.</p>
      
      <h3>Arithmetic Logic Unit (ALU)</h3>
      <p>Performs all arithmetic operations (addition, subtraction, etc.) and logical operations (AND, OR, NOT, etc.).</p>
      
      <h3>Registers</h3>
      <p>Small, high-speed storage locations within the CPU. Common registers include:</p>
      <ul>
        <li>Program Counter (PC): Contains the address of the next instruction</li>
        <li>Instruction Register (IR): Holds the current instruction being executed</li>
        <li>Memory Address Register (MAR): Holds the memory address being accessed</li>
        <li>Memory Data Register (MDR): Holds data being transferred to/from memory</li>
        <li>Accumulator (ACC): Stores intermediate arithmetic and logic results</li>
      </ul>
      
      <h2>Instruction Cycle</h2>
      <p>The basic operation cycle of a computer:</p>
      <ol>
        <li>Fetch: Get the next instruction from memory</li>
        <li>Decode: Determine what the instruction means</li>
        <li>Execute: Perform the operation</li>
        <li>Store: Write results back to memory if needed</li>
      </ol>
    `,
  },
  // Add more notes here...
  {
    title: "Memory Hierarchy",
    subject: "Computer Organization & Architecture",
    description: "Detailed explanation of cache, main memory, and virtual memory",
    pages: 10,
    downloadable: true,
    color: "teal",
    pdfLink: "https://www.example.com/memory-hierarchy.pdf",
    content: `
      <h1>Memory Hierarchy in Computer Systems</h1>
      
      <p>Memory hierarchy is a concept that organizes different storage devices in a computer system based on access speed, capacity, and cost per bit.</p>
      
      <h2>Levels of Memory Hierarchy</h2>
      
      <h3>1. Registers</h3>
      <p>The fastest memory in a computer system, located inside the CPU.</p>
      <ul>
        <li>Access time: &lt;1 ns</li>
        <li>Capacity: Very small (bytes to kilobytes)</li>
        <li>Cost: Highest per bit</li>
      </ul>
      
      <h3>2. Cache Memory</h3>
      <p>High-speed SRAM that bridges the gap between registers and main memory.</p>
      <h4>Cache Levels:</h4>
      <ul>
        <li>L1 Cache: Smallest but fastest, typically split into instruction and data caches</li>
        <li>L2 Cache: Larger but slightly slower than L1</li>
        <li>L3 Cache: Even larger but slower, often shared among multiple cores</li>
      </ul>
      
      <h3>3. Main Memory (RAM)</h3>
      <p>Primary storage that holds currently executing programs and data.</p>
      <ul>
        <li>Access time: 50-100 ns</li>
        <li>Capacity: Gigabytes</li>
        <li>Volatile: Data is lost when power is turned off</li>
      </ul>
      
      <h3>4. Secondary Storage</h3>
      <p>Non-volatile storage for long-term data retention.</p>
      <ul>
        <li>Hard Disk Drives (HDD): High capacity, slow access</li>
        <li>Solid State Drives (SSD): Faster than HDDs, more expensive per GB</li>
        <li>Optical Discs: CD, DVD, Blu-ray</li>
        <li>Magnetic Tape: Used primarily for backups and archives</li>
      </ul>
    `,
  },
  {
    title: "Process Management in OS",
    subject: "Operating Systems",
    description: "Learn about process states, scheduling, and synchronization",
    pages: 14,
    downloadable: true,
    color: "orange",
    pdfLink: "https://www.example.com/process-management-os.pdf",
    content: `
      <h1>Process Management in Operating Systems</h1>
      
      <h2>What is a Process?</h2>
      <p>A process is an instance of a program in execution. It includes:</p>
      <ul>
        <li>Program code (text section)</li>
        <li>Current activity (program counter, processor registers)</li>
        <li>Stack (temporary data: function parameters, return addresses, local variables)</li>
        <li>Data section (global variables)</li>
        <li>Heap (dynamically allocated memory during runtime)</li>
      </ul>
      
      <h2>Process States</h2>
      <p>A process can be in one of the following states:</p>
      <ul>
        <li><strong>New:</strong> The process is being created</li>
        <li><strong>Ready:</strong> The process is waiting to be assigned to a processor</li>
        <li><strong>Running:</strong> Instructions are being executed</li>
        <li><strong>Waiting/Blocked:</strong> The process is waiting for some event to occur (I/O completion, etc.)</li>
        <li><strong>Terminated:</strong> The process has finished execution</li>
      </ul>
      
      <h2>Process Control Block (PCB)</h2>
      <p>Each process is represented in the OS by a PCB, which contains:</p>
      <ul>
        <li>Process ID (PID)</li>
        <li>Process state</li>
        <li>Program counter</li>
        <li>CPU registers</li>
        <li>CPU scheduling information</li>
        <li>Memory management information</li>
        <li>Accounting information</li>
        <li>I/O status information</li>
      </ul>
    `,
  },
]

export default function NotePage({ params }: { params: { subject: string; note: string } }) {
  const [noteData, setNoteData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchNote = () => {
      setLoading(true)

      // Convert the URL slug back to a title format for comparison
      const noteTitle = params.note
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      // Find the note that matches the title (case insensitive)
      const foundNote = notes.find((note) => note.title.toLowerCase() === noteTitle.toLowerCase())

      setNoteData(foundNote || null)
      setLoading(false)
    }

    fetchNote()
  }, [params.subject, params.note])

  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    )
  }

  if (!noteData) {
    return (
      <div className="container py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-4">Note not found</h1>
        <p className="mb-6">The note you're looking for doesn't exist or has been moved.</p>
        <Button asChild>
          <Link href="/learn">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Learn
          </Link>
        </Button>
      </div>
    )
  }

  const colorClass = noteData.color === "purple" ? "primary" : noteData.color === "teal" ? "secondary" : "accent"

  return (
    <div className="container py-12 relative">
      <div className="absolute inset-0 bg-gradient-mesh opacity-20 pointer-events-none"></div>
      <MorphingBlob
        className="absolute top-1/4 right-1/4 -z-10"
        color="bg-purple-light/5"
        size="w-64 h-64"
        blur="blur-3xl"
        duration={12}
      />
      <MorphingBlob
        className="absolute bottom-1/3 left-1/3 -z-10"
        color="bg-teal-light/5"
        size="w-80 h-80"
        blur="blur-3xl"
        duration={15}
      />

      <div className="max-w-4xl mx-auto">
        <AnimatedElement animation="fade-up">
          <Button variant="ghost" className="mb-6 -ml-2" asChild>
            <Link href="/learn" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Learn
            </Link>
          </Button>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge
              variant="outline"
              className={`bg-${noteData.color}/10 border-${noteData.color}/30 text-${noteData.color} px-3 py-1 rounded-full`}
            >
              {noteData.subject}
            </Badge>
          </div>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={0.2}>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 font-kolka">
            {noteData.title}
          </h1>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={0.3}>
          <div className="flex items-center gap-4 mb-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-1" />
              <span>{noteData.pages} pages</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>~{Math.round(noteData.pages * 3)} min read</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={0.4}>
          <Card className="glass-card mb-8">
            <CardContent className="p-6">
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: noteData.content }} />
            </CardContent>
          </Card>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={0.5} className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/learn" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Learn
            </Link>
          </Button>

          {noteData.downloadable && (
            <Button
              className={`flex items-center gap-2 gradient-button-${noteData.color === "purple" ? "" : noteData.color === "teal" ? "secondary" : "accent"} text-white`}
              asChild
            >
              <a href={noteData.pdfLink} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4" />
                Download PDF
              </a>
            </Button>
          )}
        </AnimatedElement>
      </div>
    </div>
  )
}
