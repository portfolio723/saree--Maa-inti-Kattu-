
'use client';

import { useState, useEffect } from 'react';
import type { Order } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Skeleton } from '../ui/skeleton';
import { orders as mockOrders } from '@/lib/mock-data';

interface OrdersListProps {
  userId: string;
}

export function OrdersList({ userId }: OrdersListProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
        const userOrders = mockOrders.filter(o => o.userId === userId);
        setOrders(userOrders);
        setIsLoading(false);
    }, 1000);
  }, [userId]);


  if (isLoading) {
    return (
        <div className="space-y-4">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-8 w-3/4" />
            <div className="border rounded-md">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
        </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
            <CardTitle className="font-headline">No Orders Found</CardTitle>
            <CardDescription className="mt-2">You haven't placed any orders yet.</CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
     <Card>
        <CardHeader>
            <CardTitle className="font-headline">Your Orders</CardTitle>
            <CardDescription>View the history of your past purchases.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>
                                <Link href={`/orders/${order.id}`} className="font-medium text-primary hover:underline">
                                    #{order.id.substring(0, 7)}...
                                </Link>
                            </TableCell>
                            <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                            <TableCell><Badge>{order.status}</Badge></TableCell>
                            <TableCell className="text-right">₹{order.totalAmount.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  );
}
