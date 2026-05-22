import { useEffect, useRef, useState, useCallback } from "react";
import Globe from "globe.gl";
import europeGeoJSON from "./geoJson.json"; // Import your Natural Earth GeoJSON file
import PlacesVideo from "/videos/Places.mp4"; // Single video for continuous loop

const GlobeComponent = ({ cities, continent = "Europe" }) => {
  const globeRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const globeInstanceRef = useRef(null);
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Define all 30 European countries from your tourism data
  const visibleCountries = [
    "Andorra", "Austria", "Belgium", "Croatia", "Cyprus", "Czechia", "Czech Republic",
    "Denmark", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", 
    "Ireland", "Italy", "Malta", "Monaco", "Netherlands", "Norway", "Portugal", "Slovakia", "Slovenia", 
    "Spain", "Sweden", "Switzerland", "United Kingdom"
  ];

  const processEuropeanTerritories = useCallback((features) => {
    const getCountryName = (feature) =>
      feature.properties.NAME ||
      feature.properties.name ||
      feature.properties.ADMIN ||
      feature.properties.NAME_LONG ||
      "";
    
    // Debug: Log all features to see what countries are available in the GeoJSON
    console.log("All GeoJSON features:", features.map(f => ({
      name: getCountryName(f),
      properties: f.properties
    })).filter(f => f.name.toLowerCase().includes('andorra') || f.name.toLowerCase().includes('spain') || f.name.toLowerCase().includes('monaco')));
    
    // First filter for countries we want to display
    let filteredFeatures = features.filter((feature) => {
      const countryName = getCountryName(feature);
      // Handle different naming conventions in GeoJSON
      return visibleCountries.includes(countryName) || 
             (countryName === "Czech Republic" && visibleCountries.includes("Czechia"));
    });
    
    // Debug: Log filtered features
    console.log("Filtered features:", filteredFeatures.map(f => getCountryName(f)));
    
    // Process each feature - special handling for France
    const processedFeatures = filteredFeatures.map(feature => {
      const countryName = getCountryName(feature);
      
      // Only need special processing for France (to exclude French Guiana, etc.)
      if (countryName === "France" && 
          feature.geometry && 
          feature.geometry.type === "MultiPolygon") {
        
        // Create a new feature with the same properties
        const europeanFrance = {
          ...feature,
          geometry: {
            ...feature.geometry,
            coordinates: [] // We'll filter coordinates to include only European parts
          }
        };
        
        // Filter the coordinates to include only European polygons
        feature.geometry.coordinates.forEach(polygon => {
          // Sample the first coordinate from the polygon to check if it's in Europe
          const sampleCoord = polygon[0][0];
          const longitude = sampleCoord[0];
          const latitude = sampleCoord[1];
          
          // Define rough bounds for continental Europe
          const inEurope = longitude > -10 && longitude < 40 && 
                           latitude > 36 && latitude < 70;
          
          if (inEurope) {
            // If this polygon is in Europe, keep it
            europeanFrance.geometry.coordinates.push(polygon);
          }
        });
        
        return europeanFrance;
      }
      
      // For other countries, no special processing needed
      return feature;
    });
    
    // Transform to the format needed for globe.gl
    return processedFeatures.map((feature) => {
      let countryName = getCountryName(feature);
      // Normalize Czech Republic to Czechia for consistency
      if (countryName === "Czech Republic") {
        countryName = "Czechia";
      }
      
      return {
        properties: {
          name: countryName,
          id: countryName.toLowerCase(),
        },
        geometry: feature.geometry,
      };
    });
  }, [visibleCountries]);

  // Define country-specific colors for all 30 countries
  const countryColors = { 
    // Original countries
    France: "rgba(0, 35, 149, 0.3)",      // French flag blue
    Germany: "rgba(221, 0, 0, 0.3)",      // German flag red
    Italy: "rgba(0, 146, 70, 0.3)",       // Italian flag green
    Spain: "rgba(255, 196, 0, 0.3)",      // Spanish flag yellow
    
    // All 30 European countries with distinctive colors
    Andorra: "rgba(0, 102, 204, 0.3)",      // Blue
    Austria: "rgba(237, 41, 57, 0.3)",      // Austrian red
    Belgium: "rgba(255, 204, 0, 0.3)",      // Belgian yellow
    Croatia: "rgba(255, 0, 0, 0.3)",        // Croatian red
    Cyprus: "rgba(0, 123, 191, 0.3)",       // Cyprus blue
    Czechia: "rgba(215, 20, 26, 0.3)",      // Czech red
    "Czech Republic": "rgba(215, 20, 26, 0.3)", // Fallback
    Denmark: "rgba(198, 12, 48, 0.3)",      // Danish red
    Finland: "rgba(0, 83, 155, 0.3)",       // Finnish blue
    Greece: "rgba(13, 94, 175, 0.3)",       // Greek blue
    Hungary: "rgba(205, 42, 62, 0.3)",      // Hungarian red
    Iceland: "rgba(0, 82, 156, 0.3)",       // Icelandic blue
    Ireland: "rgba(0, 155, 72, 0.3)",       // Irish green
    Liechtenstein: "rgba(0, 51, 160, 0.3)", // Blue
    Luxembourg: "rgba(237, 41, 57, 0.3)",    // Red
    Malta: "rgba(206, 17, 38, 0.3)",        // Maltese red
    Monaco: "rgba(206, 17, 38, 0.3)",       // Monaco red
    Montenegro: "rgba(196, 30, 58, 0.3)",   // Montenegro red
    Netherlands: "rgba(255, 94, 77, 0.3)",  // Dutch orange
    Norway: "rgba(186, 12, 47, 0.3)",       // Norwegian red
    Portugal: "rgba(255, 0, 0, 0.3)",       // Portuguese red
    Slovakia: "rgba(0, 82, 136, 0.3)",      // Slovak blue
    Slovenia: "rgba(0, 82, 147, 0.3)",      // Slovenian blue
    Sweden: "rgba(0, 106, 167, 0.3)",       // Swedish blue
    Switzerland: "rgba(218, 41, 28, 0.3)",  // Swiss red
    "United Kingdom": "rgba(1, 33, 105, 0.3)", // UK blue
    "Vatican City": "rgba(255, 204, 0, 0.3)" // Vatican gold
  };

  // Define country centroids for labels - all 30 countries
  const countryCentroids = [
    // All 30 European countries with their centroids
    { lat: 42.5063, lng: 1.5218, name: 'Andorra', country: 'Andorra' },
    { lat: 47.5162, lng: 14.5501, name: 'Austria', country: 'Austria' },
    { lat: 50.5039, lng: 4.4699, name: 'Belgium', country: 'Belgium' },
    { lat: 45.1000, lng: 15.2000, name: 'Croatia', country: 'Croatia' },
    { lat: 35.1264, lng: 33.4299, name: 'Cyprus', country: 'Cyprus' },
    { lat: 49.8175, lng: 15.4730, name: 'Czechia', country: 'Czechia' },
    { lat: 56.2639, lng: 9.5018, name: 'Denmark', country: 'Denmark' },
    { lat: 61.9241, lng: 25.7482, name: 'Finland', country: 'Finland' },
    { lat: 46.2276, lng: 2.2137, name: 'France', country: 'France' },
    { lat: 51.1657, lng: 10.4515, name: 'Germany', country: 'Germany' },
    { lat: 39.0742, lng: 21.8243, name: 'Greece', country: 'Greece' },
    { lat: 47.1625, lng: 19.5033, name: 'Hungary', country: 'Hungary' },
    { lat: 64.9631, lng: -19.0208, name: 'Iceland', country: 'Iceland' },
    { lat: 53.4129, lng: -8.2439, name: 'Ireland', country: 'Ireland' },
    { lat: 41.8719, lng: 12.5674, name: 'Italy', country: 'Italy' },
    // { lat: 47.1660, lng: 9.5554, name: 'Liechtenstein', country: 'Liechtenstein' },
    // { lat: 49.8153, lng: 6.1296, name: 'Luxembourg', country: 'Luxembourg' },
    { lat: 35.9375, lng: 14.3754, name: 'Malta', country: 'Malta' },
    { lat: 43.7384, lng: 7.4246, name: 'Monaco', country: 'Monaco' },
    // { lat: 42.7087, lng: 19.3744, name: 'Montenegro', country: 'Montenegro' },
    { lat: 52.1326, lng: 5.2913, name: 'Netherlands', country: 'Netherlands' },
    { lat: 60.4720, lng: 8.4689, name: 'Norway', country: 'Norway' },
    { lat: 39.3999, lng: -8.2245, name: 'Portugal', country: 'Portugal' },
    { lat: 48.6690, lng: 19.6990, name: 'Slovakia', country: 'Slovakia' },
    { lat: 46.1512, lng: 14.9955, name: 'Slovenia', country: 'Slovenia' },
    { lat: 40.4637, lng: -3.7492, name: 'Spain', country: 'Spain' },
    { lat: 60.1282, lng: 18.6435, name: 'Sweden', country: 'Sweden' },
    { lat: 46.8182, lng: 8.2275, name: 'Switzerland', country: 'Switzerland' },
    { lat: 55.3781, lng: -3.4360, name: 'United Kingdom', country: 'United Kingdom' },
    // { lat: 41.9029, lng: 12.4534, name: 'Vatican City', country: 'Vatican City' }
  ];

  // Debounce function to prevent too many operations during resize
  const debounce = useCallback((func, delay) => {
    let timerId;
    return (...args) => {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => func(...args), delay);
    };
  }, []);

  // Update dimensions on resize with debouncing
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = Math.min(window.innerWidth, 1200);
        const height =
          window.innerHeight < 500
            ? window.innerHeight * 0.7
            : window.innerWidth < 768
            ? window.innerHeight * 0.6
            : window.innerHeight * 0.9;

        setDimensions({ width, height });
      }
    };

    updateDimensions();
    
    // Debounce the resize event to prevent excessive recalculations
    const debouncedUpdateDimensions = debounce(updateDimensions, 100);
    window.addEventListener("resize", debouncedUpdateDimensions);
    
    return () => window.removeEventListener("resize", debouncedUpdateDimensions);
  }, [debounce]);

  // Load and play the Places video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = PlacesVideo;
      videoRef.current.load();
      
      // Listen for when video starts playing
      const handleVideoLoaded = () => {
        console.log("Places video loaded and playing");
        setVideoLoaded(true);
      };
      
      videoRef.current.oncanplaythrough = handleVideoLoaded;
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => console.log("Places video started playing"))
          .catch(e => {
            console.log("Video play prevented:", e);
            // Mark as loaded even if autoplay fails (user might need to interact first)
            handleVideoLoaded();
          });
      }
    }
  }, []);

  // Initialize globe once when component mounts
  useEffect(() => {
    if (!globeRef.current) return;
    
    // Only create the globe instance if it doesn't exist
    if (!globeInstanceRef.current) {
      const globe = Globe()(globeRef.current);
      globeInstanceRef.current = globe;
      
      // Set focused view on Europe based on device size
      const isMobile = window.innerWidth < 768;
      const europeView = isMobile 
        ? { lat: 30, lng: -20, altitude: 2 }  // Mobile view
        : { lat: 10, lng: 90, altitude: 0.75 }; // Desktop/tablet view
  
      // Customize the globe appearance - minimal settings for better performance
      globe
        .globeImageUrl("")
        .backgroundColor("rgba(0, 0, 0, 0)") // Transparent background
        .pointOfView(europeView, 0) // Immediate transition, no animation
        .showGlobe(false)
        .showAtmosphere(false);
  
      const controls = globe.controls();
      // Disable rotation and movement but allow mouse interaction for clicking countries
      controls.enabled = true;       // Enable controls for interaction
      controls.autoRotate = false;   // No auto-rotation
      controls.enableRotate = false; // No manual rotation
      controls.enablePan = false;    // No panning
      controls.enableZoom = false;   // No zooming
      controls.enableDamping = false;// No damping
  
      // Process GeoJSON data with our new function
      const polygonsData = processEuropeanTerritories(europeGeoJSON.features);
      
      // Set the data once and never change it
      globe
        .polygonsData(polygonsData)
        .polygonSideColor(() => "rgba(189, 195, 199, 0.2)")
        .polygonStrokeColor(() => "rgba(236, 240, 241, 0.8)")
        .polygonsTransitionDuration(200)
        .polygonCapColor((d) => countryColors[d.properties.name] || countryColors.Germany)
        .polygonAltitude(() => 0.06); // Set all countries to the same altitude
      
      // Debug: log all polygon data to see what countries are available
      console.log("All polygons data:", polygonsData.map(p => ({ 
        name: p.properties.name, 
        id: p.properties.id 
      })));
      
      // Use HTML elements for country labels at centroids instead of capitals
      globe
        .htmlElementsData(countryCentroids)
        .htmlElement(d => {
          const el = document.createElement('div');
          el.className = 'country-label';
          el.textContent = d.country;
          el.style.color = 'white';
          el.style.fontWeight = 'bold';
          el.style.fontSize = '14px';
          el.style.textAlign = 'center';
          el.style.textShadow = '0 0 5px rgba(0, 0, 0, 0.8), 0 0 3px rgba(0, 0, 0, 0.8)';
          el.style.pointerEvents = 'auto'; // Allow pointer events for click
          el.style.userSelect = 'none'; // Prevent text selection
          el.style.transform = 'translate(-50%, -50%)'; // Center the element
          el.style.whiteSpace = 'nowrap'; // Keep text on one line
          el.style.cursor = 'pointer'; // Show pointer cursor on hover

          // Add click handler to label
          el.onclick = (e) => {
            e.stopPropagation();
            // Simulate polygon click logic for this country
            const country = d.country.toLowerCase().trim();
            const normalizedCountry = country.replace(/\s+/g, '').toLowerCase();

            // Debug: log all available city country names for troubleshooting
            if (cities && Array.isArray(cities)) {
              console.log("Available cities countries:", cities.map(c => c.country));
              const allCountries = cities.map(c => c.country && c.country.replace(/\s+/g, '').toLowerCase());
              if (!allCountries.includes(normalizedCountry)) {
                console.warn(
                  `Country "${country}" detected, but not found in cities data. ` +
                  `Add "${country.charAt(0).toUpperCase() + country.slice(1)}" to your cities array for correct linking.`
                );
              }
            }

            const targetCity = cities?.find(
              (city) =>
                city.country &&
                city.country.replace(/\s+/g, '').toLowerCase() === normalizedCountry
            );

            console.log("Label click - Final country for search:", country);
            console.log("Label click - Found target city:", targetCity);

            if (targetCity && targetCity.url) {
              window.open(targetCity.url, "_blank");
            } else {
              console.warn(`No city found for country: ${country}`);
              if (country) {
                window.open(`/destination?country=${encodeURIComponent(normalizedCountry)}`, "_blank");
              }
            }
          };

          return el;
        })
        .htmlAltitude(0.1) // Keep slightly above the polygons
        .htmlLat(d => d.lat)
        .htmlLng(d => d.lng);
    }
    
    return () => {
      // Only clean up globe on component unmount
      if (globeInstanceRef.current) {
        globeInstanceRef.current._destructor();
        globeInstanceRef.current = null;
      }
    };
  }, []); // Empty dependency array means this runs only once on mount
  
  // Handle click events on countries
  useEffect(() => {
    if (!globeInstanceRef.current) return;

    globeInstanceRef.current.onPolygonClick((polygon) => {
      if (polygon && polygon.properties) {
        let country = polygon.properties.name?.toLowerCase().trim();

        // Debug log to see what country is detected
        console.log("Clicked polygon:", polygon);
        console.log("Country detected:", country);
        console.log("Checking coordinate override - country:", country, "has geometry:", !!polygon.geometry);

        // If country is Spain but coordinates suggest Andorra, override
        // Also handle case where no country name is detected
        if (!country || country === '' || 
            (country === 'spain' && polygon.geometry)) {
          console.log("Entering coordinate-based detection");
          // Calculate the centroid of the polygon for better identification
          let centroid = null;
          if (polygon.geometry && polygon.geometry.coordinates) {
            const coords = polygon.geometry.coordinates;
            // Robust centroid calculation for both Polygon and MultiPolygon
            let allCoords = [];
            if (polygon.geometry.type === 'Polygon') {
              coords.forEach(ring => {
                ring.forEach(coord => allCoords.push(coord));
              });
            } else if (polygon.geometry.type === 'MultiPolygon') {
              coords.forEach(poly => {
                poly.forEach(ring => {
                  ring.forEach(coord => allCoords.push(coord));
                });
              });
            }
            if (allCoords.length > 0) {
              const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
              centroid = {
                lat: avg(allCoords.map(c => c[1])),
                lng: avg(allCoords.map(c => c[0]))
              };
            }
          }

          // Try to match centroid to known country locations
          console.log("Calculated centroid:", centroid);
          
          if (centroid) {
            const countryCentroidMap = {
              'andorra': { lat: 42.5063, lng: 1.5218 },
              'monaco': { lat: 43.7384, lng: 7.4246 },
              'malta': { lat: 35.9375, lng: 14.3754 },
              'cyprus': { lat: 35.1264, lng: 33.4299 }
            };

            // Find the closest match (within reasonable distance)
            let bestMatch = null;
            let bestDistance = Infinity;
            
            for (const [countryName, expectedCentroid] of Object.entries(countryCentroidMap)) {
              const distance = Math.sqrt(
                Math.pow(centroid.lat - expectedCentroid.lat, 2) + 
                Math.pow(centroid.lng - expectedCentroid.lng, 2)
              );
              
              console.log(`Distance to ${countryName}:`, distance, `(expected: lat=${expectedCentroid.lat}, lng=${expectedCentroid.lng})`);
              
              if (distance < bestDistance) {
                bestDistance = distance;
                bestMatch = countryName;
              }
            }
            
            // Use stricter distance for small countries
            let maxDistance = 1.5;
            if (bestMatch === 'andorra') maxDistance = 0.2;
            if (bestMatch === 'cyprus') maxDistance = 0.5; // Cyprus is small and isolated

            console.log(`Best match: ${bestMatch}, distance: ${bestDistance}, maxDistance: ${maxDistance}`);
            if (bestMatch && bestDistance < maxDistance) {
                country = bestMatch;
                console.log(`Matched by coordinates: ${bestMatch} (distance: ${bestDistance})`);
                console.log(`Clicked coordinates: lat=${centroid.lat}, lng=${centroid.lng}`);
            } else {
                // Special fallback for Cyprus: if centroid is very close, force match
                const cyprusCentroid = countryCentroidMap['cyprus'];
                const cyprusDistance = Math.sqrt(
                  Math.pow(centroid.lat - cyprusCentroid.lat, 2) +
                  Math.pow(centroid.lng - cyprusCentroid.lng, 2)
                );
                if (cyprusDistance < 0.5) {
                  country = 'cyprus';
                  console.log('Forced Cyprus match by centroid fallback');
                } else {
                  console.log(`No coordinate match found - keeping original country: ${country}`);
                }
            }
          }
        }

        // Ensure we have a valid country before proceeding
        if (!country || country === '') {
          console.warn("Could not determine country from clicked polygon");
          return;
        }

        // Normalize country name for matching
        const normalizedCountry = country.replace(/\s+/g, '').toLowerCase();

        // Debug: log all available city country names for troubleshooting
        if (cities && Array.isArray(cities)) {
          console.log("Available cities countries:", cities.map(c => c.country));
          // Warn if the detected country is not in the cities list
          const allCountries = cities.map(c => c.country && c.country.replace(/\s+/g, '').toLowerCase());
          if (!allCountries.includes(normalizedCountry)) {
            console.warn(
              `Country "${country}" detected, but not found in cities data. ` +
              `Add "${country.charAt(0).toUpperCase() + country.slice(1)}" to your cities array for correct linking.`
            );
          }
        }

        const targetCity = cities?.find(
          (city) =>
            city.country &&
            city.country.replace(/\s+/g, '').toLowerCase() === normalizedCountry
        );
        
        console.log("Final country for search:", country);
        console.log("Found target city:", targetCity);
        
        if (targetCity && targetCity.url) {
          window.open(targetCity.url, "_blank");
        } else {
          console.warn(`No city found for country: ${country}`);
          // Fallback: open /destination?country={country}
          if (country) {
            window.open(`/destination?country=${encodeURIComponent(normalizedCountry)}`, "_blank");
          }
        }
      }
    });

    return () => {
      if (globeInstanceRef.current) {
        globeInstanceRef.current.onPolygonClick(null);
      }
    };
  }, [cities]);

  // Force the globe to stay in position
  useEffect(() => {
    // This is a backup to make sure the globe stays in place
    // It resets the view to the initial position periodically
    if (!globeInstanceRef.current) return;
    
    // Reset the view every second (overkill but ensures it stays fixed)
    const updateViewByDevice = () => {
      const isMobile = window.innerWidth < 768;
      const europeView = isMobile 
        ? { lat: 54, lng: 5, altitude: 1.1 }  // Mobile view
        : { lat: 62, lng: 10, altitude: 1.1 }; // Desktop/tablet view
      
      if (globeInstanceRef.current) {
        globeInstanceRef.current.pointOfView(europeView, 0);
      }
    };
    
    // Set initial view
    updateViewByDevice();
    
    // Continue setting view periodically
    const intervalId = setInterval(updateViewByDevice, 1000);
    
    // Also update when window resizes
    window.addEventListener('resize', updateViewByDevice);
    
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', updateViewByDevice);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        backgroundColor: "rgba(0,0,0,1)" // Black background to prevent any grey flash
      }}
      className={`relative w-full overflow-hidden h-[1000] md:${dimensions.height}px`}
    >
      {/* Background placeholder to prevent grey flash */}
      <div className="absolute inset-0 z-0 bg-black"></div>
      
      {/* Single video playing in loop */}
      <video
        ref={videoRef}
        className="absolute inset-0 object-cover w-full h-full z-1"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Loading indicator - show while video is loading */}
      {!videoLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="text-lg text-white">Loading...</div>
        </div>
      )}

      {/* Globe container */}
      <div
        ref={globeRef}
        className="relative z-20"
        style={{
          width: "100%",
          height: "200%",
          maxWidth: "100vw",
          // Allow pointer events for country clicks
          pointerEvents: "auto" 
        }}
      />
    </div>
  );
};

export default GlobeComponent;