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
        <div className="w-full">
          <Skeleton containerClassName="flex gap-8 items-center justify-center" count={5} className="w-52 h-52" />
        </div>
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
