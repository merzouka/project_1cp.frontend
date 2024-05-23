import { Title } from "@/app/(admin)/components/title";
import { Winners } from "../components/winners";
import { endpoints } from "@/constants/endpoints";
import { Pages } from "@/constants/pages";


const PaymentPage = () => {

    return (
        <div className="md:px-4 p-2 flex flex-col w-full h-full">
            <Title title={"Les pèlerins"} />
            <div className="flex justify-center items-center flex-grow">
                <Winners 
                    itemsEndpoint={endpoints.paymentWinners} 
                    updateEndpoint={endpoints.paymentStatusUpdate} 
                    page={Pages.appointment}
                />
            </div>
        </div>
    );
};

export default PaymentPage;
