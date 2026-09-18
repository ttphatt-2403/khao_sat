import { useEffect, useState } from "react";
import { WEBHOOK_URL } from "../hooks/useSurveyForm";
import { questions } from "../data/questions";

// ─── Palette ──────────────────────────────────────────────────────────────────
const PALETTE = ["#00369b", "#ff914d", "#3b82f6", "#f97316", "#8b5cf6", "#10b981", "#ec4899", "#06b6d4", "#f59e0b", "#ef4444"];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const qText = (id: string) => questions.find(q => q.id === id)?.text || id;
const rText = (qId: string, rId: string) => {
  const q = questions.find(q => q.id === qId);
  if (q && q.type === "matrix") return q.rows.find(r => r.id === rId)?.label || rId;
  return rId;
};

// ─── Aggregator ───────────────────────────────────────────────────────────────
const agg = (data: any[], key: string) => {
  const counts: Record<string, number> = {};
  data.forEach(r => {
    const val = r[key];
    if (!val || val === "") return;
    if (typeof val === "string" && val.includes(",")) {
      val.split(",").forEach((v: string) => { const t = v.trim(); if (t) counts[t] = (counts[t] || 0) + 1; });
    } else { counts[val] = (counts[val] || 0) + 1; }
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
};

const avgScale = (data: any[], mappings: { key: string, label: string }[], max: number = 7) =>
  mappings.map(({ key, label }) => {
    const vals = data.map(r => Number(r[key])).filter(v => !isNaN(v) && v > 0);
    const dist = Array(max).fill(0);
    vals.forEach(v => {
      const idx = Math.round(v) - 1;
      if (idx >= 0 && idx < max) dist[idx]++;
    });
    return { label, avg: vals.length ? +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : 0, dist, total: vals.length };
  });

// ─── SVG Donut ────────────────────────────────────────────────────────────────
const DonutChart = ({ data }: { data: { name: string; value: number }[] }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  if (total === 0) return <NoData />;
  const r = 56; const cx = 80; const cy = 80; const circ = 2 * Math.PI * r;
  let offset = 0;
  const slices = data.slice(0, 8).map((d, i) => {
    const pct = d.value / total;
    const dash = pct * circ;
    const gap = circ - dash;
    const el = { ...d, dash, gap, offset, color: PALETTE[i % PALETTE.length] };
    offset += dash + (circ * 0.012);
    return el;
  });

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <svg width={160} height={160} viewBox="0 0 160 160" className="shrink-0">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth={22} />
        {slices.map((s, i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth={20}
            strokeDasharray={`${s.dash - 2} ${circ - s.dash + 2}`}
            strokeDashoffset={circ / 4 - s.offset}
            transform={`rotate(-90 ${cx} ${cy})`} strokeLinecap="butt" />
        ))}
        <text x={cx} y={cy - 6} textAnchor="middle" className="font-bold" style={{ fill: "#00369b", fontSize: 24, fontFamily: "Be Vietnam Pro", fontWeight: 700 }}>{total}</text>
        <text x={cx} y={cy + 14} textAnchor="middle" style={{ fill: "#94a3b8", fontSize: 10, fontFamily: "Be Vietnam Pro" }}>người</text>
      </svg>
      <div className="space-y-1.5 min-w-0 w-full">
        {slices.map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.color }} />
            <span className="text-slate-600 truncate flex-1 leading-tight">{s.name}</span>
            <span className="font-bold shrink-0" style={{ color: s.color }}>{s.value}</span>
            <span className="text-slate-400 shrink-0">({Math.round((s.value / total) * 100)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Horizontal bar chart ─────────────────────────────────────────────────────
const HorizBar = ({ data, max: maxProp, total }: { data: { name: string; value: number }[]; max?: number; total?: number }) => {
  const maxVal = maxProp ?? Math.max(...data.map(d => d.value), 1);
  if (data.length === 0) return <NoData />;
  return (
    <div className="space-y-2">
      {data.slice(0, 10).map((d, i) => (
        <div key={i} className="flex items-center gap-3 group">
          <div className="w-36 sm:w-44 shrink-0 text-xs text-slate-500 text-right leading-tight line-clamp-2">{d.name}</div>
          <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-700"
              style={{ width: `${(d.value / maxVal) * 100}%`, background: PALETTE[i % PALETTE.length], minWidth: d.value > 0 ? 24 : 0 }}
            >
              <span className="text-white text-[10px] font-bold">{d.value}</span>
            </div>
          </div>
          {total && (
            <div className="w-10 shrink-0 text-[10px] text-slate-400 font-medium">
              ({Math.round((d.value / total) * 100)}%)
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ─── Scale progress bars ──────────────────────────────────────────────────────
const ScaleBar = ({ data, max = 7 }: { data: { label: string; avg: number; dist?: number[]; total?: number }[]; max?: number }) => {
  if (data.length === 0) return <NoData />;
  return (
    <div className="space-y-5">
      {data.map((d, i) => (
        <div key={i} className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 w-44 sm:w-48 shrink-0 leading-tight">{d.label}</span>
            <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
              <div className="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-700"
                style={{ width: `${(d.avg / max) * 100}%`, background: i % 2 === 0 ? "#00369b" : "#ff914d", minWidth: d.avg > 0 ? 28 : 0 }}>
                <span className="text-white text-[10px] font-bold">{d.avg}</span>
              </div>
            </div>
            <span className="text-xs font-bold w-8 text-right text-slate-400">/{max}</span>
          </div>
          {d.dist && d.total ? (
            <div className="flex items-end gap-1 pl-[188px] sm:pl-[204px] pr-11 h-8">
              {d.dist.map((count, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center justify-end group relative h-full">
                  <div className="w-full bg-slate-200 group-hover:bg-slate-300 rounded-t-sm transition-colors" 
                       style={{ height: `${(count / Math.max(...d.dist!, 1)) * 100}%`, minHeight: count > 0 ? '2px' : 0 }} />
                  <div className="text-[8px] text-slate-400 mt-0.5 leading-none">{idx + 1}</div>
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-6 bg-slate-800 text-white text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap z-10 pointer-events-none transition-opacity">
                    {count} lượt ({Math.round(count/d.total!*100)}%)
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

// ─── Open Ended Quotes Grid ───────────────────────────────────────────────────
const QuotesGrid = ({ quotes, questionText }: { quotes: string[], questionText: string }) => {
  const [filter, setFilter] = useState("Tất cả");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const getQuoteTag = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes("cân nhắc") || lower.includes("suy nghĩ") || lower.includes("quản lý") || lower.includes("kiểm soát")) return "Cân nhắc chi tiêu";
    if (lower.includes("áp lực") || lower.includes("trả nợ") || lower.includes("hóa đơn") || lower.includes("khoản vay") || lower.includes("tiền") || lower.includes("hậu quả")) return "Áp lực trả nợ";
    if (lower.includes("tiện lợi") || lower.includes("dễ dàng") || lower.includes("nhanh") || lower.includes("hấp dẫn")) return "Sự tiện lợi";
    if (lower.includes("mua sắm") || lower.includes("cám dỗ") || lower.includes("ham muốn")) return "Cám dỗ mua sắm";
    return "Khác";
  };

  const TAG_COLORS: Record<string, string> = {
    "Cân nhắc chi tiêu": "bg-blue-100 text-blue-600",
    "Áp lực trả nợ": "bg-red-100 text-red-600",
    "Sự tiện lợi": "bg-orange-100 text-orange-600",
    "Cám dỗ mua sắm": "bg-purple-100 text-purple-600",
    "Khác": "bg-slate-100 text-slate-600",
  };

  const TAG_ICONS: Record<string, string> = {
    "Tất cả": "Tất cả", 
    "Cân nhắc chi tiêu": "💡",
    "Áp lực trả nợ": "🚨",
    "Sự tiện lợi": "⚡",
    "Cám dỗ mua sắm": "🛍️",
    "Khác": "💭",
  };

  const processed = quotes.map((q, i) => ({ id: i + 1, text: q, tag: getQuoteTag(q) }));
  
  // Calculate counts for each tag
  const tagCounts: Record<string, number> = { "Tất cả": processed.length };
  processed.forEach(q => {
    tagCounts[q.tag] = (tagCounts[q.tag] || 0) + 1;
  });
  
  const tags = ["Tất cả", ...Array.from(new Set(processed.map(q => q.tag)))];

  const filtered = processed.filter(q => 
    (filter === "Tất cả" || q.tag === filter) &&
    q.text.toLowerCase().includes(search.toLowerCase())
  );
  
  // Pagination
  const PAGE_SIZE = 12;
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset page when filter/search changes
  useEffect(() => setPage(1), [filter, search]);

  return (
    <div className="space-y-6 mt-8">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-white shadow-sm">
        <div className="flex-1">
          <h3 className="text-[#00369b] font-bold text-lg font-['Space_Grotesk'] uppercase flex items-center gap-2">
            P6 • Góc nhìn người dùng (Câu hỏi mở)
          </h3>
          <div className="text-slate-600 mt-2 font-medium">Câu hỏi: <span className="font-normal">{questionText}</span></div>
          <p className="text-slate-400 text-xs mt-1">{filtered.length} câu trả lời</p>
        </div>
        
        <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto mt-2 sm:mt-0">
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <svg className="w-4 h-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Tìm kiếm câu trả lời..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="text-sm text-slate-600 outline-none w-full sm:w-56 bg-transparent placeholder-slate-400"
            />
          </div>
        </div>
      </div>
      
      {/* Tag Filter Pills */}
      <div className="flex flex-wrap gap-2 items-center">
        {tags.map(t => (
          <button 
            key={t}
            onClick={() => setFilter(t)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${filter === t ? 'bg-white text-[#00369b] shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-slate-200' : 'bg-white/50 text-slate-500 hover:bg-white hover:text-slate-700 border border-transparent'}`}
          >
            {t !== "Tất cả" && <span>{TAG_ICONS[t] || "❖"}</span>}
            {t}
            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${filter === t ? 'bg-[#00369b]/10 text-[#00369b]' : 'bg-slate-200 text-slate-500'}`}>{tagCounts[t]}</span>
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
        {paginated.map(q => (
          <div key={q.id} className="break-inside-avoid bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 relative group flex flex-col h-full min-h-[160px]">
            <div className="text-6xl leading-none font-serif text-[#00369b] font-bold">"</div>
            <p className="text-slate-700 text-[15px] leading-relaxed relative z-10 pb-6 font-medium mt-[-10px]">{q.text}</p>
            <div className="flex items-center justify-between mt-auto">
              <span className={`px-3 py-1.5 rounded-lg text-[11px] font-bold ${TAG_COLORS[q.tag]}`}>
                {TAG_ICONS[q.tag] || "❖"} {q.tag}
              </span>
              <span className="text-slate-400 text-xs font-mono font-medium">#{q.id.toString().padStart(2, '0')}</span>
            </div>
          </div>
        ))}
        {paginated.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-400 bg-white/50 rounded-2xl border border-dashed border-slate-300">Không tìm thấy câu trả lời nào phù hợp.</div>
        )}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          <button 
            disabled={page === 1} 
            onClick={() => setPage(p => p - 1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          
          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1;
            if (p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1)) {
              return (
                <button 
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${page === p ? 'bg-[#00369b] text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                >
                  {p}
                </button>
              );
            } else if (p === page - 2 || p === page + 2) {
              return <span key={p} className="text-slate-400 tracking-widest px-1">...</span>;
            }
            return null;
          })}

          <button 
            disabled={page === totalPages} 
            onClick={() => setPage(p => p + 1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </div>
  );
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const NoData = () => <p className="text-slate-300 text-sm text-center py-6">Chưa có dữ liệu</p>;

const Card = ({ title, subtitle, span2 = false, children }: { title: string; subtitle?: string; span2?: boolean; children: React.ReactNode }) => (
  <div className={`bg-white/80 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,54,155,0.09)] border border-white ${span2 ? "md:col-span-2" : ""}`}>
    <div className="mb-4">
      <h3 className="font-bold text-[#00369b] font-['Space_Grotesk'] text-sm sm:text-base">{title}</h3>
      {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
    </div>
    {children}
  </div>
);

const Section = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3">
    <div className="w-1 h-5 rounded-full bg-gradient-to-b from-[#00369b] to-[#ff914d]" />
    <h2 className="text-xs font-bold uppercase tracking-widest text-[#00369b] font-['Space_Grotesk']">{children}</h2>
  </div>
);

const StatBadge = ({ label, value, color = "#00369b" }: { label: string; value: string | number; color?: string }) => (
  <div className="bg-white/20 rounded-2xl px-4 py-3 text-center border border-white/20 min-w-[90px]">
    <div className="text-2xl font-bold text-white" style={{ color }}>{value}</div>
    <div className="text-[10px] text-blue-200 uppercase tracking-wider mt-0.5 leading-tight">{label}</div>
  </div>
);

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export const Dashboard = () => {
  const [rawData, setRawData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(WEBHOOK_URL);
      const json = await res.json();
      setRawData((Array.isArray(json) ? json : []).filter((r: any) => r["Gmail"] && r["Gmail"] !== ""));
      setLastRefresh(new Date());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: "linear-gradient(135deg, #e8eef8 0%, #f0f4fb 50%, #fef6f0 100%)" }}>
        <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-[#00369b] animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
        </div>
        <p className="text-[#00369b] font-bold font-['Space_Grotesk']">Đang tải dữ liệu...</p>
      </div>
    );
  }

  const n = rawData.length;

  // ─── Derived ──────────────────────────────────────────────────────────────
  const attAvg = avgScale(rawData, [
    { key: "P4.1. ATT1 - Cân nhắc BNPL có lợi", label: rText("p4_1", "ATT1") },
    { key: "P4.1. ATT2 - Kiểm tra CP là đúng đắn", label: rText("p4_1", "ATT2") },
    { key: "P4.1. ATT3 - Thái độ tích cực với cân nhắc", label: rText("p4_1", "ATT3") }
  ]);
  const pbcAvg = avgScale(rawData, [
    { key: "P4.2. PBC1 - Có khả năng cân nhắc", label: rText("p4_2", "PBC1") },
    { key: "P4.2. PBC2 - Tự tin kiểm tra CP", label: rText("p4_2", "PBC2") },
    { key: "P4.2. PBC3 - Hoàn toàn do tôi kiểm soát", label: rText("p4_2", "PBC3") }
  ]);
  const snAvg  = avgScale(rawData, [
    { key: "P4.3. SN1 - Gia đình khuyến khích cân nhắc", label: rText("p4_3", "SN1") },
    { key: "P4.3. SN2 - Bạn bè mong muốn cân nhắc", label: rText("p4_3", "SN2") },
    { key: "P4.3. SN3 - Người xung quanh khuyến khích", label: rText("p4_3", "SN3") },
    { key: "P4.3. SN4 - Người thân đều cân nhắc", label: rText("p4_3", "SN4") }
  ]);
  const intAvg = avgScale(rawData, [
    { key: "P4.5. INT1 - Có ý định cân nhắc kỹ", label: rText("p4_5", "INT1") },
    { key: "P4.5. INT2 - Dự định kiểm tra CP trước khi mua", label: rText("p4_5", "INT2") },
    { key: "P4.5. INT3 - Chủ động cân nhắc trong tương lai", label: rText("p4_5", "INT3") }
  ]);
  const p63Avg = avgScale(rawData, [
    { key: "P6.3. Đánh giá - Hài hước", label: rText("p6_3", "haihuoc") },
    { key: "P6.3. Đánh giá - Gây thích thú", label: rText("p6_3", "thichthu") },
    { key: "P6.3. Đánh giá - Nhàm chán", label: rText("p6_3", "nhamchan") },
    { key: "P6.3. Đánh giá - Gây khó chịu", label: rText("p6_3", "khochiu") }
  ]);
  const p66Avg = avgScale(rawData, [
    { key: "P6.6. Nhận ra thông điệp", label: rText("p6_6", "nhanra") },
    { key: "P6.6. Liên hệ chi tiết với TĐ", label: rText("p6_6", "lienhe") },
    { key: "P6.6. Hiểu cách truyền tải TĐ", label: rText("p6_6", "hieucach") }
  ]);
  const p68Avg = avgScale(rawData, [
    { key: "P6.8. TĐ rõ ràng", label: rText("p6_8", "rorang") },
    { key: "P6.8. TĐ có ý nghĩa", label: rText("p6_8", "ynghia") },
    { key: "P6.8. TĐ đáng ghi nhớ", label: rText("p6_8", "ghinho") },
    { key: "P6.8. TĐ dễ nhớ", label: rText("p6_8", "denho") }
  ], 5).map(d => ({ ...d, avg: +Math.min(d.avg, 5).toFixed(2) }));

  const p65Quotes = rawData
    .map(r => r["P6.5. Theo cách hiểu của bạn, nội dung trên đang muốn truyền tải hoặc phê phán điều gì?"] || r["p6_5"])
    .filter(q => q && typeof q === "string" && q.trim().length > 0);

  const bnplUsedYesCount = agg(rawData, "3. Đã từng dùng BNPL chưa?").find(d => d.name.toLowerCase().includes("đang") || d.name.toLowerCase().includes("từng"))?.value || 0;
  const bnplUsedYes = bnplUsedYesCount || "–";

  return (
    <div className="min-h-screen font-['Be_Vietnam_Pro']"
      style={{ background: "linear-gradient(135deg, #e8eef8 0%, #f0f4fb 50%, #fef6f0 100%)" }}>

      {/* ── HERO HEADER ──────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#00369b] via-[#0044c4] to-[#0050d0] px-6 py-8 sm:px-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <svg className="w-7 h-7" style={{color:"#ff914d"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h1 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-white tracking-tight">Mơ Nì — Dashboard</h1>
            </div>
            <p className="text-blue-200 text-sm">Thống kê kết quả khảo sát BNPL · Gen Z · TPHCM</p>
            {lastRefresh && <p className="text-blue-300 text-xs mt-1">Cập nhật: {lastRefresh.toLocaleTimeString("vi-VN")}</p>}
          </div>
          <div className="flex gap-3 flex-wrap items-center">
            <StatBadge label="Lượt tham gia" value={n} />
            <StatBadge label="Đã/đang dùng BNPL" value={bnplUsedYes} color="#ff914d" />
            <button onClick={fetchData}
              className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 transition-all rounded-2xl px-4 py-3 border border-white/20 cursor-pointer gap-1">
              <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="text-[10px] text-blue-100 uppercase tracking-wider font-semibold">Làm mới</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

        {n === 0 ? (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-16 text-center border border-white shadow-lg">
            <svg className="w-16 h-16 mx-auto mb-4" style={{color:"#e2e8f0"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16M9 4v16M15 4v16" />
            </svg>
            <h3 className="text-xl font-bold text-slate-500 font-['Space_Grotesk']">Chưa có dữ liệu</h3>
            <p className="text-slate-400 mt-1 text-sm">Google Sheet hiện chưa có câu trả lời nào.</p>
          </div>
        ) : (<>

          {/* ── P1: Thông tin người tham gia ─────────────────────────────────── */}
          <Section>Phần 1 · Thông tin người tham gia</Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card title={qText("scr_1")} subtitle="Câu sàng lọc 1"><DonutChart data={agg(rawData, "1. Độ tuổi")} /></Card>
            <Card title={qText("scr_2")} subtitle="Câu sàng lọc 2"><DonutChart data={agg(rawData, "2. Bạn hiện đang sinh sống tại đâu?").length ? agg(rawData, "2. Bạn hiện đang sinh sống tại đâu?") : (agg(rawData, "2. Nơi sinh sống").length ? agg(rawData, "2. Nơi sinh sống") : agg(rawData, "scr_2"))} /></Card>
            <Card title={qText("scr_3")} subtitle="Câu sàng lọc 3" span2><HorizBar total={n} data={agg(rawData, "3. Đã từng dùng BNPL chưa?").length ? agg(rawData, "3. Đã từng dùng BNPL chưa?") : (agg(rawData, "3. Bạn đã từng hoặc đang sử dụng dịch vụ Mua trước - Trả sau (BNPL - ví dụ: Shopee SPayLater, MoMo Ví trả sau, Fundiin...) hay chưa?").length ? agg(rawData, "3. Bạn đã từng hoặc đang sử dụng dịch vụ Mua trước - Trả sau (BNPL - ví dụ: Shopee SPayLater, MoMo Ví trả sau, Fundiin...) hay chưa?") : agg(rawData, "scr_3"))} /></Card>
            <Card title={qText("p1_1")} subtitle="P1.1"><DonutChart data={agg(rawData, "P1.1. Giới tính")} /></Card>
            <Card title={qText("p1_2")} subtitle="P1.2"><HorizBar total={n} data={agg(rawData, "P1.2. Tình trạng hiện tại")} /></Card>
            <Card title={qText("p1_3")} subtitle="P1.3"><HorizBar total={n} data={agg(rawData, "P1.3. Mức thu nhập TB/tháng")} /></Card>
            <Card title={qText("p1_4")} subtitle="P1.4" span2><HorizBar total={n} data={agg(rawData, "P1.4. Mức chi tiêu TB/tháng")} /></Card>
          </div>

          {/* ── P2: Hành vi BNPL ─────────────────────────────────────────────── */}
          <Section>Phần 2 · Hành vi sử dụng BNPL</Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card title={qText("p2_2")} subtitle="P2.2"><DonutChart data={agg(rawData, "P2.2. Tần suất chốt đơn BNPL")} /></Card>
            <Card title={qText("p2_3")} subtitle="P2.3"><DonutChart data={agg(rawData, "P2.3. Tổng giá trị mua/tháng bằng BNPL")} /></Card>
            <Card title={qText("p2_1")} subtitle="P2.1 · Đa lựa chọn" span2><HorizBar total={n} data={agg(rawData, "P2.1. Loại SP/DV mua bằng BNPL")} /></Card>
            <Card title={qText("p2_4")} subtitle="P2.4 · Đa lựa chọn" span2><HorizBar total={n} data={agg(rawData, "P2.4. Lý do chọn BNPL")} /></Card>
            <Card title={qText("p2_5")} subtitle="P2.5 · Đa lựa chọn" span2><HorizBar total={n} data={agg(rawData, "P2.5. Thông kiểm tra khi dùng BNPL").length ? agg(rawData, "P2.5. Thông kiểm tra khi dùng BNPL") : agg(rawData, "P2.5. Thông tin kiểm tra khi dùng BNPL")} /></Card>
          </div>

          {/* ── P3: Trải nghiệm & Cảm xúc ──────────────────────────────────────── */}
          <Section>Phần 3 · Nhận thức và trải nghiệm khi sử dụng BNPL</Section>
          <div className="grid grid-cols-1 gap-5">
            <Card title={qText("p3_1")} subtitle="P3.1 · Điểm TB thang 1–5">
              <ScaleBar data={avgScale(rawData, [
                { key: "P3.1. Chốt đơn không có kế hoạch", label: rText("p3_1", "1") },
                { key: "P3.2. Mua đồ đắt dễ hơn vì chia nhỏ", label: rText("p3_1", "2") },
                { key: "P3.3. Quên/suýt quên ngày TT", label: rText("p3_1", "3") },
                { key: "P3.4. Cắt giảm chi tiêu để trả BNPL", label: rText("p3_1", "4") },
                { key: "P3.5. Áp lực khi đến kỳ trả", label: rText("p3_1", "5") },
                { key: "P3.6. Hối hận sau khi mua", label: rText("p3_1", "6") }
              ], 5).map(d => ({ ...d, avg: +Math.min(d.avg, 5).toFixed(2) }))} max={5} />
            </Card>
          </div>

          {/* ── P4: Mô hình TPB ────────────────────────────────________________ */}
          <Section>Phần 4 · Mô hình TPB — Ý định cân nhắc BNPL</Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card title={qText("p4_1")} subtitle="Điểm TB thang 1–7"><ScaleBar data={attAvg} /></Card>
            <Card title={qText("p4_2")} subtitle="Điểm TB thang 1–7"><ScaleBar data={pbcAvg} /></Card>
            <Card title={qText("p4_3")} subtitle="Điểm TB thang 1–7"><ScaleBar data={snAvg} /></Card>
            <Card title={qText("p4_5")} subtitle="Điểm TB thang 1–7"><ScaleBar data={intAvg} /></Card>
          </div>

          {/* ── P5: Truyền thông ──────────────────────────────────────────────── */}
          <Section>Phần 5 · Thói quen & kênh truyền thông</Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card title={qText("p5_1")} subtitle="P5.1"><HorizBar total={bnplUsedYesCount} data={agg(rawData, "P5.1. MXH hay dùng nhất")} /></Card>
            <Card title={qText("p5_2")} subtitle="P5.2"><HorizBar total={bnplUsedYesCount} data={agg(rawData, "P5.2. Buổi dùng MXH trong ngày")} /></Card>
            <Card title={qText("p5_5")} subtitle="P5.5 · Đa lựa chọn" span2><HorizBar total={bnplUsedYesCount} data={agg(rawData, "P5.5. Nội dung FB thu hút")} /></Card>
            <Card title={qText("p5_6")} subtitle="P5.6 · Đa lựa chọn" span2><HorizBar total={bnplUsedYesCount} data={agg(rawData, "P5.6. Dạng video TikTok thu hút")} /></Card>
          </div>

          {/* ── P6: Nhận thức ─────────────────────────────────────────────────── */}
          <Section>Phần 6 · Nhận thức trào phúng thị giác</Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card title={qText("p6_1")} subtitle="P6.1"><HorizBar total={n} data={agg(rawData, "P6.1. Đã nghe 'trào phúng thị giác' chưa?")} /></Card>
            <Card title={qText("p6_7")} subtitle="P6.7 · Điểm TB thang 1–5">
              <ScaleBar data={avgScale(rawData, [
                { key: "P6.7. Quan tâm hơn đến BNPL cẩn thận", label: rText("p6_7", "quantam") },
                { key: "P6.7. Chú ý rủi ro BNPL", label: rText("p6_7", "ruiro") }
              ], 5).map(d => ({ ...d, avg: +Math.min(d.avg, 5).toFixed(2) }))} max={5} />
            </Card>
            <Card title={qText("p6_3")} subtitle="Điểm TB thang 1–7"><ScaleBar data={p63Avg} /></Card>
            <Card title={qText("p6_6")} subtitle="Điểm TB thang 1–7"><ScaleBar data={p66Avg} /></Card>
            <Card title={qText("p6_8")} subtitle="Điểm TB thang 1–5"><ScaleBar data={p68Avg} max={5} /></Card>
            <Card title={qText("p6_10")} subtitle="Điểm TB thang 1–7">
              <ScaleBar data={avgScale(rawData, [
                { key: "P6.10. Hình thu hút chú ý", label: rText("p6_10", "thuhut") },
                { key: "P6.10. Hình giúp hiểu vấn đề", label: rText("p6_10", "hieu") },
                { key: "P6.10. Hình làm nổi bật châm biếm", label: rText("p6_10", "noibat") }
              ])} />
            </Card>
          </div>

          {/* ── Open Ended Quotes ──────────────────────────────────────────────── */}
          <QuotesGrid quotes={p65Quotes} questionText={qText("p6_5")} />

          {/* Footer */}
          <div className="text-center text-xs text-slate-400 pb-4">
            Dashboard · Khảo sát BNPL Gen Z TPHCM · Mơ Nì Research
          </div>
        </>)}
      </div>
    </div>
  );
};
