import styles from './Projects.module.css';

type ProjectContentInput = {
  illustrationPath?: string,
  projectName: string,
  projectDescription?: string,
  projectTags?: string[],
  projectLinks?: string[]
}

const ProjectComponent: React.FC<{contentInput: ProjectContentInput}> = (
  {contentInput}
) => {
  return (
    <div className={styles.project}>
      <ul className={styles.projectContent}>
        <li>
          { 
            contentInput.illustrationPath != null ?
            <img src={contentInput.illustrationPath}
              alt={"\""+contentInput.projectName+"\""+" Project Picture"}
              className={styles.projectPicture}
            />
            :
            <img src={"/projects/default.png"}
              alt={"Default Project Picture"}
              className={styles.projectPicture}
            />
          }
        </li>
        <li>
          <h3>{contentInput.projectName}</h3>
          
        </li>
        <li>
          { 
            contentInput.projectDescription &&
            <a className={styles.projectContentTextDescription}>
              {contentInput.projectDescription}
            </a>
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
    ],
    projectLinks: [
      "https://github.com/Deffohn/portfolio-website"
    ]
  }
]

const Projects: React.FC = () => {

  return (
    <div>
      <h2>Projects</h2>
      <ul className={styles.projectList}>
        {projects.map((value: ProjectContentInput) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <li>
              <ProjectComponent contentInput={value}/>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
  
export default Projects;
  
