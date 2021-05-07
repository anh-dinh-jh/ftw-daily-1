// Get type to identify whether main photos or sub photos
export const getImgType = (imgId) => {
    return imgId.split("_")[imgId.split("_").length - 1];
}