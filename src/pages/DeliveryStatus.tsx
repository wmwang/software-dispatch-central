import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Package, AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import DeliveryCard from "@/components/DeliveryCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DeliveryStatus = () => {
  const [searchParams] = useSearchParams();
  const [softwareId, setSoftwareId] = useState(searchParams.get('softwareId') || '');
  const [deliveryData, setDeliveryData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 模擬派送數據
  const mockDeliveryData = {
    "sw-001": {
      softwareId: "sw-001",
      name: "AwesomeApp",
      version: "1.0.0",
      owner: "user_12345",
      publishedAt: "2025-06-01T10:00:00Z",
      deliveries: [
        {
          userId: "user_88888",
          installStatus: "installed",
          installedAt: "2025-06-03T12:00:00Z"
        },
        {
          userId: "user_99999",
          installStatus: "pending",
          installedAt: null
        },
        {
          userId: "user_77777",
          installStatus: "failed",
          installedAt: "2025-06-03T14:15:00Z"
        },
        {
          userId: "user_55555",
          installStatus: "installed",
          installedAt: "2025-06-02T16:30:00Z"
        },
        {
          userId: "user_44444",
          installStatus: "pending",
          installedAt: null
        }
      ]
    },
    "sw-002": {
      softwareId: "sw-002",
      name: "GreatTool",
      version: "1.0.2",
      owner: "user_67890",
      publishedAt: "2025-06-02T14:30:00Z",
      deliveries: [
        {
          userId: "user_33333",
          installStatus: "installed",
          installedAt: "2025-06-04T09:00:00Z"
        },
        {
          userId: "user_22222",
          installStatus: "installed",
          installedAt: "2025-06-03T15:45:00Z"
        }
      ]
    }
  };

  const handleSearch = () => {
    if (!softwareId) return;
    
    setLoading(true);
    // 模擬API調用延遲
    setTimeout(() => {
      const data = mockDeliveryData[softwareId as keyof typeof mockDeliveryData];
      setDeliveryData(data || null);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (softwareId) {
      handleSearch();
    }
  }, []);

  const getStatusStats = () => {
    if (!deliveryData?.deliveries) return { installed: 0, pending: 0, failed: 0 };
    
    return deliveryData.deliveries.reduce((stats: any, delivery: any) => {
      stats[delivery.installStatus]++;
      return stats;
    }, { installed: 0, pending: 0, failed: 0 });
  };

  const statusStats = getStatusStats();

  return (
    <div className="min-h-screen bg-blue-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">派送狀態查詢</h1>
          <p className="text-gray-600">輸入軟體ID來查詢詳細的派送狀況</p>
        </div>

        {/* 搜尋區域 */}
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
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button 
                onClick={handleSearch}
                disabled={!softwareId || loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? "查詢中..." : "查詢"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 軟體資訊和統計 */}
        {deliveryData && (
          <>
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

            {/* 派送統計 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">總派送數</p>
                      <p className="text-2xl font-bold">{deliveryData.deliveries.length}</p>
                    </div>
                    <Package className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">已安裝</p>
                      <p className="text-2xl font-bold text-green-600">{statusStats.installed}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">等待中</p>
                      <p className="text-2xl font-bold text-yellow-600">{statusStats.pending}</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">失敗</p>
                      <p className="text-2xl font-bold text-red-600">{statusStats.failed}</p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 派送詳情 */}
            <Card>
              <CardHeader>
                <CardTitle>派送詳情</CardTitle>
                <CardDescription>
                  所有用戶的安裝狀態詳細資訊
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deliveryData.deliveries.map((delivery: any, index: number) => (
                    <DeliveryCard key={index} delivery={delivery} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* 查詢結果為空 */}
        {!loading && softwareId && !deliveryData && (
          <Card>
            <CardContent className="text-center py-12">
              <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">找不到軟體</h3>
              <p className="text-gray-600">
                軟體ID "{softwareId}" 不存在，請檢查輸入是否正確
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default DeliveryStatus;
