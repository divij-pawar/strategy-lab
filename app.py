import dash
from dash import html, dcc
from dash.dependencies import Input, Output, State

from layouts import create_layout
from callbacks import register_callbacks
from config import app

# Set up the app layout
app.layout = create_layout()

# Register all callbacks
register_callbacks(app)

# Run the app
if __name__ == '__main__':
    app.run(debug=True)