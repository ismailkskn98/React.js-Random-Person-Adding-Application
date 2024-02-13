import { FC } from 'react';
import { Person } from '../types/types';

type PersonPanel = {
  person: Person;
};

const PersonPanel: FC<PersonPanel> = ({ person }) => {
  return (
    <div className="person-panel">
      <title>
        <h1>{person.name}</h1>
      </title>
    </div>
  );
};

export default PersonPanel;
