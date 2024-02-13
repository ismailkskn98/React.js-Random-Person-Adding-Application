import { FC } from 'react';
import { BounceLoader } from 'react-spinners';

type Button = {
  handleClick?: () => void;
  isLoading?: boolean;
  title: string;
};

const Button: FC<Button> = ({ handleClick, isLoading, title }) => {
  return (
    <>
      <button
        onClick={handleClick}
        className="cursor-pointer flex items-center gap-2 border-2 px-4 py-2 rounded text-md font-semibold border-green-700 text-green-700 hover:bg-green-100/10 transition-all"
      >
        {!isLoading ? (
          <>
            {title}
            <span className="font-extrabold">+</span>
          </>
        ) : (
          <BounceLoader size={25} color="#15803D" />
        )}
      </button>
    </>
  );
};

export default Button;
