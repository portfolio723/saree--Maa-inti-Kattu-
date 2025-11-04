'use client';

import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc, collection } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from '@/components/ui/skeleton';
import { PackageCheck, Package, Truck, Home } from 'lucide-react';
import type { Order } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

const statusMap = {
  pending: { icon: Package, text: 'Order Placed', dateField: 'orderDate' },
  processing: { icon: Package, text: 'Processing', dateField: 'orderDate' },
  shipped: { icon: Truck, text: 'Shipped', dateField: 'shippedDate' },
  delivered: { icon: Home, text: 'Delivered', dateField: 'deliveredDate' },
};
const statusOrder = ['pending', 'processing', 'shipped', 'delivered'];

const TimelineStep = ({ title, date, icon: Icon, isCompleted, isLast = false }: { title: string; date: string | null; icon: React.ElementType; isCompleted: boolean; isLast?: boolean }) => (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isCompleted ? 'bg-primary text-primary-foreground' : 'bg-border text-muted-foreground'}`}>
           <Icon className="w-5 h-5"/>
        </div>
        {!isLast && <div className={`w-0.5 flex-grow ${isCompleted ? 'bg-primary' : 'bg-border'}`} />}
      </div>
      <div>
        <h4 className={`font-semibold ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>{title}</h4>
        <p className="text-sm text-muted-foreground">{date ? new Date(date).toLocaleDateString() : 'Pending'}</p>
      </div>
    </div>
);
  
export default function OrderTrackingPage({ params }: { params: { id: string } }) {
    const firestore = useFirestore();
    
    // This is a simplification. In a real app, you'd get the userId from auth state.
    // Since this is a server component initially, we'd need a way to pass the userId.
    // For now, we'll assume a structure where orders are publicly trackable by ID,
    // or we're fetching this on the client where we can get the user.
    // To make this work, we'll use a placeholder userID. A real app MUST secure this.
    const orderDocRef = useMemoFirebase(() => {
        if (!firestore) return null;
        // IMPORTANT: This path is insecure. In a real app, you would have
        // `/users/{userId}/orders/{orderId}` and get the userId from auth.
        // For this demo, we're using a top-level collection.
        return doc(firestore, 'orders', params.id);
    }, [firestore, params.id]);

    const { data: order, isLoading } = useDoc<Order>(orderDocRef);

    if (isLoading) {
        return (
            <div className="container py-24 md:py-28">
                 <Skeleton className="h-10 w-2/4 mb-2" />
                 <Skeleton className="h-6 w-1/3 mb-8" />
                 <div className="grid md:grid-cols-2 gap-8">
                    <Skeleton className="h-96 w-full" />
                    <Skeleton className="h-96 w-full" />
                 </div>
            </div>
        );
    }

    if (!order) {
        notFound();
    }

    const currentStatusIndex = statusOrder.indexOf(order.status);

    return (
      <div className="container py-24 md:py-28">
        <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Order Tracking</h1>
            <PackageCheck className="h-8 w-8 text-primary" />
        </div>
        <p className="text-muted-foreground mb-8">Order ID: #{order.id}</p>
        
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Order Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {statusOrder.map((status, index) => {
                            const step = statusMap[status as keyof typeof statusMap];
                            // @ts-ignore
                            const date = order[step.dateField];
                            return (
                                <TimelineStep
                                    key={status}
                                    title={step.text}
                                    date={date}
                                    icon={step.icon}
                                    isCompleted={index <= currentStatusIndex}
                                    isLast={index === statusOrder.length - 1}
                                />
                            )
                        })}
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Order Summary</CardTitle>
                        <CardDescription>Placed on {new Date(order.orderDate).toLocaleDateString()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="divide-y">
                        {order.items.map((item, index) => (
                            <div key={index} className="flex items-center gap-4 py-4">
                                <div className="relative h-20 w-20 rounded-md overflow-hidden">
                                     <Image src={item.image} alt={item.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1">
                                    <Link href={`/products/${item.id}`} className="font-semibold hover:text-primary">{item.name}</Link>
                                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                        </div>
                         <Separator className="my-4" />
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>₹{order.totalAmount.toFixed(2)}</span>
                            </div>
                             <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>FREE</span>
                            </div>
                            <Separator />
                             <div className="flex justify-between font-bold text-base">
                                <span>Total</span>
                                <span>₹{order.totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    );
}
