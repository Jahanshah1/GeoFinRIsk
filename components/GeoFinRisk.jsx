'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  TrendingUp,
  DollarSign,
  Smartphone,
  AlertTriangle,
  BarChart3,
  Eye,
  EyeOff,
  Building2,
  Activity,
  Target,
  RefreshCw,
  Shield,
  Users,
  Zap
} from 'lucide-react';

// Import static financial data
import { getFinancialHeatmapData } from './FinancialDataProvider';

const GeoFinRisk = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [riskAnalysis, setRiskAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [analysisCircle, setAnalysisCircle] = useState(null);
  const [analysisRadius, setAnalysisRadius] = useState(null);
  const [heatmapLayers, setHeatmapLayers] = useState({
    creditDefault: null,
    propertyTrends: null,
    bankingInfra: null,
    fintechActivity: null,
    fraudRisk: null,
    economicStability: null
  });
  const [bankMarkers, setBankMarkers] = useState([]);
  const [staticHeatmapData, setStaticHeatmapData] = useState({
    creditDefault: [],
    propertyTrends: [],
    bankingInfra: [],
    fintechActivity: [],
    fraudRisk: [],
    economicStability: []
  });
  const [overlays, setOverlays] = useState({
    creditDefault: true,
    propertyTrends: true,
    bankingInfra: true,
    fintechActivity: false,
    fraudRisk: false,
    economicStability: false
  });

  // Enhanced risk calculation functions
  const generateCreditDefaultData = (lat, lng) => {
    const baseRate = Math.random() * 15 + 2;
    const locationVariance = (Math.sin(lat * 10) + Math.cos(lng * 10)) * 2;
    const proximityToFinancialCenter = Math.abs(28.6139 - lat) + Math.abs(77.2090 - lng);
    const proximityFactor = Math.max(0, (0.1 - proximityToFinancialCenter) * 50);
    return Math.max(0, Math.min(25, baseRate + locationVariance + proximityFactor));
  };

  const generatePropertyTrend = (lat, lng) => {
    const baseTrend = Math.random() * 20 - 10;
    const locationFactor = Math.sin(lat * 5) * Math.cos(lng * 5) * 5;
    const distanceFromCenter = Math.sqrt(Math.pow(28.6139 - lat, 2) + Math.pow(77.2090 - lng, 2));
    const centralityBonus = Math.max(0, (0.05 - distanceFromCenter) * 100);
    return baseTrend + locationFactor + centralityBonus;
  };

  const generateFintechActivity = (lat, lng) => {
    const baseActivity = Math.random() * 100;
    const urbanFactor = Math.abs(Math.sin(lat * 8) * Math.cos(lng * 8)) * 50;
    const techHubProximity = Math.abs(28.6517 - lat) + Math.abs(77.2219 - lng);
    const techBonus = Math.max(0, (0.08 - techHubProximity) * 200);
    return Math.min(100, baseActivity + urbanFactor + techBonus);
  };

  const generateFraudRisk = (lat, lng) => {
    const baseRisk = Math.random() * 20 + 5;
    const densityFactor = Math.abs(Math.sin(lat * 12) * Math.cos(lng * 12)) * 15;
    const economicActivityInverse = (100 - generateFintechActivity(lat, lng)) * 0.1;
    return Math.max(0, Math.min(40, baseRisk + densityFactor + economicActivityInverse));
  };

  const generateEconomicStability = (lat, lng) => {
    const baseStability = Math.random() * 30 + 50;
    const governmentProximity = Math.abs(28.6139 - lat) + Math.abs(77.2090 - lng);
    const stabilityBonus = Math.max(0, (0.1 - governmentProximity) * 100);
    const industryDiversification = Math.sin(lat * 6) * Math.cos(lng * 6) * 10;
    return Math.max(0, Math.min(100, baseStability + stabilityBonus + industryDiversification));
  };

  const generateRiskScore = (lat, lng) => {
    const creditRisk = generateCreditDefaultData(lat, lng);
    const propertyTrend = generatePropertyTrend(lat, lng);
    const fintechActivity = generateFintechActivity(lat, lng);
    const fraudRisk = generateFraudRisk(lat, lng);
    const economicStability = generateEconomicStability(lat, lng);

    let score = 50;
    score += creditRisk * 1.5;          // Higher credit risk increases overall risk
    score -= propertyTrend * 1.8;       // Positive property trends reduce risk
    score -= fintechActivity * 0.3;     // Higher fintech activity reduces risk
    score += fraudRisk * 1.2;           // Higher fraud risk increases overall risk
    score -= economicStability * 0.4;   // Higher stability reduces risk

    return Math.max(0, Math.min(100, score));
  };

  const generateAIAnalysis = (lat, lng) => {
    const creditDefault = generateCreditDefaultData(lat, lng);
    const propertyTrend = generatePropertyTrend(lat, lng);
    const fintechActivity = generateFintechActivity(lat, lng);
    const fraudRisk = generateFraudRisk(lat, lng);
    const economicStability = generateEconomicStability(lat, lng);
    const riskScore = generateRiskScore(lat, lng);

    let riskLevel = 'Low';
    let riskColor = 'text-green-600';
    let bgColor = 'bg-green-50';
    if (riskScore > 70) {
      riskLevel = 'High';
      riskColor = 'text-red-600';
      bgColor = 'bg-red-50';
    } else if (riskScore > 40) {
      riskLevel = 'Medium';
      riskColor = 'text-yellow-600';
      bgColor = 'bg-yellow-50';
    }

    const suggestions = [];
    if (creditDefault > 12) {
      suggestions.push("High credit default rate - implement stricter lending criteria and enhanced credit scoring");
    }
    if (propertyTrend < -3) {
      suggestions.push("Declining property market - monitor real estate portfolios and consider diversification");
    }
    if (fintechActivity < 25) {
      suggestions.push("Limited digital adoption - opportunity for fintech infrastructure development");
    }
    if (fraudRisk > 25) {
      suggestions.push("Elevated fraud risk - strengthen security measures and monitoring systems");
    }
    if (economicStability < 40) {
      suggestions.push("Economic instability detected - exercise caution in major investments");
    }
    if (riskScore < 25) {
      suggestions.push("Excellent investment climate with low risk and stable economic indicators");
    }
    if (creditDefault < 5 && propertyTrend > 8 && economicStability > 70) {
      suggestions.push("Prime investment opportunity - low risk, growing market, stable economy");
    }

    return {
      riskLevel,
      riskColor,
      bgColor,
      riskScore: Math.round(riskScore),
      creditDefault: creditDefault.toFixed(1),
      propertyTrend: propertyTrend > 0 ? `+${propertyTrend.toFixed(1)}` : propertyTrend.toFixed(1),
      fintechActivity: Math.round(fintechActivity),
      fraudRisk: fraudRisk.toFixed(1),
      economicStability: Math.round(economicStability),
      suggestions: suggestions.length ? suggestions : ["Area shows stable financial indicators with balanced risk profile"],
      bankingDensity: Math.round(Math.random() * 25 + 10),
      marketVolatility: (Math.random() * 35 + 15).toFixed(1),
      liquidityIndex: Math.round(Math.random() * 40 + 60)
    };
  };

  const clearMarkers = () => {
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);
  };

  const clearAnalysisCircle = () => {
    if (analysisCircle) {
      analysisCircle.setMap(null);
      setAnalysisCircle(null);
    }
    if (analysisRadius) {
      analysisRadius.setMap(null);
      setAnalysisRadius(null);
    }
  };

  const clearHeatmaps = () => {
    Object.values(heatmapLayers).forEach(layer => {
      if (layer) layer.setMap(null);
    });
    setHeatmapLayers({
      creditDefault: null,
      propertyTrends: null,
      bankingInfra: null,
      fintechActivity: null,
      fraudRisk: null,
      economicStability: null
    });
  };

  const clearBankMarkers = () => {
    bankMarkers.forEach(marker => marker.setMap(null));
    setBankMarkers([]);
  };

  const updateOverlays = (mapInstance) => {
    console.log('Updating overlays with static data');
    
    // Clear existing overlays
    clearHeatmaps();
    clearBankMarkers();

    const newHeatmapLayers = {};

    // Get static data from provider
    const heatmapData = getFinancialHeatmapData();

    // Credit Default Risk Heatmap (Red gradient)
    if (overlays.creditDefault && window.google?.maps?.visualization && heatmapData.creditDefault?.length > 0) {
      newHeatmapLayers.creditDefault = new window.google.maps.visualization.HeatmapLayer({
        data: heatmapData.creditDefault.map(point => ({
          location: new window.google.maps.LatLng(point.lat, point.lng),
          weight: point.intensity
        })),
        map: mapInstance,
        radius: 45,
        opacity: 0.8,
        gradient: [
          'rgba(255, 0, 0, 0)',
          'rgba(255, 100, 100, 0.4)',
          'rgba(255, 50, 50, 0.6)',
          'rgba(255, 0, 0, 0.8)',
          'rgba(200, 0, 0, 1)'
        ]
      });
    }

    // Property Trends Heatmap (Blue gradient)
    if (overlays.propertyTrends && window.google?.maps?.visualization && heatmapData.propertyTrends?.length > 0) {
      newHeatmapLayers.propertyTrends = new window.google.maps.visualization.HeatmapLayer({
        data: heatmapData.propertyTrends.map(point => ({
          location: new window.google.maps.LatLng(point.lat, point.lng),
          weight: point.intensity
        })),
        map: mapInstance,
        radius: 45,
        opacity: 0.8,
        gradient: [
          'rgba(0, 0, 255, 0)',
          'rgba(100, 100, 255, 0.4)',
          'rgba(50, 50, 255, 0.6)',
          'rgba(0, 0, 255, 0.8)',
          'rgba(0, 0, 200, 1)'
        ]
      });
    }

    // Banking Infrastructure with markers and heatmap
    if (overlays.bankingInfra && window.google?.maps?.visualization && heatmapData.bankingInfra?.length > 0) {
      newHeatmapLayers.bankingInfra = new window.google.maps.visualization.HeatmapLayer({
        data: heatmapData.bankingInfra.map(point => ({
          location: new window.google.maps.LatLng(point.lat, point.lng),
          weight: point.intensity
        })),
        map: mapInstance,
        radius: 35,
        opacity: 0.7,
        gradient: [
          'rgba(0, 255, 0, 0)',
          'rgba(100, 255, 100, 0.4)',
          'rgba(50, 255, 50, 0.6)',
          'rgba(0, 255, 0, 0.8)',
          'rgba(0, 200, 0, 1)'
        ]
      });

      // Add bank markers
      const newBankMarkers = [];
      heatmapData.bankingInfra.forEach((bank, index) => {
        if (index % 3 === 0) { // Show every 3rd point as a marker to avoid clutter
          const marker = new window.google.maps.Marker({
            position: { lat: bank.lat, lng: bank.lng },
            map: mapInstance,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 6,
              fillColor: '#10b981',
              fillOpacity: 0.9,
              strokeWeight: 2,
              strokeColor: '#ffffff'
            },
            title: `Banking Hub - Activity: ${Math.round(bank.intensity * 100)}%`
          });
          newBankMarkers.push(marker);
        }
      });
      setBankMarkers(newBankMarkers);
    }

    // Fintech Activity Heatmap (Purple gradient)
    if (overlays.fintechActivity && window.google?.maps?.visualization && heatmapData.fintechActivity?.length > 0) {
      newHeatmapLayers.fintechActivity = new window.google.maps.visualization.HeatmapLayer({
        data: heatmapData.fintechActivity.map(point => ({
          location: new window.google.maps.LatLng(point.lat, point.lng),
          weight: point.intensity
        })),
        map: mapInstance,
        radius: 40,
        opacity: 0.8,
        gradient: [
          'rgba(128, 0, 128, 0)',
          'rgba(180, 100, 180, 0.4)',
          'rgba(150, 50, 150, 0.6)',
          'rgba(128, 0, 128, 0.8)',
          'rgba(100, 0, 100, 1)'
        ]
      });
    }

    // Fraud Risk Heatmap (Orange gradient)
    if (overlays.fraudRisk && window.google?.maps?.visualization && heatmapData.fraudRisk?.length > 0) {
      newHeatmapLayers.fraudRisk = new window.google.maps.visualization.HeatmapLayer({
        data: heatmapData.fraudRisk.map(point => ({
          location: new window.google.maps.LatLng(point.lat, point.lng),
          weight: point.intensity
        })),
        map: mapInstance,
        radius: 40,
        opacity: 0.75,
        gradient: [
          'rgba(255, 165, 0, 0)',
          'rgba(255, 140, 0, 0.4)',
          'rgba(255, 120, 0, 0.6)',
          'rgba(255, 100, 0, 0.8)',
          'rgba(255, 69, 0, 1)'
        ]
      });
    }

    // Economic Stability Heatmap (Teal gradient)
    if (overlays.economicStability && window.google?.maps?.visualization && heatmapData.economicStability?.length > 0) {
      newHeatmapLayers.economicStability = new window.google.maps.visualization.HeatmapLayer({
        data: heatmapData.economicStability.map(point => ({
          location: new window.google.maps.LatLng(point.lat, point.lng),
          weight: point.intensity
        })),
        map: mapInstance,
        radius: 50,
        opacity: 0.7,
        gradient: [
          'rgba(0, 128, 128, 0)',
          'rgba(64, 224, 208, 0.4)',
          'rgba(32, 178, 170, 0.6)',
          'rgba(0, 128, 128, 0.8)',
          'rgba(0, 100, 100, 1)'
        ]
      });
    }

    setHeatmapLayers(newHeatmapLayers);
  };

  useEffect(() => {
    const initMap = () => {
      if (!window.google) return;

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: { lat: 28.6139, lng: 77.2090 },
        zoom: 11,
        styles: [
          {
            featureType: "all",
            elementType: "geometry.fill",
            stylers: [{ weight: "2.00" }]
          },
          {
            featureType: "all",
            elementType: "geometry.stroke",
            stylers: [{ color: "#9c9c9c" }]
          },
          {
            featureType: "water",
            elementType: "all",
            stylers: [{ color: "#46bcec" }, { visibility: "on" }]
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [{ color: "#f2f2f2" }]
          },
          {
            featureType: "road",
            elementType: "all",
            stylers: [{ saturation: -100 }, { lightness: 45 }]
          }
        ]
      });

      setMap(mapInstance);

      // Initialize overlays with static data
      setTimeout(() => {
        updateOverlays(mapInstance);
      }, 1000);

      mapInstance.addListener('click', (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        clearMarkers();
        clearAnalysisCircle();
        setSelectedLocation({ lat, lng });
        setLoading(true);

        // Create analysis marker with enhanced styling
        const marker = new window.google.maps.Marker({
          position: { lat, lng },
          map: mapInstance,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: '#3b82f6',
            fillOpacity: 0.9,
            strokeWeight: 3,
            strokeColor: '#ffffff'
          },
          animation: window.google.maps.Animation.DROP
        });

        // Create enhanced analysis circle with better visibility
        const innerCircle = new window.google.maps.Circle({
          strokeColor: '#3b82f6',
          strokeOpacity: 0.9,
          strokeWeight: 3,
          fillColor: '#3b82f6',
          fillOpacity: 0.2,
          map: mapInstance,
          center: { lat, lng },
          radius: 750 // 750 meters radius for detailed analysis
        });

        // Create outer radius indicator
        const outerRadius = new window.google.maps.Circle({
          strokeColor: '#1e40af',
          strokeOpacity: 0.6,
          strokeWeight: 2,
          fillColor: 'transparent',
          map: mapInstance,
          center: { lat, lng },
          radius: 1500, // 1.5km radius for broader context
          strokeDashArray: '10,5'
        });

        setMarkers([marker]);
        setAnalysisCircle(innerCircle);
        setAnalysisRadius(outerRadius);

        setTimeout(() => {
          const analysis = generateAIAnalysis(lat, lng);
          setRiskAnalysis(analysis);
          setLoading(false);
        }, 2000); // Slightly longer for more realistic analysis feel
      });
    };

    if (!window.google) {
      const script = document.createElement('script');
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=visualization`;
      script.onload = () => {
        console.log('Google Maps script loaded');
        initMap();
      };
      document.head.appendChild(script);
    } else {
      console.log('Google Maps already loaded');
      initMap();
    }
  }, []);

  // Update overlays when toggle states change
  useEffect(() => {
    if (map) {
      updateOverlays(map);
    }
  }, [overlays, map]);

  const toggleOverlay = (overlayType) => {
    setOverlays(prev => ({ ...prev, [overlayType]: !prev[overlayType] }));
  };

  const resetAnalysis = () => {
    setSelectedLocation(null);
    setRiskAnalysis(null);
    clearMarkers();
    clearAnalysisCircle();
  };

  return (
    <div className="h-screen flex bg-gray-100 text-black">
      <div className="w-80 bg-white shadow-lg flex flex-col text-black">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-black">GeoFinRisk</h1>
              <p className="text-sm text-gray-700">Advanced Financial Risk Intelligence</p>
            </div>
          </div>
          <p className="text-xs text-black">
            Click anywhere on the map to analyze comprehensive financial risk metrics and investment potential
          </p>
        </div>

        {/* Enhanced Controls */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-black mb-3 flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Risk Layer Overlays
          </h3>
          <div className="space-y-2">
            {[
              { key: 'creditDefault', label: 'Credit Default Risk', icon: AlertTriangle, color: 'text-red-600' },
              { key: 'propertyTrends', label: 'Property Market Trends', icon: TrendingUp, color: 'text-blue-600' },
              { key: 'bankingInfra', label: 'Banking Infrastructure', icon: Building2, color: 'text-green-600' },
              { key: 'fintechActivity', label: 'Fintech Activity Hub', icon: Smartphone, color: 'text-purple-600' },
              { key: 'fraudRisk', label: 'Fraud Risk Zones', icon: Shield, color: 'text-orange-600' },
              { key: 'economicStability', label: 'Economic Stability', icon: Zap, color: 'text-teal-600' }
            ].map(({ key, label, icon: Icon, color }) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${color}`} />
                  <span className="text-sm text-black">{label}</span>
                </div>
                <button
                  onClick={() => toggleOverlay(key)}
                  className={`p-1 rounded transition-colors ${overlays[key] ? 'text-blue-600' : 'text-gray-400'}`}
                >
                  {overlays[key] ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Analysis Panel */}
        <div className="flex-1 p-4 overflow-y-auto">
          {!selectedLocation && !riskAnalysis && (
            <div className="text-center py-8">
              <Target className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-black text-sm">Click on the map to start comprehensive risk analysis</p>
              <p className="text-gray-500 text-xs mt-2">Analysis covers 750m radius with 1.5km context</p>
            </div>
          )}

          {selectedLocation && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-black flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  Analysis Location
                </h3>
                <button
                  onClick={resetAnalysis}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-black">
                Lat: {selectedLocation.lat.toFixed(6)}<br />
                Lng: {selectedLocation.lng.toFixed(6)}
              </p>
            </div>
          )}

          {loading && (
            <div className="text-center py-6">
              <div className="inline-flex items-center gap-2 text-blue-600">
                <Activity className="w-5 h-5 animate-spin" />
                <span className="text-sm">Analyzing comprehensive financial risk metrics...</span>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Processing 6 risk indicators
              </div>
            </div>
          )}

          {riskAnalysis && (
            <div className="space-y-4">
              {/* Enhanced Risk Score */}
              <div className={`p-4 rounded-lg ${riskAnalysis.bgColor} border-l-4 ${
                riskAnalysis.riskLevel === 'High' ? 'border-red-500' :
                riskAnalysis.riskLevel === 'Medium' ? 'border-yellow-500' : 'border-green-500'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Overall Risk Score</span>
                  <span className={`text-xl font-bold ${riskAnalysis.riskColor}`}>
                    {riskAnalysis.riskScore}/100
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-4 h-4 ${riskAnalysis.riskColor}`} />
                  <span className={`text-sm font-semibold ${riskAnalysis.riskColor}`}>
                    {riskAnalysis.riskLevel} Risk Level
                  </span>
                </div>
              </div>

              {/* Enhanced Key Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-red-50 rounded-lg border-l-2 border-red-200">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-3 h-3 text-red-600" />
                    <span className="text-xs text-black">Credit Default</span>
                  </div>
                  <span className="text-sm font-semibold text-black">{riskAnalysis.creditDefault}%</span>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border-l-2 border-blue-200">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-3 h-3 text-blue-600" />
                    <span className="text-xs text-black">Property Trend</span>
                  </div>
                  <span className="text-sm font-semibold text-black">{riskAnalysis.propertyTrend}%</span>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border-l-2 border-purple-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Smartphone className="w-3 h-3 text-purple-600" />
                    <span className="text-xs text-black">Fintech Activity</span>
                  </div>
                  <span className="text-sm font-semibold text-black">{riskAnalysis.fintechActivity}%</span>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border-l-2 border-green-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="w-3 h-3 text-green-600" />
                    <span className="text-xs text-black">Banking Density</span>
                  </div>
                  <span className="text-sm font-semibold text-black">{riskAnalysis.bankingDensity}</span>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border-l-2 border-orange-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-3 h-3 text-orange-600" />
                    <span className="text-xs text-black">Fraud Risk</span>
                  </div>
                  <span className="text-sm font-semibold text-black">{riskAnalysis.fraudRisk}%</span>
                </div>
                <div className="p-3 bg-teal-50 rounded-lg border-l-2 border-teal-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-3 h-3 text-teal-600" />
                    <span className="text-xs text-black">Economic Stability</span>
                  </div>
                  <span className="text-sm font-semibold text-black">{riskAnalysis.economicStability}%</span>
                </div>
              </div>

              {/* Additional Financial Metrics */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-black mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-gray-600" />
                  Market Indicators
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Market Volatility:</span>
                    <span className="text-black font-medium">{riskAnalysis.marketVolatility}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Liquidity Index:</span>
                    <span className="text-black font-medium">{riskAnalysis.liquidityIndex}</span>
                  </div>
                </div>
              </div>

              {/* Enhanced AI Insights */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-black mb-2 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  AI Risk Assessment
                </h4>
                <div className="space-y-2">
                  {riskAnalysis.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-xs text-black leading-relaxed">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Investment Recommendation */}
              <div className={`p-4 rounded-lg border-2 ${
                riskAnalysis.riskLevel === 'Low' ? 'bg-green-50 border-green-200' :
                riskAnalysis.riskLevel === 'Medium' ? 'bg-yellow-50 border-yellow-200' : 
                'bg-red-50 border-red-200'
              }`}>
                <h4 className="font-semibold text-black mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Investment Recommendation
                </h4>
                <p className="text-xs text-black">
                  {riskAnalysis.riskLevel === 'Low' ? 
                    'Favorable conditions for investment with minimal risk factors. Consider expanding operations or increasing portfolio allocation.' :
                    riskAnalysis.riskLevel === 'Medium' ?
                    'Moderate risk environment. Proceed with caution and implement additional risk mitigation strategies.' :
                    'High-risk area requiring extensive due diligence. Consider alternative locations or enhanced security measures.'
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 relative">
        <div ref={mapRef} className="w-full h-full"></div>
        
        {/* Enhanced Legend */}
        <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg text-xs max-w-56">
          <h4 className="font-semibold mb-3 text-black">Risk Layer Legend</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded opacity-70"></div>
              <span className="text-black">Credit Default Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded opacity-70"></div>
              <span className="text-black">Property Market Trends</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded opacity-70"></div>
              <span className="text-black">Banking Infrastructure</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded opacity-70"></div>
              <span className="text-black">Fintech Activity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded opacity-70"></div>
              <span className="text-black">Fraud Risk Zones</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-teal-500 rounded opacity-70"></div>
              <span className="text-black">Economic Stability</span>
            </div>
            <hr className="my-2" />
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded border border-white"></div>
              <span className="text-black">Analysis Center</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-blue-600 rounded bg-blue-100"></div>
              <span className="text-black">Primary Analysis (750m)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-blue-800 rounded bg-transparent" style={{ borderStyle: 'dashed' }}></div>
              <span className="text-black">Context Area (1.5km)</span>
            </div>
          </div>
        </div>

        {/* Enhanced Status Indicator */}
        {loading && (
          <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg">
            <div className="flex items-center gap-2 text-blue-600">
              <Activity className="w-4 h-4 animate-spin" />
              <span className="text-xs">Processing risk analysis...</span>
            </div>
          </div>
        )}

        {/* Analysis Info Panel */}
        {selectedLocation && !loading && (
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg max-w-64">
            <div className="text-xs text-black">
              <div className="font-semibold mb-1">Analysis Coverage</div>
              <div>• Primary: 750m radius (detailed analysis)</div>
              <div>• Context: 1.5km radius (regional factors)</div>
              <div className="mt-2 text-gray-600">Click elsewhere to analyze a new location</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeoFinRisk;