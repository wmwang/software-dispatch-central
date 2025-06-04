
import { useState, useMemo } from "react";
import { Search, Filter, Calendar, Package } from "lucide-react";
import Navigation from "@/components/Navigation";
import SoftwareCard from "@/components/SoftwareCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SoftwareList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOwner, setFilterOwner] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // 模擬軟體數據
  const softwares = [
    {
      softwareId: "sw-001",
      version: "1.0.0",
      name: "AwesomeApp",
      owner: "user_12345",
      publishedAt: "2025-06-01T10:00:00Z"
    },
    {
      softwareId: "sw-002",
      version: "1.0.2",
      name: "GreatTool",
      owner: "user_67890",
      publishedAt: "2025-06-02T14:30:00Z"
    },
    {
      softwareId: "sw-003",
      version: "2.1.0",
      name: "DataAnalyzer",
      owner: "user_11111",
      publishedAt: "2025-06-03T09:15:00Z"
    },
    {
      softwareId: "sw-004",
      version: "1.5.3",
      name: "ProjectManager",
      owner: "user_12345",
      publishedAt: "2025-05-28T16:45:00Z"
    },
    {
      softwareId: "sw-005",
      version: "3.0.1",
      name: "ReportGenerator",
      owner: "user_22222",
      publishedAt: "2025-05-30T11:20:00Z"
    },
    {
      softwareId: "sw-006",
      version: "1.2.4",
      name: "TaskTracker",
      owner: "user_67890",
      publishedAt: "2025-06-04T08:30:00Z"
    }
  ];

  // 獲取所有擁有者列表
  const owners = useMemo(() => {
    const uniqueOwners = [...new Set(softwares.map(s => s.owner))];
    return uniqueOwners;
  }, []);

  // 過濾和排序軟體
  const filteredAndSortedSoftwares = useMemo(() => {
    let filtered = softwares.filter(software => {
      const matchesSearch = software.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           software.softwareId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesOwner = filterOwner === "all" || software.owner === filterOwner;
      return matchesSearch && matchesOwner;
    });

    // 排序
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case "oldest":
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, filterOwner, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">軟體列表</h1>
          <p className="text-gray-600">瀏覽所有已上架的軟體</p>
        </div>

        {/* 統計資訊 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              篩選與統計
            </CardTitle>
            <CardDescription>
              共找到 {filteredAndSortedSoftwares.length} 個軟體
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* 搜尋框 */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜尋軟體名稱或ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* 擁有者篩選 */}
              <Select value={filterOwner} onValueChange={setFilterOwner}>
                <SelectTrigger>
                  <SelectValue placeholder="選擇擁有者" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有擁有者</SelectItem>
                  {owners.map(owner => (
                    <SelectItem key={owner} value={owner}>{owner}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* 排序選項 */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="排序方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">最新上架</SelectItem>
                  <SelectItem value="oldest">最早上架</SelectItem>
                  <SelectItem value="name">軟體名稱</SelectItem>
                </SelectContent>
              </Select>

              {/* 清除篩選 */}
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setFilterOwner("all");
                  setSortBy("newest");
                }}
                className="w-full"
              >
                清除篩選
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 軟體卡片網格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedSoftwares.map((software) => (
            <SoftwareCard key={software.softwareId} software={software} />
          ))}
        </div>

        {filteredAndSortedSoftwares.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Package className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">找不到符合條件的軟體</h3>
            <p className="text-gray-600">請嘗試調整搜尋條件或篩選設定</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SoftwareList;
