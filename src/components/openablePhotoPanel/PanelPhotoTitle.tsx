import { FC } from 'react';
// import Button from '../common/Button';

type PanelPhotoTitleProps = {
  title: string;
};

const PanelPhotoTitle: FC<PanelPhotoTitleProps> = ({ title }) => {
  return (
    <div id="person-panel">
      <title className="text-white flex items-center justify-between mb-4">
        <h1 className="text-xl">{title} Fotorafları</h1>
        {/* <Button title="Albüm Ekle" handleClick={handleAddAlbum} isLoading={result.isLoading} /> */}
      </title>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-600" />
    </div>
  );
};

export default PanelPhotoTitle;
