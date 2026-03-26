import { Claude } from "react-bootstrap-icons";

export default function Footer() {
    return (
        <footer className="text-light py-3 mt-4 nav-gradient ">
            <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
                <span>
                    &copy; 2026 Application de Suivi des Délais
                </span>
                <span>
                    Dediée Pour Chef de Service de l'Enseignement Traditionnel et des Affaires Sociales
                </span>
                <span>
                    Realisé par : Mohammed-Amine Rhazi <Claude />
                </span>
            </div>
        </footer>
    );
}