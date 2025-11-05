
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Disclaimer - Maa Inti Kattu',
    description: 'Disclaimer for the Maa Inti Kattu website.',
};

export default function DisclaimerPage() {
    return (
        <div className="container pt-24 md:pt-32 pb-12 md:pb-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-8">Disclaimer</h1>
                <div className="prose prose-lg max-w-none text-foreground/80 space-y-6">
                    <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                    <p>The information provided by Maa Inti Kattu (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) on our website is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.</p>

                    <h2 className="text-2xl font-semibold font-headline text-primary">External Links Disclaimer</h2>
                    <p>The site may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.</p>
                    
                    <h2 className="text-2xl font-semibold font-headline text-primary">Product Disclaimer</h2>
                    <p>All products are sold as-is. We have made every effort to display the colors and images of our products as accurately as possible. However, we cannot guarantee that your device's display of any color will be accurate. Minor variations in color and weave are intrinsic to handwoven and handcrafted products and are not considered defects.</p>

                    <h2 className="text-2xl font-semibold font-headline text-primary">Professional Disclaimer</h2>
                    <p>The website cannot and does not contain professional advice. The information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals.</p>

                    <h2 className="text-2xl font-semibold font-headline text-primary">Contact Us</h2>
                    <p>If you have any questions about this disclaimer, please contact us at: visit@maaintikattu.com</p>
                </div>
            </div>
        </div>
    );
}
