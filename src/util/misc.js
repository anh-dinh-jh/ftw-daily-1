import { LISTING_TYPE_DEFAULT, LISTING_TYPES_USE_DATETIME_FORM } from "./types";

// Get type to identify whether main photos or sub photos
export const getImgType = (imgId) => {
    return imgId.split("_")[imgId.split("_").length - 1];
}

// Check if the current listing is a type of hourly booking
export const checkHourlyBooking = (publicData) => {
    const listingType = publicData && publicData.listingType;
    return LISTING_TYPES_USE_DATETIME_FORM.includes(listingType);
}