import { MediaAsset } from "../types";

interface Props {
  images?: MediaAsset[];
}

export const MediaRenderer = ({ images }: Props) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="p-4 bg-[#fff5f0] flex flex-wrap gap-4 justify-center items-center border-b border-[#e8eef8]">
      {images.map((img, idx) => (
        <div key={idx} className={`flex flex-col items-center gap-2 ${img.layout === 'full' ? 'w-full' : ''}`}>
          <img 
            src={img.url} 
            alt={img.caption || ""} 
            className={`${img.layout === 'full' ? 'w-full h-auto' : 'max-h-64'} object-contain rounded-lg border border-slate-200 bg-white`} 
          />
          {img.caption && (
            <p className="text-sm text-slate-500 italic text-center max-w-md">
              {img.caption}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
