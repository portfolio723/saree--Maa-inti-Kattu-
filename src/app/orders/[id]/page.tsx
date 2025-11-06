
// src/app/orders/[id]/page.tsx
import OrderTrackingClient from './OrderTrackingClient';
import type { Order } from '@/lib/types';
import { products } from '@/lib/mock-data';

interface PageProps {
  params: Promise<{ 
    id: string; 
  }>;
}

// Mock fetching order data on the server
async function getOrder(id: string): Promise<Order | null> {
    const mockOrder: Order = {
        id: id,
        userId: 'mock-user-123',
        orderDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        shippedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        deliveredDate: null,
        status: 'shipped',
        totalAmount: 335.50,
        shippingAddress: {
            id: 'addr1',
            fullName: 'John Doe',
            mobileNumber: '1234567890',
            pincode: '12345',
            addressLine1: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            addressType: 'home',
        },
        items: [
            { ...products[0], quantity: 1, image: products[0].images[0].imageUrl },
            { ...products[1], quantity: 1, image: products[1].images[0].imageUrl },
        ],
    };
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockOrder;
}


export default async function OrderPage({ params }: PageProps) {
  const { id } = await params;
  const order = await getOrder(id);

  return <OrderTrackingClient order={order} />;
}
