
import { Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SoftwareInfoProps {
  deliveryData: {
    name: string;
    version: string;
    owner: string;
    publishedAt: string;
  };
}

const SoftwareInfo = ({ deliveryData }: SoftwareInfoProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          軟體資訊
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600">軟體名稱</p>
            <p className="font-semibold">{deliveryData.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">版本</p>
            <Badge variant="secondary">v{deliveryData.version}</Badge>
          </div>
          <div>
            <p className="text-sm text-gray-600">擁有者</p>
            <p className="font-semibold">{deliveryData.owner}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">上架時間</p>
            <p className="font-semibold">
              {new Date(deliveryData.publishedAt).toLocaleDateString('zh-TW')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SoftwareInfo;
