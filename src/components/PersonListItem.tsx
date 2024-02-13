import { FC, useState } from 'react';
import { Person } from '../types/types';
import { MdDelete } from 'react-icons/md';
import { FaChevronLeft } from 'react-icons/fa';
import PersonPanel from './PersonPanel';

type PersonListItemProps = {
  item: Person;
};

const PersonListItem: FC<PersonListItemProps> = ({ item }) => {
  const [arrow, setArrow] = useState(false);
  const [panelShow, setPanelShow] = useState(false);

  const handlePanel = () => {
    setArrow((prev) => !prev);
    setPanelShow((prev) => !prev);
  };

  return (
    <article
      className={`bg-gray-800 text-white w-full px-3 py-4 rounded flex flex-col gap-8 overflow-hidden h-14 ${
        panelShow && 'h-auto'
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <MdDelete className="text-2xl hover:text-gray-400 cursor-pointer" />
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
      {panelShow ? <PersonPanel person={item} /> : ''}
    </article>
  );
};

export default PersonListItem;
