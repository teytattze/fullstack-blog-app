import { ajax } from 'src/lib/ajax';

const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/users`;

export const getUserDetails = async () => {
  try {
    return await ajax.get(`${baseUrl}/9b5ba64f-15b9-4e10-bd26-54d7c25a5495`, {
      withCredentials: true,
    });
  } catch (err) {
    return err.response;
  }
};
