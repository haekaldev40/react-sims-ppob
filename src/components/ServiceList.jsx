// components/ServiceList.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getService } from '../store/thunks/informationThunks';
import { useNavigate } from 'react-router-dom';


const ServiceList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(getService());
  }, [dispatch]);

  const handleServiceClick = (service) => {
    navigate('/servicedetailpayment', { 
      state: { 
        serviceCode: service.service_code,
        serviceName: service.service_name,
        serviceIcon: service.service_icon,
        serviceTariff: service.service_tariff
      } 
    });
  };

  return (
    <div>
      <div className="grid grid-cols-4 max-w-6xl mt-8 mx-auto gap-4 sm:grid-cols-6 lg:grid-cols-12">
        {data?.map((service) => (
          <div 
            key={service.service_code} 
            className="flex flex-col items-center text-center text-black cursor-pointer hover:opacity-80"
            onClick={() => handleServiceClick(service)}
          >
            <img src={service.service_icon} alt={service.service_name} className="w-10 h-10 mb-2" />
            <div>
              <p className='text-[10px] text-center'>{service.service_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
