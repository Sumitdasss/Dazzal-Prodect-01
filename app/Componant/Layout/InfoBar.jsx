import { GoShieldCheck } from "react-icons/go";
import { IoRocketOutline } from "react-icons/io5";
import { PiCreditCardLight } from "react-icons/pi";
import { FiRefreshCw } from "react-icons/fi";
import { FaTag } from "react-icons/fa6";

const InfoBar = () => {
  const items = [
    {
      icon: <GoShieldCheck className="text-[#10B981] text-3xl" />,
      text: "100% Genuine Products",
    },
    {
      icon: <IoRocketOutline className="text-[#2563EB] text-3xl" />,
      text: "Super Fast Delivery",
    },
    {
      icon: <PiCreditCardLight className="text-[#EA580C] text-3xl" />,
      text: "36 Months Installments",
    },
    {
      icon: <FiRefreshCw className="text-[#8B5CF6] text-3xl" />,
      text: "2 Years Replacement",
    },
    {
      icon: <FaTag className="text-[#EF4444] text-3xl" />,
      text: "Best Price in BD",
    },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-0  mt-6">
      <div className="bg-gray-100 rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6">
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center gap-2 p-3 rounded-xl hover:bg-white transition duration-300"
            >
              {item.icon}

              <p className="text-xs sm:text-sm md:text-base font-medium text-gray-700 leading-tight">
                {item.text}
              </p>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default InfoBar;