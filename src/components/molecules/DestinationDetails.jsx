import React, { useMemo, useState} from 'react';
import Header from './Header';
import { useParams } from 'react-router-dom';
import { tourismData } from './tourismData';
import HeroSection from './DestinationHeroImageComponent';
import { FaPlus, FaMinus } from 'react-icons/fa';
import ResponsiveFooter from '../molecules/ResponsiveFooter'

const DestinationDetails = () => {
  const { country } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const countryData = useMemo(() => 
  tourismData.find(data => data.country.toLowerCase() === country?.toLowerCase()), [country]);
  if (!countryData) {
    return (
      <div className="p-6 text-center text-red-600">
        <p>No information found for {country}.</p>
      </div>
    );
  }
  const { description, basicInfo, popularAttractions, faq, packages } = countryData;
  
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqCategories = [
    {
      title: 'Famous For',
      content: faq.famousFor.join(', ')
    },
    {
      title: 'Entry Requirements',
      content: faq.entryRequirements
    },
    {
      title: 'Tipping',
      content: faq.tipping
    },
    {
      title: 'Weather',
      content: (
        <ul className="list-disc list-inside space-y-1">
          <li><b>Winter ({faq.weather.winter.months}):</b> {faq.weather.winter.description}, {faq.weather.winter.temperature}</li>
          <li><b>Summer ({faq.weather.summer.months}):</b> {faq.weather.summer.description}, {faq.weather.summer.temperature}</li>
        </ul>
      )
    },
    {
      title: 'Best Time to Visit',
      content: (
        <ul className="list-disc list-inside space-y-1">
          <li><b>Winter:</b> {faq.bestTimeToVisit.winter}</li>
          <li><b>Spring/Summer:</b> {faq.bestTimeToVisit.springSummer}</li>
        </ul>
      )
    }
  ];

  return (
    <>
      <Header/>
      <HeroSection 
        title={country} 
        description={description} 
        image={`/src/assets/images/destinationimages/${country}/hero.jpeg`}
        basicInfo={basicInfo}
      />
      <div className="w-full py-12 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="mb-12 text-base text-gray-900">
            {description}
          </h1>
          <div className="flex flex-col md:flex-row gap-10 mt-12">
          <div className="md:w-1/2 space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ textAlign: 'left' }}>Popular Attractions</h2>
            <ul className="space-y-6">
              {popularAttractions.map((item, index) => (
                <li key={index} className="flex gap-5 items-start" style={{ textAlign: 'left' }}>
                  
                  {/* Icon Section */}
                  <div className="flex-shrink-0 bg-orange-500 rounded-full p-4 flex items-center justify-center shadow-md">
                    {item.icon}
                  </div>
                  
                  {/* Text Section */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600 mt-1">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2 flex justify-center items-center">
            <img
              src={`/src/assets/images/destinationimages/${country}/popularattraction.jpg`}
              alt="Snow Adventure"
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
    <div className="w-full py-12 bg-white" style={{backgroundImage: 'url(/src/assets/images/bg2.jpg)',backgroundSize: 'cover',backgroundPosition: 'center'}}>
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex flex-col md:flex-row gap-10 mt-12">
          <div className="md:w-1/2 flex justify-center items-center">
            <img
              src={`/src/assets/images/destinationimages/${country}/faq.jpg`}
              alt="Snow Adventure"
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-1/2 space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ textAlign: 'left' }}>Frequently ask questions</h2>
            <div className="space-y-4">
              {faqCategories.map((item, index) => (
                <div key={index} className="bg-white rounded-md shadow-sm">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex justify-between items-center w-full text-left p-6 font-semibold text-xl text-blue-900"
                  >
                    <span>{item.title}</span>
                    <span className="text-orange-500 rounded-full p-2 bg-orange-100">
                      {activeIndex === index ? <FaMinus /> : <FaPlus />}
                    </span>
                  </button>
                  {activeIndex === index && (
                    <div className="px-6 pb-6 text-gray-700 text-base leading-relaxed text-left">
                      {item.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div className="w-full py-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Recommended Packages</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {packages && packages.map((pkg, index) => (
            <li key={index} className="relative flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden min-h-[320px]">
              {/* Left: Text Section */}
              <div className="flex-1 p-8 flex flex-col justify-between z-10">
                <div>
                  <h4 className="font-bold text-xl mb-2">{pkg.title}</h4>
                  {/* Star rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(pkg.stars || 3)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">&#9733;</span>
                    ))}
                  </div>
                  <div className="flex items-baseline mb-2">
                    <span className="text-3xl font-bold text-gray-800">{pkg.price}</span>
                    <span className="ml-2 text-gray-500 text-lg">per night</span>
                  </div>
                  <p className="text-gray-600 mb-6">{pkg.description}</p>
                </div>
                {/* <div className="flex items-center justify-between">
                  <a href={pkg.link || "#"} className="text-blue-600 font-semibold">READ MORE</a>
                  <button className="bg-yellow-400 text-white font-bold px-6 py-2 rounded shadow hover:bg-yellow-500 transition">BOOK NOW</button>
                </div> */}
              </div>
              {/* Right: Image Section */}
              <div className="relative flex-1 min-h-[320px] flex items-end">
                <img
                  src={pkg.image || `https://html.cwsthemes.com/suntour/pic/recomended/3@2x.jpg`}
                  alt={pkg.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ zIndex: 0 }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-0"></div>
                {/* Discount badge */}
                {pkg.discount && (
                  <div className="absolute top-6 left-6 bg-yellow-400 text-white font-bold px-4 py-2 rounded-tr-lg rounded-bl-lg text-lg z-10">
                    {pkg.discount}
                  </div>
                )}
                {/* Location */}
                <div className="relative z-10 flex items-center mb-6 ml-6">
                  <span className="text-white text-lg mr-2">
                    <svg width="20" height="20" fill="currentColor"><path d="M10 2C6.686 2 4 4.686 4 8c0 4.418 6 10 6 10s6-5.582 6-10c0-3.314-2.686-6-6-6zm0 8.5A2.5 2.5 0 1 1 10 5a2.5 2.5 0 0 1 0 5.5z"/></svg>
                  </span>
                  <span className="text-white text-base font-medium">{pkg.location}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <ResponsiveFooter/>


    
    </>
  );
};

export default DestinationDetails;
