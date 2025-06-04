
import { useNavigate } from "react-router-dom";
import { Package, Users, Calendar, TrendingUp } from "lucide-react";
import Navigation from "@/components/Navigation";
import StatsCard from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  // 模擬統計數據
  const stats = {
    totalSoftware: 24,
    activeDeployments: 156,
    totalUsers: 89,
    successRate: 94.2
  };

  const recentSoftware = [
    {
      name: "AwesomeApp",
      version: "1.0.0",
      owner: "user_12345",
      publishedAt: "2025-06-01T10:00:00Z"
    },
    {
      name: "GreatTool",
      version: "1.0.2",
      owner: "user_67890",
      publishedAt: "2025-06-02T14:30:00Z"
    },
    {
      name: "DataAnalyzer",
      version: "2.1.0",
      owner: "user_11111",
      publishedAt: "2025-06-03T09:15:00Z"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">軟體派送管理中心</h1>
          <p className="text-gray-600">監控和管理企業內部軟體的派送狀況</p>
        </div>

        {/* 統計卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="軟體總數"
            value={stats.totalSoftware}
            icon={Package}
            color="blue"
          />
          <StatsCard
            title="活躍派送"
            value={stats.activeDeployments}
            icon={TrendingUp}
            color="green"
          />
          <StatsCard
            title="用戶數量"
            value={stats.totalUsers}
            icon={Users}
            color="purple"
          />
          <StatsCard
            title="成功率"
            value={`${stats.successRate}%`}
            icon={Calendar}
            color="orange"
          />
        </div>

        {/* 快速操作 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-600" />
                軟體列表
              </CardTitle>
              <CardDescription>
                瀏覽所有已上架的軟體，查看詳細資訊和統計數據
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/software-list')} 
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                查看軟體列表
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                派送狀態
              </CardTitle>
              <CardDescription>
                查詢特定軟體的派送狀況和安裝進度
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/delivery-status')} 
                variant="outline"
                className="w-full border-green-600 text-green-600 hover:bg-green-50"
              >
                查詢派送狀態
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 最近上架軟體 */}
        <Card>
          <CardHeader>
            <CardTitle>最近上架軟體</CardTitle>
            <CardDescription>最新發布的軟體列表</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSoftware.map((software, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <h3 className="font-semibold text-gray-900">{software.name}</h3>
                    <p className="text-sm text-gray-600">版本 {software.version} • 擁有者: {software.owner}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {new Date(software.publishedAt).toLocaleDateString('zh-TW')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
