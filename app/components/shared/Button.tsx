import { MouseEventHandler, ReactNode } from "react";
import { ImSpinner9 } from "react-icons/im";
interface ComponentProps {
  type: any;
  text?: string;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
  aria?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button = ({
  type,
  text,
  icon,
  className,
  disabled,
  aria,
  onClick,
}: ComponentProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      aria-label={aria}
      disabled={disabled}
      className={`btn  ${
        disabled && "cursor-not-allowed flex gap-2 justify-center items-center"
      } p-2   ${className}`}>
      {text}
      {disabled && <ImSpinner9 className="animate-spin" />}
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default Button;
