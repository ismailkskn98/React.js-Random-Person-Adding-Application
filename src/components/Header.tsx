import { FC } from 'react';
import { useAddPersonMutation } from '../reducer/services/personsApi';
import { BounceLoader } from 'react-spinners';
import { faker } from '@faker-js/faker';
import { nanoid } from '@reduxjs/toolkit';

const Header: FC = () => {
  // const personAdd = useAddPersonMutation();
  // console.log(personAdd); // * [f(arg), isError, isLoading, isSuccess, isUninitialized, reset, status];
  const [addPerson, result] = useAddPersonMutation();
  console.log(result);

  const handlePersonAdd = (): void => {
    addPerson({
      id: nanoid(),
      name: faker.person.fullName(),
    }); // şimdilik ismail'i ekleyecek
  };

  return (
    <>
      <header className="flex justify-between items-center min-h-20 mb-5">
        <h1 className="text-4xl">Kişiler</h1>
        <button
          onClick={handlePersonAdd}
          className="cursor-pointer flex items-center gap-2 border-2 px-4 py-2 rounded text-md font-semibold border-green-700 text-green-700 hover:bg-green-200/30 transition-all"
        >
          {!result.isLoading ? (
            <>
              Ekle
              <span className="font-extrabold">+</span>
            </>
          ) : (
            <BounceLoader size={25} color="#15803D" />
          )}
        </button>
      </header>
    </>
  );
};

export default Header;
