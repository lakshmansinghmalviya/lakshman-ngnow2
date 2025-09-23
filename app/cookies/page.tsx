import { AnimatedElement } from "@/components/ui/animated-element"
import { PageTransition } from "@/components/ui/page-transition"

export const metadata = {
  title: "Cookie Policy | Enginow",
  description: "Cookie Policy for Enginow - Learn Fast, Understand Better",
}

export default function CookiePolicy() {
  return (
    <PageTransition>
      <div className="container max-w-4xl py-12 md:py-16">
        <AnimatedElement animation="fade-up">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 gradient-text-primary">Cookie Policy</h1>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={0.1}>
          <div className="prose prose-lg max-w-none">
            <p>
              <strong>Last Updated: {new Date().toLocaleDateString()}</strong>
            </p>

            <h2>What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you visit a website.
              They are widely used to make websites work more efficiently and provide information to the website owners.
              Cookies enhance user experience by remembering your preferences and enabling certain site functions.
            </p>

            <h2>How We Use Cookies</h2>
            <p>Enginow uses cookies for various purposes, including:</p>
            <ul>
              <li>
                <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly.
                They enable core functionality such as security, network management, and account access. You may disable
                these by changing your browser settings, but this may affect how the website functions.
              </li>
              <li>
                <strong>Analytical/Performance Cookies:</strong> These cookies allow us to recognize and count the
                number of visitors and see how visitors move around our website when they are using it. This helps us
                improve the way our website works, for example, by ensuring that users find what they are looking for
                easily.
              </li>
              <li>
                <strong>Functionality Cookies:</strong> These cookies are used to recognize you when you return to our
                website. This enables us to personalize our content for you, greet you by name, and remember your
                preferences (for example, your choice of language or region).
              </li>
              <li>
                <strong>Targeting Cookies:</strong> These cookies record your visit to our website, the pages you have
                visited, and the links you have followed. We use this information to make our website and the
                advertising displayed on it more relevant to your interests.
              </li>
            </ul>

            <h2>Third-Party Cookies</h2>
            <p>
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics of
              the website and deliver advertisements on and through the website. These third parties may include:
            </p>
            <ul>
              <li>Google Analytics</li>
              <li>Facebook</li>
              <li>YouTube</li>
              <li>Payment processors</li>
              <li>Other advertising networks and technology partners</li>
            </ul>

            <h2>Managing Cookies</h2>
            <p>
              Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies,
              or to alert you when cookies are being sent. The methods for doing so vary from browser to browser, and
              from version to version. You can obtain up-to-date information about blocking and deleting cookies via
              these links:
            </p>
            <ul>
              <li>
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
                  Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Edge
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Safari
                </a>
              </li>
              <li>
                <a
                  href="https://help.opera.com/en/latest/web-preferences/#cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Opera
                </a>
              </li>
            </ul>
            <p>
              Please note that restricting cookies may impact the functionality of our website. For more information
              about cookies, visit{" "}
              <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">
                www.allaboutcookies.org
              </a>
              .
            </p>

            <h2>Cookie Consent</h2>
            <p>
              When you first visit our website, you will be presented with a cookie banner that allows you to accept or
              decline non-essential cookies. You can change your preferences at any time by clicking on the "Cookie
              Settings" link in the footer of our website.
            </p>

            <h2>Types of Cookies We Use</h2>
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Session</td>
                  <td>These cookies are temporary and are deleted when you close your browser</td>
                  <td>Session</td>
                </tr>
                <tr>
                  <td>Persistent</td>
                  <td>These cookies remain on your device until they expire or you delete them</td>
                  <td>1 day to 2 years</td>
                </tr>
                <tr>
                  <td>Authentication</td>
                  <td>These cookies help us identify you when you're logged in</td>
                  <td>Session to 2 weeks</td>
                </tr>
                <tr>
                  <td>Analytics</td>
                  <td>These cookies help us understand how visitors interact with our website</td>
                  <td>1 day to 2 years</td>
                </tr>
                <tr>
                  <td>Preferences</td>
                  <td>These cookies remember your settings and preferences</td>
                  <td>1 year</td>
                </tr>
              </tbody>
            </table>

            <h2>Changes to Our Cookie Policy</h2>
            <p>
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new
              Cookie Policy on this page and updating the "Last Updated" date at the top.
            </p>

            <h2>Contact Us</h2>
            <p>If you have any questions about our Cookie Policy, please contact us at:</p>
            <p>
              Email: enginow25@gmail.com
              <br />
              Address: Jajmau, Lal Bangla, Kanpur, Uttar Pradesh 208027, India
            </p>
          </div>
        </AnimatedElement>
      </div>
    </PageTransition>
  )
}
