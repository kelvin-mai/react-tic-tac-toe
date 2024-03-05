export type ApiResponse<T = any> =
  | (T & {
      success: true;
    })
  | (T & { success: false; error: string });

export type SocketUserData = {
  user: {
    id: string;
    username: string;
  };
  room: string;
};

export type SocketRoomData = SocketUserData[];

export type ServerPagination = {
  page: number;
  pageSize: number;
  total: number;
};
