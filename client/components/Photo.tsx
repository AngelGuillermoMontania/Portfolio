import anime from 'animejs';
import Image from 'next/image';
import React, { useEffect } from 'react'
import photo from '../assets/photo/index'
import { Contact } from '../interfaces';
const grid = [10, 10]

interface Props {
    contact: Contact
}

const PhotoAnime: React.FC<Props> = ({ contact }) => {

    useEffect(() => {
        const animeInitImage = anime({
            targets: '.staggering-grid-demo',
            duration: 2000,
            delay: 1500,
            loop: false,
            easing: 'easeInOutSine',
            opacity: 1,
        })

        const photoAnimation = anime.timeline({
            targets: '.el',
            easing: 'easeInOutSine',
            delay: 2700,
            loop: true,
            autoplay: false
        })
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
        photoAnimation.play()

        const animeIconsInit = anime({
            targets: '.animeIconsInit',
            easing: 'easeInOutSine',
            opacity: 1,
            delay: 4000,
            loop: false,
        })
    }, [])

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='h-[12.5rem] w-[12.5rem] rounded-full flex flex-col opacity-0 flex-wrap staggering-grid-demo xl:h-[25rem] xl:w-[25rem]'>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.a0}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.a1}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.a2}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.a3}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.a4}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.a5}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.a6}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.a7}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.a8}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.a9}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.b0}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.b1}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.b2}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.b3}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.b4}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.b5}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.b6}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.b7}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.b8}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.b9}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.c0}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.c1}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.c2}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.c3}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.c4}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.c5}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.c6}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.c7}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.c8}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.c9}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.d0}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.d1}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.d2}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.d3}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.d4}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.d5}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.d6}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.d7}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.d8}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.d9}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.f0}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.f1}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.f2}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.f3}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.f4}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.f5}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.f6}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.f7}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.f8}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.f9}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.g0}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.g1}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.g2}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.g3}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.g4}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.g5}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.g6}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.g7}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.g8}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.g9}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.h0}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.h1}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.h2}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.h3}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.h4}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.h5}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.h6}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.h7}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.h8}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.h9}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.i0}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.i1}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.i2}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.i3}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.i4}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.i5}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.i6}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.i7}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.i8}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.i9}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.j0}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.j1}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.j2}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.j3}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.j4}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.j5}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.j6}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.j7}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.j8}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.j9}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.k0}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.k1}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.k2}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.k3}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.k4}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.k5}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.k6}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.k7}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute shadow-sm dark:shadow-black"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.k8}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute"
                    />

                </div>
                <div className='w-[20px] h-[20px] xl:w-[40px] xl:h-[40px]'>
                    <Image
                        src={photo.k9}
                        height={100}
                        width={100}
                        layout="responsive"
                        className="el absolute"
                    />

                </div>

            </div>
            <div className='flex w-full mt-8 justify-around items-center opacity-0 animeIconsInit'>
                <a href={contact.linkedin} target="_blank" rel="noreferrer noopener">
                    <svg viewBox="0 0 128 128" className='w-8 h-8 hover:scale-150 hover:rotate-[360deg] duration-1000 transition-all'>
                        <path className='fill-[#0078d4]' d="M116 3H12a8.91 8.91 0 00-9 8.8v104.42a8.91 8.91 0 009 8.78h104a8.93 8.93 0 009-8.81V11.77A8.93 8.93 0 00116 3z">
                        </path>
                        <path className='fill-white' d="M21.06 48.73h18.11V107H21.06zm9.06-29a10.5 10.5 0 11-10.5 10.49 10.5 10.5 0 0110.5-10.49M50.53 48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75v32H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53z">
                        </path>
                    </svg>
                </a>
                <a href={contact.twitter} target="_blank" rel="noreferrer noopener">
                    <svg viewBox="0 0 128 128" className='w-8 h-8 hover:scale-150 hover:rotate-[360deg] duration-1000 transition-all'>
                        <path className='fill-[#2aa4f4]' d="M40.254 127.637c48.305 0 74.719-48.957 74.719-91.403 0-1.39 0-2.777-.075-4.156 5.141-4.547 9.579-10.18 13.102-16.633-4.79 2.602-9.871 4.305-15.078 5.063 5.48-4.02 9.582-10.336 11.539-17.774-5.156 3.743-10.797 6.38-16.68 7.801-8.136-10.586-21.07-13.18-31.547-6.32-10.472 6.86-15.882 21.46-13.199 35.617C41.922 38.539 22.246 26.336 8.915 6.27 1.933 20.94 5.487 39.723 17.022 49.16c-4.148-.172-8.207-1.555-11.832-4.031v.41c0 15.273 8.786 28.438 21.02 31.492a21.596 21.596 0 01-11.863.543c3.437 13.094 13.297 22.07 24.535 22.328-9.305 8.918-20.793 13.75-32.617 13.72-2.094 0-4.188-.15-6.266-.446 12.008 9.433 25.98 14.441 40.254 14.422"></path>
                    </svg>
                </a>
                <a href={contact.github} target="_blank" rel="noreferrer noopener">
                    <svg viewBox="0 0 128 128" className='w-8 h-8 hover:scale-150 hover:rotate-[360deg] duration-1000 transition-all'>
                        <g className='fill-white dark:fill-black' >
                            <path d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z">
                            </path>
                            <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0">
                            </path>
                        </g>
                    </svg>
                </a>
                <a href={`mailto:${contact.email}`} target="_blank" rel="noreferrer noopener">
                    <svg className='w-10 h-8 hover:scale-150 hover:rotate-[360deg] duration-1000 transition-all' viewBox="0 0 580 408" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                        className='w-9 h-9 hover:scale-150 hover:rotate-[360deg] ease-in-out duration-1000 transition-all'
                        viewBox="0 0 44 44"
                    >
                        <path className='fill-black' d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z">
                        </path>
                        <path className='fill-green-700' d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z">
                        </path>
                        <path fill="black" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z" stroke="white" stroke-width="2" >
                        </path>
                        <path className="fill-green-700" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z">
                        </path>
                        <path fill="white" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z">
                        </path>
                    </svg>
                </a>
            </div>
        </div>
    )
}

export default PhotoAnime