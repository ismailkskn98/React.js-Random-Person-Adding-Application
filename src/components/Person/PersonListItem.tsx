import { FC, useState } from 'react';
import { Person } from '../../types/types';
import PanelAlbumTitle from '../openableAlbumPanel/PanelAlbumTitle';
import OpenableAlbumPanel from '../openableAlbumPanel';
import PanelHeader from '../common/PanelHeader';
import PanelAlbums from '../openableAlbumPanel/PanelAlbums';
import { useRemovePersonMutation } from '../../reducer/services/personsApi';

type PersonListItemProps = {
  item: Person;
};

const PersonListItem: FC<PersonListItemProps> = ({ item }) => {
  const [arrow, setArrow] = useState(false);
  const [removePerson, result] = useRemovePersonMutation();

  const handlePanelToggle = (): void => {
    setArrow((prev) => !prev);
  };
  const handleRemovePerson = (): void => {
    removePerson(item);
  };
  return (
    <article className={`bg-gray-800 text-white w-full px-3 py-4 rounded flex flex-col gap-8 ${arrow ? 'h-auto' : 'h-14'}`}>
      <PanelHeader
        arrow={arrow}
        handlePanelToggle={handlePanelToggle}
        title={item.name}
        handleRemove={handleRemovePerson}
        isLoading={result.isLoading}
      />
      {arrow && (
        <>
          <OpenableAlbumPanel>
            <PanelAlbumTitle person={item} />
            <PanelAlbums person={item} />
          </OpenableAlbumPanel>
        </>
      )}
    </article>
  );
};

export default PersonListItem;
