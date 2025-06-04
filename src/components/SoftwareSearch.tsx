
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SoftwareSearchProps {
  softwareId: string;
  setSoftwareId: (id: string) => void;
  onSearch: () => void;
  loading: boolean;
}

const SoftwareSearch = ({ softwareId, setSoftwareId, onSearch, loading }: SoftwareSearchProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          軟體ID查詢
        </CardTitle>
        <CardDescription>
          請輸入要查詢的軟體ID (例如: sw-001, sw-002)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="輸入軟體ID..."
              value={softwareId}
              onChange={(e) => setSoftwareId(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            />
          </div>
          <Button 
            onClick={onSearch}
            disabled={!softwareId || loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {loading ? "查詢中..." : "查詢"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SoftwareSearch;
