import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Building, Award, CheckCircle } from "lucide-react"
import { notFound } from "next/navigation"

// This would typically come from a database or API
// For now, using static data that you can replace with your actual verification data
const getVerificationData = (id: string) => {
  const verifications: Record<string, any> = {
    ENGINTSMM25PD118: {
      name: "Parna Das",
      photo: "/parna.jpg",
      domain: "Social Media Manager Intern",
      duration: "1 Month",
      startDate: "August 2025",
      endDate: "September 2025",
      certificateId: "SMM3M11831P",
      status: "Verified",
      issueDate: "September 19, 2025",
    },
    ENGINTGD25KM58: {
      name: "Kushagra Malviya",
      photo: "/kushagra.png",
      domain: "Graphic Designer Internship",
      duration: "1 Month",
      startDate: "August 2025",
      endDate: "September 2025",
      certificateId: "GD1M3831K",
      status: "Verified",
      issueDate: "September 19, 2025",
    },
    ENGINTHRM25DS229: {
      name: "Deeksha Singh",
      photo: "/deeksha.png",
      domain: "HR Manager Internship",
      duration: "1 Month",
      startDate: "September 2025",
      endDate: "October 2025",
      certificateId: "HRM1M22930K",
      status: "Verified",
      issueDate: "October 25, 2025",
    },
  }

  return verifications[id] || null
}

export default function VerifyPage({ params }: { params: { id: string } }) {
  const verification = getVerificationData(params.id)

  if (!verification) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container py-12">
        {/* Header */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">

          <div className="flex items-center space-x-2">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
              Certificate Verified
            </h2>
          </div>

          <p className="max-w-[600px] text-gray-600 md:text-lg">
            This certificate has been successfully verified and is authentic.
          </p>
        </div>

        {/* Verification Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-xl border-0 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Internship Certificate</h3>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {verification.status}
                  </Badge>
                </div>
                <Award className="h-16 w-16 text-white/80" />
              </div>
            </div>

            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <User className="h-5 w-5 text-purple-600 mr-2" />
                      Personal Information
                    </h4>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Image
                            src={verification.photo || "/placeholder.svg"}
                            alt={`${verification.name} profile photo`}
                            width={80}
                            height={80}
                            className="rounded-full object-cover border-4 border-purple-100"
                          />
                          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                            <CheckCircle className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Verified Intern</p>
                          <p className="text-xl font-bold text-gray-900">{verification.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Internship Details */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Building className="h-5 w-5 text-purple-600 mr-2" />
                      Internship Details
                    </h4>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm text-gray-500">Domain</p>
                          <p className="font-semibold text-gray-900">{verification.domain}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Calendar className="h-4 w-4 text-gray-400 mt-1" />
                        <div>
                          <p className="text-sm text-gray-500">Duration</p>
                          <p className="font-semibold text-gray-900">{verification.duration}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {verification.startDate} - {verification.endDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificate Information */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Award className="h-5 w-5 text-purple-600 mr-2" />
                  Certificate Information
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-gray-500">Certificate ID</p>
                      <p className="font-mono font-semibold text-gray-900">{verification.certificateId}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Calendar className="h-4 w-4 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Issue Date</p>
                      <p className="font-semibold text-gray-900">{verification.issueDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <p className="text-sm font-semibold text-green-600">Verified by Enginow</p>
                </div>
                <p className="text-xs text-gray-500">
                  This certificate is authentic and has been issued by Enginow Educational Platform.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="max-w-4xl mx-auto mt-8">
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-6 text-center">
              <h4 className="font-semibold text-gray-900 mb-2">Need to verify another certificate?</h4>
              <p className="text-sm text-gray-600">
                Contact us at{" "}
                <a href="mailto:care@enginow.in" className="text-purple-600 hover:text-purple-700 font-medium">
                  care@enginow.in
                </a>{" "}
                for assistance with certificate verification.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
