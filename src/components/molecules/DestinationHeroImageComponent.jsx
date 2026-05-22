import { useLocation } from "react-router-dom";

const DestinationHeroImageComponent = ({image, title, description, basicInfo }) => {
  const words = title.split(" ");
  const midIndex = Math.ceil(words.length / 2);
  const firstLine = words.slice(0, midIndex).join(" ");
  //const secondLine = words.slice(midIndex).join(" ");
  const location = useLocation();
  const isAboutPage = location.pathname.includes('about')|| location.search.includes('about'); 
  const isDestinationPage = location.pathname.includes('destination') || location.search.includes('destination') 
  return (
    <div className="relative w-full h-[300px] md:h-[500px] flex items-center justify-center text-white text-center" style={{ backgroundImage: `url(${image})`, backgroundSize: "cover",}}>
      <div className="absolute inset-0 bg-opacity-30"></div>
      <div className="relative z-10">
        <h1 className="text-3xl font-bold w-full md:w-[800px] md:text-6xl" style={{width:'100%', marginBottom: '10px'}}>{isDestinationPage ? `Travel to ${firstLine}` : firstLine} </h1>
        {(!isDestinationPage && !isAboutPage) && description && (
          <p className="mt-2 text-lg md:text-xl">{description}</p>
        )}
        <div style={{width:'100%', backgroundColor:'#00000059', padding:'6px 10px'}} >
        <div className="flex-1">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-800" style={{color:'#fff', textAlign:'left'}}>
                        <li><b>Capital:</b> {basicInfo.capital}</li>
                        <li><b>Currency:</b> {basicInfo.currency}</li>
                        <li><b>Voltage:</b> {basicInfo.voltage}</li>
                        <li><b>Plug Types:</b> {basicInfo.plugTypes.join(', ')}</li>
                        <li><b>Time Zone:</b> {basicInfo.timeZone}</li>
                        <li><b>Official Language:</b> {basicInfo.officialLanguage}</li>
                        {basicInfo.otherLanguages.length > 0 && (
                            <li><b>Other Languages:</b> {basicInfo.otherLanguages.join(', ')}</li>
                        )}
                    </ul>
                </div>
      </div>
      </div>
      
    </div>
  );
};
export default DestinationHeroImageComponent;

