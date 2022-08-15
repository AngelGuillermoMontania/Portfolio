import anime from "animejs"
import { useEffect } from "react"
import { About } from "../interfaces"

interface Props {
    about: About
}

const TextAbout: React.FC<Props> = ({ about }) => {

    useEffect(() => {
        document.querySelector('.svgG')?.classList.remove('hidden')
        document.querySelector('.about')?.classList.remove('hidden')
        document.querySelector('.about')?.classList.add('flex')

        const animeProfession = anime({
            targets: '.profession',
            loop: true,
            easing: 'easeInOutSine',
            duration: 5000,
            scale: 4,
            autoplay: false,
            keyframes: [
                { opacity: 0 },
                { opacity: 0.5 },
                { opacity: 1 },
                { opacity: 0 }
            ],
            delay: anime.stagger(4500),
            endDelay: 200
        })
        const animetextAbout = anime({
            targets: '.textAbout',
            duration: 1000,
            delay: anime.stagger(150, { start: 3000 }),
            translateY: [-1600, 0],
            scale: 1.1,
        })
        function a() {
            animeProfession.play()
        }
        animetextAbout.finished.then(a)
    }, [])

    return (
        <div className='h-[90%] w-1/2 relative text-2xl flex-col items-center justify-around text-center hidden about'>
            <p className='textAbout relative text-center'>
                Hello! My name is
            </p>
            <p className='textAbout relative text-center items-center flex'>
                <svg className='w-10 h-10 inline stroke-white dark:stroke-black' viewBox="0 0 1025 738" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="stroke-[60px]" d="M240.836 691.721C320.604 608.399 767.253 28.4098 667.923 17.228C568.594 6.04616 682.481 408.966 692.928 619.956C694.595 667.314 673.624 751.557 576.404 709.662C454.879 657.293 73.1859 570.719 45 566.5C-112 543 432.5 495 447 504.5C496.5 504.5 551.099 501.009 667.923 504.5C813.954 508.864 1009 465.487 1008 449" />
                </svg>
                ngel
                <svg className='w-8 h-8 inline ml-2 stroke-white dark:stroke-black' viewBox="0 0 736 684" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="stroke-[60px]" d="M52.8356 650.721C-26.9332 734.043 266.323 482.98 393 413C478.144 365.965 676.41 346.762 628 451.5C567.488 582.422 192.864 705.999 45.334 596.897C-72.6903 509.616 186.363 49.4476 659.46 16.9594C692.64 15.1396 747.4 17.8 701 43" />
                </svg>uillermo Montaña,
            </p>
            <p className='textAbout relative text-center'>I am</p>
            <div className='relative w-full h-8 flex justify-center'>
                <p className='profession absolute text-sm text-center opacity-0'>Full Stack Developer</p>
                <p className='profession absolute text-sm text-center opacity-0'>Back End Developer</p>
                <p className='profession absolute text-sm text-center opacity-0'>Front End Developer</p>
            </div>
            <p className='textAbout relative w-full text-center'>{about.description}</p>
            <p className='textAbout relative w-3/4 text-center'>{about.location}</p>
        </div>
    )
}

export default TextAbout