import { FC } from 'react';
import { Person } from '../../types/types';
import Button from '../common/Button';

type PersonPanel = {
  person: Person;
};

const PersonPanel: FC<PersonPanel> = ({ person }) => {
  return (
    <div id="person-panel">
      <title className="text-white flex items-center justify-between mb-4">
        <h1 className="text-2xl">{person.name} Albümü</h1>
        <Button title="Albüm Ekle" />
      </title>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-600" />
    </div>
  );
};

export default PersonPanel;
