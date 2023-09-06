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
    <div className='bg-black rounded-md border-4 border-gray-500 m-2.5
      mg:w-320 mg:min-h-480
    '>
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
  }

]

const Projects: React.FC = () => {
  return (
    <div>
      <h2 className='text-3xl font-bold ml-2'>Projects</h2>
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
  
