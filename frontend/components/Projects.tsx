"use client";
import { getBaseUrl } from '@/utils/baseUrl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const responsiveWidthlimit: number = 850;

type ProjectLink = {
  link: string,
  linkName: string,
  illustrationPath?: string,
};

type ProjectContentInput = {
  illustrationPath?: string,
  projectName: string,
  projectDescription?: string,
  projectTags?: string[],
  projectLinks?: ProjectLink[],
};

const ProjectDetailsContent: React.FC<{screenWidth: number, contentInput: ProjectContentInput}> = (
  {screenWidth, contentInput}
) => {
  
  return (
    <div className={(screenWidth < responsiveWidthlimit ? 'flex flex-1 flex-col mx-2.5 my-2.5 justify-between' 
    : 'flex flex-1 flex-col mx-2.5 my-2.5 justify-between' 
    )}>
      { /* {project title} */
        !(screenWidth < responsiveWidthlimit) && <ProjectTitle contentInput={contentInput}/>
      }
      { /* {project links} */
        contentInput.projectLinks && contentInput.projectLinks?.length != 0 &&
        
        <div className='flex flex-col justify-between'>

          <ProjectSplitter/>
          <div className="flex flex-col mx-2.5 my-2.5 justify-between">
            <div className="flex mx-1.5 mb-2.5 flex-wrap items-start justify-center">
              {
                contentInput.projectLinks.map((link: ProjectLink, projectLinkIndex) => {

                  let src: string = "projects/linkIllustrations/High-contrast-emblem-symbolic-link.png";
                  if (link.illustrationPath != null) {
                    src = "projects/linkIllustrations/"+link.illustrationPath;
                  }

                  return (
                    <a key={projectLinkIndex} href={link.link}
                      className="mx-auto block"
                      title={link.linkName}
                    >
                      <Image
                        src={src}
                        alt={link.linkName}
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
      <ProjectSplitter/>
      <div className="flex flex-col mx-2.5 my-2.5 justify-between">
        <div className="flex mx-1.5 my-2.5 items-center justify-center">
          { 
            contentInput.projectDescription &&
            <a className="text-left text-white no-underline">
              {contentInput.projectDescription}
            </a>
          }
        </div>
      </div>
      { /* {project tags} */
        contentInput.projectTags && contentInput.projectTags?.length != 0 &&

        <div className={(screenWidth < responsiveWidthlimit ? 'justify-between mb-2.5 flex flex-wrap' 
        : 'justify-between mb-2.5 shrink-0 flex-nowrap max-w-md' 
        )}>
        {
          contentInput.projectTags.map((tag: string, projectTagIndex) => {
            return (
              <div key={projectTagIndex} className="inline-block align-middle bg-gray-700 rounded ml-1.5 mb-1.5">
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
  );
}

const ProjectTitle: React.FC<{contentInput: ProjectContentInput}> = ({contentInput}) => {
  return (
    <div className="flex mx-4 my-5 items-center justify-center max-w-1/2">
      <h3 className='text-center text-white no-underline break-words
                    text-xl'
      >
        {contentInput.projectName}
      </h3>
    </div>
  );
}

const ProjectSplitter: React.FC = () => {
  return (
    <div className="flex flex-col mx-2.5 my-2.5 justify-between">
      <hr className='h-0.5 mx-0.8 bg-gray-400 border-none'/>
    </div>
  );
}
  

const ProjectComponent: React.FC<{screenWidth: number, contentInput: ProjectContentInput}> = (
  {screenWidth, contentInput}
) => {
  if (screenWidth < responsiveWidthlimit) {
    return (
      <div className='w-full'>
        <div className="flex flex-col m-3 justify-between items-center rounded-md border-4 border-gray-500 bg-black">
          <div className='flex flex-row'>
            <div className='flex items-center m-3 border-4 border-gray-500 rounded-md'>
              <div className='flex items-center m-1'>
                <Image
                  src={contentInput.illustrationPath != null ? contentInput.illustrationPath : "/projects/default.png"}
                  alt={contentInput.illustrationPath != null ?
                    "\""+contentInput.projectName+"\""+" Project Picture" : "Default Project Picture"}
                  width={0.25 * screenWidth}
                  height={0.25 * screenWidth}
                  className=''
                />
              </div>
            </div>
            <ProjectTitle contentInput={contentInput}/>
          </div>
          <ProjectDetailsContent contentInput={contentInput} screenWidth={screenWidth}/>
        </div>
      </div>
      
    );
  } else {
    return (
      <div className="flex flex-col m-2.5 justify-between items-center 
                      rounded-md border-4 border-gray-500 bg-black w-[24rem] h-[36rem] hover:h-full overflow-hidden">
        <div className='flex items-center m-2.5 ml-5 mt-8  border-4 border-gray-500 rounded-md'>
          <div className='flex items-center m-1'>
            <Image
              src={contentInput.illustrationPath != null ? contentInput.illustrationPath : "/projects/default.png"}
              alt={contentInput.illustrationPath != null ?
                "\""+contentInput.projectName+"\""+" Project Picture" : "Default Project Picture"}
              width={160}
              height={160}
            />
          </div>
        </div>
        <ProjectDetailsContent contentInput={contentInput} screenWidth={screenWidth}/>
      </div>
    );
  }
};

const Projects: React.FC = () => {

  const [screenWidth, setScreenWidth] = useState(0);

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
        {
          link: getBaseUrl(),
          linkName: "Project Website",
        },
        {
          link: "https://github.com/Deffohn/portfolio-website",
          linkName: "Github Repository",
          illustrationPath: "github.png"
        },
      ]
    },
    {
      illustrationPath: "/projects/pacman-traveler.png",
      projectName: "Pacman Traveler",
      projectDescription: "Pacman Traveler is a HTML Canvas - Typescript game experiment for displaying terrain generation algorithms, demonstration of my own algorithm to generate random and smart pacman levels based on a decaying tree generation for tiles borders.",
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
        {
          link: getBaseUrl()+"pacman-traveler",
          linkName: "Pacman Traveler Website",
        },
        {
          link: "https://github.com/Deffohn/portfolio-website/tree/main/frontend/app/pacman-traveler",
          linkName: "Github Repository path",
          illustrationPath: "github.png"
        },
      ],
    },
  ];

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  if (screenWidth < responsiveWidthlimit) {
    return (
      <div>
        <h2 className='text-3xl font-bold ml-2'>Projects</h2>
        
        <div className="flex flex-col items-center justify-between">
          {projects.map((project, index) => {
            return (
              <ProjectComponent
                key={index}
                screenWidth={screenWidth}
                contentInput={project}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2 className='text-3xl font-bold ml-2'>Projects</h2>
        <div className="flex flex-wrap">
          {projects.map((project, index) => {
            return (
              <ProjectComponent
                key={index}
                screenWidth={screenWidth}
                contentInput={project}
              />
            );
          })}
        </div>
      </div>
    );
  }

  
};

export default Projects;