#  [Strategy Lab - analyse markets](https://strategy-lab.netlify.app/)
![Frontend for the website](./store/frontend.png)

### A configurable lab to implement custom technical indicators and strategies.
Note: The backend is still under development. The live site currently showcases only the frontend interface.

## Features

- Real-time stock price tracking with automatic updates
- Technical analysis with customizable indicators (SMA, EMA, RSI, MACD)
- Portfolio tracking with performance metrics
- Custom strategy builder and backtesting
- Alert system based on price thresholds and indicator signals

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/divij-pawar/strategy-lab.git
cd strategy-lab
```

### 2. Set up the backend (Python)

Navigate to the `backend/` directory:

```bash
cd backend
```

Install backend dependencies:

```bash
npm install
```

Start the backend server:

```bash
npm start
```
Server runs on http://localhost:5000.

### 3. Set up the frontend (Vite)

Navigate to the `frontend/` directory:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```
This will launch the frontend on http://localhost:5173 by default.

## Usage

1. Select stocks from the dropdown menu
2. Choose technical indicators to display
3. Add stocks to your portfolio with buy price and quantity
4. Set alert thresholds
5. View backtest results for the SMA crossover strategy

## Requirements

- Python 3.8+
- Dash
- Plotly
- Pandas
- yfinance
- TA-Lib

## License

MIT