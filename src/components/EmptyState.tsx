
import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
  softwareId: string;
}

const EmptyState = ({ softwareId }: EmptyStateProps) => {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">找不到軟體</h3>
        <p className="text-gray-600">
          軟體ID "{softwareId}" 不存在，請檢查輸入是否正確
        </p>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
