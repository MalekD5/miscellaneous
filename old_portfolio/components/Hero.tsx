import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className='flex justify-center items-center gap-2 mt-14'>
      <motion.div
        initial='hidden'
        whileInView='show'
        viewport={{ once: false, amount: 0.25 }}
        variants={textVariant(0.2)}
      >
        <h1 className='text-5xl text-white font-bold text-center mt-20'>
          Malek<span className='text-[#9fef00]'>D5</span>
        </h1>
        <h2 className='text-3xl'>Software engineer & Web Developer</h2>
      </motion.div>
    </div>
  );
};

export const textVariant = (delay: number) => ({
  hidden: {
    y: 50,
    opacity: 0
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.85,
      delay
    }
  }
});

export default Hero;
