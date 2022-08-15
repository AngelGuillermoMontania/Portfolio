const SectionResume: React.FC = () => {
    return (
        <div id='resume' className='w-full h-screen flex flex-col items-center text-white dark:text-black'>
            <p className='text-5xl my-8 underline-offset-8 underline'>Resume</p>
            <div className='w-full h-full flex justify-around items-center text-center'>
                <div className='h-full w-1/3 flex flex-col justify-around'>
                    <p className='text-3xl w-full text-center animeTextCV'>Spanish</p>
                    <div className='h-[100%] w-full relative'>
                        <div className='absolute w-full h-full flex justify-center items-center animeCV'>
                            <embed src='http://localhost:3001/resume/view/spanish' height={'98%'} width={'90%'} className='rounded-xl shadow-2xl shadow-black'></embed>
                        </div>
                    </div>
                </div>
                <div className='h-full w-1/3 flex flex-col justify-around'>
                    <p className='text-3xl w-full text-center animeTextCV'>English</p>
                    <div className='h-[100%] w-full relative'>
                        <div className='absolute w-full h-full flex justify-center items-center animeCV'>
                            <embed src='http://localhost:3001/resume/view/english' height={'98%'} width={'90%'} className='rounded-xl'></embed>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionResume