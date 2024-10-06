import { useState, useEffect, useRef } from "react";
import ContainerMain from "../../Layouts/ContainerMain";
import ScreenContainer from "../../Layouts/ScreenContainer";
import Pic from "../../assets/home.jpg";
import debounce from "lodash.debounce";
import "./home.css";

const styles = {
  backgroundImage: `url("https://images.pexels.com/photos/3053017/pexels-photo-3053017.jpeg")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

export default function Home() {
  return (
    <>
      <div
        style={styles}
        className="relative w-full h-screen flex justify-center"
      >
        <ContainerMain>
          <div className="absolute top-32 flex flex-col items-center px-8">
            <h1 className="font-display mt-10 sm:mt-20 text-6xl sm:text-9xl font-bold text-cyan-800">
              MyTinerary
            </h1>
            <p className="text-center sm:w-4/6 font-extrabold text-sm sm:text-3xl sm:mt-8 tracking-wide text-slate-700 sm:text-gray-300">
              Find your perfect trip, designed by insiders who know and love
              their cities
            </p>
          </div>
        </ContainerMain>
      </div>
      {/* <ScreenContainer classToAdd={"bg-cyan-800"}>
        <div className="flex flex-col sm:flex-row justify-between p-10">
          <div>
            <h3 className="font-display text-center sm:w-4/6 font-extrabold text-sm sm:text-3xl sm:mt-8 tracking-wide text-slate-700 sm:text-gray-300">
              Explore the World! adventure today!
            </h3>
            <p className="text-center sm:w-4/6 font-extrabold text-sm sm:text-3xl sm:mt-8 tracking-wide text-slate-700 sm:text-gray-300">
              Check out available cities and book your next
            </p>
          </div>
          <Carousel></Carousel>
        </div>
      </ScreenContainer> */}
      <ScreenContainer>
        <CarouselTwo></CarouselTwo>
      </ScreenContainer>

      {/* <div style={styles} className="h-screen w-screen flex justify-center">
        <ContainerMain></ContainerMain>
      </div> */}
    </>
  );
}

const images = [
  // Coloca las URLs de tus imágenes aquí
  "https://images.pexels.com/photos/15109259/pexels-photo-15109259/free-photo-of-silhouetted-part-of-the-chureito-pagoda-and-mount-fuji-in-the-background-fujiyoshida-japan.jpeg",
  "https://images.pexels.com/photos/12910823/pexels-photo-12910823.jpeg",
  "https://images.pexels.com/photos/6294532/pexels-photo-6294532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/27428519/pexels-photo-27428519/free-photo-of-the-roman-colosseum-in-rome-italy.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/912897/pexels-photo-912897.jpeg",
  "https://images.pexels.com/photos/1929611/pexels-photo-1929611.jpeg",
  "https://images.pexels.com/photos/12238221/pexels-photo-12238221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.unsplash.com/photo-1466442929976-97f336a657be?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.pexels.com/photos/3290070/pexels-photo-3290070.jpeg",
  "https://images.pexels.com/photos/1682794/pexels-photo-1682794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/19283363/pexels-photo-19283363/free-photo-of-taxis-on-street-in-hong-kong.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/15009437/pexels-photo-15009437/free-photo-of-ferryboat-cruising-near-the-sydney-opera-house.jpeg",
];

const Carousel = () => {
  const [currentSection, setCurrentSection] = useState(0);

  // Divide las imágenes en secciones de 4
  const sections = [
    images.slice(0, 4),
    images.slice(4, 8),
    images.slice(8, 12),
  ];

  // // Cambiar sección automáticamente cada 4 segundos
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("Se ejecuto carrousel");

  //     setCurrentSection((prevSection) => (prevSection + 1) % sections.length);
  //   }, 4000); // Cambia cada 4 segundos

  //   // Limpia el intervalo cuando el componente se desmonta
  //   return () => clearInterval(interval);
  // }, [sections.length]);

  return (
    <div className="grid grid-rows-1 grid-cols-1 sm:grid-cols-4 gap-4 ">
      {sections[currentSection].map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Imagen ${index + 1}`}
          className="h-full w-full object-cover"
        />
      ))}

      {/* <div className="carousel-controls">
        {sections.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${
              index === currentSection ? "active" : ""
            }`}
            onClick={() => setCurrentSection(index)}
          />
        ))}
      </div> */}
    </div>
  );
};

