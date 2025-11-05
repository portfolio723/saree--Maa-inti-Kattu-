
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Shipping Policy - Maa Inti Kattu',
    description: 'Information about shipping and delivery from Maa Inti Kattu.',
};

export default function ShippingPolicyPage() {
    return (
        <div className="container pt-24 md:pt-32 pb-12 md:pb-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-8">Shipping Policy</h1>
                <div className="prose prose-lg max-w-none text-foreground/80 space-y-6">
                    <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                    <p>Thank you for shopping at Maa Inti Kattu. We are committed to delivering your order with good quality packaging within the given time frame.</p>

                    <h2 className="text-2xl font-semibold font-headline text-primary">1. Order Processing</h2>
                    <p>Orders are processed within 1-3 business days. We ship throughout the week, except on Sundays and public holidays. Orders placed on weekends will be dispatched on the following Monday.</p>
                    
                    <h2 className="text-2xl font-semibold font-headline text-primary">2. Shipping Rates & Delivery Estimates</h2>
                    <p>Shipping charges for your order will be calculated and displayed at checkout. We offer free shipping within India on all prepaid orders.</p>
                    <ul>
                        <li><strong>Domestic Shipping (India):</strong> 5-7 business days.</li>
                        <li><strong>International Shipping:</strong> 10-15 business days. Please note that international shipments may be subject to customs duties and taxes, which are the responsibility of the customer.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold font-headline text-primary">3. Shipment Confirmation & Order Tracking</h2>
                    <p>You will receive a shipment confirmation email once your order has shipped, containing your tracking number(s). The tracking number will be active within 24 hours.</p>

                    <h2 className="text-2xl font-semibold font-headline text-primary">4. Damages</h2>
                    <p>Maa Inti Kattu is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim.</p>

                    <h2 className="text-2xl font-semibold font-headline text-primary">5. Contact Us</h2>
                    <p>If you have any questions about our shipping policy, please contact us at: visit@maaintikattu.com</p>
                </div>
            </div>
        </div>
    );
}
