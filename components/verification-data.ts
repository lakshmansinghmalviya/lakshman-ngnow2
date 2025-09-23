// This file contains the verification data structure
// Replace this with your actual database or API calls

export interface VerificationData {
  name: string
  email: string
  photo: string
  domain: string
  duration: string
  startDate: string
  endDate: string
  certificateId: string
  status: "Verified" | "Pending" | "Expired"
  issueDate: string
}

// Example of how to add new verification entries
// You can replace this with your database integration
export const verificationDatabase: Record<string, VerificationData> = {
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
  // Add more verification entries here as needed
}
