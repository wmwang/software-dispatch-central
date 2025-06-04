
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SoftwareSearch from "@/components/SoftwareSearch";
import SoftwareInfo from "@/components/SoftwareInfo";
import DeliveryStats from "@/components/DeliveryStats";
import DeliveryDetails from "@/components/DeliveryDetails";
import EmptyState from "@/components/EmptyState";

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

        <SoftwareSearch
          softwareId={softwareId}
          setSoftwareId={setSoftwareId}
          onSearch={handleSearch}
          loading={loading}
        />

        {deliveryData && (
          <>
            <SoftwareInfo deliveryData={deliveryData} />
            <DeliveryStats
              statusStats={statusStats}
              totalDeliveries={deliveryData.deliveries.length}
            />
            <DeliveryDetails deliveries={deliveryData.deliveries} />
          </>
        )}

        {!loading && softwareId && !deliveryData && (
          <EmptyState softwareId={softwareId} />
        )}
      </main>
    </div>
  );
};

export default DeliveryStatus;
