import { useState, useRef, useEffect } from "react";

type FAQItem = {
    question: string;
    answer: string;
};

type Props = {
    stats: FAQItem;
}

export default function FAQItem({ stats }: Props) { 
    const [isHidden, setIsHidden] = useState(true);
    const answerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState("0px")

    useEffect(() => {
        if (!isHidden && answerRef.current) {
            setHeight(`${answerRef.current.scrollHeight}px`);
        } else {
            setHeight("0px");
        }
    
    }, [!isHidden]);
    return(
        <div className={`border-b border-white py-6 w-[90%] mx-auto text-left faq-container ${isHidden ? "closed" : "open"}`}>
            <div className="cursor-pointer flex gap-2" onClick={() => setIsHidden(!isHidden)}>
                <h2 className="text-xl font-bold mb-0 whitespace-normal wrap-break-word flex-1 min-w-0">{stats.question}</h2>
                <span className={`shrink-0 self-center inline-block w-3.5 h-3.5 border-r-2 border-b-2 m-0 transition-transform duration-300 ease-in-out ${isHidden ? "rotate-45" : "rotate-225"}`} ></span>
            </div>
            <p 
            ref={answerRef}
            style={{ height }}
            className={`text-lg ${isHidden ? "opacity-0" : "opacity-100"} overflow-hidden transition-[height,opacity] duration-300 ease-in-out`}
            >{stats.answer}</p>
        </div>
    );
}
