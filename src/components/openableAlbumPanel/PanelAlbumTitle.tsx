import { FC } from 'react';
import Button from '../common/Button';
import { useAddAlbumMutation } from '../../reducer/services/albumsApi';
import { Person } from '../../types/types';
import { faker } from '@faker-js/faker';

type PersonPanel = {
  person: Person;
};

const PersonPanel: FC<PersonPanel> = ({ person }) => {
  const [addAlbum, result] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum({ personId: person.id, title: faker.commerce.productName() });
  };

  return (
    <div id="person-panel">
      <title className="text-white flex items-center justify-between mb-4">
        <h1 className="text-lg text-gray-400">{person.name} Albümü</h1>
        <Button title="Albüm Ekle" handleClick={handleAddAlbum} isLoading={result.isLoading} />
      </title>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-600" />
    </div>
  );
};

export default PersonPanel;
