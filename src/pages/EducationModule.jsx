import React,{ useState } from "react";
import Navbar from '../components/Navbar'; // Import the Navbar component
import "./EducationModule.css"; // Import the CSS file for styling
import Footer from "../components/Footer";
import BG from '../assets/BGG.jpg';

const EducationModule = () => {

  const [currentIndex, setCurrentIndex ] = useState(0);

  // Sample educational resources (you can replace this with dynamic data)
  const News=[
    {url:"https://www.icimod.org/wp-content/uploads/302042345_451246337032785_4783566089841697782_n.jpg", title:""},
    {url:"https://idsb.tmgrup.com.tr/ly/uploads/images/2021/03/30/103883.jpg", title:""},
    {url:"https://assets-cdn.kathmandupost.com/uploads/source/news/2020/news/DTezpgIVMAAXM-1603301636.jpg", title:""},
    {url:"https://assets-cdn.kathmandupost.com/uploads/source/news/2023/news/polutionphoto-1699320782.jpg", title:""},
    {url:"https://assets-cdn.kathmandupost.com/uploads/source/news/2023/opinion/downPostFilePhotoHemantaShrestha-1693965360.jpg", title:""},
  ]

  const news=[
    {
      id: 1,
      title: "Dirty and Dangerous",
      link: "https://kathmandupost.com/editorial/2025/01/20/dirty-and-dangerous",
      img: "https://assets-api.kathmandupost.com/thumb.php?src=https://assets-cdn.kathmandupost.com/uploads/source/news/2025/opinion/POLLUTIONCHANDRAGIRIROAD01302019MG5019-1737382832.jpg&w=900&height=601",
    },
    {
      id:2,
      title:"Bad Air and Polluted Politics",
      link:"https://nepalitimes.com/here-now/bad-air-and-polluted-politics",
      img:"https://publisher-publish.s3.eu-central-1.amazonaws.com/pb-nepalitimes/swp/asv65r/media/2024082916088_402651a446551098b08eac91d3aabc16b8562b17e18ea3c40953d272e0c54436.webp",
    },
    {
      id:3,
      title:"Air Pollution Increasing in Kathmandu",
      link:"https://thehimalayantimes.com/kathmandu/air-pollution-increasing-in-kathmandu-valley",
      img:"https://cdn4.premiumread.com/?url=https://thehimalayantimes.com/thehimalayantimes/uploads/images/2025/01/06/37187.jpeg&w=800&q=100&f=jpg",
    },
    {
      id:4,
      title:"Wild Fires Worsening Air Pollution",
      link:"https://risingnepaldaily.com/news/57350",
      img:"https://risingnepaldaily.com/storage/media/71472/Untitled-1.jpg",
    },
    {
      id:5,
      title:"Pollution LevelR ises As Winter Sets In",
      link:"https://www.aninews.in/news/world/asia/pollution-level-in-nepal-rises-as-winter-sets-in-concerns-mount-over-health-risks20241017135455/",
      img:"https://aniportalimages.s3.amazonaws.com/media/details/ANI-20241017075628.jpg",
    },
    {
      id:6,
      title:"Pokhara Records Highest Air Pollution",
      link:"https://english.onlinekhabar.com/pokhara-records-highest-air-pollution-in-nepal-today.html",
      img:"https://english.onlinekhabar.com/wp-content/uploads/2025/01/Pokhara-pumdikot-Himalayas-7.jpg",
    },
    {
      id: 7,
      title:"Kathmandu Valley Air Quality Drops",
      link:"http://kathmandupost.com/climate-environment/2024/11/15/kathmandu-valley-s-air-quality-drops-as-stubble-burning-starts-in-india-and-nepal",
      img:"https://assets-api.kathmandupost.com/thumb.php?src=https://assets-cdn.kathmandupost.com/uploads/source/news/2024/health/Untitled4-1731634559.jpg&w=900&height=601",
    },
    {
      id: 8,
      title:"Air pollution in Shankha Park worst",
      link:"https://myrepublica.nagariknetwork.com/news/air-pollution-in-shankha-park-worst-82-77.html",
      img:"https://republicaimg.nagariknewscdn.com/shared/web/uploads/media/pollution_20191115080506.jpg",
    }
  ]

  const containerStyle={
    width: '1200px',
    height: '580px',
    margin: '0 auto',
  };

  const sliderStyle={
    height: '100%',
    position: 'relative',
  };

  const slideStyle={
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    borderRadius: '10px',
    backgroundSize: 'cover',
    backgroundImage:`url(${News[currentIndex].url})`,
  }

  const Left={
    position: 'absolute',
    top: '50%',
    left: '10px',
    transform: 'translateY(0,-50%)',
    left:'32px',
    fontSize: '24px',
    cursor: 'pointer',
    color:'#fff',
    zIndex: 1,
  }
  const Right={
      position: 'absolute',
      top: '50%',
      left: '10px',
      transform: 'translateY(0,-50%)',
      left:'1140px',
      fontSize: '24px',
      cursor: 'pointer',
      color:'#fff',
      zIndex: 1,
  }
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? News.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === News.length - 1 ? 0 : prevIndex + 1
    );
  };
  const resources = [
    {
      id: 1,
      title: "Understanding Air Quality Index (AQI)",
      description: "Learn about what AQI is, how it is calculated, and its significance.",
      link: "https://www.epa.gov/air-quality-index",
    },
    {
      id: 2,
      title: "Effects of Air Pollution on Health",
      description: "Explore the health impacts of poor air quality and how to protect yourself.",
      link: "https://www.who.int/health-topics/air-pollution",
    },
    {
      id: 3,
      title: "Air Quality Monitoring in Nepal",
      description: "Discover how air quality is monitored in Nepal and the challenges faced.",
      link: "https://nepalairquality.com",
    },
  ];

  return (
    <div className="education-module" style={{ backgroundImage: `url(${BG})` }}>
      <Navbar /> {/* Include the Navbar */}
      <div style={containerStyle}>
        <div style={sliderStyle}>
          <div style={Left} onClick={goToPrevious}>⮜</div>
          <div style={Right} onClick={goToNext}>⮞</div>
          <div style={slideStyle}></div>
        </div>
      </div>
      <div className="news-content">
        <h1 className="newshead">News Regarding Air Quality</h1>
        <div className="news-list">
          {news.map((newz) =>(
            <div key={newz.id} className="news-card">
              <img src={newz.img} alt={newz.title} />
              <h2>{newz.title}</h2>
              <a href={newz.link} target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="education-content">
        <h1>Educational Resources on Air Quality</h1>
        <p>
          Explore educational materials and resources to learn more about air quality and its impact
          on health and the environment.
        </p>
  
        <div className="resource-list">
          {resources.map((resource) => (
            <div key={resource.id} className="resource-card">
              <h2>{resource.title}</h2>
              <p>{resource.description}</p>
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-link"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EducationModule;