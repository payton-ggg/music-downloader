const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Замените на ваш ключ API
const YOUTUBE_API_KEY = "ВАШ_YOUTUBE_API_KEY";
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";

app.use(cors());

// Endpoint для поиска музыки
app.get("/search", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Введите название песни" });
  }

  try {
    const response = await axios.get(YOUTUBE_API_URL, {
      params: {
        key: YOUTUBE_API_KEY,
        q: query,
        part: "snippet",
        type: "video",
        maxResults: 5,
      },
    });

    const videos = response.data.items.map((item) => ({
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      videoId: item.id.videoId,
    }));

    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при запросе к YouTube API" });
  }
});

app.listen(PORT, () =>
  console.log(`Сервер запущен на http://localhost:${PORT}`)
);
