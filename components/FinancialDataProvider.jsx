// components/FinancialDataProvider.js
// Static financial risk data for Delhi NCR region

// Helper function to generate clustered data points around key financial areas
const generateClusteredPoints = (centers, pointsPerCenter = 15, radiusKm = 2) => {
    const points = [];
    
    centers.forEach(center => {
      for (let i = 0; i < pointsPerCenter; i++) {
        // Generate random points within radius using polar coordinates
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.sqrt(Math.random()) * radiusKm * 0.01; // Convert km to degrees (approximate)
        
        const lat = center.lat + distance * Math.cos(angle);
        const lng = center.lng + distance * Math.sin(angle);
        
        // Vary intensity based on distance from center (closer = higher intensity)
        const distanceFromCenter = Math.sqrt(
          Math.pow(lat - center.lat, 2) + Math.pow(lng - center.lng, 2)
        );
        const intensity = Math.max(0.2, center.baseIntensity - (distanceFromCenter * 10));
        
        points.push({
          lat: lat,
          lng: lng,
          intensity: Math.min(1, intensity)
        });
      }
    });
    
    return points;
  };
  
  export const getFinancialHeatmapData = () => {
    // Credit Default Risk Centers (High-risk lending areas)
    const creditDefaultCenters = [
      { lat: 28.6500, lng: 77.2300, baseIntensity: 0.9 }, // Central Delhi - High commercial activity
      { lat: 28.5800, lng: 77.1900, baseIntensity: 0.8 }, // South Delhi - Mixed residential/commercial
      { lat: 28.7200, lng: 77.1000, baseIntensity: 0.7 }, // West Delhi - Industrial area
      { lat: 28.5500, lng: 77.2500, baseIntensity: 0.75 }, // Greater Kailash area
      { lat: 28.6800, lng: 77.4500, baseIntensity: 0.6 }, // Noida - Emerging market
      { lat: 28.4800, lng: 77.0800, baseIntensity: 0.85 }, // Gurgaon - Corporate hub
      { lat: 28.6100, lng: 77.3500, baseIntensity: 0.65 }, // East Delhi
    ];
  
    // Property Trends Centers (High growth/value areas)
    const propertyTrendsCenters = [
      { lat: 28.6289, lng: 77.2065, baseIntensity: 0.95 }, // Connaught Place - Prime commercial
      { lat: 28.6139, lng: 77.2090, baseIntensity: 0.9 }, // New Delhi - Government area
      { lat: 28.5706, lng: 77.3272, baseIntensity: 0.8 }, // Lajpat Nagar - Commercial hub
      { lat: 28.6692, lng: 77.4538, baseIntensity: 0.85 }, // Noida Sector 18 - IT hub
      { lat: 28.4595, lng: 77.0266, baseIntensity: 0.9 }, // Cyber City Gurgaon
      { lat: 28.5355, lng: 77.3910, baseIntensity: 0.7 }, // Faridabad - Industrial growth
      { lat: 28.7041, lng: 77.1025, baseIntensity: 0.75 }, // Rohini - Residential development
    ];
  
    // Banking Infrastructure Centers (High banking density)
    const bankingInfraCenters = [
      { lat: 28.6289, lng: 77.2065, baseIntensity: 0.95 }, // Connaught Place - Banking center
      { lat: 28.6517, lng: 77.2219, baseIntensity: 0.9 }, // Karol Bagh - Commercial banking
      { lat: 28.6139, lng: 77.2090, baseIntensity: 0.85 }, // Central Delhi
      { lat: 28.5244, lng: 77.1855, baseIntensity: 0.8 }, // South Extension - Commercial
      { lat: 28.6692, lng: 77.4538, baseIntensity: 0.75 }, // Noida banking district
      { lat: 28.4595, lng: 77.0266, baseIntensity: 0.8 }, // Gurgaon financial district
      { lat: 28.7041, lng: 77.1025, baseIntensity: 0.6 }, // Rohini - Branch network
      { lat: 28.5706, lng: 77.3272, baseIntensity: 0.7 }, // Lajpat Nagar
    ];
  
    // Fintech Activity Centers (Digital payment and fintech hubs)
    const fintechActivityCenters = [
      { lat: 28.6692, lng: 77.4538, baseIntensity: 0.95 }, // Noida - IT and fintech hub
      { lat: 28.4595, lng: 77.0266, baseIntensity: 0.9 }, // Gurgaon - Corporate fintech
      { lat: 28.6517, lng: 77.2219, baseIntensity: 0.8 }, // Karol Bagh - Digital adoption
      { lat: 28.6289, lng: 77.2065, baseIntensity: 0.85 }, // CP - Commercial fintech
      { lat: 28.5244, lng: 77.1855, baseIntensity: 0.75 }, // South Extension
      { lat: 28.7241, lng: 77.1025, baseIntensity: 0.7 }, // Rohini - Emerging adoption
      { lat: 28.5355, lng: 77.3910, baseIntensity: 0.65 }, // Faridabad
    ];
  
    // Fraud Risk Centers (Areas with higher financial fraud incidents)
    const fraudRiskCenters = [
      { lat: 28.7200, lng: 77.1200, baseIntensity: 0.8 }, // West Delhi - Mixed area
      { lat: 28.5800, lng: 77.3500, baseIntensity: 0.75 }, // East Delhi
      { lat: 28.6100, lng: 77.1500, baseIntensity: 0.7 }, // Central West Delhi
      { lat: 28.5000, lng: 77.4000, baseIntensity: 0.65 }, // Outer areas
      { lat: 28.7500, lng: 77.2000, baseIntensity: 0.6 }, // North Delhi
      { lat: 28.5200, lng: 77.1200, baseIntensity: 0.7 }, // South West areas
    ];
  
    // Economic Stability Centers (Stable economic zones)
    const economicStabilityCenters = [
      { lat: 28.6139, lng: 77.2090, baseIntensity: 0.95 }, // Government center - Most stable
      { lat: 28.6289, lng: 77.2065, baseIntensity: 0.9 }, // Connaught Place - Commercial stability
      { lat: 28.4595, lng: 77.0266, baseIntensity: 0.85 }, // Gurgaon - Corporate stability
      { lat: 28.6692, lng: 77.4538, baseIntensity: 0.8 }, // Noida - IT sector stability
      { lat: 28.5244, lng: 77.1855, baseIntensity: 0.75 }, // South Delhi - Residential stability
      { lat: 28.5706, lng: 77.3272, baseIntensity: 0.7 }, // Commercial areas
      { lat: 28.7041, lng: 77.1025, baseIntensity: 0.65 }, // Developing areas
    ];
  
    // Generate clustered data points for each risk type
    return {
      creditDefault: generateClusteredPoints(creditDefaultCenters, 18, 1.8),
      propertyTrends: generateClusteredPoints(propertyTrendsCenters, 20, 2.2),
      bankingInfra: generateClusteredPoints(bankingInfraCenters, 22, 1.5),
      fintechActivity: generateClusteredPoints(fintechActivityCenters, 16, 2.0),
      fraudRisk: generateClusteredPoints(fraudRiskCenters, 14, 2.5),
      economicStability: generateClusteredPoints(economicStabilityCenters, 18, 2.8)
    };
  };
  
  // Additional helper function to get specific area risk scores
  export const getAreaRiskProfile = (lat, lng) => {
    // Calculate risk scores based on proximity to known risk centers
    const governmentProximity = Math.sqrt(
      Math.pow(28.6139 - lat, 2) + Math.pow(77.2090 - lng, 2)
    );
    
    const commercialProximity = Math.sqrt(
      Math.pow(28.6289 - lat, 2) + Math.pow(77.2065 - lng, 2)
    );
    
    const itHubProximity = Math.sqrt(
      Math.pow(28.6692 - lat, 2) + Math.pow(77.4538 - lng, 2)
    );
  
    return {
      stability: Math.max(0, 100 - (governmentProximity * 1000)),
      commercial: Math.max(0, 100 - (commercialProximity * 800)),
      technology: Math.max(0, 100 - (itHubProximity * 600))
    };
  };
  
  // Export financial institution locations for overlay markers
  export const getBankingLocations = () => {
    return [
      // Major banking hubs in Delhi NCR
      { lat: 28.6289, lng: 77.2065, name: "Connaught Place Banking Hub", activity: 95 },
      { lat: 28.6139, lng: 77.2090, name: "Central Delhi Branch", activity: 90 },
      { lat: 28.6517, lng: 77.2219, name: "Karol Bagh Financial Center", activity: 88 },
      { lat: 28.5244, lng: 77.1855, name: "South Extension Banking", activity: 85 },
      { lat: 28.6692, lng: 77.4538, name: "Noida Sector 18 Hub", activity: 92 },
      { lat: 28.4595, lng: 77.0266, name: "Gurgaon Financial District", activity: 94 },
      { lat: 28.7041, lng: 77.1025, name: "Rohini Banking Network", activity: 75 },
      { lat: 28.5706, lng: 77.3272, name: "Lajpat Nagar Branch", activity: 80 },
      { lat: 28.5355, lng: 77.3910, name: "Faridabad Financial Hub", activity: 78 },
      { lat: 28.6304, lng: 77.2177, name: "Rajiv Chowk Metro Banking", activity: 87 },
      { lat: 28.6448, lng: 77.2167, name: "Janpath Banking Zone", activity: 83 },
      { lat: 28.6356, lng: 77.2244, name: "Paharganj Commercial Banks", activity: 72 },
      { lat: 28.6469, lng: 77.2022, name: "Patel Nagar Financial", activity: 76 },
      { lat: 28.6271, lng: 77.1716, name: "Rajouri Garden Banking", activity: 74 },
      { lat: 28.6618, lng: 77.2273, name: "Civil Lines Branch Network", activity: 79 },
      { lat: 28.6128, lng: 77.2295, name: "India Gate Area Banks", activity: 81 },
      { lat: 28.6506, lng: 77.2334, name: "Old Delhi Financial Hub", activity: 68 },
      { lat: 28.6413, lng: 77.2085, name: "Barakhamba Road Banking", activity: 89 }
    ];
  };
  
  // Real estate hotspots for property trend analysis
  export const getPropertyHotspots = () => {
    return [
      { lat: 28.6289, lng: 77.2065, name: "Connaught Place", trend: "+15.2%", type: "Commercial" },
      { lat: 28.4595, lng: 77.0266, name: "Cyber City Gurgaon", trend: "+18.7%", type: "Commercial" },
      { lat: 28.6692, lng: 77.4538, name: "Noida Sector 18", trend: "+12.4%", type: "Mixed" },
      { lat: 28.5244, lng: 77.1855, name: "South Extension", trend: "+8.9%", type: "Residential" },
      { lat: 28.7041, lng: 77.1025, name: "Rohini", trend: "+6.5%", type: "Residential" },
      { lat: 28.5706, lng: 77.3272, name: "Lajpat Nagar", trend: "+4.2%", type: "Commercial" }
    ];
  };
  
  export default { 
    getFinancialHeatmapData, 
    getAreaRiskProfile, 
    getBankingLocations, 
    getPropertyHotspots 
  };