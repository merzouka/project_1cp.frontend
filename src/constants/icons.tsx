import { AiOutlineMessage } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { IoExitOutline, IoHomeOutline } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import { PiGearSixLight } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import { GiCardPickup } from "react-icons/gi";
import { MdOutlinePayment } from "react-icons/md";
import { MdFlight } from "react-icons/md";
import { FaRegPenToSquare } from "react-icons/fa6";
import { LuUpload } from "react-icons/lu";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { VscAccount } from "react-icons/vsc";

export const icons = {
    user: (className ?: string) =>  <CiUser className={className}/>,
    drawing: (className ?: string) => <GiCardPickup className={className}/>,
    payment: (className ?: string) => <MdOutlinePayment className={className} />,
    flight: (className ?: string) => <MdFlight className={className} />,
    settings: (className ?: string) =>  <PiGearSixLight className={className}/>,
    contact: (className ?: string) =>  <AiOutlineMessage className={className}/>,
    logout: (className ?: string) =>  <IoExitOutline className={className}/>,
    search: (className ?: string) =>  <LuSearch className={className}/>,
    home: (className ?: string) =>  <IoHomeOutline className={className}/>,
    close: (className ?: string) => <IoClose className={className}/>,
    check:  (className ?: string) => <FaCircleCheck className={className}/>,
    modify: (className ?: string) => <FaRegPenToSquare className={className} />,
    upload: (className ?: string) => <LuUpload className={className}/>,
    caution: (className ?: string) => <HiOutlineExclamationTriangle className={className}/>,
    profilePicture: (className ?: string) => <VscAccount className={className}/>,
}
