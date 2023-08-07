import Image from 'next/image';
import styles from './Projects.module.css';

type ProjectContentInput = {
  illustrationPath?: string,
  projectName: string,
  projectDescription?: string,
  projectTags?: string[]
}

const ProjectComponent: React.FC<{contentInput: ProjectContentInput}> = (
  {contentInput}
) => {
  return (
    <div>
      <ul>
        <li>
          { 
            contentInput.illustrationPath != null ?
            <Image width={100} height={100}
              src={contentInput.illustrationPath}
              alt={"\""+contentInput.projectName+"\""+" Project Picture"}
            />
            :
            <Image width={100} height={100}
              src={"/projects/default.png"}
              alt={"Default Project Picture"}
            />
          }
        </li>
        <li>
          {contentInput.projectName}
        </li>
        <li>
          { 
            contentInput.projectDescription &&
            <div>{contentInput.projectDescription}</div>
          }
        </li>
      </ul>
    </div>
  );
};

const projects: ProjectContentInput[] = [
  {
    illustrationPath: "/projects/portfolio.png",
    projectName: "This same Portfolio you are currently looking at",
    projectDescription: "This Project of portfolio as a tool of joining some of my abouts, but also as practising project of my software developer skills",
    projectTags: [
      "NextJS",
      "Typescript",
      "CICD",
      "Github Actions",
      "Front"
    ]
  }
]

const Projects: React.FC = () => {

  return (
    <div>
      <h2>Projects</h2>
      {projects.map((value: ProjectContentInput) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <ProjectComponent contentInput={value}/>
        );
      })}
    </div>
  );
};
  
export default Projects;
  