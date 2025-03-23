// import { useEffect, useState, useTransition } from "react";
// import { NavLink, useParams } from "react-router-dom";
// import { getCountryIndData } from "../../api/postApi";


// export const CountryDetails = () => {
//   const params = useParams();

//   const [isPending, startTransition] = useTransition();
//   const [country, setCountry] = useState();

//   useEffect(() => {
//     startTransition(async () => {
//       const res = await getCountryIndData(params.id);
//       console.log(res);
//       // if (res.status === 200) {
//       //   setCountry(res.data[0]);
//       // }
//       if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
//         setCountry(res.data);
//       } else {
//         console.error("No data found or incorrect response structure");
//       }

//       console.log(Object.keys(res.data[0].name.nativeName));
//     });
//   }, [params.id]);

//   if (isPending) return <h1> Loading ................</h1>

//   console.log(params);
//   return (
//     <section className="card country-details-card container">
//       <div className="container-card bg-white-box">
//         {country && (
//           <div className="country-image grid grid-two-cols">
//             <img
//               src={country.flags.svg}
//               alt={country.flags.alt}
//               className="flag"
//             />
//             <div className="country-content">
//               <p className="card-title"> {country.name.official} </p>

//               <div className="infoContainer">
//                 <p>
//                   <span className="card-description"> Native Names:</span>
//                   {Object.keys(country.name.nativeName)
//                     .map((key) => country.name.nativeName[key].common)
//                     .join(", ")}
//                 </p>
//                 <p>
//                   <span className="card-description"> Population: </span>
//                   {country.population.toLocaleString()}
//                 </p>
//                 <p>
//                   <span className="card-description"> Region:</span>
//                   {country.region}
//                 </p>
//                 <p>
//                   <span className="card-description"> Sub Region:</span>
//                   {country.subregion}
//                 </p>
//                 <p>
//                   <span className="card-description"> Capital:</span>
//                   {country.capital}
//                 </p>

//                 <p>
//                   <span className="card-description">Top Level Domain:</span>
//                   {country.tld[0]}
//                 </p>
//                 <p>
//                   <span className="card-description"> Currencies: </span>
//                   {Object.keys(country.currencies)
//                     .map((curElem) => country.currencies[curElem].name)
//                     .join(", ")}
//                 </p>
//                 <p>
//                   <span className="card-description">Languages: </span>
//                   {Object.keys(country.languages)
//                     .map((key) => country.languages[key])
//                     .join(", ")}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//         <div className="country-card-backBtn">
//           <NavLink to="/country" className="backBtn">
//             <button>Go Back</button>
//           </NavLink>
//         </div>
//       </div>
//     </section>
//   );
// };
import { useEffect, useState, useTransition } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getCountryIndData } from "../../api/postApi";

export const CountryDetails = () => {
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const [country, setCountry] = useState(null); // Initialize as null to track loading state
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await getCountryIndData(params.id);
        console.log(res);

        // Check if the API response is valid and contains the expected data
        if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
          setCountry(res.data[0]); // Set the first country object from the response
        } else {
          setError("Country data is missing or not structured as expected.");
        }
      } catch (err) {
        setError("Error fetching country data: " + err.message); // Capture error in state
        console.error("Error fetching country data:", err);
      }
    });
  }, [params.id]); // Re-run the effect if the ID changes

  // Show a loading message while fetching data
  if (isPending) return <h1>Loading ............</h1>;

  // Show an error message if something goes wrong
  if (error) return <h1>{error}</h1>;

  // If country data is not yet available, show an appropriate message
  if (!country) return <h1>No country data available</h1>;

  return (
    <section className="card country-details-card container">
      <div className="container-card bg-white-box">
        {country && (
          <div className="country-image grid grid-two-cols">
            <img
              src={country.flags?.svg || "default-flag-url"} // Provide fallback if flag is missing
              alt={country.flags?.alt || "Country Flag"}
              className="flag"
            />
            <div className="country-content">
              <p className="card-title">{country.name?.official || "No official name"}</p>

              <div className="infoContainer">
                <p>
                  <span className="card-description">Native Names:</span>
                  {country.name?.nativeName
                    ? Object.keys(country.name?.nativeName).map((key) => country.name?.nativeName[key].common).join(", ")
                    : "N/A"}
                </p>
                <p>
                  <span className="card-description">Population:</span>
                  {country.population?.toLocaleString() || "N/A"}
                </p>
                <p>
                  <span className="card-description">Region:</span>
                  {country.region || "N/A"}
                </p>
                <p>
                  <span className="card-description">Sub Region:</span>
                  {country.subregion || "N/A"}
                </p>
                <p>
                  <span className="card-description">Capital:</span>
                  {country.capital || "N/A"}
                </p>

                <p>
                  <span className="card-description">Top Level Domain:</span>
                  {country.tld?.[0] || "N/A"}
                </p>
                <p>
                  <span className="card-description">Currencies:</span>
                  {country.currencies
                    ? Object.keys(country.currencies).map((curElem) => country.currencies[curElem].name).join(", ")
                    : "N/A"}
                </p>
                <p>
                  <span className="card-description">Languages:</span>
                  {country.languages
                    ? Object.keys(country.languages).map((key) => country.languages[key]).join(", ")
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="country-card-backBtn">
          <NavLink to="/country" className="backBtn">
            <button>Go Back</button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};
