import { FC } from 'react';
import { useAddPersonMutation } from '../../reducer/services/personsApi';

import { faker } from '@faker-js/faker';
import { nanoid } from '@reduxjs/toolkit';
import Button from '../common/Button';

const Header: FC = () => {
  // const personAdd = useAddPersonMutation();
  // console.log(personAdd); // * [f(arg), isError, isLoading, isSuccess, isUninitialized, reset, status];
  const [addPerson, result] = useAddPersonMutation();

  const handlePersonAdd = (): void => {
    addPerson({
      id: nanoid(),
      name: faker.person.firstName(),
    }); // şimdilik ismail'i ekleyecek
  };

  return (
    <>
      <header className="flex justify-between items-center min-h-20 mb-5">
        <h1 className="text-4xl">Kişiler</h1>
        <Button handleClick={handlePersonAdd} isLoading={result.isLoading} title="Ekle" />
      </header>
    </>
  );
};

export default Header;
