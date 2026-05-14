type FAQItem = {
    question: string;
    answer: string;
};

type Props = {
    stats: FAQItem;
}

export default function FAQItem({ stats }: Props) { 

    return(
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">{stats.question}</h2>
            <p className="text-lg mb-4">{stats.answer}</p>
        </div>
    );
}
