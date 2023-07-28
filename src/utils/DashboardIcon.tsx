import { BsCashStack, BsFillBox2Fill } from "react-icons/bs";
import { BiSolidUserCircle } from "react-icons/bi";

export function DashboardIcon(icon: string) {
  let val;
  switch (icon) {
    case "cash":
      return (val = <BsCashStack size={25} />);
      break;
    case "user":
      return (val = <BiSolidUserCircle size={30} />);
    case "product":
      return (val = <BsFillBox2Fill size={25} />);
  }

  return val;
}
