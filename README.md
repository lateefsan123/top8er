# Top8er - Tournament Bracket Generator

A React TypeScript application for generating beautiful top 8 tournament brackets from Start.gg data.

## Features

- 🏆 Generate top 8 brackets from Start.gg tournament URLs
- 🎨 Customizable corner colors
- 📸 Download brackets as high-quality PNG images
- 🎮 Support for multiple fighting game characters
- 📱 Responsive design for all screen sizes

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **html2canvas** for image generation
- **Start.gg API** for tournament data

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd top8er
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   VITE_STARTGG_TOKEN=your_startgg_api_token_here
   ```

4. **Get a Start.gg API token**
   - Go to [Start.gg Developer Portal](https://developer.start.gg/)
   - Create an account or log in
   - Create a new application
   - Copy the API token

5. **Run the development server**
   ```bash
   npm run dev
   ```

## Usage

1. Paste a Start.gg tournament URL into the input field
2. Click "Load Top 8" to fetch tournament data
3. Customize colors using the "Customize Colors" button
4. Click "Download Top 8" to save the bracket as an image

## Project Structure

```
src/
├── components/          # React components
│   ├── PlayerCard.tsx   # Individual player card
│   ├── Top8Display.tsx  # Main bracket display
│   └── ColorPicker.tsx  # Color customization
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   ├── fetchtop8.ts    # API integration
│   └── CharacterImages.ts
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
