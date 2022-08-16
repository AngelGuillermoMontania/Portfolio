import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import anime from 'animejs';
import { MouseEvent, useEffect } from 'react';
import Photo from '../components/Photo';
import axios from 'axios';
import Header from '../components/Header';
import { Project } from '../interfaces';
import TextAbout from '../components/TextAbout';
import SectionSkills from '../components/SectionSkills';
import SectionProject from '../components/SectionProject';
import SectionResume from '../components/SectionResume';
import SectionContact from '../components/SectionContact';

const Home: NextPage = ({ allSkills, allTools, allSofts, about, allProjects, contact }: InferGetStaticPropsType<typeof getStaticProps>) => {

    const animateOnScroll = (element: Element | null, speed = 100, offset = 0) => {
        if (element) {
            const scrollPercent = window.pageYOffset - element.getBoundingClientRect().top
            return (scrollPercent - offset) / speed
        }
        return 0
    }

    const scrollPercent = () => {
        const bodyST = document.body.scrollTop;
        const docST = document.documentElement.scrollTop;
        const docSH = document.documentElement.scrollHeight;
        const docCH = document.documentElement.clientHeight;


        return (docST + bodyST) / (docSH - docCH) * 100
    }

    const onMouseMove = (elem: Element | null, e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        if (elem) {
            elem?.setAttribute('style', `--cursor-x: ${e.clientX + 'px'}; --cursor-y: ${e.clientY + 'px'}`)
        }
    }

    const onMouseDown = (elem: Element | null) => {
        elem?.classList.add('is-clicked');
    };

    useEffect(() => {

        const isHiddenClass = 'is-hidden';
        const isLinkHoveredClass = 'is-link-hovered';
        const hasCustomCursorClass = 'has-custom-cursor';
        const cursorEl = document.querySelector('.cursor');


        const onMouseUp = () => {
            cursorEl?.classList.remove('is-clicked');
        };
        const onMouseEnter = () => {
            cursorEl?.classList.remove(isHiddenClass);
        };
        const onMouseLeave = () => {
            cursorEl?.classList.add(isHiddenClass);
        };
        const handleLinkHoverEvents = () => {
            document.querySelectorAll('a, button, Link, .mouse-hover, input, textarea').forEach((el) => {
                el.addEventListener("mouseover", () => cursorEl?.classList.add(isLinkHoveredClass));
                el.addEventListener("mouseout", () => cursorEl?.classList.remove(isLinkHoveredClass));
            });
        };
        const addEventListeners = () => {
            /* document.addEventListener("mousedown", onMouseDown) */
            document.addEventListener("mouseup", onMouseUp)
            document.addEventListener("mouseenter", onMouseEnter)
            document.addEventListener("mouseleave", onMouseLeave)
            handleLinkHoverEvents();
        }

        addEventListeners()
        document.body.classList.add(hasCustomCursorClass)





        window.addEventListener("load", () => {
            localStorage.removeItem('theme')
            const dark = document.querySelector("#toggleDark")
            if (dark) {
                dark.addEventListener('click', (e) => {
                    if (localStorage.theme === 'dark') {
                        document.documentElement.classList.remove('dark')
                        localStorage.theme = 'light'
                    } else {
                        document.documentElement.classList.add('dark')
                        localStorage.theme = 'dark'
                    }
                    console.log(localStorage.theme)
                })
            }
        })

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

        let animeSkill = anime({
            targets: '.skills div',
            duration: 4000,
            delay: anime.stagger(-100),
            translateX: [-1500, 0],
            scale: [0.2, 1],
            autoplay: false,
            easing: 'easeInOutQuad',
            direction: 'alternate'
        })
        let animeTitleSkill = anime({
            targets: '.titleSkill',
            duration: 4000,
            delay: 0,
            translateX: [-1500, 0],
            autoplay: false,
            easing: 'easeInOutQuad',
        })
        let animeTool = anime({
            targets: '.tools div',
            duration: 4000,
            delay: anime.stagger(-100),
            translateX: [-1500, 0],
            scale: [0.2, 1],
            autoplay: false,
            easing: 'easeInOutQuad',
        })
        let animeTitleTool = anime({
            targets: '.titleTool',
            duration: 4000,
            delay: 0,
            translateX: 1500,
            autoplay: false,
            easing: 'easeInOutQuad',
        })
        let animeSoft = anime({
            targets: '.softs div',
            duration: 4000,
            delay: anime.stagger(-100),
            translateX: [-1500, 0],
            scale: [0.2, 1],
            autoplay: false,
            easing: 'easeInOutQuad',
        })
        let animeTitleSoft = anime({
            targets: '.titleSoft',
            duration: 4000,
            delay: 0,
            translateX: 1500,
            autoplay: false,
            easing: 'easeInOutQuad',
        })

        const animeContainProject = anime({
            targets: '.containProject',
            width: [1, 500],
            height: [500, 500],
            autoplay: false,
            delay: function (el, i, l) {
                return i * 3000;
            },
            endDelay: function (el, i, l) {
                return (l - i) * 0;
            },
            rotate: {
                value: function () { return anime.random(-4, 4); },
                delay: 0,
            },
            opacity: 1,
            duration: 4000,
            easing: 'easeInOutQuad',
        })
            ;
        const animeContentProject = anime({
            targets: '.contentProject',
            autoplay: false,
            delay: function (el, i, l) {
                return i * 3000;
            },
            endDelay: function (el, i, l) {
                return (l - i) * 0;
            },
            opacity: 1,
            duration: 4000,
            easing: 'easeInOutQuad',
        });

        const animeTextCV = anime({
            targets: '.animeTextCV',
            delay: 0,
            easing: 'easeOutInSine',
            autoplay: false,
            duration: 4000,
            translateY: [500, 0],
            scale: [1.5, 1]
        })

        const animeCV = anime({
            targets: '.animeCV',
            delay: 0,
            easing: 'easeOutInSine',
            autoplay: false,
            duration: 4000,
            translateX: [-200, 0],
            opacity: [0, 1],
            scale: [0.5, 1],
            /* rotate: [15, 0] */
        })

        const animeForm = anime({
            targets: '.animeForm',
            elasticity: 200,
            autoplay: false,
            scale: [0, 1],
            easing: 'easeInOutCubic',
            translateX: [0, 400, -100, 0],
            opacity: [0.5, 1],
        })

        const animeIconsContact = anime({
            targets: '.animeIconsContact a',
            elasticity: 200,
            autoplay: false,
            translateX: [-200, 0],
            easing: 'easeInOutCubic',
            rotate: [0, 720]
        })



        const scrollPercent = () => {
            const bodyST = document.body.scrollTop;
            const docST = document.documentElement.scrollTop;
            const docSH = document.documentElement.scrollHeight;
            const docCH = document.documentElement.clientHeight;


            return (docST + bodyST) / (docSH - docCH) * 100
        }

        const divSkills = document.querySelector('.skills')
        const titleSkill = document.querySelector('.titleSkill')
        const divTools = document.querySelector('.tools')
        const titleTool = document.querySelector('.titleTool')
        const divSofts = document.querySelector('.softs')
        const titleSoft = document.querySelector('.titleSoft')
        const divContainProject = document.querySelector('.containProject')
        const divContentProject = document.querySelector('.contentProject')
        const divCV = document.querySelector('.animeCV')
        const divTextCV = document.querySelector('.animeTextCV')
        const divForm = document.querySelector('.animeForm')
        const divIconsContact = document.querySelector('.animeIconsContact')

        window.addEventListener('scroll', (e) => {
            animeSkill.seek(animateOnScroll(divSkills, 1200, -400) * animeSkill.duration)
            animeTitleSkill.seek(animateOnScroll(titleSkill, 500, -1000) * animeTitleSkill.duration)
            animeTool.seek(animateOnScroll(divTools, 1200, -450) * animeTool.duration)
            animeTitleTool.seek(animateOnScroll(titleTool, 500, -700) * animeTitleTool.duration)
            animeSoft.seek(animateOnScroll(divSofts, 1200, -150) * animeSoft.duration)
            animeTitleSoft.seek(animateOnScroll(titleSoft, 500, -200) * animeTitleSoft.duration)
            animeContainProject.seek(animateOnScroll(divContainProject, 4000, 250) * animeContainProject.duration)
            animeContentProject.seek(animateOnScroll(divContentProject, 4000, 750) * animeContentProject.duration)
            animeCV.seek(animateOnScroll(divCV, 1000, 3000) * animeCV.duration)
            animeTextCV.seek(animateOnScroll(divTextCV, 1000, 2200) * animeTextCV.duration)
            animeForm.seek(animateOnScroll(divForm, 3000, 4000) * animeForm.duration)
            animeIconsContact.seek(animateOnScroll(divIconsContact, 2500, 3000) * animeIconsContact.duration)


            if (window.pageYOffset > 300) {
                anime({
                    targets: '#header',
                    duration: 1000,
                    delay: 0,
                    translateX: 10
                })
                anime({
                    targets: '.svgG',
                    duration: 1000,
                    delay: 0,
                    translateX: -100
                })
            } else if (window.pageYOffset <= 300) {

                anime({
                    targets: '#header',
                    duration: 1000,
                    delay: 0,
                    translateX: 115
                })
                anime({
                    targets: '.svgG',
                    duration: 1000,
                    delay: 0,
                    translateX: 0
                })
            }

        });

        return () => {
            window.removeEventListener('scroll', () => {
            });
        };

    }, [])

    return (

        <div onMouseMove={(e) => onMouseMove(document.querySelector('.cursor'), e)} onMouseDown={(e) => onMouseDown(document.querySelector('.cursor'))}>

            <div className="cursor">
                <div className="cursor__inner"></div>
            </div>

            <Head>
                <title>Angel Guillermo Montaña</title>
            </Head>

            <Header />

            <svg className='absolute hidden z-40 -top-3 left-2 w-[35rem] h-[35rem] svgG svgAnimeInfinit' viewBox="0 0 723 577" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className='stroke-[21px]' d="M711.997 351.568C712.704 364.565 574.791 398.762 471.536 395.322C388.932 392.569 350.326 395.322 315.326 395.322C305.073 387.832 -79.9314 425.673 31.08 444.2C51.0097 447.526 320.897 515.777 406.825 557.062C475.567 590.09 490.395 523.677 489.216 486.342C481.829 320.007 401.302 2.36452 471.536 11.1797C541.77 19.9949 225.954 477.23 169.551 542.918C113.148 608.605 320.503 410.679 410.074 355.51C470.278 318.429 610.468 303.291 576.238 385.862C533.451 489.075 268.563 586.497 164.247 500.486C80.7945 431.677 263.965 68.9026 598.483 43.2905C621.943 41.8558 660.663 43.9531 627.855 63.8196" stroke="#2707EA" />
            </svg>

            <div className='ml-32 h-screen relative z-20 text-white flex justify-around items-center snap-center dark:text-black' id='about'>

                <TextAbout about={about} />

                <Photo contact={contact} />

            </div>

            <SectionSkills allSkills={allSkills} allTools={allTools} allSofts={allSofts} />

            <SectionProject allProjects={allProjects} />

            <SectionResume />

            <SectionContact contact={contact} />

        </div>
    )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const responseSkill = await axios('/skill')
    const allSkills = await responseSkill.data
    const responseTool = await axios('/tool')
    const allTools = await responseTool.data
    const responseSoft = await axios('/soft')
    const allSofts = await responseSoft.data
    const responseAbout = await axios('/about')
    const about = await responseAbout.data
    const responseContact = await axios('/contact')
    const contact = await responseContact.data
    const responseProject = await axios('/project')
    const allProjects = await responseProject.data

    return {
        props: {
            allSkills,
            allTools,
            allSofts,
            about,
            contact,
            allProjects
        },
    }
}