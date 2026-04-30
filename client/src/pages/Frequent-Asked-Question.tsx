import FAQItem from "../components/FAQItem";


export default function FrequentAskedQuestions(){
    return(
        <>
        <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>

        <div className="columns-1 md:columns-2 gap-8">
            <FAQItem
                stats = {{
                    question: "Does it cost to join UMSA?",
                    answer: "The price to join UMSA is $8 - for both new and returning members.",
                }}/>
            <FAQItem
                stats = {{
                    question: "How do I become a member of UMSA?",
                    answer: "Shoot an e-mail to our helpful communication officers at comm.umsanz@gmail.com and we will be more the merrier to help you get things sorted out. You can also sign up online! Simply click on this link, and follow the step-by-step guide, and you're good to go! During the first week of every new semester, catch our booth at the University of Auckland's club expo.",
                }}/>
            <FAQItem
                stats = {{
                    question: "I'm not Malaysian, can I still join?",
                    answer: "The more the merrier! You do not have to be a Malaysian to join the UMSA family. We happily welcome people from all cultures and backgrounds.",
                }}/>
            <FAQItem
                stats = {{
                    question: "I'm not Malaysian, can I still join?",
                    answer: "The more the merrier! You do not have to be a Malaysian to join the UMSA family. We happily welcome people from all cultures and backgrounds.",
                }}/>
            <FAQItem
                stats = {{
                    question: "I'm not a UOA student, can I still join?",
                    answer: "Absolutely! In fact, invite any other friends outside of the University of Auckland to join the family as well!",
                }}/>
            <FAQItem
            stats = {{
                question: "How do I find out or keep myself updated on UMSA's events?",
                answer: "Make sure to follow our social media platforms! Keep yourself updated by checking UMSA's website, Facebook and Instagram constantly. We will be updating you with up-coming events, opportunities and what is going on with the community."
            }}
            />
            
                
        </div>
        </>
    )
}