import { Question } from "../types";

export interface SurveySection {
  id: string;
  title: string;
  description?: string;
  questionIds: string[];
}

export const sections: SurveySection[] = [
  {
    id: "personal",
    title: "Thông tin cá nhân",
    questionIds: ["q1_age", "q2_location", "q3_bnpl"]
  },
  {
    id: "part_a",
    title: "Phần A: Nhận biết",
    questionIds: ["info_a", "a1", "a2"]
  },
  {
    id: "part_b",
    title: "Phần B: Cảm nhận & Đánh giá",
    questionIds: ["b1", "b2", "b3", "b4"]
  }
];

export const questions: Question[] = [
  {
    id: "q1_age",
    type: "radio",
    text: "Độ tuổi của bạn hiện tại là bao nhiêu?",
    options: [
      { value: "under_18", label: "Dưới 18 tuổi" },
      { value: "18_24", label: "Từ 18 - 24 tuổi" },
      { value: "25_plus", label: "Từ 25 tuổi trở lên" },
    ],
  },
  {
    id: "q2_location",
    type: "radio",
    text: "Bạn hiện đang sinh sống tại đâu?",
    options: [
      { value: "hcmc", label: "Thành phố Hồ Chí Minh" },
      { value: "other", label: "Tỉnh/Thành phố khác" },
    ],
  },
  {
    id: "q3_bnpl",
    type: "radio",
    text: "Bạn đã từng hoặc đang sử dụng dịch vụ Mua trước - Trả sau (BNPL - ví dụ: Shopee SPayLater, MoMo Ví trả sau, Fundiin...) trong vòng 6 tháng qua chưa?",
    options: [
      { value: "used", label: "Đã từng / Đang sử dụng" },
      { value: "never", label: "Chưa từng sử dụng" },
    ],
  },
  {
    id: "info_a",
    type: "info",
    text: "Chào mừng đến với Phần A",
    description: "Hãy xem kỹ các hình ảnh trào phúng thị giác dưới đây trước khi trả lời các câu hỏi."
  },
  {
    id: "a1",
    type: "radio",
    number: "A1",
    text: "Trước khi tham gia khảo sát, bạn đã từng nghe đến khái niệm “trào phúng thị giác” chưa?",
    images: [
      { url: "/images/a1_img1.png" },
      { url: "/images/a1_img2.png" },
      { url: "/images/a1_img3.png" }
    ],
    options: [
      { value: "chua_tung", label: "Chưa từng nghe" },
      { value: "da_tung_chua_hieu", label: "Đã từng nghe nhưng chưa hiểu rõ" },
      { value: "biet_so_qua", label: "Biết sơ qua" },
      { value: "kha_hieu", label: "Khá hiểu" },
      { value: "hieu_ro", label: "Hiểu rõ" },
    ],
  },
  {
    id: "a2",
    type: "radio",
    number: "A2",
    text: "Theo bạn, trào phúng thị giác là gì?",
    description: "Chọn phương án phù hợp nhất với cách bạn hiểu.",
    images: [
      { url: "/images/a2_img1.png", layout: "full" }
    ],
    options: [
      { value: "opt1", label: "Nội dung hình ảnh chủ yếu được tạo ra để gây cười và giải trí" },
      { value: "opt2", label: "Nội dung hình ảnh sử dụng sự hài hước, châm biếm hoặc mỉa mai để thể hiện góc nhìn, bình luận hoặc phê phán một vấn đề." },
      { value: "opt3", label: "Nội dung hình ảnh sử dụng hình ảnh, màu sắc và bố cục để thu hút người xem." },
      { value: "opt4", label: "Nội dung hình ảnh sử dụng hình ảnh để cung cấp thông tin về một vấn đề." },
      { value: "other", label: "Khác:", allowCustom: true },
    ],
  },
  {
    id: "b1",
    type: "matrix",
    number: "B1",
    text: "Cảm nhận mức độ hài hước",
    description: "Bạn đánh giá nội dung trên như thế nào?",
    scaleStart: 1,
    scaleEnd: 7,
    rows: [
      { id: "1", label: "Không hài hước - Rất hài hước" },
      { id: "2", label: "Không buồn cười - Rất buồn cười" },
      { id: "3", label: "Không vui nhộn - Rất vui nhộn" },
      { id: "4", label: "Không gây thích thú - Rất gây thích thú" },
      { id: "5", label: "Nhàm chán - Không nhàm chán" },
    ],
  },
  {
    id: "b2",
    type: "matrix",
    number: "B2",
    text: "Mức độ xem nhẹ thông điệp",
    description: "Sau khi xem nội dung trên, bạn hãy cho biết mức độ đồng ý với các phát biểu sau.\n1 = Hoàn toàn không đồng ý | 7 = Hoàn toàn đồng ý",
    scaleStart: 1,
    scaleEnd: 7,
    rows: [
      { id: "1", label: "Nội dung này chủ yếu nhằm mục đích gây cười" },
      { id: "2", label: "Nội dung này thiên về giải trí hơn là truyền tải một thông điệp về vấn đề được đề cập." },
      { id: "3", label: "Tôi cảm thấy thông điệp của nội dung này không cần được xem quá nghiêm túc." },
      { id: "4", label: "Tôi có thể dễ dàng xem nội dung này đơn giản chỉ là một trò đùa." },
    ],
  },
  {
    id: "b3",
    type: "text",
    number: "B3",
    text: "Khả năng hiểu thông điệp",
    description: "Theo cách hiểu của bạn, nội dung trên đang muốn truyền tải hoặc phê phán điều gì?",
    placeholder: "Câu trả lời mở...",
  },
  {
    id: "b4",
    type: "matrix",
    number: "B4",
    text: "Nhận biết và xử lý thông điệp chủ đích",
    description: "GIẢI THÍCH THÔNG ĐIỆP CHỦ ĐÍCH\n\nSau khi được cung cấp thông tin về thông điệp mà nội dung muốn truyền tải, bạn hãy cho biết mức độ đồng ý với các phát biểu sau.\n1 = Hoàn toàn không đồng ý | 7 = Hoàn toàn đồng ý",
    scaleStart: 1,
    scaleEnd: 7,
    rows: [
      { id: "1", label: "Sau khi biết thông điệp chủ đích, tôi nhận ra được thông điệp này trong nội dung." },
      { id: "2", label: "Tôi có thể liên hệ các chi tiết trong nội dung với thông điệp được giải thích." },
      { id: "3", label: "Tôi hiểu cách nội dung sử dụng sự hài hước hoặc châm biếm để truyền tải thông điệp." },
      { id: "4", label: "Sau khi được giải thích, tôi hiểu rõ hơn ý nghĩa của nội dung." },
      { id: "5", label: "Thông điệp được giải thích phù hợp với cách tôi hiểu nội dung ban đầu." },
    ],
  }
];
