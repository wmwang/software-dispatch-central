
import { Calendar, User, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Software {
  softwareId: string;
  version: string;
  name: string;
  owner: string;
  publishedAt: string;
}

interface SoftwareCardProps {
  software: Software;
}

const SoftwareCard = ({ software }: SoftwareCardProps) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewDelivery = () => {
    navigate(`/delivery-status?softwareId=${software.softwareId}`);
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">
            {software.name}
          </CardTitle>
          <Badge variant="secondary" className="ml-2">
            v{software.version}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Tag className="h-4 w-4 mr-2" />
            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
              {software.softwareId}
            </span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <User className="h-4 w-4 mr-2" />
            <span>{software.owner}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{formatDate(software.publishedAt)}</span>
          </div>
        </div>

        <div className="pt-2 border-t">
          <Button 
            onClick={handleViewDelivery}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="sm"
          >
            查看派送狀態
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SoftwareCard;
