

'use client';

import type { Address } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Home, Briefcase, Dot } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AddressCardProps {
    address: Address;
    isSelected: boolean;
    onSelect: () => void;
}

const addressTypeIcons = {
    home: <Home className="w-4 h-4" />,
    work: <Briefcase className="w-4 h-4" />,
    other: <Dot className="w-4 h-4" />,
};

export function AddressCard({ address, isSelected, onSelect }: AddressCardProps) {
    return (
        <div
            onClick={onSelect}
            className={cn(
                "rounded-lg border p-4 cursor-pointer transition-all",
                isSelected ? "border-primary ring-2 ring-primary" : "border-border hover:bg-muted/50"
            )}
        >
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{address.fullName}</h3>
                        <Badge variant="outline" className="text-xs capitalize flex items-center gap-1">
                            {addressTypeIcons[address.addressType]}
                            {address.addressType}
                        </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {address.addressLine1}, {address.addressLine2 ? `${address.addressLine2},` : ''}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {address.city}, {address.state} - {address.pincode}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Mobile: <span className="font-medium text-foreground">{address.mobileNumber}</span>
                    </p>
                </div>
                {/* <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); console.log('edit');}}>Edit</Button> */}
            </div>
        </div>
    );
}
