import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const TimelineStep = ({ title, date, isCompleted, isLast = false }: { title: string; date: string; isCompleted: boolean; isLast?: boolean }) => (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full ${isCompleted ? 'bg-primary' : 'bg-border'}`} />
        {!isLast && <div className={`w-0.5 flex-grow ${isCompleted ? 'bg-primary' : 'bg-border'}`} />}
      </div>
      <div>
        <h4 className={`font-semibold ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>{title}</h4>
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>
    </div>
  );
  
export default function OrderTrackingPage({ params }: { params: { id: string } }) {
    return (
      <div className="container py-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-2">Order Tracking</h1>
        <p className="text-muted-foreground mb-8">Order ID: #{params.id}</p>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                <TimelineStep title="Order Placed" date="June 25, 2024" isCompleted={true} />
                <TimelineStep title="Shipped" date="June 26, 2024" isCompleted={true} />
                <TimelineStep title="Out for Delivery" date="June 27, 2024" isCompleted={false} />
                <TimelineStep title="Delivered" date="-" isCompleted={false} isLast={true} />
            </div>
          </CardContent>
        </Card>
  
        <Separator className="my-8" />
  
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Product details would be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    );
  }
