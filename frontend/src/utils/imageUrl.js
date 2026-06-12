import { DEFAULT_IMAGE } from "./constants";

const YOUTUBE_LOW_QUALITY_FILES = new Set(["default.jpg", "mqdefault.jpg", "hqdefault.jpg", "sddefault.jpg"]);

export const getDisplayImageUrl = (url) => {
  if (!url) return DEFAULT_IMAGE;

  try {
    const imageUrl = new URL(url);
    const isYoutubeImage = imageUrl.hostname === "i.ytimg.com" || imageUrl.hostname.endsWith(".ytimg.com");
    const parts = imageUrl.pathname.split("/");
    const fileName = parts.at(-1);

    if (isYoutubeImage && YOUTUBE_LOW_QUALITY_FILES.has(fileName)) {
      parts[parts.length - 1] = "hq720.jpg";
      imageUrl.pathname = parts.join("/");
      imageUrl.search = "";
      return imageUrl.toString();
    }
  } catch {
    return url;
  }

  return url;
};

export const fallbackToOriginalImage = (event, originalUrl) => {
  const fallbackUrl = originalUrl || DEFAULT_IMAGE;

  if (event.currentTarget.src !== fallbackUrl) {
    event.currentTarget.src = fallbackUrl;
  }
};
