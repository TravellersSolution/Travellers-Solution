import React, { useMemo } from 'react';
import Tourist1 from "../../assets/images/Tourist1.png";
import { tourismData } from './tourismData'; // Import your data

// Import all images from the destination images directory using Vite's import.meta.glob
const imageModules = import.meta.glob('../../assets/images/destinationimages/**/*.{png,jpg,jpeg,svg,avif}', { eager: true });

// Process the imported images to create a lookup object
const images = {};
Object.entries(imageModules).forEach(([path, module]) => {
  const relativePath = path.replace('../../assets/images/', '');
  images[relativePath] = module.default;
});

const CountryOverview = ({ country }) => {
  // Find the country data
  const countryData = tourismData.find(data => 
    data.country.toLowerCase() === country?.toLowerCase()
  );

  // Find the tourism at glance image for the country (handles different extensions)
  const tourismImage = useMemo(() => {
    if (!country) return null;
    const tourismImageKey = Object.keys(images).find(key => 
      key.includes(`destinationimages/${country}/tourismatgalnce.`) || 
      key.includes(`destinationimages/${country.toLowerCase()}/tourismatgalnce.`)
    );
    return tourismImageKey ? images[tourismImageKey] : null;
  }, [country]);

  // Fallback if country not found
  if (!countryData) {
    return (
      <div className="p-6 text-center">
        <p>Country information not available for {country}</p>
      </div>
    );
  }

  const { description, basicInfo } = countryData;

  return (
    <div className="flex flex-col h-auto px-2 mt-12 overflow-hidden shadow-lg md:mt-20 md:p-10 md:flex-row bg-red-50 md:mx-40 md:rounded-3xl">
      <div className="p-6 md:w-2/3">
        <h2 className="text-2xl font-bold text-red-600">Tourism at glance</h2>
        <p className="mt-3 leading-relaxed text-gray-700">
          {description}
        </p>

        <h3 className="mt-5 text-xl font-bold text-black">Key Information</h3>
        <div className="grid grid-cols-1 gap-4 mt-3 md:grid-cols-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700">Capital: {basicInfo.capital}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700">Currency: {basicInfo.currency}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700">Language: {basicInfo.officialLanguage}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700">Time Zone: {basicInfo.timeZone}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700">Voltage: {basicInfo.voltage} (Type {basicInfo.plugTypes.join(' & ')} plugs)</span>
          </div>
          {basicInfo.otherLanguages.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Other Languages: {basicInfo.otherLanguages.join(', ')}</span>
            </div>
          )}
        </div>
      </div>
      {/* Image section */}
      <div className="h-[250px] md:w-1/3 md:h-full">
        <img
          src={tourismImage}
          alt={`${country} Landscape`}
          className="object-cover w-full h-full md:rounded-r-3xl"
          style={{ height: "380px" }}
        />
      </div>
    </div>
  );
};

export default CountryOverview;