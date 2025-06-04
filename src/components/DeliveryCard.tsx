
import { CheckCircle, Clock, XCircle, User, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Delivery {
  userId: string;
  installStatus: "installed" | "pending" | "failed";
  installedAt: string | null;
}

interface DeliveryCardProps {
  delivery: Delivery;
}

const DeliveryCard = ({ delivery }: DeliveryCardProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "installed":
        return {
          icon: CheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-100",
          label: "已安裝",
          variant: "default" as const
        };
      case "pending":
        return {
          icon: Clock,
          color: "text-yellow-600",
          bgColor: "bg-yellow-100",
          label: "等待中",
          variant: "secondary" as const
        };
      case "failed":
        return {
          icon: XCircle,
          color: "text-red-600",
          bgColor: "bg-red-100",
          label: "安裝失敗",
          variant: "destructive" as const
        };
      default:
        return {
          icon: Clock,
          color: "text-gray-600",
          bgColor: "bg-gray-100",
          label: "未知",
          variant: "secondary" as const
        };
    }
  };

  const statusConfig = getStatusConfig(delivery.installStatus);
  const StatusIcon = statusConfig.icon;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "尚未安裝";
    return new Date(dateString).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-full ${statusConfig.bgColor}`}>
              <StatusIcon className={`h-5 w-5 ${statusConfig.color}`} />
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-400" />
                <span className="font-medium text-gray-900">{delivery.userId}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(delivery.installedAt)}</span>
              </div>
            </div>
          </div>

          <Badge variant={statusConfig.variant} className="ml-4">
            {statusConfig.label}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryCard;
