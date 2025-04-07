import brainImage from '@/assets/brain.svg';
import { Button } from '@/components/ui/button';
import { showToast } from '@/utils/toast';

const LandingPage = () => {

  return (
    <div className='w-full p-3' style={{ height: '90vh'}}>
       <div className='hero-section flex flex-col md:flex-row gap-0 h-full rounded-3xl backdrop-blur-sm' style={{ background: 'linear-gradient(145deg, rgba(246, 76, 165, 0.8), rgba(0, 153, 255, 0.2), black)'}}>
            <div className='left-content-section w-full flex flex-col gap-5 justify-center items-center h-full'>
                <h1 className='text-white text-4xl mt-10 text-center md:text-6xl '>Enlight Your Future</h1>
                <h1 className='text-white text-4xl md:text-6xl text-center'>With Us</h1>
                <h2 className='text-white text-center'>We provide the best courses for your future and for your career</h2>
                <Button onClick={() => {
                  showToast({
                    title: "Hello world",
                    description: "Exploring the courses with notification",
                    duration: 1500
                  })
                }} className='w-5/12 text-black' variant={'outline'}>Explore Courses</Button>
            </div>

            <div className='right-content-section flex justify-end  w-full m-0'>
                <img src={brainImage} alt={"brainImage"} className='w-full'/>
            </div>
       </div>

       <div 
        className='animate h-full mt-10 flex gap-0 rounded-3xl'
        style={{ background: 'linear-gradient(45deg, rgba(246, 76, 165, 0.8), rgba(0, 153, 255, 0.2), black)'}}
        >

       </div>
    </div>
  )
}

export default LandingPage