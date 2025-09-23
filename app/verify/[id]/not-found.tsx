import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Home } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
            <div className="container px-4">
                <Card className="max-w-md mx-auto bg-white shadow-xl">
                    <CardContent className="p-8 text-center">
                        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Certificate Not Found</h1>
                        <p className="text-gray-600 mb-6">
                            The verification ID you're looking for doesn't exist or may have been removed.
                        </p>
                        <div className="space-y-3">
                            <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                                <Link href="https://enginow.in">
                                    <Home className="h-4 w-4 mr-2" />
                                    Back to Enginow
                                </Link>
                            </Button>
                            <p className="text-xs text-gray-500">
                                If you believe this is an error, contact us at{" "}
                                <a href="mailto:verify@enginow.in" className="text-purple-600 hover:text-purple-700">
                                    verify@enginow.in
                                </a>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
