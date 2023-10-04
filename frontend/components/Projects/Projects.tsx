import { getBaseUrl } from '@/utils/baseUrl';
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
                contentInput.projectLinks.map((link: string, projectLinkIndex) => {
                  return (
                    <a key={projectLinkIndex} href={link}
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
        { /* {project tags} */
          contentInput.projectTags && contentInput.projectTags?.length != 0 &&

          <div className={styles.projectContentTagsList}>
            {
              contentInput.projectTags.map((tag: string, projectTagIndex) => {
                return (
                  <div key={projectTagIndex} className={styles.projectContentTagItem}>
                    <a className={styles.projectContentTagText}>
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
        "Frontend",
      ],
      projectLinks: [
        "https://github.com/Deffohn/portfolio-website",
      ],
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
  ]
  
  return (
    <div>
      <h2>Projects</h2>
      <div className={styles.projectList}>
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
  
