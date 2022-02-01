export type Routes = {
  AlbumsPage: undefined;
  PermissionsPage: undefined;
  CameraPage: {
    groupName: string;
  };
  MediaPage: {
    path: string;
    type: 'video' | 'photo';
    album: string;
  };
};
