import { FC, ReactNode } from 'react';
import { useGetPersonsQuery } from '../reducer/services/personsApi';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import PersonListItem from './PersonListItem';
import { Person } from '../types/types';

const PersonList: FC = () => {
  const { data, isFetching, isError } = useGetPersonsQuery();
  // console.log(data);

  let content: ReactNode | Element[] | undefined;
  console.log(data);

  if (isFetching) {
    content = (
      <SkeletonTheme baseColor="#d1d1d1" highlightColor="#aba8a8">
        <p className="w-full">
          <Skeleton count={10} className="mb-5 px-3 py-4" />
        </p>
      </SkeletonTheme>
    );
  } else if (isError) {
    content = (
      <>
        <h1>Hata Var !</h1>
      </>
    );
  } else {
    content = data?.map((item: Person) => <PersonListItem item={item} key={item.id} />);
  }

  return (
    <>
      <div className="persons-wrapper flex flex-col items-center gap-5">{content}</div>
    </>
  );
};

export default PersonList;
