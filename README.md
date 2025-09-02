# 🎬 JumpTube - YouTube Video Search & AI Summarizer

A modern web application that allows users to search YouTube videos and generate AI-powered summaries using Google Gemini AI.

## ✨ Features

- **YouTube Video Search**: Search for videos using keywords
- **AI Video Summarization**: Generate concise summaries using Google Gemini AI
- **Modern Web Interface**: Beautiful, responsive frontend
- **RESTful API**: FastAPI backend with proper error handling
- **Real-time Processing**: Live transcription and summarization

## 🏗️ Architecture

- **Backend**: FastAPI (Python) with async support
- **Frontend**: HTML/CSS/JavaScript with modern UI
- **AI Services**: Google Gemini AI for summarization
- **YouTube API**: Google YouTube Data API v3 for video search
- **Transcription**: Whisper-based audio transcription

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Google Gemini API Key
- YouTube Data API Key

### 1. Install Dependencies

```bash
cd Backend
pip install -r requirements.txt
```

### 2. Configure API Keys

Edit `Backend/config.py` and add your API keys:

```python
YOUTUBE_API_KEY = "your_youtube_api_key_here"
GEMINI_API_KEY = "your_gemini_api_key_here"
```

### 3. Run the Backend

```bash
cd Backend
python main.py
```

The FastAPI server will start on `http://localhost:8000`

### 4. Open the Frontend

Open `Frontend/index.html` in your web browser, or serve it using a local server:

```bash
cd Frontend
python -m http.server 3000
```

Then visit `http://localhost:3000`

## 📚 API Endpoints

### Health Check
- `GET /` - Root endpoint
- `GET /health` - API health status

### Video Search
- `GET /api/search?query={search_term}&max_results={number}` - Search YouTube videos

### Video Summarization
- `POST /api/summarize` - Generate video summary
  - Body: `{"video_url": "youtube_url", "custom_prompt": "optional_prompt"}`

### Video Details
- `GET /api/video/{video_id}` - Get video information

## 🔧 Configuration Options

### Environment Variables
You can also set API keys as environment variables:

```bash
export YOUTUBE_API_KEY="your_key"
export GEMINI_API_KEY="your_key"
```

### Customization
- Modify `model_size` in the summarizer for different transcription quality
- Change `gemini_model` for different AI models
- Adjust `max_results` for search results

## 🎨 Frontend Features

- **Responsive Design**: Works on desktop and mobile
- **Real-time API Status**: Shows connection status
- **Interactive Search**: Instant video search results
- **Summary Generation**: AI-powered video summaries
- **Modern UI**: Beautiful gradients and animations
- **Error Handling**: User-friendly error messages

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Ensure the backend is running on port 8000
   - Check if the port is not blocked by firewall

2. **YouTube Search Fails**
   - Verify your YouTube API key is valid
   - Check API quota limits

3. **Summarization Fails**
   - Ensure the video has captions/subtitles
   - Verify your Gemini API key is valid
   - Check internet connection

### Debug Mode

Run the backend with debug logging:

```bash
python main.py --log-level debug
```

## 📁 Project Structure

```
JumpTube/
├── Backend/
│   ├── main.py              # FastAPI application
│   ├── youtube.py           # YouTube API client
│   ├── summarizer.py        # AI summarization
│   ├── transcription.py     # Audio transcription
│   ├── config.py            # Configuration
│   └── requirements.txt     # Python dependencies
├── Frontend/
│   └── index.html           # Web interface
└── README.md                # This file
```

## 🔒 Security Notes

- **API Keys**: Never commit API keys to version control
- **CORS**: In production, restrict CORS origins to your domain
- **Rate Limiting**: Consider implementing rate limiting for production use

## 🚀 Production Deployment

### Using Gunicorn
```bash
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Using Docker
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Google Gemini AI for summarization
- YouTube Data API for video search
- FastAPI for the web framework
- Whisper for audio transcription

---

**Happy coding! 🎉**
