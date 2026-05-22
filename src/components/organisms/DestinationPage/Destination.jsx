import React, {useMemo} from 'react';
import { tourismData } from '../../molecules/tourismData';
import HeroSection from '../../molecules/HeroImageComponent';
import { useLocation } from 'react-router-dom';
import Header from '../../molecules/Header';
import CountryInfo from '../../molecules/CountryInfo';
import TravelPage from '../../molecules/TouristPlaces';
import TravelSection from '../../molecules/TravelSection';
import Footer from '../../molecules/Footer';
import CountryOverview from '../../molecules/CountryOverview';
import HistoryAndCulture from '../../molecules/HistoryAndCulture';
import CountryFAQ from '../../molecules/CountryFAQ';
import DesktopTabletFooter from '../../molecules/DesktopFooter';
import ResponsiveFooter from '../../molecules/ResponsiveFooter';

// Import all images from the destination images directory using Vite's import.meta.glob
const imageModules = import.meta.glob('../../../assets/images/destinationimages/**/*.{png,jpg,jpeg,svg,avif}', { eager: true });

// Process the imported images to create a lookup object
const images = {};
Object.entries(imageModules).forEach(([path, module]) => {
  const relativePath = path.replace('../../../assets/images/', '');
  images[relativePath] = module.default;
});

const Destination = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const country = queryParams.get('country')?.toLowerCase();
  const countryData = useMemo(() => tourismData.find(data => data.country.toLowerCase() === country?.toLowerCase()), [country]);

  // Find the hero image for the country (handles different extensions)
  const heroImage = useMemo(() => {
    if (!country) return null;
    const heroImageKey = Object.keys(images).find(key => 
      key.includes(`destinationimages/${country}/hero.`) || 
      key.includes(`destinationimages/${country.toLowerCase()}/hero.`)
    );
    return heroImageKey ? images[heroImageKey] : null;
  }, [country]);
  
  if (!countryData) {
    return (
      <div className="p-6 text-center text-red-600">
        <p>No information found for {country}.</p>
      </div>
    );
  }
  
  return (
    <>
      <Header />
      <HeroSection title={country} description={"Enjoy your holiday with us"} image={heroImage} />
      <CountryOverview country={country}  />
      <HistoryAndCulture country={country} />
      <CountryFAQ country={country} />
      <TravelPage country={country} />
      {/* <TravelSection title={country}/> */}
      <ResponsiveFooter />
    </>
  );
}

export default Destination;
