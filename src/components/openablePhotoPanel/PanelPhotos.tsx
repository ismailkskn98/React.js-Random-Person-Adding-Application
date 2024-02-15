import { FC, ReactNode } from 'react';
import { useFetchPhotosQuery } from '../../reducer/services/photoApi';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Album, Photo } from '../../types/types';
import PanelPhotoItem from './PanelPhotoItem';

type PanelPhotosProps = {
  album: Album;
};

const PanelPhotos: FC<PanelPhotosProps> = ({ album }) => {
  const { data, isError, isFetching } = useFetchPhotosQuery(album);

  let content: ReactNode | Element[] | undefined;
  if (isFetching) {
    content = (
      <SkeletonTheme baseColor="#242e3c" highlightColor="#ffffff57">
        <p className="w-full flex items-center justify-between">
          <Skeleton count={4} className="mb-5 px-3 py-4" />
        </p>
      </SkeletonTheme>
    );
  } else if (isError) {
    content = <h1>Hata Var !</h1>;
  } else {
    content = data?.map((item: Photo) => <PanelPhotoItem photo={item} key={item.id} />);
  }

  return <article className="flex gap-8 items-center flex-wrap">{content}</article>;
};

export default PanelPhotos;
