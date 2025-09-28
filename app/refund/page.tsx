import { AnimatedElement } from "@/components/ui/animated-element"
import { PageTransition } from "@/components/ui/page-transition"

export const metadata = {
    title: "Refund Policy | Enginow",
    description: "Refund Policy for Enginow - Learn Fast, Understand Better",
}

export default function RefundPolicy() {
    return (
        <PageTransition>
            <div className="container max-w-4xl py-12 md:py-16">
                <AnimatedElement animation="fade-up">
                    <h1 className="text-3xl md:text-4xl font-bold mb-8 gradient-text-primary">Refund Policy</h1>
                </AnimatedElement>

                <AnimatedElement animation="fade-up" delay={0.1}>
                    <div className="prose prose-lg max-w-none">
                        <p>
                            <strong>Last Updated: {new Date().toLocaleDateString()}</strong>
                        </p>

                        <h2>Overview</h2>
                        <p>
                            At Enginow, we are committed to providing high-quality educational content and training programs.
                            This Refund Policy outlines the terms and conditions under which refunds may be requested and processed
                            for our courses, training programs, and other services.
                        </p>

                        <h2>Refund Eligibility</h2>

                        <h3>Free Courses</h3>
                        <p>
                            Since our free courses are provided at no cost, refunds are not applicable. However, if you experience
                            technical issues accessing free content, please contact our support team for assistance.
                        </p>

                        <h3>Premium Courses and Training Programs</h3>
                        <p>
                            For paid courses and training programs, refunds may be requested under the following conditions:
                        </p>
                        <ul>
                            <li>
                                <strong>7-Day Money-Back Guarantee:</strong> You may request a full refund within 7 days of enrollment
                                if you are not satisfied with the course content, provided you have completed less than 20% of the course material.
                            </li>
                            <li>
                                <strong>Technical Issues:</strong> If you experience persistent technical problems that prevent you from
                                accessing the course content, and our support team cannot resolve the issue within 48 hours.
                            </li>
                            <li>
                                <strong>Course Cancellation:</strong> If we cancel a course or training program before it begins,
                                you will receive a full refund or the option to transfer to another program.
                            </li>
                        </ul>

                        <h2>Non-Refundable Situations</h2>
                        <p>Refunds will not be provided in the following circumstances:</p>
                        <ul>
                            <li>Requests made after the 7-day refund period has expired</li>
                            <li>If you have completed more than 20% of the course content</li>
                            <li>If you have downloaded course materials or certificates</li>
                            <li>For courses purchased during promotional periods (unless otherwise specified)</li>
                            <li>If you violate our Terms of Service or Code of Conduct</li>
                            <li>For personal reasons unrelated to course quality or technical issues</li>
                            <li>If you fail to attend live sessions or complete assignments (for instructor-led programs)</li>
                        </ul>

                        <h2>Refund Process</h2>

                        <h3>How to Request a Refund</h3>
                        <ol>
                            <li>
                                <strong>Contact Support:</strong> Send an email to <a href="mailto:care@enginow.in">care@enginow.in</a>
                                with the subject line "Refund Request - [Course Name]"
                            </li>
                            <li>
                                <strong>Provide Details:</strong> Include your enrollment details, reason for refund request,
                                and any supporting documentation
                            </li>
                            <li>
                                <strong>Review Process:</strong> Our team will review your request within 2-3 business days
                            </li>
                            <li>
                                <strong>Decision Notification:</strong> You will receive an email with our decision and next steps
                            </li>
                        </ol>

                        <h3>Refund Timeline</h3>
                        <ul>
                            <li><strong>Credit/Debit Cards:</strong> 5-7 business days after approval</li>
                            <li><strong>Net Banking:</strong> 3-5 business days after approval</li>
                            <li><strong>UPI/Digital Wallets:</strong> 1-3 business days after approval</li>
                            <li><strong>Bank Transfer:</strong> 7-10 business days after approval</li>
                        </ul>

                        <h2>Partial Refunds</h2>
                        <p>
                            In certain circumstances, we may offer partial refunds:
                        </p>
                        <ul>
                            <li>If you have completed between 20-50% of the course content, you may be eligible for a 50% refund</li>
                            <li>For training programs, if you withdraw after the first week but before 25% completion</li>
                            <li>In cases of exceptional circumstances, as determined by our management team</li>
                        </ul>

                        <h2>Course Transfers</h2>
                        <p>
                            As an alternative to refunds, we offer course transfers:
                        </p>
                        <ul>
                            <li>Transfer to another course of equal or lesser value within 30 days of enrollment</li>
                            <li>One-time transfer allowed per enrollment</li>
                            <li>Price difference (if any) will be adjusted accordingly</li>
                        </ul>

                        <h2>Training Program Specific Terms</h2>

                        <h3>Live Training Programs</h3>
                        <ul>
                            <li>Full refund available up to 3 days before the program start date</li>
                            <li>50% refund available within the first week of the program</li>
                            <li>No refund after the first week of live training</li>
                        </ul>

                        <h3>Self-Paced Programs</h3>
                        <ul>
                            <li>Standard 7-day refund policy applies</li>
                            <li>Refund eligibility based on content completion percentage</li>
                        </ul>

                        <h2>Exceptional Circumstances</h2>
                        <p>
                            We understand that exceptional circumstances may arise. In cases of:
                        </p>
                        <ul>
                            <li>Medical emergencies (with proper documentation)</li>
                            <li>Job loss or significant financial hardship</li>
                            <li>Technical issues on our platform lasting more than 72 hours</li>
                        </ul>
                        <p>
                            We may consider refund requests beyond our standard policy. Each case will be reviewed individually
                            by our management team.
                        </p>

                        <h2>Refund Processing</h2>
                        <p>
                            Once a refund is approved:
                        </p>
                        <ul>
                            <li>You will lose access to all course materials and resources</li>
                            <li>Any certificates earned will be revoked</li>
                            <li>Access to student communities and support will be terminated</li>
                            <li>The refund will be processed to the original payment method</li>
                        </ul>

                        <h2>Dispute Resolution</h2>
                        <p>
                            If you are not satisfied with our refund decision, you may:
                        </p>
                        <ul>
                            <li>Request a review by escalating to our management team</li>
                            <li>Provide additional documentation or clarification</li>
                            <li>Seek mediation through appropriate consumer protection agencies</li>
                        </ul>

                        <h2>Contact Information</h2>
                        <p>
                            For refund requests or questions about this policy, please contact us:
                        </p>
                        <ul>
                            <li><strong>Email:</strong> care@enginow.in</li>
                            <li><strong>Phone:</strong> +91 89350 69570</li>
                            <li><strong>Address:</strong> Noida, Uttar Pradesh 201301, India</li>
                        </ul>

                        <h2>Policy Updates</h2>
                        <p>
                            We reserve the right to update this Refund Policy at any time. Changes will be effective immediately
                            upon posting on our website. Continued use of our services after changes constitutes acceptance of
                            the updated policy.
                        </p>

                        <h2>Important Notes</h2>
                        <ul>
                            <li>All refund requests must be submitted in writing via email</li>
                            <li>Verbal requests or social media messages will not be considered</li>
                            <li>Processing fees charged by payment gateways are non-refundable</li>
                            <li>Refunds are processed in the same currency as the original payment</li>
                            <li>This policy applies to purchases made directly through our website only</li>
                        </ul>
                    </div>
                </AnimatedElement>
            </div>
        </PageTransition>
    )
}