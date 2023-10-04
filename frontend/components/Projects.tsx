"use client";
import { getBaseUrl } from '@/utils/baseUrl';
import Image from 'next/image';

type ProjectContentInput = {
  illustrationPath?: string,
  projectName: string,
  projectDescription?: string,
  projectTags?: string[],
  projectLinks?: string[]
}

const ProjectPicture: React.FC<{src: string, alt: string}> = (
  {src, alt}
) => {
  return (
    <div>
      <img src={src} alt={alt} className="md:h-30 md:w-auto md:mb-10 md:mt-10 lg:w-40 lg:h-40"/>
    </div>
  );
};

const ProjectComponent: React.FC<{contentInput: ProjectContentInput}> = (
  {contentInput}
) => {
  return (
    <div className='bg-black rounded-md border-4 border-gray-500 m-2.5
      mg:w-320 mg:min-h-480
    '>
      <div className="flex flex-col mx-2.5 my-2.5 justify-between">
        <div className="flex mx-auto">
          { 
            contentInput.illustrationPath != null ?
            <ProjectPicture src={contentInput.illustrationPath}
              alt={"\""+contentInput.projectName+"\""+" Project Picture"}
            />
            :
            <ProjectPicture src={"/projects/default.png"}
              alt={"Default Project Picture"}
            />
          }
        </div>
        <div className="flex flex-col mx-2.5 my-2.5 justify-between">
          <div className="flex mx-1.5 my-2.5 items-center justify-center">
            <h3 className='text-center text-white no-underline break-words
                          text-xl'
            >
              {contentInput.projectName}
            </h3>
          </div>
        </div>
        <div className="flex flex-col mx-2.5 my-2.5 justify-between">
          <hr className='h-0.5 mx-0.8 bg-gray-400 border-none'/>
        </div>
        <div className="flex flex-col mx-2.5 my-2.5 justify-between">
          <div className="flex mx-1.5 my-2.5 items-center justify-center
                            md:max-w-lg">
            { 
              contentInput.projectDescription &&
              <a className="text-left text-white no-underline">
                {contentInput.projectDescription}
              </a>
            }
          </div>
        </div>
        { /* {project links} */
          contentInput.projectLinks && contentInput.projectLinks?.length != 0 &&
          
          <div className='flex flex-col justify-between'>

          <div className="flex flex-col mx-2.5 my-2.5 justify-between">
            <hr className='h-0.5 mx-0.8 bg-gray-400 border-none'/>
          </div>
          <div className="flex flex-col mx-2.5 my-2.5 justify-between">
            <div className="flex mx-1.5 mb-2.5 flex-wrap items-start justify-center">
              {
                contentInput.projectLinks.map((link: string, projectLinkIndex) => {
                  return (
                    <a key={projectLinkIndex} href={link}
                      className="mx-auto block"
                      title={link}
                    >
                      <Image
                        src={"High-contrast-emblem-symbolic-link.png"}
                        alt={link}
                        width={25}
                        height={25}
                      />  
                    </a>
                  );
                })
              }
              
            </div>
          </div>

          </div>
          
        }
        { /* {project tags} */
          contentInput.projectTags && contentInput.projectTags?.length != 0 &&

          <div className="md:justify-between mb-2.5 flex flex-wrap">
            {
              contentInput.projectTags.map((tag: string, projectTagIndex) => {
                return (
                  <div key={projectTagIndex} className="inline-block align-middle bg-gray-700 rounded md:ml-0.5 ml-1.5 mb-1.5">
                    <a className="flex m-1.5 text-white text-center">
                      {tag}
                    </a>
                  </div>
                );
              })
            }
          </div>
        }
        
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const projects: ProjectContentInput[] = [
    {
      illustrationPath: "/projects/portfolio.png",
      projectName: "This same Portfolio you are currently looking at",
      projectDescription: "This portfolio project serves as a means to consolidate various aspects of my endeavors, while also acting as a practical showcase of my software development skills.",
      projectTags: [
        "NextJS",
        "React",
        "Typescript",
        "CICD",
        "Github Actions",
        "Frontend"
      ],
      projectLinks: [
        "https://github.com/Deffohn/portfolio-website"
      ]
    },
    {
      illustrationPath: "/projects/pacman-traveler.png",
      projectName: "Pacman Traveler",
      projectDescription: "Pacman Traveler is a HTML Canvas - Typescript game experiment for displaying terrain generation algorithms, showing of my own algorithm go generate random and smart pacman levels based on a decaying tree generation for tiles borders.",
      projectTags: [
        "Mathematics",
        "Algorithm",
        "Level Generation",
        "NextJS",
        "React",
        "Typescript",
        "Canvas",
      ],
      projectLinks: [
        getBaseUrl()+"pacman-traveler",
        "https://github.com/Deffohn/portfolio-website/blob/main/frontend/app/pacman-traveler",
      ],
    },
  ];

  return (
    <div>
      <h2 className='text-3xl font-bold ml-2'>Projects</h2>
      <div className="flex flex-wrap ml-2">
        {projects.map((value: ProjectContentInput, projectIndex) => {
          return (
            <div key={projectIndex}>
              <ProjectComponent contentInput={value}/>
            </div>
          );
        })}
      </div>
    </div>
  );
};
  
export default Projects;
  
