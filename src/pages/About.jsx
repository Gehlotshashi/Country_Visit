import countryFact from "../api/countryData.json";

export const About= ()=>{
    return (
     <section className="section-about container"> 
     <h2 className="container-title"> 
     Here are the Interesting Facts 
     <br/> 
     We are proud of 
     </h2>
     <div className="gradient-cards"> 

   {  countryFact.map((curElem)=>{ 
    const {id,countryname,capital,population,interesting_fact}= curElem;
    return(
    <div className="card" key={id}>
    <div className="container-card bg-blue-box">
        <p className="card-title">{countryname}</p>
        <p>
            <span className="card-description">Capital : </span>
            {capital}
        </p>
        <p>
            <span className="card-description">Population : </span>
            {population}
        </p>
        <p>
            <span className="card-description">Interesting Fact : </span>
            {interesting_fact} 
        </p>
    </div>
    </div>
    );
   })
   }
     </div>
     </section>
    )  
 };