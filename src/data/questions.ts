import { Question, SurveySection } from "../types";

export const sections: SurveySection[] = [
  {
    id: "screener",
    title: "Thông tin cơ bản",
    questionIds: ["scr_1", "scr_2", "scr_3"]
  },
  {
    id: "part_1",
    title: "Phần 1: Thông tin cá nhân",
    questionIds: ["p1_1", "p1_2", "p1_3", "p1_4"]
  },
  {
    id: "part_2",
    title: "Phần 2: Hành vi sử dụng BNPL",
    questionIds: ["p2_1", "p2_2", "p2_3", "p2_4", "p2_5"]
  },
  {
    id: "part_3",
    title: "Phần 3: Nhận thức và trải nghiệm khi sử dụng BNPL",
    questionIds: ["p3_1"]
  },
  {
    id: "part_4",
    title: "Phần 4: Yếu tố ảnh hưởng đến ý định chi tiêu có cân nhắc khi sử dụng BNPL",
    description: "Những yếu tố ảnh hưởng đến ý định trong việc đưa ra quyết định chi tiêu có cân nhắc khi sử dụng BNPL",
    questionIds: ["p4_1", "p4_2", "p4_3", "p4_4", "p4_5"]
  },
  {
    id: "part_5",
    title: "Phần 5: Thói quen tiếp nhận truyền thông",
    questionIds: ["p5_1", "p5_2", "p5_3", "p5_4", "p5_5", "p5_6", "p5_7"]
  },
  {
    id: "part_6",
    title: "Phần 6: Phản ứng với Hình thức Trào phúng thị giác",
    questionIds: ["info_p6", "p6_1", "p6_2", "info_p6_def", "info_p6_q3", "p6_3", "p6_4", "p6_5", "info_p6_msg", "p6_6", "p6_7", "p6_8", "p6_9", "p6_10"]
  }
];

