import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Instagram, Linkedin } from "lucide-react"

export default function AboutPage() {
  const founder = {
    name: "Ankush Singh Bhadauriya",
    role: "Founder & CEO",
    bio: "Ankush is a IT graduate from PSIT, Kanpur with 1+ years of experience in the tech industry. He founded Enginow with a mission to make technical education accessible and easy to understand for all engineering students.",
    image: "/founder.jpg?height=300&width=300",
    social: {
      instagram: "#",
      linkedin: "#",
    },
  }

  const cofounder = {
    name: "Akshat Gupta",
    role: "Co-Founder",
    bio: "Akshat is graduated from renowed college from kanpur and has a good knowledge of DSA and other coding languages.",
    image: "/co-founder.jpg?height=300&width=300",
    social: {
      instagram: "#",
      linkedin: "#",
    },
  }
  const coo = {
    name: "Sanjana Singh",
    role: "COO",
    bio: "Sanjana ensures smooth daily operations and team coordination. With a strong focus on execution and strategy, she helps turn our vision into reality and keeps the company running efficiently.",
    image: "/coo.png?height=300&width=300",
    social: {
    instagram: "#",
      linkedin: "#",
      },
 }
  

  const teamMembers = [
   /* {
      name: "Jiban Nath",
      role: "Graphic Designer",
      bio: "Jiban is responsible for the designing works and development of the Enginow platform.",
      image: "/gd.jpg?height=200&width=200",
    },
    {
      name: "Neha Gupta",
      role: "DSA Instructor",
      bio: "Neha specializes in Data Structures and Algorithms and creates comprehensive learning materials for these topics.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Vikram Singh",
      role: "Systems Instructor",
      bio: "Vikram focuses on Operating Systems, Computer Architecture, and Networks courses.",
      image: "/placeholder.svg?height=200&width=200",
    },*/
  ]

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-kolka">About Us❤️</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          Our mission is to simplify technical education for engineering students
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            Enginow was founded in 2025 with a simple mission: to make complex technical subjects and non technical subjects accessible 
            and easy to understand for all engineering students.
          </p>
          <p className="text-muted-foreground mb-4">
            Having experienced the challenges of technical education firsthand, our founder recognized the need for clear, 
            concise, and practical learning resources that bridge the gap between 
            theoretical knowledge and practical application.
          </p>
          <p className="text-muted-foreground">
            Today, we serve hundreds of students across India, helping them excel in their technical education through our comprehensive courses, 
            concept notes, and learning resources.
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src="/Enginow White.png?height=400&width=500"
            alt="About Enginow"
            width={500}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Founder</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center max-w-3xl mx-auto">
          <div className="flex-shrink-0">
            <Image
              src={founder.image || "/founder.jpg"}
              alt={founder.name}
              width={300}
              height={300}
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">{founder.name}</h3>
            <p className="text-primary mb-2">{founder.role}</p>
            <div className="flex space-x-3 mb-4">
              <a
                href={founder.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-700 transition-colors"
                aria-label={`${founder.name}'s Instagram`}
              >
                <Instagram size={20} />
              </a>
              <a
                href={founder.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-colors"
                aria-label={`${founder.name}'s LinkedIn`}
              >
                <Linkedin size={20} />
              </a>
            </div>
            <p className="text-muted-foreground">{founder.bio}</p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Co-Founder</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center max-w-3xl mx-auto">
          <div className="flex-shrink-0">
            <Image
              src={cofounder.image || "/co-founder.jpg"}
              alt={cofounder.name}
              width={300}
              height={300}
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">{cofounder.name}</h3>
            <p className="text-primary mb-2">{cofounder.role}</p>
            <div className="flex space-x-3 mb-4">
              <a
                href={cofounder.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-700 transition-colors"
                aria-label={`${cofounder.name}'s Instagram`}
              >
                <Instagram size={20} />
              </a>
              <a
                href={cofounder.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-colors"
                aria-label={`${cofounder.name}'s LinkedIn`}
              >
                <Linkedin size={20} />
              </a>
            </div>
            <p className="text-muted-foreground">{cofounder.bio}</p>
          </div>
        </div>
      </div>

        <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Chief Operating Officer</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center max-w-3xl mx-auto">
          <div className="flex-shrink-0">
            <Image
              src={coo.image || "/placeholder.svg"}
              alt={coo.name}
              width={300}
              height={300}
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">{coo.name}</h3>
            <p className="text-primary mb-2">{coo.role}</p>
            <div className="flex space-x-3 mb-4">
              <a
                href={coo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-700 transition-colors"
                aria-label={`${coo.name}'s Instagram`}
              >
                <Instagram size={20} />
              </a>
              <a
                href={coo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-colors"
                aria-label={`${coo.name}'s LinkedIn`}
              >
                <Linkedin size={20} />
              </a>
            </div>
            <p className="text-muted-foreground">{coo.bio}</p>
          </div>
        </div>
      </div>


        
      <div>
        <h2 className="text-2xl font-bold mb-8 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="bg-white">
              <CardHeader className="text-center pt-6">
                <div className="mx-auto mb-4">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={150}
                    height={150}
                    className="rounded-full object-cover"
                  />
                </div>
                <CardTitle>{member.name}</CardTitle>
                <CardDescription className="text-primary">{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
