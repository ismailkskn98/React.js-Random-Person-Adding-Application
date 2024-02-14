import { FC, useState } from 'react';
import { Person } from '../../types/types';
import PanelAlbumTitle from '../openablePanel/PanelAlbumTitle';
import OpenablePanel from '../openablePanel';
import PanelHeader from '../common/PanelHeader';
import PanelAlbums from '../openablePanel/PanelAlbums';
import { useRemovePersonMutation } from '../../reducer/services/personsApi';

type PersonListItemProps = {
  item: Person;
};

const PersonListItem: FC<PersonListItemProps> = ({ item }) => {
  const [arrow, setArrow] = useState(false);
  const [panelShow, setPanelShow] = useState(false);
  const [removePerson, result] = useRemovePersonMutation();

  const handlePanel = (): void => {
    setArrow((prev) => !prev);
    setPanelShow((prev) => !prev);
  };
  const handleRemovePerson = (): void => {
    removePerson(item);
  };

  return (
    <article className={`bg-gray-800 text-white w-full px-3 py-4 rounded flex flex-col gap-8 ${panelShow ? 'h-auto' : 'h-14'}`}>
      <PanelHeader
        arrow={arrow}
        handlePanel={handlePanel}
        item={item}
        handleRemove={handleRemovePerson}
        isLoading={result.isLoading}
      />
      {panelShow && (
        <>
          <OpenablePanel>
            <PanelAlbumTitle person={item} />
            <PanelAlbums person={item} />
          </OpenablePanel>
        </>
      )}
    </article>
  );
};

export default PersonListItem;
