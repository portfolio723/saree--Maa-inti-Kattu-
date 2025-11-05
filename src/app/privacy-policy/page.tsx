
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy - Maa Inti Kattu',
    description: 'Learn how Maa Inti Kattu collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
    return (
        <div className="container py-12 md:py-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-8">Privacy Policy</h1>
                <div className="prose prose-lg max-w-none text-foreground/80 space-y-6">
                    <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                    <p>Maa Inti Kattu (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

                    <h2 className="text-2xl font-semibold font-headline text-primary">1. Information We Collect</h2>
                    <p>We may collect personal information in a variety of ways, including:</p>
                    <ul>
                        <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you purchase products or register for an account.</li>
                        <li><strong>Derivative Data:</strong> Information our servers automatically collect, such as your IP address, browser type, and the dates and times you access the site.</li>
                        <li><strong>Financial Data:</strong> We do not store any financial information. All payment information is processed by our secure payment gateway.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold font-headline text-primary">2. Use of Your Information</h2>
                    <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:</p>
                    <ul>
                        <li>Create and manage your account.</li>
                        <li>Process your orders and manage payments.</li>
                        <li>Email you regarding your account or order.</li>
                        <li>Improve our website and offerings.</li>
                        <li>Monitor and analyze usage and trends to improve your experience.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold font-headline text-primary">3. Disclosure of Your Information</h2>
                    <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>

                    <h2 className="text-2xl font-semibold font-headline text-primary">4. Security of Your Information</h2>
                    <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>

                    <h2 className="text-2xl font-semibold font-headline text-primary">5. Policy for Children</h2>
                    <p>We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.</p>
                    
                    <h2 className="text-2xl font-semibold font-headline text-primary">6. Changes to This Privacy Policy</h2>
                    <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

                    <h2 className="text-2xl font-semibold font-headline text-primary">7. Contact Us</h2>
                    <p>If you have questions or comments about this Privacy Policy, please contact us at: visit@maaintikattu.com</p>
                </div>
            </div>
        </div>
    );
}
