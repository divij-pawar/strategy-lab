from dash import html, dcc
from config import DEFAULT_TICKERS

def create_layout():
    """Create the application layout"""
    return html.Div([
        html.H2("📈 Real-Time Stock Dashboard", style={'textAlign': 'center'}),

        # Portfolio input
        html.Div([
            html.H4("📁 Portfolio Tracker"),
            html.Div([
                dcc.Input(id='portfolio-ticker', placeholder='Ticker', type='text'),
                dcc.Input(id='portfolio-qty', placeholder='Shares', type='number'),
                dcc.Input(id='portfolio-price', placeholder='Buy Price', type='number'),
                html.Button('Add to Portfolio', id='add-button', n_clicks=0),
            ], style={'display': 'flex', 'gap': '10px', 'marginBottom': '10px'}),
            html.Div(id='portfolio-table')
        ], style={'padding': '10px', 'border': '1px solid #ccc', 'marginBottom': '20px'}),

        # Strategy builder
        html.Div([
            html.H4("🧠 Custom Strategy Builder"),
            dcc.Dropdown(
                id='selected-indicators',
                options=[
                    {'label': 'SMA50', 'value': 'SMA50'},
                    {'label': 'SMA200', 'value': 'SMA200'},
                    {'label': 'EMA20', 'value': 'EMA20'},
                    {'label': 'RSI', 'value': 'RSI'},
                    {'label': 'MACD', 'value': 'MACD'},
                ],
                multi=True,
                placeholder="Select indicators to plot"
            )
        ], style={'padding': '10px', 'border': '1px solid #ccc', 'marginBottom': '20px'}),

        # Main dashboard
        html.Div([
            dcc.Dropdown(
                id='tickers',
                options=[{'label': i, 'value': i} for i in DEFAULT_TICKERS],
                value=[DEFAULT_TICKERS[0]],
                multi=True,
                placeholder='Select tickers'
            ),
            dcc.Graph(id='stock-graph'),
            
            # Add alert and backtest results divs 
            html.Div(id='alert-message'),
            html.Div(id='backtest-results'),
            
            # Parameters that were missing in original callbacks but referenced
            html.Div([
                dcc.Input(id='alert-threshold', type='number', placeholder='Alert threshold'),
                dcc.Dropdown(
                    id='interval',
                    options=[
                        {'label': '1 Minute', 'value': '1m'},
                        {'label': '5 Minutes', 'value': '5m'},
                        {'label': '15 Minutes', 'value': '15m'},
                        {'label': '1 Hour', 'value': '60m'},
                        {'label': '1 Day', 'value': '1d'},
                    ],
                    value='1d',
                    placeholder='Select interval'
                ),
                dcc.Dropdown(
                    id='period',
                    options=[
                        {'label': '1 Day', 'value': '1d'},
                        {'label': '5 Days', 'value': '5d'},
                        {'label': '1 Month', 'value': '1mo'},
                        {'label': '3 Months', 'value': '3mo'},
                        {'label': '6 Months', 'value': '6mo'},
                        {'label': '1 Year', 'value': '1y'},
                        {'label': '2 Years', 'value': '2y'},
                    ],
                    value='1mo',
                    placeholder='Select period'
                ),
            ], style={'display': 'flex', 'gap': '10px', 'marginBottom': '10px'}),
            
            dcc.Interval(id='interval-update', interval=300 * 1000, n_intervals=0)
        ])
    ])