import { useEffect } from "react";
import slides from "../data";

export default function Acceuil() {

    useEffect(() => {
        document.title = "SETAS";
    }, []);

    return (
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
            <h4 className="alert alert-success text-center " >مرحبا بعودتك <span className="text-primary">السيدة فاطمة الزهراء</span></h4>
            <div className="carousel-indicators">
                {slides.map((_, index) => (
                    <button key={index} type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={index} className={index === 0 ? "active" : ""} aria-current={index === 0 ? "true" : undefined} aria-label={`Slide ${index + 1}`}></button>
                ))}
            </div>

            <div className="carousel-inner">
                {slides.map((slide, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                        <img src={`/${slide.img}`} className="carousel-slide-img" alt={slide.title} />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>{slide.title}</h5>
                            <p>{slide.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>

            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>

        </div>
    );
}
