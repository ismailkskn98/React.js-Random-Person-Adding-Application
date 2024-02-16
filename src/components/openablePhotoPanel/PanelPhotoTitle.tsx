import { FC } from 'react';
import Button from '../common/Button';
import { useAddPhotoMutation } from '../../reducer/services/photoApi';
import { faker } from '@faker-js/faker';

type PanelPhotoTitleProps = {
  title: string;
  albumId: string | number;
};

const PanelPhotoTitle: FC<PanelPhotoTitleProps> = ({ title, albumId }) => {
  const [addPhoto, result] = useAddPhotoMutation();

  const handleAddPhoto = () => {
    addPhoto({
      albumId: albumId,
      img: faker.image.urlPicsumPhotos({ width: 208, height: 208 }),
    });
  };

  return (
    <div id="person-panel">
      <title className="text-white flex items-center justify-between mb-4">
        <h1 className="text-lg text-gray-400">{title} Fotoğrafları</h1>
        <Button title="Fotoğraf Ekle" handleClick={handleAddPhoto} isLoading={result.isLoading} />
      </title>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-600" />
    </div>
  );
};

export default PanelPhotoTitle;
