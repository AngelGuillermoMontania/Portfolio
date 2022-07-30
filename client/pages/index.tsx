import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import anime from 'animejs';
import { UIEvent, useCallback, useEffect, useState } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Container, Engine } from 'tsparticles-engine';
import configParticle from '../particle.json'
import PhotoAnime from '../components/user/Photo';
import axios from 'axios';
import index from './index.module.css'
const grid = [10, 10]

class skills {
  "id": string
  "name": string
  "image": string
  "level": string
}

class tools {
  "id": string
  "name": string
  "image": string
  "level": string
}

class softs {
  "id": string
  "name": string
  "image": string
}

const arrayProfession = ['Full Stack Developer', 'Back End Developer', 'Front End Developer']


const Home: NextPage = ({ allSkills, allTools, allSofts, about }: InferGetStaticPropsType<typeof getStaticProps>) => {

  var positionContenido = 0

  const animateOnScroll = (element: Element | null, speed = 100, offset = 0) => {
    if (element) {
      const scrollPercent = window.pageYOffset - element.getBoundingClientRect().top
      return (scrollPercent - offset) / speed
    }
    return 0
  }

  useEffect(() => {

    const isHiddenClass = 'is-hidden';
    const isClickedClass = 'is-clicked';
    const isLinkHoveredClass = 'is-link-hovered';
    const hasCustomCursorClass = 'has-custom-cursor';
    const cursorEl = document.querySelector('.cursor');

    const onMouseMove = (e: MouseEvent) => {
      if (cursorEl) {
        cursorEl?.setAttribute('style', `--cursor-x: ${e.clientX + 'px'}; --cursor-y: ${e.clientY + 'px'}`)
      }
    }
    const onMouseDown = () => {
      cursorEl?.classList.add(isClickedClass);
    };
    const onMouseUp = () => {
      cursorEl?.classList.remove(isClickedClass);
    };
    const onMouseEnter = () => {
      cursorEl?.classList.remove(isHiddenClass);
    };
    const onMouseLeave = () => {
      cursorEl?.classList.add(isHiddenClass);
    };
    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, .mouse-hover, input[type="button"], input[type="submit"]').forEach((el) => {
        el.addEventListener("mouseover", () => cursorEl?.classList.add(isLinkHoveredClass));
        el.addEventListener("mouseout", () => cursorEl?.classList.remove(isLinkHoveredClass));
      });
    };
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mousedown", onMouseDown)
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

    const animeInitHeader = anime({
      targets: '#header',
      duration: 1000,
      delay: 2500,
      translateX: 100
    })
    const animeInitTitle = anime({
      targets: '#title',
      duration: 1000,
      delay: 4000,
      translateY: 150,
      scale: 1.1
    })
    const animeInitName = anime({
      targets: '#name',
      duration: 1000,
      delay: 4000,
      translateY: 200,
      scale: 1.1
    })
    const animeInitIAm = anime({
      targets: '#iam',
      duration: 1000,
      delay: 4000,
      translateY: 350,
      scale: 1.1
    })
    const animeInitContain = anime({
      targets: '.contain',
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
      delay: function (el, i, l) {
        return i * 3200;
      },
      endDelay: function (el, i, l) {
        return (l - i) * 100;
      }
    })
    const animeInitDescription = anime({
      targets: '#description',
      duration: 1000,
      delay: 4000,
      translateY: 850,
      scale: 1.1,
      endDelay: 0
    })
    function a() {
      animeInitContain.play()
    }
    animeInitDescription.finished.then(a)

    const photoAnimation = anime.timeline({
      targets: '.el',
      easing: 'easeInOutSine',
      delay: 3000,
      loop: true,
      autoplay: false
    })
      .add({
        translateX: [
          { value: anime.stagger('-.1rem', { grid: grid, from: 'center', axis: 'x' }) },
          { value: anime.stagger('.1rem', { grid: grid, from: 'center', axis: 'x' }) }
        ],
        translateY: [
          { value: anime.stagger('-.1rem', { grid: grid, from: 'center', axis: 'y' }) },
          { value: anime.stagger('.1rem', { grid: grid, from: 'center', axis: 'y' }) }
        ],
        duration: 1000,
        scale: .5,
      })
      .add({
        translateX: [
          { value: anime.stagger('.1rem', { grid: grid, from: 'center', axis: 'y' }) },
          { value: anime.stagger('-.1rem', { grid: grid, from: 'center', axis: 'y' }) }
        ],
        translateY: [
          { value: anime.stagger('.1rem', { grid: grid, from: 'center', axis: 'x' }) },
          { value: anime.stagger('-.1rem', { grid: grid, from: 'center', axis: 'x' }) }
        ],
        duration: 1000,
        scale: 1,

      })
      .add({
        scale: [
          { value: .1, easing: 'easeOutSine', duration: 500 },
          { value: 1, easing: 'easeInOutQuad', duration: 1200 }
        ],
        delay: anime.stagger(200, { grid: grid, from: 'center' }),

      })
      .add({
        rotate: anime.stagger([90, 0], { grid: grid, from: 'center' }),
        delay: anime.stagger(50, { grid: grid, from: 'center' })
      })
      .add({
        translateX: 0,
        translateY: 0,
        scale: .5,
        scaleX: 1,
        rotate: 180,
        duration: 1000,
        delay: anime.stagger(100, { grid: grid, from: 'center' })
      })
      .add({
        borderRadius: 100,
        duration: 1000,
        delay: anime.stagger(100, { grid: grid, from: 'center' })
      })
      .add({
        borderRadius: 0,
        scaleY: 1,
        scale: 1,
        delay: anime.stagger(20, { grid: grid, from: 'center' })
      })
      .add({
        rotate: 360,
        duration: 1000,
        delay: anime.stagger(20, { grid: grid, from: 'center' })
      })
    photoAnimation.play()

    /* let skillsAnime = anime({
      targets: '.visibilitychange-demo',
      translateX: 270,
      duration: 4000,
      autoplay: false,
      easing: 'easeinoutsine'
    }); */

    let animeImageSkills = anime.timeline({
      targets: '.imageSkills',
      easing: 'easeInOutSine',
      delay: 1000,
      loop: true,
      autoplay: false
    })
      .add({
        duration: 2000,
        borderRadius: 100,
        delay: 0
      })
      .add({
        duration: 2000,
        borderRadius: 20
      })
      .add({
        duration: 2000,
        borderRadius: 100,
        delay: 0
      })
      .add({
        rotate: 360,
        duration: 1000,
      })
      .add({
        scale: .2,
        duration: 100,
      })
      .add({
        scale: 1,
        duration: 100,
      })
      .add({
        duration: 2000,
        borderRadius: 0
      })
    animeImageSkills.play()


    let animeSkill = anime({
      targets: '.skills',
      duration: 4000,
      delay: 0,
      translateX: 1500,
      autoplay: false,
      easing: 'easeInOutQuad',
      direction: 'alternate'
      /* 'easeOutInQuart' */
    })
    let animeTitleSkill = anime({
      targets: '.titleSkill',
      duration: 4000,
      delay: 0,
      translateX: 1500,
      autoplay: false,
      easing: 'easeInOutQuad',
    })
    let animeTool = anime({
      targets: '.tools',
      duration: 4000,
      delay: 0,
      translateX: 1500,
      autoplay: false,
      easing: 'easeInOutQuad',
      /* 'easeOutInQuart' */
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
      targets: '.softs',
      duration: 4000,
      delay: 0,
      translateX: 1500,
      autoplay: false,
      easing: 'easeInOutQuad',
      /* 'easeOutInQuart' */
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
      height: {
        value: 600,
      },
      width: {
        value: 500,
        delay: 4000,
      },
      autoplay: false,
      delay: function (el, i, l) {
        return i * 1000;
      },
      endDelay: function (el, i, l) {
        return (l - i) * 0;
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
        return i * 1500;
      },
      endDelay: function (el, i, l) {
        return (l - i) * 0;
      },
      opacity: 1,
      duration: 4000,
      easing: 'easeInOutQuad',
    });

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
    window.addEventListener('scroll', (e) => {
      animeSkill.seek(animateOnScroll(divSkills, 1200, -950) * animeSkill.duration)
      animeTitleSkill.seek(animateOnScroll(titleSkill, 500, -1000) * animeTitleSkill.duration)
      animeTool.seek(animateOnScroll(divTools, 1200, -650) * animeTool.duration)
      animeTitleTool.seek(animateOnScroll(titleTool, 500, -700) * animeTitleTool.duration)
      animeSoft.seek(animateOnScroll(divSofts, 1200, -350) * animeSoft.duration)
      animeTitleSoft.seek(animateOnScroll(titleSoft, 500, -200) * animeTitleSoft.duration)
      animeContainProject.seek(animateOnScroll(divContainProject, 400, 1100) * animeContainProject.duration)
      animeContentProject.seek(animateOnScroll(divContentProject, 400, 1500) * animeContentProject.duration)

      if (window.pageYOffset > 300) {
        anime({
          targets: '#header',
          duration: 1000,
          delay: 0,
          translateX: 0
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
          translateX: 100
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

  const particlesInit = async (main: Engine) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  return (

    <div>

      <Head>
        <title>Angel Guillermo Montaña</title>
      </Head>

      <div className="cursor">
        <div className="cursor__inner"></div>
      </div>

      {/* <svg className='fixed -top-14 left-2 w-[35rem] h-[35rem] svgG' viewBox="0 0 1025 738" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_f_304_5)">
          <path d="M1008 449C1009 465.487 813.954 508.864 667.923 504.5C551.099 501.009 496.5 504.5 447 504.5C432.5 495 -112 543 45 566.5C73.1859 570.719 454.879 657.293 576.404 709.662C673.624 751.557 694.595 667.314 692.928 619.956C682.481 408.966 568.594 6.04616 667.923 17.228C767.253 28.4098 320.604 608.399 240.836 691.721C161.067 775.043 454.323 523.98 581 454C666.144 406.965 864.41 387.762 816 492.5C755.488 623.422 380.864 746.999 233.334 637.897C115.31 550.616 374.363 90.4476 847.46 57.9594C880.64 56.1396 935.4 58.8 889 84" stroke="red" stroke-width="19" />
        </g>
        <defs>
          <filter id="filter0_f_304_5" x="0.101196" y="0.500458" width="1024.4" height="737" filterUnits="userSpaceOnUse" >
            <feFlood result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_304_5" />
          </filter>
        </defs>
      </svg> */}



      <svg className='absolute z-40 -top-2 left-2 w-[35rem] h-[35rem] svgG svgAnimeInfinit' viewBox="0 0 723 577" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M711.997 351.568C712.704 364.565 574.791 398.762 471.536 395.322C388.932 392.569 350.326 395.322 315.326 395.322C305.073 387.832 -79.9314 425.673 31.08 444.2C51.0097 447.526 320.897 515.777 406.825 557.062C475.567 590.09 490.395 523.677 489.216 486.342C481.829 320.007 401.302 2.36452 471.536 11.1797C541.77 19.9949 225.954 477.23 169.551 542.918C113.148 608.605 320.503 410.679 410.074 355.51C470.278 318.429 610.468 303.291 576.238 385.862C533.451 489.075 268.563 586.497 164.247 500.486C80.7945 431.677 263.965 68.9026 598.483 43.2905C621.943 41.8558 660.663 43.9531 627.855 63.8196" stroke="#2707EA" stroke-width="21" stroke-linecap="round" />
      </svg>

      <header
        id='header'
        className='z-30 bg-[#161616] flex flex-col fixed pl-6 -left-32 rounded-2xl w-36 h-screen shadow-header justify-around items-center'
        onMouseOver={() => {
          anime({
            targets: '#header',
            duration: 1000,
            delay: 0,
            translateX: 100,
          })
          anime({
            targets: '.svgG',
            duration: 1000,
            delay: 0,
            translateX: 0,
          })
        }}
        onMouseOut={() => {
          anime({
            targets: '#header',
            duration: 1000,
            delay: 0,
            translateX: 0,
          })
          anime({
            targets: '.svgG',
            duration: 1000,
            delay: 0,
            translateX: -100,
          })
        }}
      >
        <div className='h-24 w-24'>
          <svg className='w-24 h-24 svgAnimeInfinit svgHeader hidden' viewBox="0 0 723 577" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M711.997 351.568C712.704 364.565 574.791 398.762 471.536 395.322C388.932 392.569 350.326 395.322 315.326 395.322C305.073 387.832 -79.9314 425.673 31.08 444.2C51.0097 447.526 320.897 515.777 406.825 557.062C475.567 590.09 490.395 523.677 489.216 486.342C481.829 320.007 401.302 2.36452 471.536 11.1797C541.77 19.9949 225.954 477.23 169.551 542.918C113.148 608.605 320.503 410.679 410.074 355.51C470.278 318.429 610.468 303.291 576.238 385.862C533.451 489.075 268.563 586.497 164.247 500.486C80.7945 431.677 263.965 68.9026 598.483 43.2905C621.943 41.8558 660.663 43.9531 627.855 63.8196" stroke="#2707EA" stroke-width="21" stroke-linecap="round" />
          </svg>
        </div>


        <a href='' className='text-white font-bold relative z-50 hover:scale-110 transition-all'>ABOUT</a>
        <a href='#sectionSkills' className='text-white font-bold relative z-50 hover:scale-110 transition-all'>SKILLS</a>
        <a href='#projects' className='text-white font-bold relative z-50 hover:scale-110 transition-all'>PROJECTS</a>
        <a className='text-white font-bold relative z-50 hover:scale-110 transition-all'>RESUME</a>
        <a className='text-white font-bold relative z-50 hover:scale-110 transition-all'>REFERENCE</a>
        <a className='text-white font-bold relative z-50 hover:scale-110 transition-all'>CONTACT</a>
        <button
          id='toggleDark'
          className='text-white'
        >
          Light Mode
        </button>
      </header>
      {/* <Particles 
        id="tsparticles" 
        init={particlesInit} 
        loaded={particlesLoaded} 
        options={}
      /> */}

      <div className='ml-32 h-screen relative z-20 text-white flex justify-around items-center snap-center' id=''>
        <div className='h-full w-1/2 relative text-2xl flex items-center justify-center text-center'>
          <p id='title' className='absolute -top-12 text-center'>Hello! My name is</p> <p id='name' className='absolute -top-12 text-center'><svg className='w-8 h-8 inline' viewBox="0 0 1025 738" fill="none" xmlns="http://www.w3.org/2000/svg">

            <path d="M240.836 691.721C320.604 608.399 767.253 28.4098 667.923 17.228C568.594 6.04616 682.481 408.966 692.928 619.956C694.595 667.314 673.624 751.557 576.404 709.662C454.879 657.293 73.1859 570.719 45 566.5C-112 543 432.5 495 447 504.5C496.5 504.5 551.099 501.009 667.923 504.5C813.954 508.864 1009 465.487 1008 449" stroke="white" stroke-width="60" />

          </svg>ngel <svg className='w-6 h-6 inline' viewBox="0 0 736 684" fill="none" xmlns="http://www.w3.org/2000/svg">

              <path d="M52.8356 650.721C-26.9332 734.043 266.323 482.98 393 413C478.144 365.965 676.41 346.762 628 451.5C567.488 582.422 192.864 705.999 45.334 596.897C-72.6903 509.616 186.363 49.4476 659.46 16.9594C692.64 15.1396 747.4 17.8 701 43" stroke="white" stroke-width="60" />

            </svg>uillermo Montaña,
          </p>
          <p id='iam' className='absolute -top-32 text-center'>I am</p>

          <p className='contain absolute top-80 text-sm text-center opacity-0'>Full Stack Developer</p>
          <p className='contain absolute top-80 text-sm text-center opacity-0'>Back End Developer</p>
          <p className='contain absolute top-80 text-sm text-center opacity-0'>Front End Developer</p>


          <p id='description' className='absolute w-full -top-96 text-center'>{about.description}</p>
        </div>

        <PhotoAnime />
      </div>


      <div id='sectionSkills' className='text-white w-full h-screen flex flex-col justify-around text-4xl text-center relative z-20'>
        <div className='flex flex-col w-full items-center justify-center top-full'>
          <p className='relative -left-[1500px] titleSkill my-4'>Skills</p>
          <div className='flex justify-center w-5/6 flex-wrap relative skills -left-[1500px]'>
            {
              allSkills.map((skill: skills) => <div className='mx-4 my-2 w-auto'>
                <Image
                  src={`http://localhost:3002/skill/image?name=${skill.image}`}
                  height={50}
                  width={50}
                  className="imageSkills relative"
                />
                <p className='text-lg text-center'>{skill.name}</p>
              </div>)
            }
          </div>
        </div>
        <div className='flex flex-col w-full items-center justify-center top-full'>
          <p className='relative -left-[1500px] titleTool my-4'>Tools</p>
          <div className='flex justify-center w-5/6 flex-wrap relative tools -left-[1500px]'>
            {
              allTools.map((tool: tools) => <div className='mx-12 my-2 w-auto'>
                <Image
                  src={`http://localhost:3002/skill/image?name=${tool.image}`}
                  height={50}
                  width={50}
                  className="imageSkills relative"
                />
                <p className='text-lg'>{tool.name}</p>
              </div>)
            }
          </div>
        </div>
        <div className='flex flex-col w-full items-center justify-center top-full'>
          <p className='relative -left-[1500px] titleSoft my-4'>Soft Skills</p>
          <div className='flex justify-center w-5/6 flex-wrap relative softs -left-[1500px]'>
            {
              allSofts.map((soft: softs) => <div className='mx-12 my-2 w-auto'>
                <Image
                  src={`http://localhost:3002/soft/image?name=${soft.image}`}
                  height={50}
                  width={50}
                  className="imageSkills relative"
                />
                <p className='text-lg'>{soft.name}</p>
              </div>)
            }
          </div>
        </div>
      </div>
      <div id='projects' className='w-full h-screen flex flex-col items-center pl-2 text-center'>
        <p className='text-5xl my-8 underline-offset-8 underline'>Projects</p>
        <div className='flex w-full min-h-5/6 flex-col items-center'>
          <div className='w-full flex justify-around my-4'>
            <div className='bg-[#161616] border-2 border-green-600 shadow-xl shadow-green-600 hover:shadow-lg transition-all hover:scale-105 hover:shadow-green-600 w-1 max-w-[35%] h-1 relative containProject mx-2 my-2 rounded-2xl'>
              <p className='contentProject opacity-0 my-4 text-3xl'>Titulo Titulo</p>
              <div className='w-full flex h-1/4 justify-around'>
                <div className='relative flex w-2/5 h-full contentProject opacity-0'>
                  <Image
                    src={"http://localhost:3002/skill/image?name=2022-7-25-1658785105919.png"}
                    layout='fill'
                    className="rounded-2xl"
                  />
                </div>
                <div className='contentProject opacity-0 flex flex-wrap items-center w-1/2 justify-between'>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                </div>
              </div>
              <div className='contentProject opacity-0 flex flex-col h-1/2 justify-around'>
                <p>Position: Full Stack Developer</p>
                <p className='w-5/6 mx-auto text-lg my-8'>
                  d escri pciond escripc iondescripcionde scripciondescripc iondescripcion descr ipciondesc ripciondescripciondescripcion descripci ondescrip ciondescripciondescrip ciondescripciondesc ripcionde scripci ondescripci ondescripcion
                </p>

              </div>
              <div className='contentProject opacity-0 flex justify-end'>
                <a className='border py-1 mx-4 px-2 rounded-lg bg-[#C84B31] hover:bg-green-600 hover:text-black transition-all'>Deploy</a>
                <a className='border py-1 mx-4 px-2 rounded-lg bg-[#C84B31] hover:bg-green-600 hover:text-black transition-all'>GitHub</a>
              </div>
            </div>
            <div className='bg-[#161616] border-2 border-green-600 shadow-xl shadow-green-600 hover:shadow-lg transition-all hover:scale-105 hover:shadow-green-600 w-1 max-w-[35%] h-1 relative containProject mx-2 my-2 rounded-2xl'>
              <p className='contentProject opacity-0 my-4 text-3xl'>Titulo Titulo</p>
              <div className='w-full flex h-1/4 justify-around'>
                <div className='relative flex w-2/5 h-full contentProject opacity-0'>
                  <Image
                    src={"http://localhost:3002/skill/image?name=2022-7-25-1658785105919.png"}
                    layout='fill'
                    className="rounded-2xl"
                  />
                </div>
                <div className='contentProject opacity-0 flex flex-wrap items-center w-1/2 justify-between'>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                </div>
              </div>
              <div className='contentProject opacity-0 flex flex-col h-1/2 justify-around'>
                <p>Position: Full Stack Developer</p>
                <p className='w-5/6 mx-auto text-lg my-8'>
                  d escri pciond escripc iondescripcionde scripciondescripc iondescripcion descr ipciondesc ripciondescripciondescripcion descripci ondescrip ciondescripciondescrip ciondescripciondesc ripcionde scripci ondescripci ondescripcion
                </p>

              </div>
              <div className='contentProject opacity-0 flex justify-end'>
                <a className='border py-1 mx-4 px-2 rounded-lg bg-[#C84B31] hover:bg-green-600 hover:text-black transition-all'>Deploy</a>
                <a className='border py-1 mx-4 px-2 rounded-lg bg-[#C84B31] hover:bg-green-600 hover:text-black transition-all'>GitHub</a>
              </div>
            </div>
          </div>
          <div className='w-full flex justify-around my-4'>
            <div className='bg-[#161616] border-2 border-green-600 shadow-xl shadow-green-600 hover:shadow-lg transition-all hover:scale-105 hover:shadow-green-600 w-1 max-w-[35%] h-1 relative containProject mx-2 my-2 rounded-2xl'>
              <p className='contentProject opacity-0 my-4 text-3xl'>Titulo Titulo</p>
              <div className='w-full flex h-1/4 justify-around'>
                <div className='relative flex w-2/5 h-full contentProject opacity-0'>
                  <Image
                    src={"http://localhost:3002/skill/image?name=2022-7-25-1658785105919.png"}
                    layout='fill'
                    className="rounded-2xl"
                  />
                </div>
                <div className='contentProject opacity-0 flex flex-wrap items-center w-1/2 justify-between'>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                </div>
              </div>
              <div className='contentProject opacity-0 flex flex-col h-1/2 justify-around'>
                <p>Position: Full Stack Developer</p>
                <p className='w-5/6 mx-auto text-lg my-8'>
                  d escri pciond escripc iondescripcionde scripciondescripc iondescripcion descr ipciondesc ripciondescripciondescripcion descripci ondescrip ciondescripciondescrip ciondescripciondesc ripcionde scripci ondescripci ondescripcion
                </p>

              </div>
              <div className='contentProject opacity-0 flex justify-end'>
                <a className='border py-1 mx-4 px-2 rounded-lg bg-[#C84B31] hover:bg-green-600 hover:text-black transition-all'>Deploy</a>
                <a className='border py-1 mx-4 px-2 rounded-lg bg-[#C84B31] hover:bg-green-600 hover:text-black transition-all'>GitHub</a>
              </div>
            </div>
            <div className='bg-[#161616] border-2 border-green-600 shadow-xl shadow-green-600 hover:shadow-lg transition-all hover:scale-105 hover:shadow-green-600 w-1 max-w-[35%] h-1 relative containProject mx-2 my-2 rounded-2xl'>
              <p className='contentProject opacity-0 my-4 text-3xl'>Titulo Titulo</p>
              <div className='w-full flex h-1/4 justify-around'>
                <div className='relative flex w-2/5 h-full contentProject opacity-0'>
                  <Image
                    src={"http://localhost:3002/skill/image?name=2022-7-25-1658785105919.png"}
                    layout='fill'
                    className="rounded-2xl"
                  />
                </div>
                <div className='contentProject opacity-0 flex flex-wrap items-center w-1/2 justify-between'>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                  <p className='border-r-2 border-l-2 mx-1 px-2 pt-1 rounded-lg'>React</p>
                </div>
              </div>
              <div className='contentProject opacity-0 flex flex-col h-1/2 justify-around'>
                <p>Position: Full Stack Developer</p>
                <p className='w-5/6 mx-auto text-lg my-8'>
                  d escri pciond escripc iondescripcionde scripciondescripc iondescripcion descr ipciondesc ripciondescripciondescripcion descripci ondescrip ciondescripciondescrip ciondescripciondesc ripcionde scripci ondescripci ondescripcion
                </p>

              </div>
              <div className='contentProject opacity-0 flex justify-end'>
                <a className='border py-1 mx-4 px-2 rounded-lg bg-[#C84B31] hover:bg-green-600 hover:text-black transition-all'>Deploy</a>
                <a className='border py-1 mx-4 px-2 rounded-lg bg-[#C84B31] hover:bg-green-600 hover:text-black transition-all'>GitHub</a>
              </div>
            </div>
          </div>



        </div>
      </div>
      



    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const responseSkill = await axios('http://localhost:3002/skill')
  const allSkills = await responseSkill.data
  const responseTool = await axios('http://localhost:3002/tool')
  const allTools = await responseTool.data
  const responseSoft = await axios('http://localhost:3002/soft')
  const allSofts = await responseSoft.data
  const responseAbout = await axios('http://localhost:3002/about')
  const about = await responseAbout.data
  /* const image = await axios('http://localhost:3002/images?name=2022-7-22-1658514925384.png') */

  /* console.log(images) */

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      allSkills,
      allTools,
      allSofts,
      about
    },
  }
}


/* {
  fpsLimit: 60,
  backgroundMode: {
    enable: true,
    zIndex: 10
  },
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        area: 800
      }
    },
    color: {
      value: [
        "#3998D0",
        "#2EB6AF",
        "#A9BD33",
        "#FEC73B",
        "#F89930",
        "#F45623",
        "#D62E32",
        "#EB586E",
        "#9952CF"
      ]
    },
    destroy: {
      mode: "split",
      split: {
        count: 1,
        factor: {
          value: 9,
          random: {
            enable: true,
            minimumValue: 4
          }
        },
        rate: {
          value: 10,
          random: {
            enable: true,
            minimumValue: 5
          }
        },
        particles: {
          collisions: {
            enable: false
          },
          destroy: {
            mode: "none"
          },
          life: {
            count: 1,
            duration: {
              value: 1
            }
          }
        }
      }
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000"
      },
      polygon: {
        sides: 5
      },
      image: {
        src: "https://cdn.matteobruni.it/images/particles/github.svg",
        width: 100,
        height: 100
      }
    },
    opacity: {
      value: 1,
      random: false,
      animation: {
        enable: false,
        speed: 1,
        minimumValue: 0.1,
        sync: false
      }
    },
    size: {
      value: 40,
      random: {
        enable: true,
        minimumValue: 10
      },
      animation: {
        enable: false,
        speed: 40,
        minimumValue: 0.1,
        sync: false
      }
    },
    lineLinked: {
      enable: false,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    collisions: {
      enable: true,
      mode: "destroy"
    },
    move: {
      enable: true,
      speed: 7,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detectsOn: "window",
    events: {
      onHover: {
        enable: false,
        mode: "repulse",
        parallax: {
          enable: false,
          force: 60,
          smooth: 10
        }
      },
      onClick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 0.8
      },
      repulse: {
        distance: 200
      },
      push: {
        particles_nb: 1
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  detectRetina: true
} */