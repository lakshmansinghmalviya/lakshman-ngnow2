import { AnimatedElement } from "@/components/ui/animated-element"
import { PageTransition } from "@/components/ui/page-transition"

export const metadata = {
  title: "Terms of Service | Enginow",
  description: "Terms of Service for Enginow - Learn Fast, Understand Better",
}

export default function TermsOfService() {
  return (
    <PageTransition>
      <div className="container max-w-4xl py-12 md:py-16">
        <AnimatedElement animation="fade-up">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 gradient-text-primary">Terms of Service</h1>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={0.1}>
          <div className="prose prose-lg max-w-none">
            <p>
              <strong>Last Updated: {new Date().toLocaleDateString()}</strong>
            </p>

            <h2>1. Introduction</h2>
            <p>
              Welcome to Enginow. These Terms of Service ("Terms") govern your access to and use of our website,
              products, and services. By accessing or using our services, you agree to be bound by these Terms and our
              Privacy Policy.
            </p>

            <h2>2. Definitions</h2>
            <p>
              <strong>"Enginow"</strong> refers to our company, website, and services.
              <br />
              <strong>"Services"</strong> refers to our website, courses, learning materials, and related offerings.
              <br />
              <strong>"User"</strong> refers to any individual who accesses or uses our Services.
              <br />
              <strong>"Content"</strong> refers to all materials, information, and resources available through our
              Services.
            </p>

            <h2>3. Account Registration</h2>
            <p>
              To access certain features of our Services, you may need to register for an account. You agree to provide
              accurate, current, and complete information during the registration process and to update such information
              to keep it accurate, current, and complete.
            </p>
            <p>
              You are responsible for safeguarding your password and for all activities that occur under your account.
              You agree to notify us immediately of any unauthorized use of your account.
            </p>

            <h2>4. User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use our Services in any way that violates any applicable law or regulation</li>
              <li>
                Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or
                entity
              </li>
              <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of our Services</li>
              <li>
                Attempt to gain unauthorized access to any portion of our Services or any systems or networks connected
                to our Services
              </li>
              <li>Use our Services for any purpose that is unlawful or prohibited by these Terms</li>
              <li>Use our Services to solicit others to perform or participate in any unlawful acts</li>
              <li>Harvest or collect email addresses or other contact information of other users from our Services</li>
            </ul>

            <h2>5. Intellectual Property</h2>
            <p>
              Our Services and their entire contents, features, and functionality (including but not limited to all
              information, software, text, displays, images, video, and audio, and the design, selection, and
              arrangement thereof) are owned by Enginow, its licensors, or other providers of such material and are
              protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary
              rights laws.
            </p>
            <p>
              These Terms permit you to use our Services for your personal, non-commercial use only. You must not
              reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish,
              download, store, or transmit any of the material on our Services, except as follows:
            </p>
            <ul>
              <li>
                Your computer may temporarily store copies of such materials in RAM incidental to your accessing and
                viewing those materials
              </li>
              <li>
                You may store files that are automatically cached by your Web browser for display enhancement purposes
              </li>
              <li>
                You may print or download one copy of a reasonable number of pages of our Services for your own
                personal, non-commercial use and not for further reproduction, publication, or distribution
              </li>
            </ul>

            <h2>6. Payment Terms</h2>
            <p>
              Certain aspects of our Services may require payment. All payments are processed securely through our
              payment processors. By providing payment information, you represent and warrant that you are authorized to
              use the payment method provided.
            </p>
            <p>
              Prices for our Services are subject to change without notice. We reserve the right to modify or
              discontinue any Service without notice at any time.
            </p>

            <h2>7. Refund Policy</h2>
            <p>
              Our refund policy varies depending on the specific product or service purchased. Please refer to the
              specific terms provided at the time of purchase for applicable refund terms.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, Enginow shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages, including but not limited to, damages for loss of
              profits, goodwill, use, data, or other intangible losses, resulting from:
            </p>
            <ul>
              <li>Your access to or use of or inability to access or use our Services</li>
              <li>Any conduct or content of any third party on our Services</li>
              <li>Any content obtained from our Services</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>

            <h2>9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will provide notice of any material changes by
              posting the new Terms on our website and updating the "Last Updated" date. Your continued use of our
              Services after such modifications will constitute your acknowledgment of the modified Terms and agreement
              to abide and be bound by the modified Terms.
            </p>

            <h2>10. Contact Information</h2>
            <p>Questions about the Terms should be sent to us at terms@enginow.com.</p>
          </div>
        </AnimatedElement>
      </div>
    </PageTransition>
  )
}
