import { FC, useState } from 'react';
import { Person } from '../../types/types';
import PanelAlbumTitle from '../openablePanel/PanelAlbumTitle';
import OpenablePanel from '../openablePanel';
import PersonListItemTitle from './PersonListItemTitle';
import PanelAlbums from '../openablePanel/PanelAlbums';

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
    <article className={`bg-gray-800 text-white w-full px-3 py-4 rounded flex flex-col gap-8 ${panelShow ? 'h-auto' : 'h-14'}`}>
      <PersonListItemTitle arrow={arrow} handlePanel={handlePanel} item={item} />
      {panelShow && (
        <>
          <OpenablePanel>
            <PanelAlbumTitle person={item} />
            <PanelAlbums />
          </OpenablePanel>
        </>
      )}
    </article>
  );
};

export default PersonListItem;
