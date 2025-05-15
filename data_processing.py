import yfinance as yf
import pandas as pd
import ta

def fetch_stock_data(ticker, interval='1d', period=None):
    """
    Fetch stock data from Yahoo Finance with automatic period adjustment based on interval.

    Args:
        ticker (str): Stock ticker symbol.
        interval (str): Interval of data points (e.g., '1m', '5m', '15m', '1d').
        period (str, optional): Period to fetch. If None, defaults will be used based on interval.

    Returns:
        DataFrame: Cleaned stock data.
    """
    valid_intervals = {
        '1m':  '7d',
        '2m':  '60d',
        '5m':  '60d',
        '15m': '60d',
        '30m': '60d',
        '60m': '60d',
        '90m': '60d',
        '1d':  '1y',
        '1wk': '5y',
        '1mo': '10y'
    }

    if interval not in valid_intervals:
        raise ValueError(f"Invalid interval '{interval}'. Must be one of: {list(valid_intervals.keys())}")

    if period is None:
        period = valid_intervals[interval]

    df = yf.download(ticker, period=period, interval=interval, progress=False)
    df.dropna(inplace=True)
    return df

def calculate_indicators(df):
    """Calculate technical indicators for the given dataframe."""
    # Make sure Close is a Series, not a DataFrame or ndarray
    close_series = df['Close']
    if hasattr(close_series, 'values') and len(close_series.values.shape) > 1:
        close_series = pd.Series(close_series.values.flatten(), index=df.index)
    
    # Simple Moving Averages
    df['SMA50'] = ta.trend.sma_indicator(close_series, window=50)
    df['SMA200'] = ta.trend.sma_indicator(close_series, window=200)
    
    # Exponential Moving Average
    df['EMA20'] = ta.trend.ema_indicator(close_series, window=20)
    
    # RSI
    df['RSI'] = ta.momentum.RSIIndicator(close_series).rsi()
    
    # MACD
    macd = ta.trend.MACD(close_series)
    df['MACD'] = macd.macd()
    df['MACD_signal'] = macd.macd_signal()
    df['MACD_hist'] = macd.macd_diff()
    
    return df

def backtest_sma_strategy(df):
    """Simple SMA crossover strategy backtest."""
    # Create a copy of the dataframe to avoid SettingWithCopyWarning
    result_df = df.copy()
    
    # Initialize Signal column
    result_df['Signal'] = 0
    # Set signal based on SMA crossover
    result_df.loc[result_df['SMA50'] > result_df['SMA200'], 'Signal'] = 1
    result_df['Position'] = result_df['Signal'].diff()
    
    # Calculate returns
    result_df['Returns'] = result_df['Close'].pct_change()
    result_df['Strategy_Returns'] = result_df['Returns'] * result_df['Signal'].shift(1)
    
    # Calculate cumulative returns
    result_df['Cum_Returns'] = (1 + result_df['Returns']).cumprod()
    result_df['Cum_Strategy_Returns'] = (1 + result_df['Strategy_Returns']).cumprod()
    
    return result_df

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