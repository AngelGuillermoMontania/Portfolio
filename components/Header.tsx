import anime from "animejs"
import { MouseEvent, useEffect } from "react"

function Header() {

    useEffect(() => {
        const animeInitHeader = anime({
            targets: '#header',
            duration: 1000,
            delay: 2500,
            translateX: 115
        })

        const animeHeaderLogo = anime.timeline({
            targets: '.svgHeader path',
            delay: 5000,
            easing: 'easeInOutSine',
            complete: function (anim) {
                const initLogo = document.querySelector('.svgHeader')
                if (anim.completed) {
                    initLogo?.setAttribute('style', 'display: block')
                }
            }
        })
            .add({
                duration: 3500
            })
        animeHeaderLogo.play()

        const animeInitLogo = anime.timeline({
            targets: '.svgG path',
            delay: 2500,
            easing: 'easeInOutSine',
            complete: function (anim) {
                const initLogo = document.querySelector('.svgG')
                if (anim.completed) {
                    initLogo?.setAttribute('style', 'display: none')
                }
            }
        })
            .add({
                duration: 1000,
                scale: .17,
            })

        animeInitLogo.play()

        const animeInfinitLogo = anime({
            targets: '.svgAnimeInfinit path',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 2500,
            delay: function (el, i) { return i * 250 },
            loop: true,
            endDelay: 4000,
            direction: 'alternate',
            stroke: [
                { value: '#0000FF' },
                { value: '#ffFFFF' },
                { value: '#FF0000' },
            ]
        });
    })

    const handleDarkMode = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark')
        } else {
            document.documentElement.classList.add('dark')
        }
    }

    const onMouseOverHeader = () => {
        anime({
            targets: '#header',
            duration: 1000,
            delay: 0,
            translateX: 115,
        })
        anime({
            targets: '.svgG',
            duration: 1000,
            delay: 0,
            translateX: 0,
        })
    }

    const onMouseOutHeader = () => {
        anime({
            targets: '#header',
            duration: 1000,
            delay: 0,
            translateX: 10,
        })
        anime({
            targets: '.svgG',
            duration: 1000,
            delay: 0,
            translateX: -100,
        })
    }

    return (
        <header
            id='header'
            className='z-30 bg-blackPrimary flex flex-col fixed pl-6 -left-36 rounded-2xl h-screen shadow-header justify-around items-center text-white dark:bg-gray-300 dark:text-black dark:shadow-headerDark xl:w-36'
            onMouseOver={onMouseOverHeader}
            onMouseOut={onMouseOutHeader}
        >
            <div className='h-24 w-24'>
                <svg className='w-24 h-24 svgAnimeInfinit svgHeader hidden' viewBox="0 0 723 577" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="stroke-[21px]" d="M711.997 351.568C712.704 364.565 574.791 398.762 471.536 395.322C388.932 392.569 350.326 395.322 315.326 395.322C305.073 387.832 -79.9314 425.673 31.08 444.2C51.0097 447.526 320.897 515.777 406.825 557.062C475.567 590.09 490.395 523.677 489.216 486.342C481.829 320.007 401.302 2.36452 471.536 11.1797C541.77 19.9949 225.954 477.23 169.551 542.918C113.148 608.605 320.503 410.679 410.074 355.51C470.278 318.429 610.468 303.291 576.238 385.862C533.451 489.075 268.563 586.497 164.247 500.486C80.7945 431.677 263.965 68.9026 598.483 43.2905C621.943 41.8558 660.663 43.9531 627.855 63.8196" stroke="#2707EA" />
                </svg>
            </div>

            <a href='#about' className='my-4 font-bold relative z-50 hover:scale-125 duration-500 transition-all'>ABOUT</a>
            <a href='#sectionSkills' className='my-4 font-bold relative z-50 hover:scale-125 duration-500 transition-all'>SKILLS</a>
            <a href='#experience' className='my-4 font-bold relative z-50 hover:scale-125 duration-500 transition-all'>EXPERIENCE</a>
            <a href='#resume' className='my-4 font-bold relative z-50 hover:scale-125 duration-500 transition-all'>RESUME</a>
            <a href='#contact' className='my-4 font-bold relative z-50 hover:scale-125 duration-500 transition-all'>CONTACT</a>
            <button onClick={(e) => handleDarkMode(e)} className='bg-blackPrimary border-double border border-white py-1 px-3 shadow-lg hover:shadow-sm hover:scale-110 transition-all shadow-black rounded-lg dark:bg-white dark:border-black'>
                <svg aria-hidden="true" id="theme-toggle-dark-icon" className="w-5 h-5 hidden fill-black dark:block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z">
                    </path>
                </svg>
                <svg aria-hidden="true" id="theme-toggle-light-icon" className="w-5 h-5 fill-white dark:hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" >
                    </path>
                </svg>
            </button>
        </header>
    )
}

export default Header