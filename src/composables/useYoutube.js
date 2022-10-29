export default () => {
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || "";

  const getIdFromUrl = (url) => {
    if (!url || !url.startsWith("https://")) {
      return;
    }

    const params = new URL(url).searchParams;
    return params.get("v");
  };

  const getVideoDetails = async (url) => {
    const videoId = getIdFromUrl(url);
    if (!videoId) {
      return null;
    }

    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet`,
      {
        headers: { "Content-type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((response) => response)
      .catch((error) => {
        console.log("Looks like there was a problem: \n", error);
      });

    return res.items && res.items.length ? res.items[0] : null;
  };

  return {
    getVideoDetails,
  };
};
