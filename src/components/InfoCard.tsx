import { InfoBlock } from "../types";
import { MediaRenderer } from "./MediaRenderer";

interface Props {
  block: InfoBlock;
}

export const InfoCard = ({ block }: Props) => {
  return (
    <div id={`question-${block.id}`} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgba(0,54,155,0.06)] border border-[#e2e8f0]/80 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,54,155,0.12)]">
      {/* Media Content */}
      <MediaRenderer images={block.images} />

      {/* Text Content */}
      <div className="px-6 py-5">
        <h3 className="text-[#00369b] font-bold text-lg sm:text-xl leading-snug mb-2">
          {block.text}
        </h3>
        {block.description && (
          <div className="text-slate-600 whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
            {block.description}
          </div>
        )}
      </div>
    </div>
  );
};
