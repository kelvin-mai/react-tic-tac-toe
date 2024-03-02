export type ApiResponse<T = any> =
  | (T & {
      success: true;
    })
  | (T & { success: false; error: string });
