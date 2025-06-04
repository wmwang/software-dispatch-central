
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DeliveryCard from "@/components/DeliveryCard";

interface DeliveryDetailsProps {
  deliveries: Array<{
    userId: string;
    installStatus: "installed" | "pending" | "failed";
    installedAt: string | null;
  }>;
}

const DeliveryDetails = ({ deliveries }: DeliveryDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>派送詳情</CardTitle>
        <CardDescription>
          所有用戶的安裝狀態詳細資訊
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deliveries.map((delivery, index) => (
            <DeliveryCard key={index} delivery={delivery} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryDetails;
