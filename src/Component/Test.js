import { useState } from "react";
import Form from "./form";
import Map from "./mapTest";

function Test (){
    // src/components/Map.


function  Mapp ()  {
  const [selectedCountry, setSelectedCountry] = useState('');
   // Function to handle form submission and update the selected country
   const handleFormSubmit = (country) => {
    console.log('Submitted country:', country);
    setSelectedCountry(country);
};


  return (
    <div>
      {/* Pass handleFormSubmit as a prop to the Form component */}
      <Form onFormSubmit={handleFormSubmit} />
      {/* Pass the selected country as a prop to the Map component */}
      <Map selectedCountry={selectedCountry} />
    </div>
  );
};


}