from dash import html
from dash.dependencies import Input, Output, State
import dash

from data_processing import fetch_stock_data, calculate_indicators, backtest_sma_strategy, generate_signals, get_portfolio_performance
from visualization import create_stock_figure

# Portfolio memory store (in a production app, use Redis/DB)
portfolio = {}

def register_callbacks(app):
    """Register all callbacks for the application."""
    
    @app.callback(
        Output('stock-graph', 'figure'),
        Output('alert-message', 'children'),
        Output('backtest-results', 'children'),
        Input('tickers', 'value'),
        Input('interval', 'value'),
        Input('period', 'value'),
        Input('interval-update', 'n_intervals'),
        Input('selected-indicators', 'value'),
        State('alert-threshold', 'value')
    )
    def update_graph(ticker_list, interval, period, n, selected_indicators, threshold):
        """Update the stock graph and related information."""
        if not ticker_list:
            return dash.no_update, dash.no_update, dash.no_update
        
        dataframes = {}
        all_alerts = []
        backtest_summary = []
        
        for ticker in ticker_list:
            # Fetch and process data
            df = fetch_stock_data(ticker, period=period, interval=interval)
            df = calculate_indicators(df)
            df = backtest_sma_strategy(df)
            
            # Store processed dataframe
            dataframes[ticker] = df
            
            # Generate alerts
            if threshold:
                alerts = generate_signals(df, float(threshold))
                if alerts:
                    all_alerts.extend([f"{ticker}: {alert}" for alert in alerts])
            
            # Calculate backtest results
            if not df.empty and 'Cum_Strategy_Returns' in df.columns and len(df) > 1:
                final_return = df['Cum_Strategy_Returns'].iloc[-1]
                buy_hold_return = df['Cum_Returns'].iloc[-1]
                backtest_summary.append(
                    f"{ticker}: Strategy Return = {final_return:.2f}x | Buy & Hold = {buy_hold_return:.2f}x"
                )
        
        # Create visualization
        fig = create_stock_figure(dataframes, selected_indicators)
        
        # Format outputs
        alert_output = html.Div([
            html.H4("⚠️ Alerts"),
            html.Ul([html.Li(alert) for alert in all_alerts]) if all_alerts else html.P("No alerts at this time.")
        ], style={'padding': '10px', 'border': '1px solid #ccc', 'marginTop': '20px'})
        
        backtest_output = html.Div([
            html.H4("📊 Backtest Results (SMA Crossover Strategy)"),
            html.Ul([html.Li(result) for result in backtest_summary]) if backtest_summary else html.P("No backtest results available.")
        ], style={'padding': '10px', 'border': '1px solid #ccc', 'marginTop': '20px'})
        
        return fig, alert_output, backtest_output

    @app.callback(
        Output('portfolio-table', 'children'),
        Input('add-button', 'n_clicks'),
        Input('interval-update', 'n_intervals'),
        State('portfolio-ticker', 'value'),
        State('portfolio-qty', 'value'),
        State('portfolio-price', 'value')
    )
    def update_portfolio(n_clicks, n_intervals, ticker, qty, price):
        """Update the portfolio tracking table."""
        # Check if we're adding a new portfolio item
        ctx = dash.callback_context
        trigger_id = ctx.triggered[0]['prop_id'].split('.')[0]
        
        if trigger_id == 'add-button' and ticker and qty and price:
            ticker = ticker.upper()
            portfolio[ticker] = {'qty': float(qty), 'buy_price': float(price)}
        
        # No portfolio items, nothing to show
        if not portfolio:
            return html.P("No positions in portfolio.")
        
        # Get current performance
        performance = get_portfolio_performance(portfolio)
        
        if not performance:
            return html.P("Unable to fetch current prices.")
        
        # Calculate total portfolio value and P&L
        total_value = sum(p['current_price'] * p['qty'] for p in performance)
        total_cost = sum(p['buy_price'] * p['qty'] for p in performance)
        total_pnl = total_value - total_cost
        total_pnl_pct = (total_pnl / total_cost) * 100 if total_cost > 0 else 0
        
        # Create table
        return html.Div([
            html.Table([
                html.Thead(
                    html.Tr([
                        html.Th("Ticker"),
                        html.Th("Quantity"),
                        html.Th("Buy Price"),
                        html.Th("Current"),
                        html.Th("% Change"),
                        html.Th("P&L")
                    ])
                ),
                html.Tbody([
                    html.Tr([
                        html.Td(p['ticker']),
                        html.Td(f"{p['qty']}"),
                        html.Td(f"${p['buy_price']:.2f}"),
                        html.Td(f"${p['current_price']:.2f}"),
                        html.Td(f"{p['gain_pct']:.2f}%", style={'color': 'green' if p['gain_pct'] >= 0 else 'red'}),
                        html.Td(f"${p['pnl']:.2f}", style={'color': 'green' if p['pnl'] >= 0 else 'red'})
                    ]) for p in performance
                ]),
                html.Tfoot(
                    html.Tr([
                        html.Th("Total", colSpan=3),
                        html.Th(f"${total_value:.2f}"),
                        html.Th(f"{total_pnl_pct:.2f}%", style={'color': 'green' if total_pnl_pct >= 0 else 'red'}),
                        html.Th(f"${total_pnl:.2f}", style={'color': 'green' if total_pnl >= 0 else 'red'})
                    ])
                )
            ], style={'width': '100%', 'borderCollapse': 'collapse'}),
            html.P(f"Last updated: {dash.no_update}")
        ])