import { FC, useState } from 'react';
import PanelHeader from '../common/PanelHeader';
import { Album } from '../../types/types';
import { useRemoveAlbumMutation } from '../../reducer/services/albumsApi';
import OpenablePhotoPanel from '../openablePhotoPanel';
import PanelPhotoTitle from '../openablePhotoPanel/PanelPhotoTitle';
import PanelPhotos from '../openablePhotoPanel/PanelPhotos';

type PanelAlbumItemProps = {
  album: Album;
};

const PanelAlbumItem: FC<PanelAlbumItemProps> = ({ album }) => {
  const [arrow, setArrow] = useState(false);
  const [removeAlbum, result] = useRemoveAlbumMutation();

  const handlePanelToggle = () => setArrow((prev) => !prev);
  const handleRemoveAlbum = () => removeAlbum(album);

  return (
    <article className={`w-full flex flex-col gap-8 ${arrow ? 'h-auto' : 'h-8'}`}>
      <PanelHeader
        arrow={arrow}
        handlePanelToggle={handlePanelToggle}
        title={album.title}
        isLoading={result.isLoading}
        handleRemove={handleRemoveAlbum}
      />
      {arrow && (
        <OpenablePhotoPanel>
          <PanelPhotoTitle title={album.title} albumId={album.id} />
          <PanelPhotos album={album} />
        </OpenablePhotoPanel>
      )}
    </article>
  );
};

export default PanelAlbumItem;
