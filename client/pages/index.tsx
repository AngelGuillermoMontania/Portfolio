import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import anime from 'animejs';
import { ChangeEvent, FormEvent, MouseEvent, UIEvent, useCallback, useEffect, useState } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Container, Engine } from 'tsparticles-engine';
import configParticle from '../particle.json'
import PhotoAnime from '../components/user/Photo';
import axios from 'axios';
import { Controller, Scene } from 'react-scrollmagic';
import index from './index.module.css'
import { validate } from '../validator/messageValidator';
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

class projects {
  "name": string
  "description": string
  "dateInit": Date
  "dateEnd": Date
  "image": string
  "repositoryLink": string
  "deployLink": string
  "relevance": number
  "company": string
  "isActive": boolean
  "skills": Array<skills>
  "tools": Array<tools>
}

const arrayProfession = ['Full Stack Developer', 'Back End Developer', 'Front End Developer']


const Home: NextPage = ({ allSkills, allTools, allSofts, about, allProjects, contact }: InferGetStaticPropsType<typeof getStaticProps>) => {

  var positionContenido = 0
  const [message, setMessage] = useState({
    title: "",
    company: "",
    body: "",
    email: ""
  })
  const [errors, setErrors] = useState({
    title: "",
    company: "",
    body: "",
    email: ""
  });
  const [successMessage, setsuccessMessage] = useState("");

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

  const handleMessage = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setMessage({
      ...message,
      [event.target.name]: event.target.value
    })
    setErrors(validate({
      ...message,
      [event.target.name]: event.target.value
    }))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if ((errors.title === "" && errors.company === "" && errors.body === "" && errors.email === "") && (message.title !== "" && message.company !== "" && message.body !== "" && message.email !== "")) {
      const responsePostMessage = await axios.post("http://localhost:3002/message", message)
      console.log(responsePostMessage.data)
      setsuccessMessage("Successfully sent")
      setMessage({
        title: "",
        company: "",
        body: "",
        email: ""
      })
    }
    try {

    } catch (error) {

    }
  }

  const onMouseMove = (elem: Element | null, e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    if (elem) {
      elem?.setAttribute('style', `--cursor-x: ${e.clientX + 'px'}; --cursor-y: ${e.clientY + 'px'}`)
    }
  }

  useEffect(() => {
    const isHiddenClass = 'is-hidden';
    const isClickedClass = 'is-clicked';
    const isLinkHoveredClass = 'is-link-hovered';
    const hasCustomCursorClass = 'has-custom-cursor';
    const cursorEl = document.querySelector('.cursor');


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
      document.querySelectorAll('a, button, Link, .mouse-hover, input, textarea').forEach((el) => {
        el.addEventListener("mouseover", () => cursorEl?.classList.add(isLinkHoveredClass));
        el.addEventListener("mouseout", () => cursorEl?.classList.remove(isLinkHoveredClass));
      });
    };
    const addEventListeners = () => {
      /* document.addEventListener("mousemove", onMouseMove) */
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

    const animeInitImage = anime({
      targets: '.staggering-grid-demo',
      duration: 2000,
      delay: 1500,
      loop: false,
      easing: 'easeInOutSine',
      opacity: 1,
    })

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
      delay: 2700,
      loop: true,
      autoplay: false
    })
      /* .add({
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
      }) */
      /* .add({
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

      }) */
      .add({
        scale: [
          { value: .1, easing: 'easeOutSine', duration: 500 },
          { value: 1, easing: 'easeInOutQuad', duration: 1200 }
        ],
        delay: anime.stagger(200, { grid: grid, from: 'center' }),
        endDelay: 2000
      })
      .add({
        borderRadius: [
          { value: 100, easing: 'easeInOutQuad', duration: 500 },
          { value: 0, easing: 'easeInOutQuad', duration: 1200 }
        ],
        scale: [
          { value: .7, easing: 'easeOutSine', duration: 500 },
          { value: 1, easing: 'easeOutSine', duration: 1200 }
        ],
        delay: anime.stagger(200, { grid: grid, from: 'last' }),
        endDelay: 2000
      })
    /* .add({
      borderRadius: [
        {value: anime.stagger(10, { grid: grid, from: 'center' })},
        {value: anime.stagger(100, { grid: grid, from: 'center' })},
        {value: anime.stagger(0, { grid: grid, from: 'center' })}
      ],
      duration: 3000,
      translateX: [
        {value: anime.stagger('-.1rem', {grid: grid, from: 'center', axis: 'x'}) },
        {value: anime.stagger('.1rem', {grid: grid, from: 'center', axis: 'x'}) },
        {value: anime.stagger('.1rem', {grid: grid, from: 'center', axis: 'x'}) },
        {value: anime.stagger('-.1rem', {grid: grid, from: 'center', axis: 'x'}) },
        {value: anime.stagger('.0rem', {grid: grid, from: 'center', axis: 'x'}) },
        {value: anime.stagger('-.0rem', {grid: grid, from: 'center', axis: 'x'}) }
      ],
      translateY: [
        {value: anime.stagger('-.1rem', {grid: grid, from: 'center', axis: 'y'}) },
        {value: anime.stagger('.1rem', {grid: grid, from: 'center', axis: 'y'}) },
        {value: anime.stagger('.1rem', {grid: grid, from: 'center', axis: 'y'}) },
        {value: anime.stagger('-.1rem', {grid: grid, from: 'center', axis: 'y'}) },
        {value: anime.stagger('.0rem', {grid: grid, from: 'center', axis: 'y'}) },
        {value: anime.stagger('-.0rem', {grid: grid, from: 'center', axis: 'y'}) }
      ],
      delay: anime.stagger(100, { grid: grid, from: 'center' })
    }) */
    /* .add({
      borderRadius: 0,
      scale: [
        { value: 1, easing: 'easeOutSine', duration: 500 },
      ],
      
      delay: anime.stagger(200, { grid: grid, from: 'center' }),
    }) */
    /* .add({
      rotate: anime.stagger([90, 0], { grid: grid, from: 'center' }),
      delay: anime.stagger(50, { grid: grid, from: 'center' })
    }) */
    /* .add({
      translateX: [
        {value: anime.stagger('-.1rem', {grid: grid, from: 'center', axis: 'x'}) },
        {value: anime.stagger('.1rem', {grid: grid, from: 'center', axis: 'x'}) },
        {value: anime.stagger('.1rem', {grid: grid, from: 'center', axis: 'x'}) },
        {value: anime.stagger('-.1rem', {grid: grid, from: 'center', axis: 'x'}) },
        {value: anime.stagger('.0rem', {grid: grid, from: 'center', axis: 'x'}) },
        {value: anime.stagger('-.0rem', {grid: grid, from: 'center', axis: 'x'}) }
      ],
      translateY: [
        {value: anime.stagger('-.1rem', {grid: grid, from: 'center', axis: 'y'}) },
        {value: anime.stagger('.1rem', {grid: grid, from: 'center', axis: 'y'}) },
        {value: anime.stagger('.1rem', {grid: grid, from: 'center', axis: 'y'}) },
        {value: anime.stagger('-.1rem', {grid: grid, from: 'center', axis: 'y'}) },
        {value: anime.stagger('.0rem', {grid: grid, from: 'center', axis: 'y'}) },
        {value: anime.stagger('-.0rem', {grid: grid, from: 'center', axis: 'y'}) }
      ],
      duration: 5000,
      delay: anime.stagger(100, {grid: grid, from: 'center'})
    }) */

    /* .add({
      rotate: 360,
      duration: 2000,
      delay: anime.stagger(100, { grid: grid, from: 'center' })
    })
    .add({
      borderRadius: 0,
      scaleY: 1,
      scale: 1,
      delay: anime.stagger(20, { grid: grid, from: 'center' })
    }) */
    /* .add({
      rotate: 360,
      duration: 1000,
      delay: anime.stagger(20, { grid: grid, from: 'center' })
    })
    .add({
      scaleY: 1,
      scale: 1,
      delay: anime.stagger(20, {grid: grid, from: 'center'})
    }) */
    photoAnimation.play()
    /* let skillsAnime = anime({
      targets: '.visibilitychange-demo',
      translateX: 270,
      duration: 4000,
      autoplay: false,
      easing: 'easeinoutsine'
    }); */

    const animeIconsInit = anime({
      targets: '.animeIconsInit',
      easing: 'easeInOutSine',
      opacity: 1,
      delay: 4000,
      loop: false,

    })

    let animeImageSkills = anime({
      targets: '.imageSkills',
      easing: 'easeInOutSine',
      loop: true,
      rotate: [
        { value: 420, easing: 'easeOutSine', duration: 500 },
        { value: 0, easing: 'easeInOutQuad', duration: 1200 }
      ],
      delay: anime.stagger(300, { grid: grid, from: 'center' }),
      endDelay: 3000,
    })



    let animeSkill = anime({
      targets: '.skills div',
      duration: 4000,
      delay: anime.stagger(-100),
      translateX: [-1500, 0],
      scale: [0.2, 1],
      autoplay: false,
      easing: 'easeInOutQuad',
      direction: 'alternate'
      /* 'easeOutInQuart' */
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
    let animeDivProject = anime({
      targets: '.animDivProject',
      duration: 2000,
      delay: 5000,
      loop: true,
      endDelay: 2000,
      rotate: function () { return anime.random(-4, 4); },
      direction: 'alternate',
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

  const handleDarkMode = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark')
      console.log(e.currentTarget.children[0].classList.add('hidden'))
      console.log(e.currentTarget.children[1].classList.remove('hidden'))
    } else {
      document.documentElement.classList.add('dark')
      console.log(e.currentTarget.children[1].classList.add('hidden'))
      console.log(e.currentTarget.children[0].classList.remove('hidden'))
    }
  }

  const propsPhotoAnime = {

  }

  return (

    <div onMouseMove={(e) => onMouseMove(document.querySelector('.cursor'), e)}>

      <Head>
        <title>Angel Guillermo Montaña</title>
      </Head>

      <div className="cursor">
        <div className="cursor__inner"></div>
      </div>


      <svg className='absolute z-40 -top-3 left-2 w-[35rem] h-[35rem] svgG svgAnimeInfinit' viewBox="0 0 723 577" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M711.997 351.568C712.704 364.565 574.791 398.762 471.536 395.322C388.932 392.569 350.326 395.322 315.326 395.322C305.073 387.832 -79.9314 425.673 31.08 444.2C51.0097 447.526 320.897 515.777 406.825 557.062C475.567 590.09 490.395 523.677 489.216 486.342C481.829 320.007 401.302 2.36452 471.536 11.1797C541.77 19.9949 225.954 477.23 169.551 542.918C113.148 608.605 320.503 410.679 410.074 355.51C470.278 318.429 610.468 303.291 576.238 385.862C533.451 489.075 268.563 586.497 164.247 500.486C80.7945 431.677 263.965 68.9026 598.483 43.2905C621.943 41.8558 660.663 43.9531 627.855 63.8196" stroke="#2707EA" stroke-width="21" />
      </svg>

      <header
        id='header'
        className='z-30 bg-[#1e1e1e] flex flex-col fixed pl-6 -left-32 rounded-2xl w-36 h-screen shadow-header justify-around items-center text-white dark:bg-gray-300 dark:text-black dark:shadow-headerDark'
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
            <path d="M711.997 351.568C712.704 364.565 574.791 398.762 471.536 395.322C388.932 392.569 350.326 395.322 315.326 395.322C305.073 387.832 -79.9314 425.673 31.08 444.2C51.0097 447.526 320.897 515.777 406.825 557.062C475.567 590.09 490.395 523.677 489.216 486.342C481.829 320.007 401.302 2.36452 471.536 11.1797C541.77 19.9949 225.954 477.23 169.551 542.918C113.148 608.605 320.503 410.679 410.074 355.51C470.278 318.429 610.468 303.291 576.238 385.862C533.451 489.075 268.563 586.497 164.247 500.486C80.7945 431.677 263.965 68.9026 598.483 43.2905C621.943 41.8558 660.663 43.9531 627.855 63.8196" stroke="#2707EA" stroke-width="21" />
          </svg>
        </div>


        <a href='#about' className='my-4 font-bold relative z-50 hover:scale-110 transition-all'>ABOUT</a>
        <a href='#sectionSkills' className='my-4 font-bold relative z-50 hover:scale-110 transition-all'>SKILLS</a>
        <a href='#projects' className='my-4 font-bold relative z-50 hover:scale-110 transition-all'>PROJECTS</a>
        <a href='#resume' className='my-4 font-bold relative z-50 hover:scale-110 transition-all'>RESUME</a>
        <a href='#contact' className='my-4 font-bold relative z-50 hover:scale-110 transition-all'>CONTACT</a>
        <button onClick={(e) => handleDarkMode(e)} className='bg-[#161616] border-double border border-green-600 py-1 px-3 shadow-lg hover:shadow-sm transition-all shadow-black rounded-lg dark:bg-green-700 dark:border-black'>
          <svg aria-hidden="true" id="theme-toggle-dark-icon" className="w-5 h-5 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z">
            </path>
          </svg>
          <svg aria-hidden="true" id="theme-toggle-light-icon" className="w-5 h-5 fill-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" >
            </path>
          </svg>
        </button>
      </header>
      {/* <Particles 
        id="tsparticles" 
        init={particlesInit} 
        loaded={particlesLoaded} 
        options={}
      /> */}

      <div className='ml-32 h-screen relative z-20 text-white flex justify-around items-center snap-center dark:text-black' id='about'>
        <div className='h-full w-1/2 relative text-2xl flex items-center justify-center text-center'>
          <p id='title' className='absolute -top-12 text-center'>
            Hello! My name is
          </p>
          <p id='name' className='absolute -top-12 text-center items-center flex'>
            <svg className='w-10 h-10 inline stroke-white dark:stroke-black' viewBox="0 0 1025 738" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M240.836 691.721C320.604 608.399 767.253 28.4098 667.923 17.228C568.594 6.04616 682.481 408.966 692.928 619.956C694.595 667.314 673.624 751.557 576.404 709.662C454.879 657.293 73.1859 570.719 45 566.5C-112 543 432.5 495 447 504.5C496.5 504.5 551.099 501.009 667.923 504.5C813.954 508.864 1009 465.487 1008 449" stroke-width="60" />
            </svg>
            ngel
            <svg className='w-8 h-8 inline ml-2 stroke-white dark:stroke-black' viewBox="0 0 736 684" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M52.8356 650.721C-26.9332 734.043 266.323 482.98 393 413C478.144 365.965 676.41 346.762 628 451.5C567.488 582.422 192.864 705.999 45.334 596.897C-72.6903 509.616 186.363 49.4476 659.46 16.9594C692.64 15.1396 747.4 17.8 701 43" stroke-width="60" />
            </svg>uillermo Montaña,
          </p>
          <p id='iam' className='absolute -top-32 text-center'>I am</p>

          <p className='contain absolute top-80 text-sm text-center opacity-0'>Full Stack Developer</p>
          <p className='contain absolute top-80 text-sm text-center opacity-0'>Back End Developer</p>
          <p className='contain absolute top-80 text-sm text-center opacity-0'>Front End Developer</p>


          <p id='description' className='absolute w-full -top-96 text-center'>{about.description}</p>

        </div>

        <PhotoAnime {...contact} />

      </div>


      <div id='sectionSkills' className='text-white w-full h-screen flex flex-col justify-around text-4xl text-center relative z-20 dark:text-black'>
        <div className='flex flex-col w-full items-center justify-center top-full bg-[#2a2a2a] dark:bg-slate-200 shadow-black shadow-2xl'>
          <p className='relative titleSkill my-4 underline-offset-8 underline'>Skills</p>
          <div className='flex justify-center w-5/6 flex-wrap relative skills'>
            {
              allSkills.map((skill: skills) => <div className='mx-4 my-2 w-auto'>
                <Image
                  src={`http://localhost:3002/skill/image?name=${skill.image}`}
                  height={50}
                  width={50}
                  className="imageSkills relative rounded-full"
                />
                <p className='text-lg text-center'>{skill.name}</p>
              </div>)
            }
          </div>
        </div>
        <div className='flex flex-col w-full items-center justify-center top-full bg-[#2a2a2a] dark:bg-slate-200 shadow-black shadow-2xl'>
          <p className='relative -left-[1500px] titleTool my-4 underline-offset-8 underline'>Tools</p>
          <div className='flex justify-center w-5/6 flex-wrap relative tools'>
            {
              allTools.map((tool: tools) => <div className='mx-12 my-2 w-auto'>
                <Image
                  src={`http://localhost:3002/skill/image?name=${tool.image}`}
                  height={50}
                  width={50}
                  className="imageSkills relative rounded-full"
                />
                <p className='text-lg'>{tool.name}</p>
              </div>)
            }
          </div>
        </div>
        <div className='flex flex-col w-full items-center justify-center top-full bg-[#2a2a2a] dark:bg-slate-200 shadow-black shadow-2xl'>
          <p className='relative -left-[1500px] titleSoft my-4 underline-offset-8 underline'>Soft Skills</p>
          <div className='flex justify-center w-5/6 flex-wrap relative softs'>
            {
              allSofts.map((soft: softs) => <div className='mx-12 my-2 w-auto'>
                <Image
                  src={`http://localhost:3002/soft/image?name=${soft.image}`}
                  height={50}
                  width={50}
                  className="imageSkills relative rounded-full"
                />
                <p className='text-lg'>{soft.name}</p>
              </div>)
            }
          </div>
        </div>
      </div>
      <div id='projects' className='w-[98%] mx-auto flex flex-col items-center pl-2 text-center'>
        <p className='text-5xl my-16 underline-offset-8 underline text-white dark:text-black'>Projects</p>
        <div className='flex w-full min-h-5/6 lg:max-w-screen-lg xl:max-w-screen-xl flex-wrap justify-around items-center'>
          {
            allProjects.map((project: projects) =>
              <div className='w-[45%] my-4 relative -top-8 animDivProject text-white dark:text-black'>
                <div className='bg-[#2a2a2a] border border-green-800 shadow-2xl shadow-black dark:shadow-black hover:shadow-xl transition-all w-1 max-w-[90%] h-1 relative containProject mx-auto my-2 rounded-2xl dark:bg-gray-200'>
                  <p className='contentProject opacity-0 my-4 text-3xl'>{project.name}</p>
                  <div className='w-full flex h-2/6 justify-around'>
                    <div className='relative flex w-5/12 h-full contentProject opacity-0'>
                      <Image
                        src={`http://localhost:3002/project/image?name=${project.image}`}
                        layout='fill'
                        className="rounded-2xl"
                      />
                    </div>
                    <div className='contentProject opacity-0 flex flex-wrap items-center w-5/12 justify-between'>
                      {
                        project.skills.map((skill: skills) =>
                          <p className='border-r-2 border-l-2 border-white mx-1 px-2 pt-1 rounded-lg dark:border-black'>{skill.name}</p>
                        )
                      }
                      {
                        project.skills.length < 4 ? project.tools.map((tool: tools) =>
                          <p className='border-r-2 border-white border-l-2 mx-1 px-2 pt-1 rounded-lg dark:border-black'>{tool.name}</p>
                        ) : ""
                      }
                    </div>
                  </div>
                  <div className='contentProject opacity-0 flex flex-col h-2/5 mt-2 justify-around'>
                    <div>
                      <p>
                        Init:
                        {
                          ` ${project.dateInit.toString().slice(0, 10)}`
                        }
                      </p>
                      <p>
                        End:
                        {
                          ` ${project.dateEnd.toString().slice(0, 10)}`
                        }
                      </p>
                    </div>
                    <p className='w-5/6 mx-auto text-lg my-1'>
                      {project.description}
                    </p>
                  </div>
                  <div className='contentProject opacity-0 mt-1 flex justify-end'>
                    {
                      project.deployLink ? <a
                        className='border py-1 mx-4 px-2 rounded-lg bg-[#C84B31] hover:bg-green-600 hover:text-black transition-all'
                        href={project.deployLink}
                      >Deploy</a> : ""
                    }
                    <a
                      className='border py-1 mx-4 px-2 rounded-lg bg-[#C84B31] hover:bg-green-600 hover:text-black transition-all'
                      href={project.repositoryLink}
                    >GitHub</a>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
      <div id='resume' className='w-full h-screen flex flex-col items-center text-white dark:text-black'>
        <p className='text-5xl my-8 underline-offset-8 underline'>Resume</p>
        <div className='w-full h-full flex justify-around items-center text-center'>
          <div className='h-full w-1/3 flex flex-col justify-around'>
            <p className='text-3xl w-full text-center animeTextCV'>Spanish</p>
            <div className='h-[100%] w-full relative'>
              <div className='absolute w-full h-full flex justify-center items-center animeCV'>
                <embed src='http://localhost:3002/resume/view/spanish' height={'98%'} width={'90%'} className='rounded-xl shadow-2xl shadow-black'></embed>
              </div>
            </div>
          </div>
          <div className='h-full w-1/3 flex flex-col justify-around'>
            <p className='text-3xl w-full text-center animeTextCV'>English</p>
            <div className='h-[100%] w-full relative'>
              <div className='absolute w-full h-full flex justify-center items-center animeCV'>
                <embed src='http://localhost:3002/resume/view/english' height={'98%'} width={'90%'} className='rounded-xl'></embed>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div id='contact' className='h-[3000px] w-full text-white dark:text-black'>
        <div className='sticky h-screen top-0 flex flex-col items-center justify-around'>
          <p className='text-5xl underline-offset-8 mt-8 underline'>Contact</p>
          <div className='flex w-3/4 mx-auto mt-8 justify-around animeIconsContact'>
            <a href={contact.github} target="_blank" rel="noreferrer noopener">
              <svg viewBox="0 0 128 128" className='w-16 h-16 hover:scale-150 hover:rotate-[360deg] duration-1000 transition-all'>
                <g className='fill-white dark:fill-black'>
                  <path d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z">
                  </path>
                  <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0">
                  </path>
                </g>
              </svg>
            </a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer noopener">
              <svg viewBox="0 0 128 128" className='w-16 h-16 hover:scale-150 hover:rotate-[360deg] duration-1000 transition-all'>
                <path fill="#0076b2" d="M116 3H12a8.91 8.91 0 00-9 8.8v104.42a8.91 8.91 0 009 8.78h104a8.93 8.93 0 009-8.81V11.77A8.93 8.93 0 00116 3z" />
                <path fill="#fff" d="M21.06 48.73h18.11V107H21.06zm9.06-29a10.5 10.5 0 11-10.5 10.49 10.5 10.5 0 0110.5-10.49M50.53 48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75v32H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53z" />
              </svg>
            </a>
            <a href={contact.twitter} target="_blank" rel="noreferrer noopener">
              <svg viewBox="0 0 128 128" className='w-16 h-16 hover:scale-150 hover:rotate-[360deg] duration-1000 transition-all'>
                <path d="M40.254 127.637c48.305 0 74.719-48.957 74.719-91.403 0-1.39 0-2.777-.075-4.156 5.141-4.547 9.579-10.18 13.102-16.633-4.79 2.602-9.871 4.305-15.078 5.063 5.48-4.02 9.582-10.336 11.539-17.774-5.156 3.743-10.797 6.38-16.68 7.801-8.136-10.586-21.07-13.18-31.547-6.32-10.472 6.86-15.882 21.46-13.199 35.617C41.922 38.539 22.246 26.336 8.915 6.27 1.933 20.94 5.487 39.723 17.022 49.16c-4.148-.172-8.207-1.555-11.832-4.031v.41c0 15.273 8.786 28.438 21.02 31.492a21.596 21.596 0 01-11.863.543c3.437 13.094 13.297 22.07 24.535 22.328-9.305 8.918-20.793 13.75-32.617 13.72-2.094 0-4.188-.15-6.266-.446 12.008 9.433 25.98 14.441 40.254 14.422" fill="#1da1f2"></path>
              </svg>
            </a>
            <a href={`mailto:${contact.email}`} target="_blank" rel="noreferrer noopener">
              <svg className='w-22 h-16 hover:scale-150 hover:rotate-[360deg] duration-1000 transition-all' viewBox="0 0 580 408" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="15.5" y="16.5" width="549" height="389" rx="43.5" fill="white" />
                <rect x="15.5" y="16.5" width="549" height="389" rx="43.5" stroke="white" />
                <rect x="15.5" y="16.5" width="549" height="389" rx="43.5" stroke="white" />
                <mask id="path-2-inside-1_0_1" fill="white">
                  <path d="M15 67C15 49.8792 28.8792 36 46 36H59C76.1208 36 90 49.8792 90 67V377C90 394.121 76.1208 408 59 408H46C28.8792 408 15 394.121 15 377V67Z" />
                </mask>
                <path d="M15 67C15 49.8792 28.8792 36 46 36H59C76.1208 36 90 49.8792 90 67V377C90 394.121 76.1208 408 59 408H46C28.8792 408 15 394.121 15 377V67Z" fill="#FF1B00" />
                <path d="M15 36H90H15ZM90 408H15H90ZM15 408V36V408ZM59 36C86.6142 36 109 58.3858 109 86V358C109 385.614 86.6142 408 59 408C65.6274 408 71 394.121 71 377V67C71 49.8792 65.6274 36 59 36Z" fill="#FF1B00" mask="url(#path-2-inside-1_0_1)" />
                <mask id="path-4-inside-2_0_1" fill="white">
                  <path d="M489 67C489 49.8792 502.879 36 520 36H534C551.121 36 565 49.8792 565 67V377C565 394.121 551.121 408 534 408H520C502.879 408 489 394.121 489 377V67Z" />
                </mask>
                <path d="M489 67C489 49.8792 502.879 36 520 36H534C551.121 36 565 49.8792 565 67V377C565 394.121 551.121 408 534 408H520C502.879 408 489 394.121 489 377V67Z" fill="#FF1C00" />
                <path d="M489 36H565H489ZM565 408H489H565ZM489 408V36V408ZM534 36C561.614 36 584 58.3858 584 86V358C584 385.614 561.614 408 534 408C540.627 408 546 394.121 546 377V67C546 49.8792 540.627 36 534 36Z" fill="#FF1B00" mask="url(#path-4-inside-2_0_1)" />
                <mask id="path-6-inside-3_0_1" fill="white">
                  <path d="M52 88H90V408H52V88Z" />
                </mask>
                <path d="M52 88H90V408H52V88Z" fill="#FF1B00" />
                <path d="M71 88V408H109V88H71Z" fill="#FF1B00" mask="url(#path-6-inside-3_0_1)" />
                <mask id="path-8-inside-4_0_1" fill="white">
                  <path d="M483 88H521V408H483V88Z" />
                </mask>
                <path d="M483 88H521V408H483V88Z" fill="#FF1C00" />
                <path d="M502 88V408H540V88H502Z" fill="#FF1C00" mask="url(#path-8-inside-4_0_1)" />
                <mask id="path-10-inside-5_0_1" fill="white">
                  <path d="M264.324 239.372C250.283 219.319 255.156 191.682 275.208 177.641L496.006 23.0367C516.058 8.99604 543.696 13.8693 557.737 33.9215V33.9215C571.777 53.9736 566.904 81.6112 546.852 95.6519L326.054 250.256C306.002 264.297 278.364 259.424 264.324 239.372V239.372Z" />
                </mask>
                <path d="M264.324 239.372C250.283 219.319 255.156 191.682 275.208 177.641L496.006 23.0367C516.058 8.99604 543.696 13.8693 557.737 33.9215V33.9215C571.777 53.9736 566.904 81.6112 546.852 95.6519L326.054 250.256C306.002 264.297 278.364 259.424 264.324 239.372V239.372Z" fill="#DF3621" />
                <path d="M238.901 203.064L532.314 -2.38614L238.901 203.064ZM557.737 33.9215C579.063 64.3789 571.661 106.358 541.204 127.685L358.087 255.905C327.629 277.231 285.65 269.829 264.324 239.372L264.324 239.372C271.078 249.018 292.81 245.456 312.862 231.416L533.66 76.8114C553.712 62.7708 564.491 43.5683 557.737 33.9215L557.737 33.9215ZM289.746 275.679L238.901 203.064L289.746 275.679ZM532.314 -2.38614L583.16 70.229L532.314 -2.38614Z" fill="#DF3621" mask="url(#path-10-inside-5_0_1)" />
                <mask id="path-12-inside-6_0_1" fill="white">
                  <path d="M22.0724 33.7625C36.113 13.7104 63.7507 8.83709 83.8028 22.8777L304.819 177.635C324.871 191.676 329.745 219.313 315.704 239.365V239.365C301.663 259.418 274.026 264.291 253.973 250.25L32.9571 95.4929C12.905 81.4523 8.03174 53.8146 22.0724 33.7625V33.7625Z" />
                </mask>
                <path d="M22.0724 33.7625C36.113 13.7104 63.7507 8.83709 83.8028 22.8777L304.819 177.635C324.871 191.676 329.745 219.313 315.704 239.365V239.365C301.663 259.418 274.026 264.291 253.973 250.25L32.9571 95.4929C12.905 81.4523 8.03174 53.8146 22.0724 33.7625V33.7625Z" fill="#DF3621" />
                <path d="M47.4952 -2.5451L341.127 203.058L47.4952 -2.5451ZM315.704 239.365C294.377 269.823 252.398 277.225 221.941 255.898L38.6054 127.526C8.14792 106.199 0.745848 64.2199 22.0724 33.7625L22.0724 33.7625C15.3176 43.4093 26.0973 62.6118 46.1494 76.6524L267.166 231.41C287.218 245.45 308.949 249.012 315.704 239.365L315.704 239.365ZM-3.35046 70.0701L47.4952 -2.5451L-3.35046 70.0701ZM341.127 203.058L290.281 275.673L341.127 203.058Z" fill="#DF3621" mask="url(#path-12-inside-6_0_1)" />
                <mask id="path-14-inside-7_0_1" fill="white">
                  <path d="M238.901 203.064L528.646 0.182087L579.492 72.7973L289.746 275.679L238.901 203.064Z" />
                </mask>
                <path d="M320.874 253.883L270.028 181.268L207.773 224.86L258.619 297.475L320.874 253.883Z" fill="#DF3621" mask="url(#path-14-inside-7_0_1)" />
                <mask id="path-16-inside-8_0_1" fill="white">
                  <path d="M50.8457 0L340.591 202.882L289.745 275.497L8.40896e-08 72.6152L50.8457 0Z" />
                </mask>
                <path d="M309.463 181.086L258.618 253.701L320.873 297.293L371.719 224.678L309.463 181.086Z" fill="#DF3621" mask="url(#path-16-inside-8_0_1)" />
              </svg>

            </a>
            <a href={contact.mobile} target="_blank" rel="noreferrer noopener">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                className='w-16 h-16 hover:scale-150 hover:rotate-[360deg] duration-1000 transition-all'
                viewBox="0 0 44 44"
              >
                <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" >
                </path>
              </svg>
            </a>
          </div>
          <div className='h-3/4 w-full flex justify-center items-center relative'>
            <form
              className='bg-[#2a2a2a] w-3/4 h-3/4 flex flex-col justify-around items-center p-4 animeForm border-double border-4 shadow-2xl shadow-black dark:shadow-black rounded-2xl border-green-400 dark:bg-slate-200'
              onSubmit={e => onSubmit(e)}
            >
              <p className='text-2xl'>You can send me a message here</p>
              <div className='flex w-full justify-around'>
                <div className='w-1/3 flex justify-center items-center relative'>
                  <label className='mx-2'>Name:</label>
                  <input
                    type="text"
                    placeholder="Name"
                    name="title"
                    onChange={e => handleMessage(e)}
                    value={message.title}
                    className="w-1/2 p-2 h-2/3 rounded-md text-black focus:outline-none dark:border dark:border-black"
                  />
                  {
                    errors.title && (<p className="text-red-700 absolute top-8">{errors.title}</p>)
                  }
                </div>
                <div className='w-1/3 flex justify-center items-center relative'>
                  <label className='mx-2'>Your company or proyect:</label>
                  <input
                    type="text"
                    placeholder="Company"
                    name="company"
                    onChange={e => handleMessage(e)}
                    value={message.company}
                    className="w-1/2 p-2 h-2/3 rounded-md text-black focus:outline-none dark:border dark:border-black"
                  />
                  {
                    errors.company && (<p className="text-red-700 absolute top-8">{errors.company}</p>)
                  }
                </div>
                <div className='w-1/3 flex justify-center items-center relative'>
                  <label className='mx-2'>Email:</label>
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={e => handleMessage(e)}
                    value={message.email}
                    className="w-1/2 p-2 h-2/3 rounded-md text-black focus:outline-none dark:border dark:border-black"
                  />
                  {
                    errors.email && (<p className="text-red-700 absolute top-8">{errors.email}</p>)
                  }
                </div>
              </div>

              <div className='w-2/3 flex flex-col justify-center items-center relative'>
                <label className='mx-2'>Message:</label>
                <textarea
                  name="body"
                  onChange={e => handleMessage(e)}
                  value={message.body}
                  className="w-full p-1 h-24 rounded-md max-h-40 text-black focus:outline-none dark:border dark:border-black"
                />
                {
                  errors.body && (<p className="text-red-700 absolute top-8">{errors.body}</p>)
                }
              </div>
              <button
                type='submit'
                className='border py-1 mx-4 px-2 rounded-lg bg-blue-800 hover:bg-green-600 hover:text-black dark:text-white dark:hover:text-black transition-all duration-500'
              >
                Send Message
              </button>
            </form>
            <p className="text-green-600 absolute bottom-4 text-4xl">{successMessage}</p>
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
  const responseContact = await axios('http://localhost:3002/contact')
  const contact = await responseContact.data
  const responseProject = await axios('http://localhost:3002/project')
  const allProjectsNoOrder = await responseProject.data
  const allProjects = allProjectsNoOrder.sort(function (a: projects, b: projects) {
    if (a.dateEnd < b.dateEnd) {
      return 1;
    }
    if (a.dateEnd > b.dateEnd) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });

  /* const image = await axios('http://localhost:3002/images?name=2022-7-22-1658514925384.png') */

  /* console.log(images) */

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
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