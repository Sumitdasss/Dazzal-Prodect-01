

import Link from "next/link";
import { categories11 } from "../../../Data/Data";

const Catagori = () => {
  return (
    <div className="grid grid-cols-2 max-w-360 px-4 md:px-0 mx-auto mt-5 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
      {categories11.map((cat) => (
        <Link
          key={cat.id}
           href={`/Shop?category=${cat.name}`}
        >
          <div className="bg-[#EDEDED] rounded-md p-4 flex flex-col items-center justify-between h-[180px] cursor-pointer hover:shadow-md transition-all group">
            <div className="w-full h-24 flex items-center justify-center overflow-hidden">
              <img
                src={cat.img}
                alt={cat.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <span className="text-center text-[13px] font-medium text-gray-800">
              {cat.name}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Catagori;