export const questions: Question[] = [
  // --- SCREENER ---
  {
    id: "scr_1",
    type: "radio",
    number: "1",
    text: "Độ tuổi của bạn hiện tại là bao nhiêu?",
    options: [
      { value: "under_18", label: "Dưới 18 tuổi" },
      { value: "18_24", label: "Từ 18 - 24 tuổi" },
      { value: "25_plus", label: "Từ 25 tuổi trở lên" },
    ],
  },
  {
    id: "scr_2",
    type: "radio",
    number: "2",
    text: "Bạn hiện đang sinh sống tại đâu?",
    options: [
      { value: "hcm", label: "Thành phố Hồ Chí Minh" },
      { value: "other", label: "Tỉnh/Thành phố khác", allowCustom: true },
    ],
  },
  {
    id: "scr_3",
    type: "radio",
    number: "3",
    text: "Bạn đã từng hoặc đang sử dụng dịch vụ Mua trước - Trả sau (BNPL - ví dụ: Shopee SPayLater, MoMo Ví trả sau, Fundiin...) hay chưa?",
    options: [
      { value: "used", label: "Đã từng/Đang sử dụng" },
      { value: "never", label: "Chưa từng sử dụng" },
    ],
  },

  // --- PART 1 ---
  {
    id: "p1_1",
    type: "radio",
    number: "1",
    text: "Giới tính của bạn là",
    options: [
      { value: "male", label: "Nam" },
      { value: "female", label: "Nữ" },
      { value: "other", label: "Khác…" },
    ],
  },
  {
    id: "p1_2",
    type: "radio",
    number: "2",
    text: "Bạn đang là",
    options: [
      { value: "hs", label: "Học sinh" },
      { value: "sv_chua", label: "Sinh viên chưa đi làm" },
      { value: "sv_roi", label: "Sinh viên đã đi làm" },
      { value: "di_lam", label: "Đã đi làm" },
    ],
  },
  {
    id: "p1_3",
    type: "radio",
    number: "3",
    text: "Mức thu nhập trung bình hàng tháng của bạn nằm trong khoảng nào?",
    options: [
      { value: "under_5", label: "Dưới 5.000.000 VNĐ" },
      { value: "5_to_10", label: "Từ 5.000.000 VNĐ đến dưới 10.000.000 VNĐ" },
      { value: "above_10", label: "Từ 10.000.000 VNĐ trở lên" },
    ],
  },
  {
    id: "p1_4",
    type: "radio",
    number: "4",
    text: "Mức chi tiêu cá nhân trung bình mỗi tháng của bạn nằm trong khoảng nào?",
    options: [
      { value: "under_2", label: "Dưới 2 triệu" },
      { value: "2_to_5", label: "Từ 2 đến dưới 5 triệu" },
      { value: "5_to_10", label: "Từ 5 đến dưới 10 triệu" },
      { value: "10_to_15", label: "Từ 10 đến dưới 15 triệu" },
    ],
  },

  // --- PART 2 ---
  {
    id: "p2_1",
    type: "checkbox",
    number: "1",
    text: "Bạn thường sử dụng BNPL để mua những loại sản phẩm/dịch vụ nào?",
    description: "(Có thể chọn nhiều)",
    options: [
      { value: "fashion", label: "Thời trang/quần áo" },
      { value: "cosmetics", label: "Mỹ phẩm/chăm sóc cá nhân" },
      { value: "tech", label: "Điện thoại/thiết bị công nghệ" },
      { value: "home", label: "Đồ gia dụng" },
      { value: "entertainment", label: "Ăn uống / Du lịch / Giải trí" },
      { value: "edu", label: "Khóa học/giáo dục" },
      { value: "other", label: "Khác", allowCustom: true },
    ],
  },
  {
    id: "p2_2",
    type: "radio",
    number: "2",
    text: "Bạn thường chốt đơn bằng BNPL với tần suất như thế nào?",
    options: [
      { value: "1_2", label: "1-2 lần/tháng" },
      { value: "3_4", label: "3-4 lần/tháng" },
      { value: "5_6", label: "5-6 lần/tháng" },
      { value: "above_6", label: "Trên 6 lần/tháng" },
    ],
  },
  {
    id: "p2_3",
    type: "radio",
    number: "3",
    text: "Trong một tháng, tổng giá trị các khoản mua sắm của bạn thực hiện bằng BNPL thường khoảng bao nhiêu?",
    options: [
      { value: "under_500k", label: "Dưới 500.000 VNĐ" },
      { value: "500k_1m", label: "500.000 – dưới 1.000.000 VNĐ" },
      { value: "1m_3m", label: "1.000.000 – dưới 3.000.000 VNĐ" },
      { value: "3m_5m", label: "3.000.000 – dưới 5.000.000 VNĐ" },
      { value: "above_5m", label: "5.000.000 VNĐ trở lên" },
    ],
  },
  {
    id: "p2_4",
    type: "checkbox",
    number: "4",
    text: "Đâu là những lý do chính khiến bạn quyết định chọn dùng BNPL thay vì trả thẳng?",
    maxSelect: 3,
    options: [
      { value: "voucher", label: "Có mã giảm giá / Voucher độc quyền khi dùng BNPL" },
      { value: "0_interest", label: "Có chương trình 0% lãi suất" },
      { value: "want_now", label: "Muốn sở hữu món đồ ngay lập tức nhưng chưa đủ tiền trả toàn bộ" },
      { value: "convenient", label: "Tiện lợi, thanh toán nhanh mượt (tích hợp sẵn trên app)" },
      { value: "split", label: "Thích cảm giác chia nhỏ khoản tiền, không bị \"xót ví\" khi trả một cục" },
      { value: "other", label: "Khác", allowCustom: true },
    ],
  },
  {
    id: "p2_5",
    type: "checkbox",
    number: "5",
    text: "Khi dùng BNPL cho một món đồ, bạn thường kiểm tra những thông tin nào?",
    description: "(Có thể chọn nhiều)",
    options: [
      { value: "compare", label: "So sánh tổng giá trị khi dùng BNPL với giá gốc" },
      { value: "monthly", label: "Số tiền phải trả mỗi tháng có phù hợp với túi tiền không" },
      { value: "fees", label: "Các loại phí dịch vụ / Lãi suất" },
      { value: "penalty", label: "Phí phạt nếu lỡ thanh toán trễ hạn" },
      { value: "no_check", label: "Tôi thường chốt đơn luôn, ít khi kiểm tra kỹ" },
      { value: "other", label: "Khác", allowCustom: true },
    ],
  },

  // --- PART 3 ---
  {
    id: "p3_1",
    type: "matrix",
    number: "1",
    text: "Khi sử dụng BNPL, bạn có THƯỜNG XUYÊN gặp phải các tình trạng sau không?",
    description: "Thang điểm từ 1 đến 5: 1 = Chưa bao giờ | 2 = Hiếm khi | 3 = Thỉnh thoảng | 4 = Thường xuyên | 5 = Rất thường xuyên",
    scaleStart: 1,
    scaleEnd: 5,
    rows: [
      { id: "1", label: "Tôi chốt đơn mua hàng bằng BNPL dù trước đó không hề có kế hoạch mua món đồ này." },
      { id: "2", label: "Tôi mua đồ đắt tiền dễ dàng hơn vì nghĩ rằng \"chia nhỏ ra mỗi tháng chỉ trả một chút\"." },
      { id: "3", label: "Tôi quên hoặc suýt quên ngày đến hạn thanh toán BNPL." },
      { id: "4", label: "Tôi phải cắt giảm các khoản chi tiêu cá nhân khác (ăn uống, đi chơi...) để bù vào tiền trả nợ BNPL." },
      { id: "5", label: "Tôi cảm thấy áp lực, căng thẳng mỗi khi đến kỳ hạn trả tiền." },
      { id: "6", label: "Sau khi mua, tôi cảm thấy hối hận hoặc nhận ra món đồ đó không thực sự cần thiết." },
    ],
  },

  // --- PART 4 ---
  {
    id: "p4_1",
    type: "matrix",
    number: "1",
    text: "Thái độ",
    description: "Bạn hãy cho biết mức độ đồng ý của bạn với các phát biểu dưới đây về việc cân nhắc trước khi quyết định chi tiêu bằng BNPL.\n1 = Hoàn toàn không đồng ý | 7 = Hoàn toàn đồng ý",
    scaleStart: 1,
    scaleEnd: 7,
    rows: [
      { id: "ATT1", label: "Tôi cho rằng cân nhắc kỹ trước khi quyết định chi tiêu bằng BNPL là điều có lợi cho bản thân." },
      { id: "ATT2", label: "Tôi cho rằng cân nhắc tổng chi phí, khả năng chi trả và nghĩa vụ thanh toán trước khi sử dụng BNPL là một quyết định đúng đắn." },
      { id: "ATT3", label: "Tôi có thái độ tích cực đối với việc cân nhắc kỹ trước khi quyết định chi tiêu bằng BNPL." },
    ],
  },
  {
    id: "p4_2",
    type: "matrix",
    number: "2",
    text: "Nhận thức kiểm soát hành vi",
    description: "Bạn hãy cho biết mức độ đồng ý của bạn với các phát biểu dưới đây về khả năng kiểm soát việc cân nhắc trước khi quyết định chi tiêu bằng BNPL.\n1 = Hoàn toàn không đồng ý | 7 = Hoàn toàn đồng ý",
    scaleStart: 1,
    scaleEnd: 7,
    rows: [
      { id: "PBC1", label: "Tôi cảm thấy mình có đủ khả năng để cân nhắc kỹ trước khi quyết định chi tiêu bằng BNPL." },
      { id: "PBC2", label: "Tôi tự tin rằng mình có thể kiểm tra tổng chi phí, khả năng chi trả và nghĩa vụ thanh toán trước khi chi tiêu bằng BNPL." },
      { id: "PBC3", label: "Việc tôi có cân nhắc kỹ trước khi quyết định chi tiêu bằng BNPL hay không là hoàn toàn do tôi kiểm soát." },
    ],
  },
  {
    id: "p4_3",
    type: "matrix",
    number: "3",
    text: "Chuẩn mực chủ quan",
    description: "Bạn hãy cho biết mức độ đồng ý của bạn với các phát biểu dưới đây về sự ảnh hưởng và kỳ vọng của những người xung quanh đối với việc cân nhắc trước khi quyết định chi tiêu bằng BNPL.\n1 = Hoàn toàn không đồng ý | 7 = Hoàn toàn đồng ý",
    scaleStart: 1,
    scaleEnd: 7,
    rows: [
      { id: "SN1", label: "Gia đình cho rằng tôi nên cân nhắc kỹ các yếu tố, bao gồm tổng chi phí thanh toán, khả năng chi trả và nghĩa vụ thanh toán phát sinh, trước khi quyết định chi tiêu bằng BNPL." },
      { id: "SN2", label: "Bạn bè của tôi mong muốn tôi cân nhắc kỹ các yếu tố, bao gồm tổng chi phí thanh toán, khả năng chi trả và nghĩa vụ thanh toán phát sinh, trước khi quyết định chi tiêu bằng BNPL." },
      { id: "SN3", label: "Những người xung quanh tôi khuyến khích tôi cân nhắc kỹ các yếu tố, bao gồm tổng chi phí thanh toán, khả năng chi trả và nghĩa vụ thanh toán phát sinh, trước khi quyết định chi tiêu bằng BNPL." },
      { id: "SN4", label: "Hầu hết những người tôi yêu quý đều cân nhắc kỹ các yếu tố, bao gồm tổng chi phí thanh toán, khả năng chi trả và nghĩa vụ thanh toán phát sinh, trước khi quyết định chi tiêu bằng BNPL." },
    ],
  },
  {
    id: "p4_4",
    type: "matrix",
    number: "4",
    text: "Nỗi đau khi thanh toán",
    description: "Bạn hãy cho biết mức độ đồng ý của bạn với các phát biểu dưới đây về cảm nhận của bạn khi thanh toán cho các khoản mua sắm bằng BNPL.\n1 = Hoàn toàn không đồng ý | 7 = Hoàn toàn đồng ý",
    scaleStart: 1,
    scaleEnd: 7,
    rows: [
      { id: "POP1", label: "Tôi cảm thấy không thoải mái khi sử dụng BNPL để thực hiện một khoản mua sắm. " },
      { id: "POP2", label: "Tôi cảm nhận rõ sự mất mát về tiền bạc khi phải thanh toán cho khoản mua sắm bằng BNPL." },
      { id: "POP3", label: "Tôi cảm thấy khó chịu khi đến thời điểm phải thanh toán khoản mua sắm đã thực hiện bằng BNPL." },
    ],
  },
  {
    id: "p4_5",
    type: "matrix",
    number: "5",
    text: "Ý định hành vi",
    description: "Bạn hãy cho biết mức độ đồng ý của bạn với các phát biểu dưới đây về ý định cân nhắc trước khi quyết định chi tiêu bằng BNPL trong những lần mua sắm tiếp theo.\n1 = Hoàn toàn không đồng ý | 7 = Hoàn toàn đồng ý",
    scaleStart: 1,
    scaleEnd: 7,
    rows: [
      { id: "INT1", label: "Trong những lần mua sắm tiếp theo, tôi có ý định cân nhắc kỹ trước khi quyết định chi tiêu bằng BNPL." },
      { id: "INT2", label: "Trong những lần sử dụng BNPL tiếp theo, tôi dự định kiểm tra tổng chi phí, khả năng chi trả và nghĩa vụ thanh toán trước khi quyết định mua." },
      { id: "INT3", label: "Trong tương lai, tôi có ý định chủ động cân nhắc các yếu tố liên quan trước khi quyết định chi tiêu bằng BNPL." },
    ],
  },

  // --- PART 5 ---
  {
    id: "p5_1",
    type: "checkbox",
    number: "1",
    text: "Mạng xã hội nào bạn thường sử dụng nhiều nhất gần đây?",
    description: "(chọn nhiều đáp án)",
    options: [
      { value: "fb", label: "Facebook" },
      { value: "tiktok", label: "TikTok" },
      { value: "youtube", label: "YouTube" },
      { value: "threads", label: "Threads" },
      { value: "ig", label: "Instagram" },
      { value: "zalo", label: "Zalo" },
      { value: "other", label: "Khác", allowCustom: true },
    ],
  },
  {
    id: "p5_2",
    type: "checkbox",
    number: "2",
    text: "Bạn thường sử dụng mạng xã hội vào những buổi nào trong ngày?",
    description: "(chọn nhiều đáp án)",
    options: [
      { value: "sang", label: "Sáng (6h - 10h)" },
      { value: "trua", label: "Trưa (10h - 14h)" },
      { value: "chieu", label: "Chiều (14h - 18h)" },
      { value: "toi", label: "Tối (18h - 22h)" },
      { value: "dem", label: "Đêm (22h - 0h)" },
      { value: "rangsang", label: "Rạng sáng (0h - 6h)" },
      { value: "other", label: "Khác", allowCustom: true },
    ],
  },
  {
    id: "p5_3",
    type: "checkbox",
    number: "3",
    text: "Khi sử dụng mạng xã hội, bạn thường làm gì?",
    description: "(chọn nhiều đáp án)",
    options: [
      { value: "giaitri", label: "Lướt xem cho vui, giải trí" },
      { value: "video", label: "Xem video, clip ngắn" },
      { value: "tintuc", label: "Đọc tin tức, cập nhật xu hướng" },
      { value: "timhieu", label: "Tìm hiểu thông tin về sản phẩm, dịch vụ (mua sắm, tài chính, công nghệ...)" },
      { value: "theodoi", label: "Theo dõi người nổi tiếng, KOL, creator" },
      { value: "nhantin", label: "Nhắn tin, gọi điện với bạn bè, người thân" },
      { value: "dangbai", label: "Đăng bài, chia sẻ trạng thái cá nhân" },
      { value: "thamgia", label: "Tham gia nhóm, cộng đồng theo sở thích" },
      { value: "lamviec", label: "Làm việc, học tập online" },
      { value: "other", label: "Khác", allowCustom: true },
    ],
  },
  {
    id: "p5_4",
    type: "checkbox",
    number: "4",
    text: "Bạn thường tiếp cận thông tin về Mua trước - Trả sau (BNPL) qua các phương tiện nào?",
    description: "(chọn nhiều đáp án)",
    options: [
      { value: "truyenmieng", label: "Truyền miệng từ gia đình, người thân, bạn bè,..." },
      { value: "baochi", label: "Báo chí (truyền thông, điện tử)" },
      { value: "truyenhinh", label: "Truyền hình" },
      { value: "mxh", label: "Mạng xã hội (Facebook, TikTok, Instagram, Youtube, Threads, X,...)" },
      { value: "web", label: "Website/blog" },
      { value: "congdong", label: "Cộng đồng online (group Facebook, forum, Threads...)" },
      { value: "tinhco", label: "Không chủ động tìm, chỉ tình cờ thấy khi lướt mạng xã hội" },
      { value: "other", label: "Khác", allowCustom: true },
    ],
  },
  {
    id: "p5_5",
    type: "checkbox",
    number: "5",
    text: "Nếu một chiến dịch về BNPL xuất hiện trên Facebook, dạng nội dung nào sẽ thu hút bạn?",
    maxSelect: 3,
    options: [
      { value: "baivietdai", label: "Bài viết dài, phân tích chuyên sâu về BNPL kèm hình ảnh trào phúng thị giác." },
      { value: "keogoi", label: "Bài đăng kêu gọi cộng đồng chia sẻ trải nghiệm chi tiêu cá nhân." },
      { value: "thaoluan", label: "Bài đăng mở không gian thảo luận, bình luận và góp ý cùng cộng đồng." },
      { value: "hinhhaihuoc", label: "Hình ảnh hài hước, châm biếm về thói quen chi tiêu." },
      { value: "minigame", label: "Minigame hoặc câu chuyện dễ đọc, dễ theo dõi." },
    ],
  },
  {
    id: "p5_6",
    type: "checkbox",
    number: "6",
    text: "Nếu một chiến dịch về BNPL xuất hiện trên TikTok, dạng video nào sẽ thu hút bạn?",
    maxSelect: 3,
    options: [
      { value: "trend", label: "Video bắt trend, cập nhật xu hướng mới nhất." },
      { value: "nghian", label: "Video ngắn bẻ nghĩa lại câu nói Gen Z thường dùng để biện minh cho việc chi tiêu." },
      { value: "thuthach", label: "Thử thách tương tác, ví dụ tính thử tổng chi phí BNPL đang gánh." },
      { value: "laisuat", label: "Clip tìm hiểu phí và lãi suất thực tế của các nền tảng BNPL." },
      { value: "giaithich", label: "Video giải thích ngắn gọn vì sao trì hoãn thanh toán khiến ta chi tiêu nhiều hơn." },
    ],
  },
  {
    id: "p5_7",
    type: "checkbox",
    number: "7",
    text: "Nếu một chiến dịch về BNPL xuất hiện trên Threads, nội dung nào sẽ thu hút bạn?",
    maxSelect: 3,
    options: [
      { value: "cauhoin", label: "Câu hỏi ngắn về các chủ đề gây tranh luận." },
      { value: "cauchuyen", label: "Câu chuyện thật về trải nghiệm chi tiêu qua BNPL." },
      { value: "benghia", label: "Câu nói bẻ nghĩa hài hước kèm một dữ kiện tài chính cụ thể." },
      { value: "capnhat", label: "Thông tin cập nhật nhanh gọn về chiến dịch." },
      { value: "chude", label: "Chuỗi bài viết theo chủ đề cụ thể." },
      { value: "thaoluan", label: "Bài viết thảo luận mở." },
      { value: "sosanh", label: "Nội dung so sánh xu hướng BNPL tại Việt Nam với thế giới." },
    ],
  },

  // --- PART 6 ---
  {
    id: "p6_1",
    type: "radio",
    number: "1",
    text: "Trước khi tham gia khảo sát, bạn đã từng nghe đến khái niệm “trào phúng thị giác” chưa?",
    options: [
      { value: "chua", label: "Chưa từng nghe" },
      { value: "dahoi", label: "Đã từng nghe nhưng chưa hiểu rõ" },
      { value: "biet", label: "Biết sơ qua" },
      { value: "kha", label: "Khá hiểu" },
      { value: "hieuro", label: "Hiểu rõ" },
    ],
  },
  {
    id: "p6_2",
    type: "radio",
    number: "2",
    text: "Theo bạn, trào phúng thị giác là gì?",
    description: "Chọn phương án phù hợp nhất với cách bạn hiểu.",
    options: [
      { value: "gaycuoi", label: "Nội dung hình ảnh chủ yếu được tạo ra để gây cười và giải trí." },
      { value: "chambiem", label: "Nội dung hình ảnh sử dụng sự hài hước, châm biếm hoặc mỉa mai để thể hiện góc nhìn, bình luận hoặc phê phán một vấn đề." },
      { value: "thuhut", label: "Nội dung hình ảnh sử dụng hình ảnh, màu sắc và bố cục để thu hút người xem." },
      { value: "thongtin", label: "Nội dung hình ảnh sử dụng hình ảnh để cung cấp thông tin về một vấn đề." },
      { value: "other", label: "Khác", allowCustom: true },
    ],
  },
  {
    id: "info_p6_def",
    type: "info",
    text: "💡 Vậy \u201cTrào Phúng Thị Giác\u201d là gì nhỉ?",
    description: "Trào phúng thị giác là cách sử dụng hình ảnh, nhân vật, tình huống, chữ viết hoặc các yếu tố thị giác kết hợp với sự hài hước, châm biếm, mỉa mai hoặc cường điệu để thể hiện một góc nhìn, bình luận hoặc phê phán về một vấn đề trong cuộc sống.\n\nNói đơn giản hơn — thay vì nói một vấn đề theo cách nghiêm túc, trào phúng thị giác \u201cnói bằng sự hài hước\u201d để người xem vừa thấy thú vị, vừa nhận ra thông điệp hoặc vấn đề được đề cập.",
    dependencies: ["p6_1", "p6_2"]
  },
  {
    id: "info_p6",
    type: "info",
    text: "",
    description: "Vui lòng xem nội dung/ấn phẩm được cung cấp trước khi trả lời các câu hỏi dưới đây.",
  },
  {
    id: "info_p6_q3",
    type: "info",
    text: "",
    images: [
      { url: "/images/cau3_phan6.png", layout: "full" }
    ]
  },
  {
    id: "p6_3",
    type: "matrix",
    number: "3",
    text: "",
    description: "Bạn đánh giá nội dung trên như thế nào?",
    scaleStart: 1,
    scaleEnd: 7,
    rows: [
      { id: "haihuoc", label: "Không hài hước - Rất hài hước" },
      { id: "thichthu", label: "Không gây thích thú - Rất gây thích thú" },
      { id: "nhamchan", label: "Nhàm chán - Không nhàm chán" },
      { id: "khochiu", label: "Gây khó chịu - Không khó chịu" },
    ],
  },
  {
    id: "p6_4",
    type: "matrix",
    number: "4",
    text: "",
    description: "Sau khi xem nội dung trên, bạn hãy cho biết mức độ đồng ý với các phát biểu sau.\n1 = Hoàn toàn không đồng ý | 7 = Hoàn toàn đồng ý",
    scaleStart: 1,
    scaleEnd: 7,
    rows: [
      { id: "gaycuoi", label: "Nội dung này chủ yếu nhằm mục đích gây cười." },
      { id: "giaitri", label: "Nội dung này thiên về giải trí hơn là truyền tải một thông điệp về vấn đề được đề cập." },
    ],
  },
  {
    id: "p6_5",
    type: "text",
    number: "5",
    text: "Theo cách hiểu của bạn, nội dung trên đang muốn truyền tải hoặc phê phán điều gì?",
    description: "*(Lưu ý xíu xiu: Một khi bấm xác nhận rồi là không quay lại sửa được nữa đâu nha, nên bạn cứ viết hết suy nghĩ của mình ra rồi hẵng chốt nhé!)*",
    placeholder: "Câu trả lời mở...",
    requireConfirm: true,
  },
  {
    id: "info_p6_msg",
    type: "info",
    text: "GIẢI THÍCH THÔNG ĐIỆP",
    description: "“BNPL giúp bạn mua điều mình muốn ngay hôm nay, nhưng hãy cân nhắc trước để khoản thanh toán ngày mai vẫn nằm trong khả năng của mình.”\n\nGiải thích các chi tiết trong hình:\n- Người trẻ vui vẻ, hào hứng với những túi mua sắm: thể hiện sự tiện lợi và niềm vui khi BNPL giúp mình mua được món đồ mong muốn ngay cả khi chưa cần thanh toán toàn bộ.\n- Hóa đơn cũng đang cười và chạy theo: hóa đơn không phải là “kẻ xấu”, mà là một phần tất yếu đi cùng quyết định mua sắm. Nó nhắc rằng dù đang tận hưởng niềm vui mua hàng, mình vẫn cần nhớ đến khoản tiền sẽ phải thanh toán sau.\n- Biển cảnh báo: một lời nhắc hãy dừng lại và cân nhắc trước khi quyết định mua.\n- Hóa đơn chạy theo người mua: nhấn mạnh rằng quyết định mua hôm nay sẽ đi cùng nghĩa vụ thanh toán về sau."
  },
  {
    id: "p6_6",
    type: "matrix",
    number: "6",
    text: "Nhận thức thông điệp",
    description: "Sau khi được cung cấp thông tin về thông điệp mà nội dung muốn truyền tải, bạn hãy cho biết mức độ đồng ý với các phát biểu sau.\n1 = Hoàn toàn không đồng ý | 7 = Hoàn toàn đồng ý",
    scaleStart: 1,
    scaleEnd: 7,
    rows: [
      { id: "nhanra", label: "Sau khi biết thông điệp chủ đích, tôi nhận ra được thông điệp này trong nội dung." },
      { id: "lienhe", label: "Tôi có thể liên hệ các chi tiết trong nội dung với thông điệp được giải thích." },
      { id: "hieucach", label: "Tôi hiểu cách nội dung sử dụng sự hài hước hoặc châm biếm để truyền tải thông điệp." },
    ],
  },
  {
    id: "p6_7",
    type: "matrix",
    number: "7",
    text: "Ảnh hưởng của thông điệp",
    description: "Sau khi xem nội dung và biết thông điệp mà nội dung muốn truyền tải, bạn hãy cho biết mức độ đồng ý với các phát biểu sau.\n1 = Hoàn toàn không đồng ý | 5 = Hoàn toàn đồng ý",
    scaleStart: 1,
    scaleEnd: 5,
    rows: [
      { id: "quantam", label: "Thông điệp này khiến tôi quan tâm hơn đến việc sử dụng BNPL một cách có cân nhắc." },
      { id: "ruiro", label: "Thông điệp này khiến tôi chú ý hơn đến những rủi ro khi sử dụng BNPL mà không cân nhắc." },
    ],
  },
  {
    id: "p6_8",
    type: "matrix",
    number: "8",
    text: "Đánh giá thông điệp",
    description: "Sau khi xem nội dung trên, bạn hãy cho biết mức độ đồng ý với các phát biểu sau.\n1 = Hoàn toàn không đồng ý | 5 = Hoàn toàn đồng ý",
    scaleStart: 1,
    scaleEnd: 5,
    rows: [
      { id: "rorang", label: "Thông điệp này được truyền tải một cách rõ ràng." },
      { id: "ynghia", label: "Thông điệp này có ý nghĩa đối với tôi." },
      { id: "ghinho", label: "Thông điệp này đáng để tôi ghi nhớ." },
      { id: "denho", label: "Thông điệp này dễ nhớ với tôi." },
    ],
  },
  {
    id: "p6_9",
    type: "matrix",
    number: "9",
    text: "Vai trò phần chữ",
    description: "Bạn hãy đánh giá vai trò của phần chữ trong nội dung trên.\n1 = Hoàn toàn không đồng ý | 7 = Hoàn toàn đồng ý",
    scaleStart: 1,
    scaleEnd: 7,
    rows: [
      { id: "hieu", label: "Phần chữ giúp tôi hiểu nội dung." },
      { id: "noibat", label: "Phần chữ làm nổi bật thông điệp." },
      { id: "haihuoc", label: "Cách sử dụng từ ngữ góp phần tạo ra tính hài hước hoặc châm biếm." },
      { id: "thuhut", label: "Phần chữ thu hút sự chú ý của tôi." },
      { id: "dedoc", label: "Phần chữ được trình bày dễ đọc và dễ hiểu." },
    ],
  },
  {
    id: "p6_10",
    type: "matrix",
    number: "10",
    text: "Vai trò phần hình ảnh",
    description: "Bạn hãy đánh giá vai trò của phần hình ảnh trong nội dung trên.\n1 = Hoàn toàn không đồng ý | 7 = Hoàn toàn đồng ý",
    scaleStart: 1,
    scaleEnd: 7,
    rows: [
      { id: "thuhut", label: "Hình ảnh thu hút sự chú ý của tôi." },
      { id: "hieu", label: "Hình ảnh giúp tôi hiểu vấn đề được đề cập." },
      { id: "noibat", label: "Cách thể hiện hình ảnh làm nổi bật tính hài hước hoặc châm biếm." },
    ],
  }
];
