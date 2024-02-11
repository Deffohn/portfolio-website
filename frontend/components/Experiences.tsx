import { SectionTitle } from "./SectionTitle";
import Image from 'next/image';
import { motion } from "framer-motion";
import { RESPONSIVE_WIDTH_LIMIT } from "@/app/defines";

type Experience = {
  name: string;
  description: string;
  at: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  skillsTought: string[];
  icon?: string;
  url?: string;
};

const ExperienceHeaderDetails: React.FC<{screenWidth: number, experience: Experience}> = (
  {screenWidth, experience}
) => {
  return (
    <div className="flex flex-col justify-start text-left gap-2 ml-2.5">
      <p className="text-slate-50 no-underline break-words text-2xl">{experience.name}</p>
      <p className="flex-grow text-slate-50 no-underline break-words text-xl">at <a className="font-semibold" href={experience.url}> {experience.at}</a>, {experience.location}</p>
    </div>
  )
};

const ExperienceSheet: React.FC<{screenWidth: number, experience: Experience}> = (
  {screenWidth, experience}
) => {
  if (screenWidth < RESPONSIVE_WIDTH_LIMIT) {
    return (
      <div className="bg-slate-300 mx-4 mt-2 rounded-md shadow-2xl">
        <div className="flex flex-col gap-2 bg-slate-500 rounded-md m-2.5">
          <div className="flex flex-1 flex-row">
            <Image className="m-2.5 max-w-[8rem] max-h-[8rem] rounded-md" src={experience.icon? experience.icon : "experiences/default.png"} alt="Experience logo" width={150} height={150} />
            <ExperienceHeaderDetails screenWidth={screenWidth} experience={experience}/>
          </div>
          <div className="flex flex-row-reverse gap-2 mx-2 mb-1">
            {experience.endDate &&
            <p className="text-slate-50 no-underline break-words">
              Ended: {experience.endDate.getFullYear()}/{experience.endDate.getMonth()}
            </p>}
            <p className="text-slate-50 no-underline break-words">
              Started: {experience.startDate.getFullYear()}/{experience.startDate.getMonth()}
            </p>
          </div>
        </div>
        <p className="m-4 text-black no-underline break-words text-xl">
          {experience.description}
        </p>
        { /* {project tags} */
          experience.skillsTought?.length != 0 &&

          <div className={(screenWidth < RESPONSIVE_WIDTH_LIMIT ? 'justify-between mb-2.5 flex flex-wrap' 
          : 'justify-between mb-2.5 flex-nowrap' 
          )}>
          {
            experience.skillsTought.map((tag: string, experienceTagIndex) => {
              return (
                <div key={experienceTagIndex} className="inline-block align-middle bg-slate-500 rounded mx-1.5 mb-1.5">
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
    )
    
  }
  return (
    <motion.div className="overflow-hidden bg-slate-300 rounded-md shadow-2xl m-2.5"
                initial={{ height: "36rem", minHeight: "36rem" }}
                whileHover={{ opacity: 1, height: "auto", minHeight: "36rem"}}
                transition={{ duration: 0.5 }}
    >
      <div className="flex flex-1 flex-col gap-2 m-2.5">
        <div className="flex flex-col bg-slate-500 rounded-md m-2.5">
          <div className="flex flex-wrap">
            <Image className="m-2.5 max-w-[6rem] max-h-[6rem] rounded-md" src={experience.icon? experience.icon : "experiences/default.png"} alt="Experience logo" width={150} height={150} />
            <ExperienceHeaderDetails screenWidth={screenWidth} experience={experience}/>
          </div>
          <div className="flex flex-row-reverse gap-2 mx-2 mb-1">
            {experience.endDate &&
            <p className="text-slate-50 no-underline break-words">
              Ended: {experience.endDate.getFullYear()}/{experience.endDate.getMonth()}
            </p>}
            <p className="text-slate-50 no-underline break-words">
              Started: {experience.startDate.getFullYear()}/{experience.startDate.getMonth()}
            </p>
          </div>
        </div>
        <div className="shrink-0">
          <p className="m-4 text-black no-underline break-words text-xl">
            {experience.description}
          </p>
        </div>
        { /* {project tags} */
          experience.skillsTought?.length != 0 &&

          <div className="justify-between mb-2.5 flex flex-wrap">
          {
            experience.skillsTought.map((tag: string, experienceTagIndex) => {
              return (
                <div key={experienceTagIndex} className="inline-block align-middle bg-slate-500 rounded mx-1.5 mb-1.5">
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
    </motion.div>
  );
}

const Experiences: React.FC<{screenWidth: number}> = ({screenWidth}) => {

  const experiences: Experience[] = [
    {
      name: "Apprentice Developer",
      description: "Working on the information system intern to the company, with goal to automate the cartography of the projects, products and microservices, "+
      "centralizing knowledge and expliciting teams responsabilities.\n"+
      "My contribution was to implement and deploy (by creating the CI/CD) of an opensource platform entitled Backstage.io, "+
      "already implementing multiple features allowing grasping projects from Gitlab repositories for example.\n"+
      "With this opportunity, I've learned a great many things about the DevOps and Agile culture, and the good coding practices working with fully competent software engineers.",
      at: "Softway Medical",
      location: "Fuveau, France",
      startDate: new Date(2022, 10, 3),
      endDate: new Date(2023, 9, 29),
      icon: "data:image/png;base64,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",
      skillsTought: [
        "DevOps", "React", "TypeScript", "Backend", "Docker", "Gitlab", "Git", "CI/CD", "Redhat", "Openshift", "Helm", "Java",
      ],
      url: "https://www.softwaymedical.fr/",
    },
    {
      name: "Software Engineering / Computer Science Student",
      description: "Computer Science and electronics basics studies, with a deep and very fruitful specialization in software and cloud engineering.\n"+
      "With strong fundation in the main programmation languages, this formation offered me a good tour of old and new ways to design, "+
      "upgrade and maintain industrial or public scale software and websites, through the Dev(Sec)Ops perspective with rich interventions and practices in Docker/Kubernetes matter, "+
      "also with deep introduction to multiple public cloud providers with AWS, IBM and GCP clouds.\n",
      at: "ISEN Institute",
      location: "Toulon, France",
      startDate: new Date(2020, 9, 3),
      endDate: new Date(2023, 8, 25),
      icon: "https://storage.googleapis.com/speaknact_prod/users/avatars/isen-mediterranee_1684742186_7227.png",
      skillsTought: [
        "Agile", "Scrum", "Java", "DevOps", "Software Engineering", "Coding practices", "Cloud", "Docker", "Kubernetes", "Terraform", "Linux", "Shell", "Bash", "Git", "CI/CD",
        "GCP", "IBM Cloud", "AWS", "IAM", "EC2", "ECR", "Lambda", "HTML", "Javascript", "C/C++", "Angular", "React", "TypeScript",
        "Backend", "Python", "Pandas","Artificial Intelligence", "Machine Learning", "Deep Learning", "SQL", "PostgreSQL", "NoSQL", "MongoDB",
      ],
      url: "https://www.isen.fr/campus/ecole-ingenieurs-toulon/",
    },
    {
      name: "Intern Software Developer",
      description: "Contributing to the development of a web software for the forecasting of the energy consumption of electricity providing companies.\n"+
      "Apart from the frontend drag and drop feature for customer to upload the input data for the forecasting, I have been working on the backend of the software. "+
      "Basically, I've been working on the data preparation, the scheduling and deployment of the forecasting jobs, and on the splitting of the input data into the dynamically provisioned cloud AWS workers.\n"+
      "And finally, as a DevOps, I've been working on the CI/CD pipeline of the software, using GitHub Actions, Docker, and AWS services.",
      at: "Holmium Consulting",
      location: "Toulon, France",
      startDate: new Date(2022, 6, 6),
      endDate: new Date(2022, 9, 23),
      skillsTought: [
        "React", "TypeScript", "Backend", "Python", "Pandas", "Django", "Docker", "GitHub Actions", "Git", "GitHub", "CI/CD", "AWS", "IAM", "EC2", "ECR", "Coiled.io", "Dask",
      ],
      url: "https://holmium-consulting.com/",
    },
  ];

  return (
    <section>
      <SectionTitle title="Experiences"/>

      {(screenWidth < RESPONSIVE_WIDTH_LIMIT)? <div className="grid grid-cols-1 gap-4 m-2">
        {
          experiences.map((experience: Experience, experienceIndex) => {
            return (
              <ExperienceSheet key={experienceIndex} experience={experience} screenWidth={screenWidth}/>
            );
          })
        
        }
      </div> : <div className="grid grid-cols-3 m-2">
        {
          experiences.map((experience: Experience, experienceIndex) => {
            return (
              <ExperienceSheet key={experienceIndex} experience={experience} screenWidth={screenWidth}/>
            );
          })
        
        }
      </div>}
    </section>
  );
};

export default Experiences;