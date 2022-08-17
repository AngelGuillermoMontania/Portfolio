import anime from "animejs";
import Image from "next/image";
import { Skill, Soft, Tool } from "../interfaces";
const grid = [10, 10]

interface Props {
    allSkills: Array<Skill>
    allTools: Array<Tool>
    allSofts: Array<Soft>
}

const SectionSkills: React.FC<Props> = ({ allSkills, allTools, allSofts }) => {

    const baseUrl = process.env.NEXT_PUBLIC_PORTFOLIO_API
    console.log(baseUrl)

    return (
        <div id='sectionSkills' className='text-white w-full h-screen flex flex-col justify-around text-4xl text-center relative z-20 dark:text-black'>
            <div className='flex flex-col w-full items-center justify-center top-full bg-blackSecundary dark:bg-slate-200 shadow-black shadow-2xl'>
                <p className='relative titleSkill my-4 underline-offset-8 underline'>Skills</p>
                <div className='flex justify-center w-5/6 flex-wrap relative skills'>
                    {
                        allSkills ? allSkills.map((skill: Skill) => <div key={skill.id} className='mx-4 my-2 w-auto'>
                            <Image
                                src={`https://api-portfolio-angel.herokuapp.com/skill/image?name=${skill.image}`}
                                height={50}
                                width={50}
                                alt="not found"
                                className="imageSkills relative rounded-full"
                            />
                            <p className='text-lg text-center'>{skill.name}</p>
                        </div>) : ""
                    }
                </div>
            </div>
            {
                <div className='flex flex-col w-full items-center justify-center top-full bg-blackSecundary dark:bg-slate-200 shadow-black shadow-2xl'>
                    <p className='relative -left-[1500px] titleTool my-4 underline-offset-8 underline'>Tools</p>
                    <div className='flex justify-center w-5/6 flex-wrap relative tools'>
                        {
                            allTools.map((tool: Tool) => <div key={tool.id} className='mx-12 my-2 w-auto'>
                                <Image
                                    src={`https://api-portfolio-angel.herokuapp.com/skill/image?name=${tool.image}`}
                                    height={50}
                                    width={50}
                                    alt="not found"
                                    className="imageSkills relative rounded-full"
                                />
                                <p className='text-lg'>{tool.name}</p>
                            </div>)
                        }
                    </div>
                </div>
            }
            <div className='flex flex-col w-full items-center justify-center top-full bg-blackSecundary dark:bg-slate-200 shadow-black shadow-2xl'>
                <p className='relative -left-[1500px] titleSoft my-4 underline-offset-8 underline'>Soft Skills</p>
                <div className='flex justify-center w-5/6 flex-wrap relative softs'>
                    {
                        allSofts.map((soft: Soft) => <div key={soft.id} className='mx-12 my-2 w-auto'>
                            <Image
                                src={`https://api-portfolio-angel.herokuapp.com/soft/image?name=${soft.image}`}
                                height={50}
                                width={50}
                                alt="not found"
                                className="imageSkills relative rounded-full"
                            />
                            <p className='text-lg'>{soft.name}</p>
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default SectionSkills