# Geo Fin Risk 
GeoFinRisk visualizes and analyzes financial and economic risk across any geographic location instantly.
<br>
<img width="1470" height="831" alt="Screenshot 2025-07-31 at 2 35 17 PM" src="https://github.com/user-attachments/assets/14256cf2-d0eb-4a13-8bdf-36b07c6f7452" />
📍 Drop a pin, and get a complete risk intelligence breakdown for that area.<br>


## Purpose 
To give ***investors***, ***businesses***, and ***institutions*** actionable location-based risk intelligence using map-based visualization and AI-assisted insights so they can invest, expand, or operate with data-backed confidence.<br><br>


## The problem it solves 
Most market, financial, or infrastructure decisions are made based on broad data or intuition, not location-specific analysis. Tools like property websites or generic dashboards lack:
- Pin-point financial metrics (like credit risk or fraud exposure)
- Visual overlays of infrastructure health
- Instant contextual analysis on drop

<br>
<br>
### GeoFinRisk fills that gap by offering:
- Real-time map interaction
- Heatmap visualization
- AI-generated investment summaries
- Multi-metric analysis per location
<img width="504" height="270" alt="Screenshot 2025-07-31 at 2 40 49 PM" src="https://github.com/user-attachments/assets/1bb3f18c-1d82-47cd-8c78-2921e98fc02f" />

<br>
<br>
## Core Interaction: Drop a Marker → ***Get Full Analysis***
When a user drops a pin on the map, the system performs localized analysis using synthetic data and displays:

### Example pin drop
<img width="596" height="681" alt="Screenshot 2025-07-31 at 2 44 52 PM" src="https://github.com/user-attachments/assets/b67699c4-3749-4a5a-8438-ef3f6e1021cd" />

### Example output 
<img width="315" height="353" alt="Screenshot 2025-07-31 at 2 46 11 PM" src="https://github.com/user-attachments/assets/d5af2d0e-653d-412f-92f0-d32d9db377b6" />
<img width="315" height="404" alt="Screenshot 2025-07-31 at 2 46 23 PM" src="https://github.com/user-attachments/assets/279e04cd-ff81-4b53-9f05-07a2d669422e" />

Based on the local parameters you can determine various localised aspects as seen in the screenshot. 


<br>
<br>
## Risk Layer Overlays (Heatmaps)
Each heatmap shows intensity per region based on synthetic financial data, helping you visually identify risk/opportunity zones.

### Available Layers:
- Credit Default Risk
- Property Market Trends
- Banking Infrastructure
- Fintech Activity Hub
- Fraud Risk Zones
- Economic Stability
<img width="178" height="272" alt="Screenshot 2025-07-31 at 2 49 57 PM" src="https://github.com/user-attachments/assets/0de9a921-5dfc-478a-afa7-516375237f14" />

<br>
<br>
## Use of Gmaps SDK 
GeoFinRisk is built using ***Google Maps JavaScript SDK***, enabling:
- Custom heatmap overlays `(google.maps.visualization.HeatmapLayer)`
- Real-time marker drops with event listeners `(google.maps.event.addListener)`
- Location-based queries and dynamic center positioning
- Smooth zoom/pan experience for geospatial analysis
- Interactive control layer for toggling heatmap visibility
  <br>
The SDK was essential in allowing seamless geospatial interaction, real-time marker analysis, and rendering complex heatmaps with performance and elegance.


