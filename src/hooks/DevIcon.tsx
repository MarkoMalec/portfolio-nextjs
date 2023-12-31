import Image from "next/image";


type Icon = {
  icon: String;
}


const iconsContext = require.context("../assets/icons", false, /\.svg$/);

function DevIcon({ icon }: Icon) {
  let iconSrc;

  try {
    iconSrc = iconsContext(`./${icon}-original.svg`);
  } catch (error) {
    console.warn(`Icon ${icon}-original.svg not found.`);
    return null;
  }

  return <Image src={iconSrc} alt={`${icon} logo`} className={`${icon}`} width={70} height={70} />;
}

export default DevIcon;
