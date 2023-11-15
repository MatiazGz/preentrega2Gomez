import "./Card.css";
import { Link } from "react-router-dom";



function Card({ title = "titulo por defecto", description = "descripcion por defecto"}) {
    
    return (<div className="Card">
        <Link to = {title}>
        <h2 className="cont">{title}</h2>        
        </Link> 
        <p className="cont">{description}</p>
        </div>);
}

export default Card;