const CarouselTwo = () => {
  const carouselRef = useRef(null);
  const [scrollAmount, setScrollAmount] = useState(0);
  const [step, setStep] = useState(0);
  const [maxScrollAmount, setMaxScrollAmount] = useState(0);

  // Estados para la funcionalidad de arrastrar
  const isDragging = useRef(false);
  const startX = useRef(0);
  const initialScroll = useRef(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const text = (
    <div className="carousel-text flex flex-col sm:flex-row justify-between p-10">
      <div>
        <h3 className="font-display text-center sm:w-4/6 font-extrabold text-sm sm:text-3xl sm:mt-8 tracking-wide text-slate-700 sm:text-gray-300">
          Explore the World! adventure today!
        </h3>
        <p className="text-center sm:w-4/6 font-extrabold text-sm sm:text-3xl sm:mt-8 tracking-wide text-slate-700 sm:text-gray-300">
          Check out available cities and book your next
        </p>
      </div>
    </div>
  );

  useEffect(() => {
    // Calcular dimensiones al montar el componente
    calculateDimensions();

    // Crear una versión "debounceada" de calculateDimensions
    const debouncedHandleResize = debounce(calculateDimensions, 100); // 100ms de retraso

    // Escuchar eventos de redimensionamiento
    window.addEventListener("resize", debouncedHandleResize);

    // Limpiar el event listener al desmontar el componente
    return () => {
      window.removeEventListener("resize", calculateDimensions);
      debouncedHandleResize.cancel();
    };
  }, []);

  // Función para calcular dimensiones
  const calculateDimensions = () => {
    if (carouselRef.current) {
      const visibleWidth = carouselRef.current.clientWidth;
      const totalWidth = carouselRef.current.scrollWidth;
      const itemWidth = totalWidth / images.length;
      setStep(itemWidth);
      setMaxScrollAmount(totalWidth - visibleWidth);

      // Ajustar scrollAmount si es necesario
      setScrollAmount((prev) => {
        // Si el scrollAmount actual excede el nuevo maxScrollAmount, ajustarlo
        return prev > totalWidth - visibleWidth
          ? totalWidth - visibleWidth
          : prev;
      });
    }
  };

  const handleNext = () => {
    setScrollAmount((prev) => {
      const newScrollAmount = Math.min(prev + step, maxScrollAmount);
      return newScrollAmount;
    });
  };

  const handlePrev = () => {
    setScrollAmount((prev) => {
      const newScrollAmount = Math.max(prev - step, 0);
      return newScrollAmount;
    });
  };

  // Funciones para manejar el arrastre
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    initialScroll.current = scrollAmount;
    setIsTransitioning(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = x - startX.current; // Distancia arrastrada
    let newScroll = initialScroll.current - walk;

    // Asegurarse de que newScroll esté dentro de los límites
    newScroll = Math.max(0, Math.min(newScroll, maxScrollAmount));
    setScrollAmount(newScroll);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    setIsTransitioning(true);
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    setIsTransitioning(true);
  };

  return (
    <div className="carousel-container">
      {scrollAmount > 0 && (
        <button className="carousel-btn left-btn" onClick={handlePrev}>
          ←
        </button>
      )}

      <div
        className="carousel-wrapper"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        // Opcional: para mejorar la experiencia en dispositivos táctiles
        onTouchStart={(e) => {
          const touch = e.touches[0];
          handleMouseDown({
            pageX: touch.pageX,
          });
        }}
        onTouchMove={(e) => {
          const touch = e.touches[0];
          handleMouseMove({
            pageX: touch.pageX,
            preventDefault: () => e.preventDefault(),
          });
        }}
        onTouchEnd={handleMouseUp}
      >
        <div
          className="carousel"
          ref={carouselRef}
          style={{
            transform: `translateX(-${scrollAmount}px)`,
            transition: isTransitioning ? "transform 0.5s ease" : "none",
          }}
        >
          {text}
          {images.map((image, index) => (
            <div key={index} className="carousel-item">
              <img src={image} alt={`Imagen ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      {scrollAmount < maxScrollAmount && (
        <button className="carousel-btn right-btn" onClick={handleNext}>
          →
        </button>
      )}
    </div>
  );
};

// const CarouselTwo = () => {
//   const carouselRef = useRef(null);
//   const carouselWrapperRef = useRef(null);
//   const [scrollAmount, setScrollAmount] = useState(0);
//   const [step, setStep] = useState(0);
//   const [maxScrollAmount, setMaxScrollAmount] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(true); // Estado para controlar la transición

//   // Referencias para la funcionalidad de arrastrar
//   const isDragging = useRef(false);
//   const startX = useRef(0);
//   const initialScroll = useRef(0);

//   // Función para calcular dimensiones
//   const calculateDimensions = () => {
//     if (carouselRef.current) {
//       const visibleWidth = carouselRef.current.clientWidth;
//       const totalWidth = carouselRef.current.scrollWidth;
//       const itemWidth = totalWidth / images.length;
//       setStep(itemWidth);
//       setMaxScrollAmount(totalWidth - visibleWidth);

//       // Ajustar scrollAmount si es necesario
//       setScrollAmount((prev) => {
//         return prev > (totalWidth - visibleWidth) ? (totalWidth - visibleWidth) : prev;
//       });
//     }
//   };

//   useEffect(() => {
//     // Calcular dimensiones al montar el componente
//     calculateDimensions();

//     // Crear una versión "debounceada" de calculateDimensions
//     const debouncedHandleResize = debounce(calculateDimensions, 100); // 100ms de retraso

//     // Escuchar eventos de redimensionamiento con debounce
//     window.addEventListener('resize', debouncedHandleResize);

//     // Limpiar el event listener al desmontar el componente
//     return () => {
//       window.removeEventListener('resize', debouncedHandleResize);
//       debouncedHandleResize.cancel(); // Cancelar cualquier llamada pendiente
//     };
//   }, []);

//   const handleNext = () => {
//     setScrollAmount((prev) => {
//       const newScrollAmount = Math.min(prev + step, maxScrollAmount);
//       return newScrollAmount;
//     });
//   };

//   const handlePrev = () => {
//     setScrollAmount((prev) => {
//       const newScrollAmount = Math.max(prev - step, 0);
//       return newScrollAmount;
//     });
//   };

//   // Función para iniciar el arrastre
//   const handleDragStart = (clientX) => {
//     isDragging.current = true;
//     startX.current = clientX;
//     initialScroll.current = scrollAmount;
//     setIsTransitioning(false); // Desactivar la transición
//     if (carouselWrapperRef.current) {
//       carouselWrapperRef.current.classList.add('no-select');
//     }
//   };

//   // Función para manejar el movimiento durante el arrastre
//   const handleDragMove = (clientX) => {
//     if (!isDragging.current) return;
//     const deltaX = clientX - startX.current;
//     let newScroll = initialScroll.current - deltaX;

//     // Asegurarse de que newScroll esté dentro de los límites
//     newScroll = Math.max(0, Math.min(newScroll, maxScrollAmount));
//     setScrollAmount(newScroll);
//   };

//   // Función para terminar el arrastre
//   const handleDragEnd = () => {
//     if (isDragging.current) {
//       isDragging.current = false;
//       setIsTransitioning(true); // Activar la transición
//       if (carouselWrapperRef.current) {
//         carouselWrapperRef.current.classList.remove('no-select');
//       }
//     }
//   };

//   // Manejadores de eventos de mouse
//   const onMouseDown = (e) => {
//     handleDragStart(e.pageX);
//     // Agregar listeners al window
//     window.addEventListener('mousemove', onMouseMove);
//     window.addEventListener('mouseup', onMouseUp);
//   };

//   const onMouseMove = (e) => {
//     handleDragMove(e.pageX);
//   };

//   const onMouseUp = () => {
//     handleDragEnd();
//     // Remover listeners del window
//     window.removeEventListener('mousemove', onMouseMove);
//     window.removeEventListener('mouseup', onMouseUp);
//   };

//   // Manejadores de eventos táctiles
//   const onTouchStart = (e) => {
//     const touch = e.touches[0];
//     handleDragStart(touch.pageX);
//     // Agregar listeners al window
//     window.addEventListener('touchmove', onTouchMove, { passive: false });
//     window.addEventListener('touchend', onTouchEnd);
//   };

//   const onTouchMove = (e) => {
//     const touch = e.touches[0];
//     handleDragMove(touch.pageX);
//     e.preventDefault(); // Prevenir el scroll de la página
//   };

//   const onTouchEnd = () => {
//     handleDragEnd();
//     // Remover listeners del window
//     window.removeEventListener('touchmove', onTouchMove);
//     window.removeEventListener('touchend', onTouchEnd);
//   };

//   return (
//     <div className="carousel-container">
//       <button className="carousel-btn left-btn" onClick={handlePrev}>
//         ←
//       </button>

//       <div
//         className="carousel-wrapper"
//         ref={carouselWrapperRef}
//         onMouseDown={onMouseDown}
//         onTouchStart={onTouchStart}
//         style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
//       >
//         <div
//           className="carousel"
//           ref={carouselRef}
//           style={{
//             transform: `translateX(-${scrollAmount}px)`,
//             transition: isTransitioning ? 'transform 0.5s ease' : 'none',
//           }}
//         >
//           {images.map((image, index) => (
//             <div key={index} className="carousel-item">
//               <img src={image} alt={`Imagen ${index + 1}`} />
//             </div>
//           ))}
//         </div>
//       </div>

//       <button className="carousel-btn right-btn" onClick={handleNext}>
//         →
//       </button>
//     </div>
//   );
// };

