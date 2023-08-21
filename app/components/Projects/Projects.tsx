import styles from './Projects.module.css';
import Image from 'next/image';

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
      <div className={styles.projectContentList}>
        <div className={styles.projectContent}>
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
        </div>
        <div className={styles.projectContent}>
          <div className={styles.projectContentText}>
            <h3>{contentInput.projectName}</h3>
          </div>
        </div>
        <div className={styles.projectContent}>
          <hr/>
        </div>
        <div className={styles.projectContent}>
          <div className={styles.projectContentText}>
            { 
              contentInput.projectDescription &&
              <a className={styles.projectContentTextDescription}>
                {contentInput.projectDescription}
              </a>
            }
          </div>
        </div>
        { /* {project links} */
          contentInput.projectLinks && contentInput.projectLinks?.length != 0 &&
          
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column"
          }}>

          <div className={styles.projectContent}>
            <hr/>
          </div>
          <div className={styles.projectContent}>
            <div className={styles.projectContentLinkList}>
              {
                contentInput.projectLinks.map((link: string) => {
                  return (
                    <a href={link}
                      className={styles.projectContentLink}
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
        
      </div>
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
      <div className={styles.projectList}>
        {projects.map((value: ProjectContentInput, i) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <div key={i}>
              <ProjectComponent contentInput={value}/>
            </div>
          );
        })}
      </div>
    </div>
  );
};
  
export default Projects;
  
