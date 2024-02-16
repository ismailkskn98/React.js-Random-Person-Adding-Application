import { FC } from 'react';
import { MdDelete } from 'react-icons/md';
import { FaChevronLeft } from 'react-icons/fa';
import { CircleLoader } from 'react-spinners';

type PanelHeaderProps = {
  title: string;
  handlePanelToggle: () => void;
  arrow: boolean;
  isLoading: boolean;
  handleRemove?: () => void;
};

const PanelHeader: FC<PanelHeaderProps> = ({ title, handlePanelToggle, arrow, handleRemove, isLoading }) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {isLoading ? (
            <CircleLoader color="#fff" size={25} />
          ) : (
            <MdDelete onClick={handleRemove} className="text-2xl hover:text-red-900 cursor-pointer text-red-500" />
          )}
          <span className="capitalize text-xl">{title}</span>
        </div>
        <span onClick={handlePanelToggle} className="font-semibold text-md cursor-pointer group">
          <FaChevronLeft
            className={`group-hover:-rotate-90 transition-all hover:text-gray-400  ${
              arrow ? '-rotate-90 text-gray-400 ' : 'rotate-0 text-white '
            }`}
          />
        </span>
      </div>
    </>
  );
};

export default PanelHeader;
