type FAQItem = {
    question: string;
    answer: string;
};

type Props = {
    stats: FAQItem;
}

export default function FAQItem({ stats }: Props) { 

    return(
        <div>
            <h2 className="text-3xl font-bold mb-8">{stats.question}</h2>
            <p className="text-lg mb-4">{stats.answer}</p>
        </div>
    );
}
