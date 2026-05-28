import { motion } from "motion/react";

export default function Wordle() {

    return (
    <>
    {/* lowkye bmight be broken, fix later note to terrence */}
    <div className="justify-evenly. items-center w-auto h-100">
    <h1>WORDLE!!!!1!!</h1>
    <input className="border border-gray-300 rounded py-2 px-4" />
    <motion.div initial={{scale:0}} animate={{scale:1}}>
    <div className="w-20 h-20 bg-gray-250 rounded-2xl"><p>square</p></div>
    </motion.div>
    </div>
    {/* for the displaying, as words r of different length, we can just give ech leeter irs own dic
    and then yeah */}
    
    </>
    )
}