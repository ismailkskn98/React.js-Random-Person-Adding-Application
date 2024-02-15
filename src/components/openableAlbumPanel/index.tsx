import { FC, ReactNode } from 'react';

type OpenableAlbumPanelProps = {
  children: ReactNode;
};

const OpenableAlbumPanel: FC<OpenableAlbumPanelProps> = ({ children }) => {
  return <>{children}</>;
};

export default OpenableAlbumPanel;
