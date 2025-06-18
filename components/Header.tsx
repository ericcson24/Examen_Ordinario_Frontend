

import { FunctionalComponent } from "preact";

const Header:FunctionalComponent=()=>{
    return(
        <div>
            <a href="/"><button type="button">Inicio </button></a>
        
            <a href="/favorites"><button type="button">favoritos </button></a>
        </div>
    )
}
export default Header