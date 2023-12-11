"use client";
import { getBaseUrl } from '@/utils/baseUrl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { SectionTitle } from './SectionTitle';

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
            <div className="flex mx-1.5 flex-wrap items-start justify-center">
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
            <a className="text-left text-slate-50 no-underline">
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
                <a className="flex m-1.5 text-slate-50 text-center">
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
      <h3 className='text-center text-slate-50 no-underline break-words
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
      <hr className='h-0.5 mx-0.8 bg-slate-50 border-none'/>
    </div>
  );
}
  

const ProjectComponent: React.FC<{screenWidth: number, contentInput: ProjectContentInput}> = (
  {screenWidth, contentInput}
) => {
  if (screenWidth < responsiveWidthlimit) {
    return (
      <div className='w-full'>
        <div className="flex flex-col m-3 justify-between items-center rounded-md shadow-2xl bg-slate-500">
          <div className='flex flex-row'>
            <div className='flex items-center m-3 mt-8 bg-slate-200 shadow-2xl rounded-md'>
              <div className='flex items-center m-2'>
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
                      rounded-md shadow-2xl bg-slate-500 w-[24rem] h-[36rem] hover:min-h-[36rem] hover:h-full overflow-hidden">
        <div className='flex items-center m-2.5 ml-5 mt-8 bg-slate-200 shadow-2xl rounded-md'>
          <div className='flex items-center m-2'>
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

  const [screenWidth, setScreenWidth] = useState(responsiveWidthlimit + 1);

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
          illustrationPath: "github.png",
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
          link: getBaseUrl()+"/pacman-traveler",
          linkName: "Pacman Traveler Website",
        },
        {
          link: "https://github.com/Deffohn/portfolio-website/tree/main/frontend/app/pacman-traveler",
          linkName: "Github Repository path",
          illustrationPath: "github.png",
        },
      ],
    },
    {
      illustrationPath: "/projects/devexpert-platform.png",
      projectName: "DevExpert Platform",
      projectDescription: "DevExpert Platform is a collaborative student project with @vecil and @zuxaw back in early 2022 during our M1 at ISEN Toulon.\n"+
                          "This project was to help user directly meet with experts in various dev skills, with the ability to rank and to add a tip to the expert if the user was satisfied with the help.\n"+
                          "My main task was to implement both ranking and matching algorithms and microservices as a Flask API, supported by a mongoDB database.",
      projectTags: [
        "Python",
        "Flask",
        "Microservices",
        "Backend",
        "Mathematics",
        "Algorithm",
        "React",
        "Typescript",
        "MongoDB",
        "Terraform",
        "GCP",
        "Skaffolder",
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
        <SectionTitle title='Projects'/>
        
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
        <SectionTitle title='Projects'/>
        <div className="flex flex-wrap justify-center">
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