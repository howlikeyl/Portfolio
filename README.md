# Senghakheng — Portfolio

My personal portfolio website. It showcases my software engineering and embedded systems projects with real screenshots and demo videos, along with my experience, skills, resume, and contact information.

## Technologies

- HTML
- CSS
- JavaScript

No frameworks, build tools, or external libraries are used.

## Projects Featured

- **Picar Robot**: Raspberry Pi robot with voice interaction, web control, live camera streaming, and obstacle avoidance
- **File Finder**: desktop app that finds files by searching inside their contents
- **PingPong Game**: two-player Pong on the Arduino UNO R4 WiFi LED matrix
- **Sokoban Game**: graphical puzzle game in C++ with SFML

More projects:

- **Friend Notes**: Python desktop and terminal app for exchanging private notes between friends

## Running Locally

You can open `index.html` directly in a browser, but a simple local server is recommended so that videos and the PDF load the same way they will online:

```bash
python3 -m http.server 8000
```

Then open:

```
http://localhost:8000
```

## Project Structure

```
portfolio/
├── index.html          # All page content and project detail dialogs
├── css/style.css       # Styles (colors are CSS variables at the top)
├── js/script.js        # Navigation, theme toggle, project dialogs, image viewer
├── assets/
│   ├── images/         # Project screenshots
│   ├── videos/         # Project demo videos
│   └── posters/        # Preview frames shown before a video plays
└── resume/resume.pdf   # Resume
```

## Deployment

The site is fully static and can be hosted on GitHub Pages:

1. Push this folder to a GitHub repository (for example `howlikeyl.github.io` or `portfolio`).
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. After a minute the site will be live at `https://howlikeyl.github.io/` (or `https://howlikeyl.github.io/Portfolio/`).
