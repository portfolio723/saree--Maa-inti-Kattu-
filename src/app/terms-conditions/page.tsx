
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms & Conditions - Maa Inti Kattu',
    description: 'Read the terms and conditions for using the Maa Inti Kattu website.',
};

export default function TermsAndConditionsPage() {
    return (
        <div className="container py-12 md:py-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-8">Terms & Conditions</h1>
                <div className="prose prose-lg max-w-none text-foreground/80 space-y-6">
                    <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                    <p>Welcome to Maa Inti Kattu. By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions.</p>

                    <h2 className="text-2xl font-semibold font-headline text-primary">1. General</h2>
                    <p>We reserve the right to refuse service to anyone for any reason at any time. The content of the pages of this website is for your general information and use only. It is subject to change without notice.</p>
                    
                    <h2 className="text-2xl font-semibold font-headline text-primary">2. Products and Pricing</h2>
                    <p>Prices for our products are subject to change without notice. We have made every effort to display as accurately as possible the colors and images of our products. We cannot guarantee that your computer monitor's display of any color will be accurate.</p>

                    <h2 className="text-2xl font-semibold font-headline text-primary">3. Account Information</h2>
                    <p>You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and payment method details, so that we can complete your transactions and contact you as needed.</p>

                    <h2 className="text-2xl font-semibold font-headline text-primary">4. Intellectual Property</h2>
                    <p>This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</p>

                    <h2 className="text-2xl font-semibold font-headline text-primary">5. Governing Law</h2>
                    <p>These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India.</p>

                    <h2 className="text-2xl font-semibold font-headline text-primary">6. Contact Us</h2>
                    <p>If you have any questions about these Terms, please contact us at: visit@maaintikattu.com</p>
                </div>
            </div>
        </div>
    );
}
