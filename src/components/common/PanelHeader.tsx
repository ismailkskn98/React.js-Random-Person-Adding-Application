import { FC } from 'react';
import { Person } from '../../types/types';
import { MdDelete } from 'react-icons/md';
import { FaChevronLeft } from 'react-icons/fa';
import { CircleLoader } from 'react-spinners';

type PanelHeaderProps = {
  item: Person;
  handlePanel: () => void;
  arrow: boolean;
  isLoading: boolean;
  handleRemove: () => void;
};

const PanelHeader: FC<PanelHeaderProps> = ({ item, handlePanel, arrow, handleRemove, isLoading }) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {isLoading ? (
            <CircleLoader color="#fff" size={25} />
          ) : (
            <MdDelete onClick={handleRemove} className="text-2xl hover:text-gray-400 cursor-pointer" />
          )}
          <span className="capitalize">{item.name}</span>
        </div>
        <span onClick={handlePanel} className="font-semibold text-md cursor-pointer group">
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
