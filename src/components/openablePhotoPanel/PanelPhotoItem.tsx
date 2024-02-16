import { FC } from 'react';
import { Photo } from '../../types/types';
import { useRemovePhotoMutation } from '../../reducer/services/photoApi';
import { CircleLoader } from 'react-spinners';

type PanelPhotoItemProps = {
  photo: Photo;
};

const PanelPhotoItem: FC<PanelPhotoItemProps> = ({ photo }) => {
  const [removePhoto, { isLoading, isSuccess }] = useRemovePhotoMutation();

  return (
    <div className="max-w-52 rounded relative">
      <img src={photo.img} className="w-full rounded" />
      {isLoading || isSuccess ? (
        <span className="absolute bottom-2 right-2">
          <CircleLoader color="#ef4444" size={25} />
        </span>
      ) : (
        <span
          onClick={() => removePhoto(photo)}
          className={`px-2 py-1 absolute bottom-2 right-2 bg-red-500 hover:bg-red-900 text-white rounded cursor-pointer transition-opacity ${
            isLoading || isSuccess ? 'opacity-0' : 'opacity-100'
          }`}
        >
          Sil
        </span>
      )}
    </div>
  );
};

export default PanelPhotoItem;
