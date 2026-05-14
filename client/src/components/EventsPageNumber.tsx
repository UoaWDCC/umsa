{/* types for events variables */}
type pageNumber = {
    setterFunction: (page: number) => void; //function called setter function: arg is page of type number and the function returns void
    page: number;
};

{/* properties */}
type Props = {
    element: pageNumber;
    currentPage: number;
};

{/* eventsInfo function that define how each event element should look in the grid */}
export default function Page({ element,currentPage }: Props) {
    return(
        <>
        {/* onClick calls the setterFunction for that page */}
        <button onClick={() => element.setterFunction(element.page)} 
            className={
                `w-fit text-sm text-gray-400 hover:text-white cursor-pointer 
                ${element.page == currentPage ? "text-white font-bold" : ""}`
            }>
            {element.page}
        </button>
        </>
    )
}