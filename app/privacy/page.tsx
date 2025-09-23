import { AnimatedElement } from "@/components/ui/animated-element"
import { PageTransition } from "@/components/ui/page-transition"

export const metadata = {
  title: "Privacy Policy | Enginow",
  description: "Privacy Policy for Enginow - Learn Fast, Understand Better",
}

export default function PrivacyPolicy() {
  return (
    <PageTransition>
      <div className="container max-w-4xl py-12 md:py-16">
        <AnimatedElement animation="fade-up">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 gradient-text-primary">Privacy Policy</h1>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={0.1}>
          <div className="prose prose-lg max-w-none">
            <p>
              <strong>Last Updated: {new Date().toLocaleDateString()}</strong>
            </p>

            <h2>Introduction</h2>
            <p>
              Welcome to Enginow ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the
              security of your personal information. This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website or use our services.
            </p>

            <h2>Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
              <li>
                <strong>Personal Information:</strong> Name, email address, phone number, and other contact details you
                provide when registering for an account, subscribing to our newsletter, or contacting us.
              </li>
              <li>
                <strong>Educational Information:</strong> Course progress, assessment results, and learning preferences.
              </li>
              <li>
                <strong>Technical Information:</strong> IP address, browser type, device information, pages visited,
                time spent on pages, and other usage data.
              </li>
              <li>
                <strong>Payment Information:</strong> When you make a purchase, our payment processors collect payment
                details necessary to complete the transaction.
              </li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect for various purposes, including:</p>
            <ul>
              <li>Providing, maintaining, and improving our educational services</li>
              <li>Processing transactions and sending related information</li>
              <li>Responding to your comments, questions, and requests</li>
              <li>Sending you technical notices, updates, security alerts, and administrative messages</li>
              <li>Personalizing your experience and delivering content relevant to your interests</li>
              <li>Monitoring and analyzing trends, usage, and activities in connection with our services</li>
              <li>Detecting, preventing, and addressing technical issues</li>
            </ul>

            <h2>Sharing Your Information</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>Service providers who perform services on our behalf</li>
              <li>Partners with whom we offer co-branded services or promotional offerings</li>
              <li>Third parties in connection with a merger, sale, or acquisition</li>
              <li>Law enforcement or other third parties when required by law or to protect our rights</li>
            </ul>

            <h2>Your Rights and Choices</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li>Accessing, correcting, or deleting your personal information</li>
              <li>Withdrawing consent for processing your information</li>
              <li>Requesting restriction of processing or objecting to processing</li>
              <li>Data portability</li>
              <li>Lodging a complaint with a supervisory authority</li>
            </ul>

            <h2>Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information from
              unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the
              Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last Updated" date at the top.
            </p>

            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p>
              Email: privacy@enginow.com
              <br />
              Address: 123 Tech Park, Sector 62, Noida, Uttar Pradesh 201301
            </p>
          </div>
        </AnimatedElement>
      </div>
    </PageTransition>
  )
}
