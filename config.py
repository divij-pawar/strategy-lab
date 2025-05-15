from dash import Dash

# Initialize Dash app
app = Dash(__name__)
server = app.server

# Add any app configuration here
app.title = "Real-Time Stock Dashboard"

# Default settings
DEFAULT_TICKERS = ['AAPL', 'TSLA', 'MSFT']