import { useEffect, useState } from "react";
import { WEBHOOK_URL } from "../hooks/useSurveyForm";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Loader2, Users, Database } from "lucide-react";

const COLORS = ['#00369b', '#ff914d', '#00c6ff', '#e87a38', '#b0bdd4', '#ff5e00'];

export const Dashboard = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(WEBHOOK_URL);
        const json = await response.json();
        // Lọc bỏ những dòng trống
        const validData = json.filter((row: any) => row.Gmail !== "");
        setData(validData);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const aggregateData = (key: string) => {
    const counts: Record<string, number> = {};
    data.forEach(row => {
      let val = row[key];
      if (!val) return;
      if (typeof val === 'string' && val.includes(',')) {
        val.split(',').forEach(v => {
          const trimmed = v.trim();
          counts[trimmed] = (counts[trimmed] || 0) + 1;
        });
      } else {
        counts[val] = (counts[val] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#eef2f6] flex flex-col items-center justify-center text-[#00369b]">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <h2 className="text-xl font-bold font-['Space_Grotesk']">Đang tải dữ liệu từ Google Sheet...</h2>
      </div>
    );
  }

  const genderData = aggregateData("scr_1");
  const freqData = aggregateData("scr_3");
  const eduData = aggregateData("p1_1");

  return (
    <div className="min-h-screen bg-[#eef2f6] p-4 sm:p-8 font-['Be_Vietnam_Pro'] text-slate-800">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#e2e8f0] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#00369b] font-['Space_Grotesk'] tracking-tight">Mơ Nì Dashboard</h1>
            <p className="text-slate-500 mt-1">Trang thống kê kết quả khảo sát thời gian thực</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-[#eef4ff] px-4 py-3 rounded-2xl flex items-center gap-3">
              <Users className="text-[#00369b] w-6 h-6" />
              <div>
                <p className="text-[11px] text-[#00369b] font-bold uppercase tracking-wider">Tổng số lượt tham gia</p>
                <p className="text-2xl font-bold text-[#00369b] leading-none mt-1">{data.length}</p>
              </div>
            </div>
          </div>
        </div>

        {data.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-[#e2e8f0]">
            <Database className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-700">Chưa có dữ liệu</h3>
            <p className="text-slate-500">Google Sheet hiện tại chưa có câu trả lời nào.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Giới tính */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e2e8f0]">
              <h3 className="font-bold text-lg text-slate-700 mb-6">Tỉ lệ Giới tính</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={genderData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tần suất BNPL */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e2e8f0]">
              <h3 className="font-bold text-lg text-slate-700 mb-6">Tần suất sử dụng BNPL</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={freqData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                      {freqData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Trình độ học vấn */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#e2e8f0] md:col-span-2">
              <h3 className="font-bold text-lg text-slate-700 mb-6">Trình độ học vấn</h3>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={eduData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12 }} />
                    <Tooltip cursor={{ fill: 'rgba(0,54,155,0.05)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="value" fill="#ff914d" radius={[0, 8, 8, 0]}>
                      {eduData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
