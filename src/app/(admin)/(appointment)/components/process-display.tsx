import { ProcessData, Process } from "./process"


export const ProcessDisplay = (
    {
        processes,
    }: {
        processes: ProcessData[],
    }
) => {
    return(
        <div className="h-full max-h-[50dvh] min-w-56 max-w-80 w-full relative">
            <div className="absolute flex flex-col items-center justify-start h-full w-full top-0 right-0 left-0 overflow-y-scroll">
                {
                    processes.map((process) => (
                        <Process 
                            key={process.id}
                            status={process.status}
                            text={process.text}
                            updated={process.updated}
                        />
                    ))
                }
            </div>
        </div>
    );
}
