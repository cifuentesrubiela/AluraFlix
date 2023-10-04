import React, { useState } from "react";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactPlayer from "react-player";

const invertColor = (hex) => {
  if (!/^#([0-9A-F]{3}){1,2}$/i.test(hex)) {
    throw new Error("Color no válido");
  }

  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 255;
  const g = (rgb >> 8) & 255;
  const b = rgb & 255;

  const invertedR = 255 - r;
  const invertedG = 255 - g;
  const invertedB = 255 - b;

  const invertedHex = `#${((invertedR << 16) | (invertedG << 8) | invertedB)
    .toString(16)
    .padStart(6, "0")}`;

  return invertedHex;
};

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  
  
  
`;

const CarouselContainer = styled.div`
  width: 90%;
  height: 700px;
  margin-bottom: 70px;
  background: linear-gradient(rgba(250, 70, 175, 0.5), rgba(0, 100,  , 0.5)),
              ${(props) => props.color}; /* Fondo de vidrio + color personalizado */
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.9); /* Sombra 3D */
  
`;


const CategoryTitleButton = styled.div`
  width: 20%;
  text-align: center;
  background-color: ${(props) => invertColor(props.color)};
  padding: 10px 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
  color: #fff;
`;

const CategoryTitle = styled.h2`
margin-top: 5px;
  font-size: 24px;
  text-align: center;
  color: ${(props) => {
    const validColor = /^#([0-9A-F]{3}){1,2}$/i.test(props.color)
      ? props.color
      : "#f9fcfa"; // Valor predeterminado en caso de que no sea válido
    return invertColor(validColor);
  }};
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 7px;
`;

const NavigationButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
`;


const VideoCard = styled.div`
  width: 90%;
  height: 450px;
  margin: 10px;
  border: 5px solid ${(props) => invertColor(props.color)};
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 1.2);
  cursor: pointer;
  overflow: hidden;
  position: relative;
  max-height: 600px;
  transition: transform 0.5s ease, box-shadow 0.5s ease,
    transform-origin 0.5s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const CardImage = styled.img`
  width: 100%;
  max-width: 100%;
  object-fit: cover;
`;

const CardTitle = styled.div`
  padding: 5px;
  font-weight: bold;
  text-align: center;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Miniature = styled.div`
  width: 100px;
  height: 60px;
  margin-right: 20px;
  background-image: url(${(props) => props.thumbnail});
  background-size: cover;
`;

const MiniaturesContainer = styled.div`
  display: flex;
  overflow-x: auto;
  margin: 0 20px;
  align-items: flex-end;
`;

const IndicatorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`;

const IndicatorDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${(props) => (props.isselected ? "#007bff" : "#ccc")};
  border-radius: 50%;
  margin: 0 10px;
  cursor: pointer;
`;

const CustomCarousel = ({ categoria, videos }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const categoriaVideos = videos.filter(
    (video) => video.categoria === categoria.nombre
  );

  const playVideo = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const stopVideo = () => {
    setSelectedVideo(null);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < categoriaVideos.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <CarouselWrapper>
      <CarouselContainer color={categoria.color}>
        <CategoryTitleButton color={categoria.color}>
          {categoria.nombre}
        </CategoryTitleButton>
        <CategoryTitle>{categoria.nombre}</CategoryTitle>
        <MiniaturesContainer>
          {categoriaVideos.map((video, index) => (
            <Miniature
              key={video.id}
              thumbnail={video.linkImagen}
              onClick={() => setCurrentPage(index)}
            />
          ))}
        </MiniaturesContainer>
        <Carousel
          centerMode={true}
          centerSlidePercentage={30}
          showArrows={true}
          showThumbs={false}
          selectedItem={currentPage}
          onChange={(index) => setCurrentPage(index)}
          showIndicators={false} 
        >
          {categoriaVideos.map((video, index) => (
            <div key={video.id}>
              
              <VideoCard
               
                color={categoria.color}
                onClick={() => playVideo(video.linkVideo)}
              >
                {selectedVideo === video.linkVideo ? (
                  <ReactPlayer
                    url={video.linkVideo}
                    playing
                    controls
                    width="100%"
                    height="100%"
                    onPause={stopVideo}
                    onEnded={stopVideo}
                  />
                ) : (
                  <>
                    <CardImage
                      src={video.linkImagen}
                      alt={`Image ${index}`}
                    />
                    <CardTitle>{video.titulo}</CardTitle>
                  </>
                )}
                
              </VideoCard>
               
            </div>
          ))}
        </Carousel>

        <NavigationButtons>
          <NavigationButton onClick={handlePreviousPage}>
            Previous
          </NavigationButton>
          <NavigationButton onClick={handleNextPage}>Next</NavigationButton>
        </NavigationButtons>

        {/* Agregar indicadores al fondo del contenedor */}
        <IndicatorContainer>
          {categoriaVideos.map((video, index) => (
            <IndicatorDot
              key={index}
              isSelected={currentPage === index}
              onClick={() => setCurrentPage(index)}
              />
            ))}
          </IndicatorContainer>
        </CarouselContainer>
      </CarouselWrapper>
    );
  };
  
  export default CustomCarousel;
  




