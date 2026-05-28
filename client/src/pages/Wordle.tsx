import { motion } from "motion/react";

export default function Wordle() {

    return (
    <>
    {/* lowkye bmight be broken, fix later note to terrence */}
    <div>
    <h1>WORDLE!!!!1!!</h1>
    <input className="border border-gray-300 bg-gray-250 text-amber-700 rounded py-2 px-4" />
    </div>

    <div className="flex m-5 p-4 gap-4 justify-center">
    <motion.div initial={{scale:0}} animate={{scale:1}} transition={{duration:0.5}}>
    <div className="w-20 h-20 bg-gray-300 rounded-2xl"><p>square</p></div>
    </motion.div>
    <motion.div initial={{scale:0}} animate={{scale:1}} transition={{duration:0.5}}>
    <div className="w-20 h-20 bg-gray-300 rounded-2xl"><p>square</p></div>
    </motion.div>
    </div>
    {/* for the displaying, as words r of different length, we can just give ech leeter irs own dic
    and then yeah */}
    
    </>
    )
}