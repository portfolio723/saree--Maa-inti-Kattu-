
'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';


export function ShippingForm() {
    const form = useFormContext();

    return (
        <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="mobileNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mobile Number</FormLabel>
                            <FormControl><Input {...field} type="tel" /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="addressLine1"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Address Line 1</FormLabel>
                        <FormControl><Input {...field} placeholder="House No., Building, Street, Area" /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="addressLine2"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Address Line 2 (Optional)</FormLabel>
                        <FormControl><Input {...field} placeholder="Landmark, Apt. no., etc." /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="grid md:grid-cols-3 gap-4">
                <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pincode</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="gstin"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>GSTIN (Optional)</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={form.control}
                name="saveAddress"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>
                                Save this address for future use
                            </FormLabel>
                        </div>
                    </FormItem>
                )}
            />
        </div>
    );
}
