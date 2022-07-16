import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import anime from 'animejs';
import { useEffect } from 'react';

const Home: NextPage = () => {

  useEffect(() => {

      anime({
        targets: document.querySelector('.p'),
        translateX: 270
      });
  

  }, [])

  return (
    <div>
      <Head>
        <title>Angel Guillermo Montaña</title>
      </Head>


      <p
        id="p"
        className="p bg-blue-800 rounded-full h-4 w-16 p-4 text-center"
      >Hello</p>




      <svg width="1025" height="738" viewBox="0 0 1025 738" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_f_304_5)">
<path d="M1008 449C1009 465.487 813.954 508.864 667.923 504.5C551.099 501.009 496.5 504.5 447 504.5C432.5 495 -112 543 45 566.5C73.1859 570.719 454.879 657.293 576.404 709.662C673.624 751.557 694.595 667.314 692.928 619.956C682.481 408.966 568.594 6.04616 667.923 17.228C767.253 28.4098 320.604 608.399 240.836 691.721C161.067 775.043 454.323 523.98 581 454C666.144 406.965 864.41 387.762 816 492.5C755.488 623.422 380.864 746.999 233.334 637.897C115.31 550.616 374.363 90.4476 847.46 57.9594C880.64 56.1396 935.4 58.8 889 84" stroke="black" stroke-width="19" stroke-linecap="round"/>
</g>
<defs>
<filter id="filter0_f_304_5" x="0.101196" y="0.500458" width="1024.4" height="737" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="3.5" result="effect1_foregroundBlur_304_5"/>
</filter>
</defs>
</svg>









      <Link href={"/user"}>User</Link>





      <svg width="736" height="684" viewBox="0 0 736 684" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_f_304_5)">
<path d="M52.8356 650.721C-26.9332 734.043 266.323 482.98 393 413C478.144 365.965 676.41 346.762 628 451.5C567.488 582.422 192.864 705.999 45.334 596.897C-72.6903 509.616 186.363 49.4476 659.46 16.9594C692.64 15.1396 747.4 17.8 701 43" stroke="black" stroke-width="19" stroke-linecap="round"/>
</g>
<defs>
<filter id="filter0_f_304_5" x="0.488232" y="0.00338745" width="734.901" height="683.964" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="3.5" result="effect1_foregroundBlur_304_5"/>
</filter>
</defs>
</svg>










<svg width="1025" height="738" viewBox="0 0 1025 738" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_f_304_5)">
<path d="M240.836 691.721C320.604 608.399 767.253 28.4098 667.923 17.228C568.594 6.04616 682.481 408.966 692.928 619.956C694.595 667.314 673.624 751.557 576.404 709.662C454.879 657.293 73.1859 570.719 45 566.5C-112 543 432.5 495 447 504.5C496.5 504.5 551.099 501.009 667.923 504.5C813.954 508.864 1009 465.487 1008 449" stroke="black" stroke-width="19" stroke-linecap="round"/>
</g>
<defs>
<filter id="filter0_f_304_5" x="0.101196" y="0.500458" width="1024.4" height="737" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="3.5" result="effect1_foregroundBlur_304_5"/>
</filter>
</defs>
</svg>

    </div>
  )
}

export default Home