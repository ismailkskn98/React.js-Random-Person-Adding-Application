import { FC } from 'react';
import { Photo } from '../../types/types';

type PanelPhotoItemProps = {
  photo: Photo;
};

const PanelPhotoItem: FC<PanelPhotoItemProps> = ({ photo }) => {
  return <img src={photo.img} className="max-w-52 rounded" />;
};

export default PanelPhotoItem;
