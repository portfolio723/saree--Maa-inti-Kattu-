
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Return Policy - Maa Inti Kattu',
    description: 'Read the return and exchange policy for Maa Inti Kattu.',
};

export default function ReturnPolicyPage() {
    return (
        <div className="container py-12 md:py-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-8">Return & Exchange Policy</h1>
                <div className="prose prose-lg max-w-none text-foreground/80 space-y-6">
                    <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                    <p>We want you to be completely satisfied with your purchase. If you are not satisfied, you may return it for a refund or an exchange, subject to the following conditions.</p>

                    <h2 className="text-2xl font-semibold font-headline text-primary">1. Return Period</h2>
                    <p>You may return items within 14 days of the delivery date. To be eligible for a return, your item must be unused, in the same condition that you received it, and in its original packaging with all tags attached.</p>
                    
                    <h2 className="text-2xl font-semibold font-headline text-primary">2. Return Process</h2>
                    <p>To initiate a return, please email us at visit@maaintikattu.com with your order number and the reason for the return. We will provide you with instructions on how to send back your item.</p>

                    <h2 className="text-2xl font-semibold font-headline text-primary">3. Refunds</h2>
                    <p>Once we receive and inspect your return, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 7-10 business days.</p>

                    <h2 className="text-2xl font-semibold font-headline text-primary">4. Exchanges</h2>
                    <p>We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at visit@maaintikattu.com.</p>

                    <h2 className="text-2xl font-semibold font-headline text-primary">5. Non-Returnable Items</h2>
                    <p>Certain types of items cannot be returned, like perishable goods, custom products (such as special orders or personalized items), and personal care goods. Sale items are also final sale and cannot be returned.</p>

                    <h2 className="text-2xl font-semibold font-headline text-primary">Contact Us</h2>
                    <p>For any questions about our return policy, please contact us at: visit@maaintikattu.com</p>
                </div>
            </div>
        </div>
    );
}
