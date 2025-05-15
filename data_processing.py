import yfinance as yf
import pandas as pd
import ta

def fetch_stock_data(ticker, period='1mo', interval='1d'):
    """Fetch stock data from Yahoo Finance."""
    df = yf.download(ticker, period=period, interval=interval)
    df.dropna(inplace=True)
    return df

def calculate_indicators(df):
    """Calculate technical indicators for the given dataframe."""
    # Simple Moving Averages
    df['SMA50'] = ta.trend.sma_indicator(df['Close'], window=50)
    df['SMA200'] = ta.trend.sma_indicator(df['Close'], window=200)
    
    # Exponential Moving Average
    df['EMA20'] = ta.trend.ema_indicator(df['Close'], window=20)
    
    # RSI
    df['RSI'] = ta.momentum.RSIIndicator(df['Close']).rsi()
    
    # MACD
    macd = ta.trend.MACD(df['Close'])
    df['MACD'] = macd.macd()
    df['MACD_signal'] = macd.macd_signal()
    df['MACD_hist'] = macd.macd_diff()
    
    return df

def backtest_sma_strategy(df):
    """Simple SMA crossover strategy backtest."""
    df['Signal'] = 0
    df['Signal'][df['SMA50'] > df['SMA200']] = 1
    df['Position'] = df['Signal'].diff()
    
    # Calculate returns
    df['Returns'] = df['Close'].pct_change()
    df['Strategy_Returns'] = df['Returns'] * df['Signal'].shift(1)
    
    # Calculate cumulative returns
    df['Cum_Returns'] = (1 + df['Returns']).cumprod()
    df['Cum_Strategy_Returns'] = (1 + df['Strategy_Returns']).cumprod()
    
    return df

def generate_signals(df, threshold=None):
    """Generate trading signals and alerts based on indicators."""
    alerts = []
    signals = {}
    
    # Price threshold alert
    if threshold and df['Close'].iloc[-1] > threshold:
        alerts.append(f"Price above threshold: ${df['Close'].iloc[-1]:.2f} > ${threshold:.2f}")
    
    # RSI signals
    if df['RSI'].iloc[-1] > 70:
        alerts.append(f"RSI Overbought: {df['RSI'].iloc[-1]:.2f}")
    elif df['RSI'].iloc[-1] < 30:
        alerts.append(f"RSI Oversold: {df['RSI'].iloc[-1]:.2f}")
    
    # MACD crossover
    if df['MACD'].iloc[-2] < df['MACD_signal'].iloc[-2] and df['MACD'].iloc[-1] > df['MACD_signal'].iloc[-1]:
        alerts.append("MACD Bullish Crossover")
    elif df['MACD'].iloc[-2] > df['MACD_signal'].iloc[-2] and df['MACD'].iloc[-1] < df['MACD_signal'].iloc[-1]:
        alerts.append("MACD Bearish Crossover")
    
    # SMA crossover
    if df['SMA50'].iloc[-2] < df['SMA200'].iloc[-2] and df['SMA50'].iloc[-1] > df['SMA200'].iloc[-1]:
        alerts.append("Golden Cross (SMA50 crossed above SMA200)")
    elif df['SMA50'].iloc[-2] > df['SMA200'].iloc[-2] and df['SMA50'].iloc[-1] < df['SMA200'].iloc[-1]:
        alerts.append("Death Cross (SMA50 crossed below SMA200)")
    
    return alerts

def get_portfolio_performance(portfolio):
    """Calculate current performance of portfolio items."""
    result = []
    for ticker, details in portfolio.items():
        try:
            df = yf.download(ticker, period='1d', interval='1m')
            if not df.empty:
                current_price = df['Close'].iloc[-1]
                gain_pct = ((current_price - details['buy_price']) / details['buy_price']) * 100
                pnl = (current_price - details['buy_price']) * details['qty']
                result.append({
                    'ticker': ticker,
                    'buy_price': details['buy_price'],
                    'current_price': current_price,
                    'gain_pct': gain_pct,
                    'pnl': pnl,
                    'qty': details['qty']
                })
        except Exception as e:
            print(f"Error processing {ticker}: {e}")
    
    return result