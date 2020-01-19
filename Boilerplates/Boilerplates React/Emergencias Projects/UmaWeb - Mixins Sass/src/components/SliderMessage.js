import React from 'react';
import { CarouselProvider, Slider, Slide} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

export const SliderMessage = () => {
    return(
        <div className="row">
            <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={125}
                totalSlides={3}
                isPlaying={true}
                interval={4000}
                playDirection={'forward'}
            >
            <Slider>
                <Slide index={0}>
                    <b><span className="header-slide-text">Plataforma inteligente <br /> de soluciones de salud <br /> y bienestar</span></b>
                </Slide>
                <Slide index={1}>
                    <b><span className="header-slide-text">Pide una visita médica <br /> por Whatsapp</span></b>
                </Slide>
                <Slide index={2}>
                    <b><span className="header-slide-text">Data Science <br /> le da una solución<br /> a tus necesidades</span></b>
                </Slide>
            </Slider>
            </CarouselProvider>  
        </div>
    )
}

export default SliderMessage;