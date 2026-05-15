import { useState } from "react";

type FAQItem = {
    question: string;
    answer: string;
};

type Props = {
    stats: FAQItem;
}

export default function FAQItem({ stats }: Props) { 
    const [isHidden, setIsHidden] = useState(true);

    return(
        <div className="border-b border-white py-6 w-[90%] mx-auto text-left">
            <div className="cursor-pointer flex gap-2" onClick={() => setIsHidden(!isHidden)}>
                <h2 className="text-xl font-bold mb-0 whitespace-normal wrap-break-word flex-1 min-w-0">{stats.question}</h2>
                <span className="shrink-0 self-center inline-block w-3.5 h-3.5 border-r-2 border-b-2 rotate-45 "></span>
            </div>
            <p className={`text-lg mb-4 ${isHidden ? "hidden" : ""} `}>{stats.answer}</p>
        </div>
    );
}
