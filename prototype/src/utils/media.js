const imageModules = import.meta.glob(
  "../assets/**/*.{png,jpg,jpeg,webp,svg,avif,gif}",
  { eager: true, import: "default" }
);

const reportModules = import.meta.glob("../assets/**/*.pdf", {
  eager: true,
  query: "?url",
  import: "default",
});

const toKey = (path) => `../${path.replace(/^src\//, "")}`;

export const resolveImg = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return imageModules[toKey(path)] || path;
};

export const resolveReport = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return reportModules[toKey(path)] || path;
};

export const getVideoSource = (url) => {
  if (!url) return null;

  const driveMatch =
    url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (url.includes("drive.google.com") && driveMatch) {
    return { type: "iframe", src: `https://drive.google.com/file/d/${driveMatch[1]}/preview` };
  }

  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
  );
  if (ytMatch) {
    return { type: "iframe", src: `https://www.youtube.com/embed/${ytMatch[1]}` };
  }

  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) {
    return { type: "video", src: url };
  }

  return { type: "iframe", src: url };
};
