interface ComponentProps {
  tilte?: string;
  formBody: React.ReactNode[];
  alert?: React.ReactNode;
  className?: string;
  ref?: any;
}
const Form = ({ tilte, formBody, className, ref }: ComponentProps) => {
  const handelForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form
      ref={ref}
      onSubmit={(event) => {
        handelForm(event);
      }}
      className={` flex flex-col gap-4 bg-slate-700/30 backdrop-blur-md p-4 rounded-md m-auto  min-w-full  md:min-w-[600px] ${className} `}>
      <h3 className="text-2xl font-bold text-center text-white">{tilte}</h3>
      <div className="flex flex-col align-end py-4 gap-4">{formBody}</div>
    </form>
  );
};

export default Form;
