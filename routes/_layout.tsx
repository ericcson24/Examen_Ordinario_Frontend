
import { PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";
export default ({Component}:PageProps)=>{
    return(
        <div class=" layout">
            <Header/>
            <main><Component/></main>
            
        </div>
    )
}