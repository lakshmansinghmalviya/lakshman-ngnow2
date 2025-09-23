"use client"

import { useState, useEffect } from "react"
import { Download, FileText, Search, BookOpen, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AnimatedElement } from "@/components/ui/animated-element"
import { MorphingBlob } from "@/components/ui/floating-element"
import { motion } from "framer-motion"

export default function LearnPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [filteredNotes, setFilteredNotes] = useState<any[]>([])
  const [visibleNotes, setVisibleNotes] = useState(6)

  const subjects = [
    "Data Structures & Algorithms",
    // "Computer Organization & Architecture",
    "Operating Systems",
    "Database Management Systems",
    "Computer Networks",
    "Theory of Computation",
    "Compiler Design",
    "Software Engineering",
  ]

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
    /* {
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
    // Additional notes content...
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
    },*/
    // More notes...
  ]

  useEffect(() => {
    filterNotes(activeTab, searchQuery)
  }, [activeTab, searchQuery])

  const filterNotes = (tab: string, query: string) => {
    let filtered = notes

    // Filter by tab/subject
    if (tab !== "all") {
      const subjectPrefix = tab.charAt(0).toUpperCase() + tab.slice(1)
      filtered = filtered.filter((note) => note.subject.startsWith(subjectPrefix))
    }

    // Filter by search query
    if (query) {
      const lowercaseQuery = query.toLowerCase()
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(lowercaseQuery) ||
          note.subject.toLowerCase().includes(lowercaseQuery) ||
          note.description.toLowerCase().includes(lowercaseQuery),
      )
    }

    setFilteredNotes(filtered)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setVisibleNotes(6)
  }

  const handleLoadMore = () => {
    setVisibleNotes((prev) => prev + 6)
  }

  return (
    <div className="container py-12 relative">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30 pointer-events-none"></div>
      <MorphingBlob
        className="absolute top-1/4 right-1/4 -z-10"
        color="bg-purple-light/10"
        size="w-64 h-64"
        blur="blur-3xl"
        duration={12}
      />
      <MorphingBlob
        className="absolute bottom-1/3 left-1/3 -z-10"
        color="bg-teal-light/10"
        size="w-80 h-80"
        blur="blur-3xl"
        duration={15}
      />

      <AnimatedElement
        animation="fade-up"
        className="flex flex-col items-center justify-center space-y-4 text-center mb-8 relative"
      >
        <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary px-4 py-1 mb-2 rounded-full">
          <BookOpen className="h-3.5 w-3.5 mr-1.5 text-primary animate-pulse-slow" />
          Learning Resources
        </Badge>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text-primary font-kolka">
          Learn
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          Access comprehensive notes, cheat sheets, and key concepts
        </p>
      </AnimatedElement>

      <AnimatedElement
        animation="fade-up"
        delay={0.2}
        className="flex items-center w-full max-w-lg mx-auto mb-8 relative"
      >
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for notes, concepts..."
            className="w-full bg-white/80 backdrop-blur-sm pl-10 pr-4 rounded-full border-white/30 focus:border-primary/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </AnimatedElement>

      <AnimatedElement animation="fade-up" delay={0.3} className="w-full relative">
        <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
          <div className="overflow-x-auto pb-2 mb-6">
            <TabsList className="bg-white/50 backdrop-blur-sm border border-white/20 p-1 rounded-full inline-flex w-auto min-w-full md:w-auto">
              <motion.div whileTap={{ scale: 0.95 }}>
                <TabsTrigger value="all" className="rounded-full">
                  All
                </TabsTrigger>
              </motion.div>
              {subjects.map((subject, index) => (
                <motion.div key={index} whileTap={{ scale: 0.95 }}>
                  <TabsTrigger value={subject.split(" ")[0].toLowerCase()} className="rounded-full">
                    {subject.split(" ")[0]}
                  </TabsTrigger>
                </motion.div>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.slice(0, visibleNotes).map((note, index) => (
                <AnimatedElement key={index} animation="scale-in" delay={0.1 * index}>
                  <NoteCard note={note} />
                </AnimatedElement>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </AnimatedElement>

      {visibleNotes < filteredNotes.length && (
        <AnimatedElement animation="fade-up" delay={0.5} className="mt-12 text-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="rounded-full border-primary/50 text-primary hover:bg-primary/10 group"
              onClick={handleLoadMore}
            >
              <span>Load More Resources</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </AnimatedElement>
      )}
    </div>
  )
}

function NoteCard({ note }: { note: any }) {
  return (
    <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }}>
      <Card className="glass-card overflow-hidden card-hover glow-on-hover h-full">
        <div className={`h-1.5 w-full bg-gradient-to-r from-${note.color} to-${note.color}-light`}></div>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle
                className={`text-lg gradient-text-${note.color === "purple" ? "primary" : note.color === "teal" ? "secondary" : "accent"}`}
              >
                {note.title}
              </CardTitle>
              <CardDescription>{note.subject}</CardDescription>
            </div>
            <Badge
              variant="outline"
              className={`bg-${note.color}/10 border-${note.color}/30 text-${note.color} px-2 py-0.5 rounded-full text-xs`}
            >
              {note.subject.split(" ")[0]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{note.description}</p>
          <div className="flex items-center mt-4 text-sm text-muted-foreground">
            <FileText className="h-4 w-4 mr-2" />
            <span>{note.pages} pages</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          {note.downloadable && (
            <Button
              size="sm"
              className={`flex items-center gap-1 rounded-full gradient-button-${note.color === "purple" ? "" : note.color === "teal" ? "secondary" : "accent"} text-white`}
              asChild
            >
              <a href={note.pdfLink} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4" />
                <span className="relative">
                  Download PDF
                  <span className="absolute inset-0 animate-pulse-slow opacity-75 blur-sm"></span>
                </span>
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
