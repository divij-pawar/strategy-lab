import plotly.graph_objs as go
from plotly.subplots import make_subplots

def create_stock_figure(dataframes, selected_indicators=None):
    """
    Create a plotly figure with stock data and indicators
    
    Args:
        dataframes: Dictionary of dataframes with ticker as key
        selected_indicators: List of indicators to display
    
    Returns:
        Plotly figure object
    """
    if not selected_indicators:
        selected_indicators = []
    
    # Create subplot figure
    fig = make_subplots(
        rows=4, cols=1,
        shared_xaxes=True,
        vertical_spacing=0.03,
        row_heights=[0.5, 0.2, 0.15, 0.15],
        specs=[[{"type": "candlestick"}],
               [{"type": "xy"}],
               [{"type": "xy"}],
               [{"type": "xy"}]]
    )
    
    colors = {
        'AAPL': 'blue',
        'TSLA': 'red',
        'MSFT': 'green',
        'AMZN': 'purple',
        'GOOGL': 'orange',
        'META': 'brown',
        'NFLX': 'pink',
    }
    
    # Add traces for each ticker
    for ticker, df in dataframes.items():
        # Use default color if ticker not in colors dict
        color = colors.get(ticker, 'gray')
        
        # Main price chart
        fig.add_trace(go.Candlestick(
            x=df.index, 
            open=df['Open'], 
            high=df['High'],
            low=df['Low'], 
            close=df['Close'], 
            name=f'{ticker} Price'
        ), row=1, col=1)
        
        # Add selected indicators to main chart
        if 'SMA50' in selected_indicators and 'SMA50' in df.columns:
            fig.add_trace(go.Scatter(
                x=df.index, 
                y=df['SMA50'], 
                name=f'{ticker} SMA50',
                line=dict(color=color, width=1, dash='dot')
            ), row=1, col=1)
            
        if 'SMA200' in selected_indicators and 'SMA200' in df.columns:
            fig.add_trace(go.Scatter(
                x=df.index, 
                y=df['SMA200'], 
                name=f'{ticker} SMA200',
                line=dict(color=color, width=1, dash='dash')
            ), row=1, col=1)
            
        if 'EMA20' in selected_indicators and 'EMA20' in df.columns:
            fig.add_trace(go.Scatter(
                x=df.index, 
                y=df['EMA20'], 
                name=f'{ticker} EMA20',
                line=dict(color=color, width=1.5)
            ), row=1, col=1)
            
        # Volume chart
        fig.add_trace(go.Bar(
            x=df.index, 
            y=df['Volume'], 
            name=f'{ticker} Volume',
            marker_color=color,
            opacity=0.5
        ), row=2, col=1)
        
        # RSI chart
        if 'RSI' in selected_indicators and 'RSI' in df.columns:
            fig.add_trace(go.Scatter(
                x=df.index, 
                y=df['RSI'], 
                name=f'{ticker} RSI',
                line=dict(color=color)
            ), row=3, col=1)
            
            # Add RSI threshold lines if first ticker
            if ticker == list(dataframes.keys())[0]:
                fig.add_shape(
                    type="line", x0=df.index[0], y0=70, x1=df.index[-1], y1=70,
                    line=dict(dash="dash", color="red", width=1), row=3, col=1
                )
                fig.add_shape(
                    type="line", x0=df.index[0], y0=30, x1=df.index[-1], y1=30,
                    line=dict(dash="dash", color="green", width=1), row=3, col=1
                )
                
                # Add labels for RSI thresholds
                fig.add_annotation(
                    x=df.index[-1], y=70, text="Overbought", showarrow=False,
                    xanchor="right", row=3, col=1, font=dict(color="red", size=10)
                )
                fig.add_annotation(
                    x=df.index[-1], y=30, text="Oversold", showarrow=False,
                    xanchor="right", row=3, col=1, font=dict(color="green", size=10)
                )
        
        # MACD chart
        if 'MACD' in selected_indicators and 'MACD' in df.columns and 'MACD_signal' in df.columns:
            fig.add_trace(go.Scatter(
                x=df.index, 
                y=df['MACD'], 
                name=f'{ticker} MACD',
                line=dict(color=color)
            ), row=4, col=1)
            
            fig.add_trace(go.Scatter(
                x=df.index, 
                y=df['MACD_signal'], 
                name=f'{ticker} Signal',
                line=dict(color='red' if color != 'red' else 'black', dash='dot')
            ), row=4, col=1)
            
            if 'MACD_hist' in df.columns:
                colors_hist = [color if val >= 0 else 'red' for val in df['MACD_hist']]
                fig.add_trace(go.Bar(
                    x=df.index,
                    y=df['MACD_hist'],
                    name=f'{ticker} Histogram',
                    marker_color=colors_hist,
                    opacity=0.5
                ), row=4, col=1)
    
    # Update layout
    fig.update_layout(
        height=1000,
        title_text="Stock Price Analysis",
        xaxis_rangeslider_visible=False,
        template='plotly_white',
        legend_tracegroupgap=250
    )
    
    # Update y-axis for RSI
    if 'RSI' in selected_indicators:
        fig.update_yaxes(range=[0, 100], title_text="RSI", row=3, col=1)
    
    # Update y-axis titles
    fig.update_yaxes(title_text="Price", row=1, col=1)
    fig.update_yaxes(title_text="Volume", row=2, col=1)
    if 'MACD' in selected_indicators:
        fig.update_yaxes(title_text="MACD", row=4, col=1)
    
    return fig