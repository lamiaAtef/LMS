import { Link } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
import type { InfoCardProps } from "../../../modules/InstractorModule/type";



export default function InfoCard({
  image,
  title,
  subtitle,
  status,
  link,
  className = "",
}:InfoCardProps) {
  return (
    <div className={`flex items-center border-2 border-gray-200 rounded-2xl p-2 mb-3 ${className}`}>
      <img src={image} alt="img" className="w-20 h-20 rounded-lg" />
      <div className="flex flex-col flex-1 ml-3">
        <h2 className="text-md font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">{subtitle}</p>
        <div className="flex justify-between items-center mt-1">
          {status && (
            <p className="text-md font-semibold text-emerald-600">{status}</p>
          )}

          <Link to={link}>
            <FaArrowCircleRight className="text-xl ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}