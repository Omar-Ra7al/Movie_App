import { Ref } from "react";

interface ComponentProps {
  type: string;
  id: string;
  text: string;
  ref: Ref<HTMLInputElement> | undefined;
  className?: string;
  required?: boolean;
}

const FormField = ({
  type,
  id,
  text,
  ref,
  className,
  required = true,
}: ComponentProps) => {
  return (
    <div className="flex flex-col ">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-white">
        {text}
      </label>
      <input
        ref={ref}
        type={type}
        id={id}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none
        ${className} `}
        placeholder={text}
        required={required}
      />
    </div>
  );
};

export default FormField;
