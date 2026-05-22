import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/images/Logo Sqaure.png';

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destinationsDropdownOpen, setDestinationsDropdownOpen] = useState(false);
  const [mobileDestinationsOpen, setMobileDestinationsOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleDropdownEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setDestinationsDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setDestinationsDropdownOpen(false);
    }, 150);
    setHoverTimeout(timeout);
  };

  return (
    <>
      {/* Top Bar - Made it fixed at the top of the page */}
      <div className="fixed top-0 left-0 right-0 z-50 items-center justify-end hidden w-full px-4 py-4 text-sm text-white bg-black md:flex md:px-10">
        <div className="flex items-center space-x-6 md:mr-12 lg:mr-48">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3C2.25 2.42 2.67 2 3.25 2H5.75C6.3 2 6.72 2.42 6.72 3C6.72 3.94 6.94 4.84 7.33 5.64C7.65 6.31 7.45 7.1 6.86 7.52L5.59 8.46C7.09 11.33 9.67 13.91 12.54 15.41L13.48 14.14C13.9 13.55 14.69 13.35 15.36 13.67C16.16 14.06 17.06 14.28 18 14.28C18.58 14.28 19 14.7 19 15.25V17.75C19 18.33 18.58 18.75 18 18.75C9.56 18.75 2.75 11.94 2.75 3.5V3Z"
              />
            </svg>
            <a href="tel:+919768004545" className="hover:underline">+91-9768004545</a>
          </div>
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5h18M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <a href="mailto:inquiry@travellerssolution.com" className="hover:underline">inquiry@travellerssolution.com</a>
          </div>
        </div>
      </div>

      {/* Add a spacer div to push content down on desktop */}
      <div className="hidden h-12 md:block"></div>

      {/* Main header with navigation */}
      <header className="relative w-full bg-white">
        <nav className="flex items-center justify-between px-4 py-1 bg-white md:px-10">
          <div 
            onClick={() => navigate('/')} 
            className="flex items-center space-x-2 text-lg font-bold text-blue-500 cursor-pointer md:ml-12 lg:ml-48"
          >
            <img className='w-33 h-17' src={Logo} alt="Logo" />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden space-x-6 font-medium text-gray-700 text-md md:flex md:mr-12 lg:mr-48">
            <li onClick={() => navigate('/')} className="cursor-pointer hover:text-blue-500">HOME</li>
            <li onClick={() => navigate('/about')} className="cursor-pointer hover:text-blue-500">ABOUT US</li>
            <li 
              className="relative"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <div className="flex items-center cursor-pointer hover:text-blue-500">
                DESTINATIONS
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={`w-3 h-3 ml-1 transition-transform duration-200 ${destinationsDropdownOpen ? 'rotate-180' : ''}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              
              {/* Megamenu */}
              {destinationsDropdownOpen && (
                <div 
                  className="fixed left-0 top-20 w-full z-50 flex justify-center mt-5"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className="w-full max-w-5xl mx-auto">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-2xl">
                      <div className="p-4 lg:p-6">
                        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                          <li><a href="/destination?country=andorra" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> Andorra</a></li>
                          <li><a href="/destination?country=austria" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> Austria</a></li>
                          <li><a href="/destination?country=belgium" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> Belgium</a></li>
                          <li><a href="/destination?country=croatia" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> Croatia</a></li>
                          <li><a href="/destination?country=cyprus" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> Cyprus</a></li>
                          <li><a href="/destination?country=czechia" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> Czechia</a></li>
                          <li><a href="/destination?country=denmark" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> Denmark</a></li>
                          <li><a href="/destination?country=finland" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> Finland</a></li>
                          <li><a href="/destination?country=france" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> France</a></li>
                          <li><a href="/destination?country=germany" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> Germany</a></li>
                          <li><a href="/destination?country=greece" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> Greece</a></li>
                          <li><a href="/destination?country=hungary" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> Hungary</a></li>
                          <li><a href="/destination?country=iceland" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> Iceland</a></li>
                          <li><a href="/destination?country=ireland" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> Ireland</a></li>
                          <li><a href="/destination?country=italy" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> Italy</a></li>
                          <li><a href="/destination?country=liechtenstein" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> Liechtenstein</a></li>
                          <li><a href="/destination?country=luxembourg" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> Luxembourg</a></li>
                          <li><a href="/destination?country=malta" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> Malta</a></li>
                          <li><a href="/destination?country=monaco" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> Monaco</a></li>
                          <li><a href="/destination?country=montenegro" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> Montenegro</a></li>
                          <li><a href="/destination?country=netherlands" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> Netherlands</a></li>
                          <li><a href="/destination?country=norway" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> Norway</a></li>
                          <li><a href="/destination?country=portugal" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> Portugal</a></li>
                          <li><a href="/destination?country=slovakia" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> Slovakia</a></li>
                          <li><a href="/destination?country=slovenia" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> Slovenia</a></li>
                          <li><a href="/destination?country=spain" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> Spain</a></li>
                          <li><a href="/destination?country=sweden" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> Sweden</a></li>
                          <li><a href="/destination?country=switzerland" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> Switzerland</a></li>
                          <li><a href="/destination?country=united-kingdom" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> United Kingdom</a></li>
                          <li><a href="/destination?country=vatican-city" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200"> Vatican City</a></li>
                          <li><a href="/destination?country=georgia" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200">Georgia</a></li>
                          <li><a href="/destination?country=armenia" className="block w-full text-left text-sm text-gray-600 hover:text-blue-500 hover:pl-2 transition-all duration-200">Armenia</a></li>
                          {/* View All */}
                          {/* <li className="col-span-full pt-2">
                            <a
                              href="/destinations/all"
                              className="text-sm font-medium text-blue-500 hover:text-blue-600"
                            >
                              View All Destinations →
                            </a>
                          </li> */}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </li>
            <li onClick={() => navigate('/contact-us')} className="cursor-pointer hover:text-blue-500">CONTACT US</li>
          </ul>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="text-blue-500 md:hidden"
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </nav>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute z-50 w-full bg-white shadow-lg md:hidden">
            <ul className="px-4 py-2 space-y-3 text-sm font-medium text-gray-700">
              <li 
                onClick={() => {
                  navigate('/');
                  setMobileMenuOpen(false);
                }} 
                className="py-2 border-b border-gray-100 cursor-pointer hover:text-blue-500"
              >
                HOME
              </li>
              <li 
                onClick={() => {
                  navigate('/about');
                  setMobileMenuOpen(false);
                }} 
                className="py-2 border-b border-gray-100 cursor-pointer hover:text-blue-500"
              >
                ABOUT US
              </li>
              <li className="border-b border-gray-100">
                <div 
                  onClick={() => setMobileDestinationsOpen(!mobileDestinationsOpen)}
                  className="flex items-center justify-between py-2 cursor-pointer hover:text-blue-500"
                >
                  DESTINATIONS
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`w-4 h-4 transition-transform duration-200 ${mobileDestinationsOpen ? 'rotate-180' : ''}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                
                {/* Mobile Destinations Submenu */}
                {mobileDestinationsOpen && (
                  <div className="pl-4 pb-2">
                    <ul className="grid grid-cols-2 gap-2">
                      <li><a href="/destination?country=andorra" className="block text-sm text-gray-600 hover:text-blue-500"> Andorra</a></li>
                      <li><a href="/destination?country=austria" className="block text-sm text-gray-600 hover:text-blue-500"> Austria</a></li>
                      <li><a href="/destination?country=belgium" className="block text-sm text-gray-600 hover:text-blue-500"> Belgium</a></li>
                      <li><a href="/destination?country=croatia" className="block text-sm text-gray-600 hover:text-blue-500"> Croatia</a></li>
                      <li><a href="/destination?country=cyprus" className="block text-sm text-gray-600 hover:text-blue-500"> Cyprus</a></li>
                      <li><a href="/destination?country=czechia" className="block text-sm text-gray-600 hover:text-blue-500"> Czechia</a></li>
                      <li><a href="/destination?country=denmark" className="block text-sm text-gray-600 hover:text-blue-500"> Denmark</a></li>
                      <li><a href="/destination?country=finland" className="block text-sm text-gray-600 hover:text-blue-500"> Finland</a></li>
                      <li><a href="/destination?country=france" className="block text-sm text-gray-600 hover:text-blue-500"> France</a></li>
                      <li><a href="/destination?country=germany" className="block text-sm text-gray-600 hover:text-blue-500"> Germany</a></li>
                      <li><a href="/destination?country=greece" className="block text-sm text-gray-600 hover:text-blue-500"> Greece</a></li>
                      <li><a href="/destination?country=hungary" className="block text-sm text-gray-600 hover:text-blue-500"> Hungary</a></li>
                      <li><a href="/destination?country=iceland" className="block text-sm text-gray-600 hover:text-blue-500"> Iceland</a></li>
                      <li><a href="/destination?country=ireland" className="block text-sm text-gray-600 hover:text-blue-500"> Ireland</a></li>
                      <li><a href="/destination?country=italy" className="block text-sm text-gray-600 hover:text-blue-500"> Italy</a></li>
                      <li><a href="/destination?country=liechtenstein" className="block text-sm text-gray-600 hover:text-blue-500"> Liechtenstein</a></li>
                      <li><a href="/destination?country=luxembourg" className="block text-sm text-gray-600 hover:text-blue-500"> Luxembourg</a></li>
                      <li><a href="/destination?country=malta" className="block text-sm text-gray-600 hover:text-blue-500"> Malta</a></li>
                      <li><a href="/destination?country=monaco" className="block text-sm text-gray-600 hover:text-blue-500"> Monaco</a></li>
                      <li><a href="/destination?country=montenegro" className="block text-sm text-gray-600 hover:text-blue-500"> Montenegro</a></li>
                      <li><a href="/destination?country=netherlands" className="block text-sm text-gray-600 hover:text-blue-500"> Netherlands</a></li>
                      <li><a href="/destination?country=norway" className="block text-sm text-gray-600 hover:text-blue-500"> Norway</a></li>
                      <li><a href="/destination?country=portugal" className="block text-sm text-gray-600 hover:text-blue-500"> Portugal</a></li>
                      <li><a href="/destination?country=slovakia" className="block text-sm text-gray-600 hover:text-blue-500"> Slovakia</a></li>
                      <li><a href="/destination?country=slovenia" className="block text-sm text-gray-600 hover:text-blue-500"> Slovenia</a></li>
                      <li><a href="/destination?country=spain" className="block text-sm text-gray-600 hover:text-blue-500"> Spain</a></li>
                      <li><a href="/destination?country=sweden" className="block text-sm text-gray-600 hover:text-blue-500"> Sweden</a></li>
                      <li><a href="/destination?country=switzerland" className="block text-sm text-gray-600 hover:text-blue-500"> Switzerland</a></li>
                      <li><a href="/destination?country=united-kingdom" className="block text-sm text-gray-600 hover:text-blue-500"> United Kingdom</a></li>
                      <li><a href="/destination?country=vatican-city" className="block text-sm text-gray-600 hover:text-blue-500"> Vatican City</a></li>
                      <li><a href="/destination?country=georgia" className="block text-sm text-gray-600 hover:text-blue-500">Georgia</a></li>
                      <li><a href="/destination?country=armenia" className="block text-sm text-gray-600 hover:text-blue-500">Armenia</a></li>
                      <li className="col-span-full pt-2">
                        <a
                          href="/destinations/all"
                          className="text-sm font-medium text-blue-500 hover:text-blue-600"
                        >
                          View All Destinations →
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
              <li 
                onClick={() => {
                  navigate('/contact-us');
                  setMobileMenuOpen(false);
                }} 
                className="py-2 border-b border-gray-100 cursor-pointer hover:text-blue-500"
              >
                CONTACT US
              </li>
            </ul>
            
            {/* Mobile Contact Info */}
            <div className="px-4 py-3 mt-4 text-xs text-gray-600 bg-gray-50">
              <div className="flex items-center mb-2 space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3C2.25 2.42 2.67 2 3.25 2H5.75C6.3 2 6.72 2.42 6.72 3C6.72 3.94 6.94 4.84 7.33 5.64C7.65 6.31 7.45 7.1 6.86 7.52L5.59 8.46C7.09 11.33 9.67 13.91 12.54 15.41L13.48 14.14C13.9 13.55 14.69 13.35 15.36 13.67C16.16 14.06 17.06 14.28 18 14.28C18.58 14.28 19 14.7 19 15.25V17.75C19 18.33 18.58 18.75 18 18.75C9.56 18.75 2.75 11.94 2.75 3.5V3Z"
                  />
                </svg>
                <a href="tel:+919768004545" className="hover:underline">+91-9768004545</a>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5h18M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a href="mailto:inquiry@travellerssolution.com" className="hover:underline">inquiry@travellerssolution.com</a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};


export default Header;
