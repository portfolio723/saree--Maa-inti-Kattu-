import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function AdminPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-8">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <span className="text-muted-foreground">$</span>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                <span className="text-muted-foreground">🛍️</span>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                 <p className="text-xs text-muted-foreground">+19% from last month</p>
            </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle className="font-headline">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>#12345</TableCell>
                        <TableCell>John Doe</TableCell>
                        <TableCell><Badge>Shipped</Badge></TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>#12346</TableCell>
                        <TableCell>Jane Smith</TableCell>
                        <TableCell><Badge variant="secondary">Processing</Badge></TableCell>
                        <TableCell className="text-right">$85.50</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
