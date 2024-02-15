import { FC, ReactNode } from 'react';
import { useFetchAlbumsQuery } from '../../reducer/services/albumsApi';
import { Album, Person } from '../../types/types';
import PanelAlbumItem from './PanelAlbumItem';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

type PanelAlbumsProps = {
  person: Person;
};

const PanelAlbums: FC<PanelAlbumsProps> = ({ person }) => {
  const { data, isError, isFetching } = useFetchAlbumsQuery(person);

  let content: ReactNode | Element[] | undefined;
  if (isFetching) {
    content = (
      <SkeletonTheme baseColor="#242e3c" highlightColor="#ffffff57">
        <p className="w-full">
          <Skeleton count={3} className="mb-5 px-3 py-4" />
        </p>
      </SkeletonTheme>
    );
  } else if (isError) {
    content = <h1>Hata Var !</h1>;
  } else {
    content = data?.map((item: Album) => <PanelAlbumItem album={item} key={item.id} />);
  }

  return <>{content}</>;
};

export default PanelAlbums;
