import FAQItem from "../components/FAQItem";


export default function FrequentAskedQuestions(){
    return(
        <>
        <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>

        <div>
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
                
        </div>
        </>
    )
}