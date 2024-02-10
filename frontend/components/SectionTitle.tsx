export interface SectionTitleProps {
  title: string;
}

export const SectionTitle = ({title}: SectionTitleProps) => {
  return (
    <div className="shadow-xl
                    border-2 border-slate-500 rounded-md
                    bg-slate-300 mb-5
                    flex flex-row justify-between
    ">
      <h2 className="text-3xl text-black font-bold m-2">{title}</h2>
    </div>
  )
};