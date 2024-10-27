import { fetchPhotos } from "../repository/photoRepository.js";

const getLatestPhoto = async (): Promise<string> => {
  const fetchedPhotos = await fetchPhotos();

  return fetchedPhotos.data.latest_photos[0].img_src as string;
};

export { getLatestPhoto };
