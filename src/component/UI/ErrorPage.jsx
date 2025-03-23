import { useNavigate, useRouteError } from "react-router-dom";


export const ErrorPage=()=>{

const error =useRouteError();

const navigate=useNavigate();
const handleGoBack=()=>{
navigate(-1);
}
if(error.status===404){
return(

    <section className="error-section">
        <div id="error-text">
        <figure>
            <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_dfKw8uEFooGqMBQKnURM3KCWasXZZEatug&s'
            alt="404 page"
            /> 
        </figure>
        <div className="text-center">
            <p className="p-a"> The page you were looking for could not be found  </p>  
             <p className="p-b">....Back to previous page </p>
        </div>
        </div>
       <button className="btn" onClick={handleGoBack}>
        Go Back
       </button>
    </section>
);

}
 
<h1> The page you are looking does not exist  </h1>

};