import React from "react";
import CV_ES from "../../assets/docs/CV_ES.pdf";
import CV_EN from "../../assets/docs/CV_EN.pdf";
import FancyButton from "../FancyButton";
import { DownloadIcon } from '../icons/Pixelarticons';
const DownloadButtons = () => {
  return (
    <div className="flex gap-4 ">
      <FancyButton
      icon={<DownloadIcon className="w-[1.5rem] mr-2 fill-text "/>}
      label= "Descargar CV (ES)"
        href={CV_ES}
        download="CV_BelenCastillo_Espanol.pdf"
        className="font-bit px-4 py-2  text-text rounded-lg  flex flex-row items-center "
      >
    
      </FancyButton>

      <FancyButton
       icon={<DownloadIcon className="w-[1.5rem] mr-2 fill-text"/>}
      label= "Download CV (EN)"
        href={CV_EN}
        download="CV_BelenCastillo_English.pdf"
        className="font-bit px-4 py-2 text-text rounded-lg flex flex-row items-center "
      >
     Download CV (EN)
      </FancyButton>
    </div>
  );
};

export default DownloadButtons;
