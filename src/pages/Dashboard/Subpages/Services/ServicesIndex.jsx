import { Helmet } from "react-helmet";


const ServicesIndex = () => {
  return (
    <div>
      <Helmet>
        <title>NoByll - Services</title>
      </Helmet>
      <h1 className="text-5" style={{ fontSize: "1.5rem" }}>
        Services
      </h1>

      <p className='mt-8'>Todo: </p>
      <ul className='list-disc ml-8'>
        <li>Buy Data
        </li>
        <li>Buy Airtime</li>
        <li>Recharge Cable</li>
        <li>Electricity</li>
      </ul>
    </div>
  );
};

export default ServicesIndex;
