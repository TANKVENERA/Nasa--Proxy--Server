const repository = require("../repository/photoRepository");

const getLatestPhoto = async () => {
  const fetchedPhotos = await repository.fetchPhotos();

  return fetchedPhotos.data.latest_photos[0].img_src;
};

module.exports = { getLatestPhoto };
