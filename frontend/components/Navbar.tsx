"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';

const responsiveWidthlimit: number = 600;

const Navbar: React.FC = () => {

  const [screenWidth, setScreenWidth] = useState(responsiveWidthlimit + 1);
  const [isNavbarMenuOpen, setIsNavbarMenuOpen] = useState(false);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  if (screenWidth < responsiveWidthlimit) {
    if (isNavbarMenuOpen) {
      return (
        <div className='sticky top-0 bg-slate-200 border-b-2 border-slate-500 shadow-2xl mb-8'>
          <div
            className="flex flex-row gap-2 items-center h-full"
          >
            <div className="m-2 mt-4 ml-4 hover:bg-slate-500 text-black hover:text-slate-100">
              <a
                key="menu"
                onClick={() => setIsNavbarMenuOpen(false)}
              >
                <Image
                  className="m-2"
                  src={"/cross-1.png"}
                  alt={"Menu"}
                  width={40}
                  height={40}
                />
              </a>
            </div>
          </div>
          
          <nav>
            <div className='ml-4 flex flex-col items-center'>
              {navList.map((navItem) => (
                <div className='flex items-center'>
                  <NavbarSectionItem key={navItem.id} navItem={navItem}/>
                </div>
              ))}
            </div>
          </nav>
        </div>
        
      );
    } else {
      return (
        <div className='sticky top-0'>
          <div
            className="flex flex-row gap-2 items-center h-full"
          >
            <div className="m-2 mt-4 ml-4 hover:bg-slate-500 text-black hover:text-slate-100">
              <a
                key="menu"
                onClick={() => setIsNavbarMenuOpen(true)}
              >
                <Image
                  className="m-2"
                  src={"/bars-1.png"}
                  alt={"Menu"}
                  width={40}
                  height={40}
                />
              </a>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <nav className='flex sticky top-0 bg-slate-200 border-b-2 border-slate-500 shadow-2xl mb-8'>
      <div className='ml-4 flex flex-row items-center'>
        {navList.map((navItem) => (
          <NavbarSectionItem key={navItem.id} navItem={navItem}/>
        ))}
      </div>
    </nav>
  );
};

const NavbarSectionItem: React.FC<{navItem: NavListItem}> = ({navItem}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <a
      key={navItem.id}
      className="flex flex-row gap-2 items-center h-full hover:bg-slate-500 text-black hover:text-slate-100"
      href={navItem.href}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <div className="m-4">
        {navItem.icon && 
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="h-8 w-8 rounded-full"
            src={isHovered ? navItem.icon!.hover : navItem.icon!.default}
            alt={navItem.alt}
          />
        }
        {navItem.text && 
          <h3 className="text-lg leading-6 font-medium">
            {navItem.text!.title}
          </h3>
        }
      </div>
    </a>
  );
};

type NavListItem = {
  id: string,
  href: string,
  icon?: {
    default: string,
    hover: string,
  },
  text?: {
    title: string
  },
  alt: string,
};

const navList: NavListItem[] = [
  {
    id: "home",
    href: "/",
    icon: {
      default: "/homeicon.png",
      hover: "/homeiconhover.png",
    },
    alt: "Home"
  },
  {
    id: "projects",
    href: "#projects",
    text: {
      title: "Projects"
    },
    alt: "Projects",
  },
  {
    id: "experiences",
    href: "#experiences",
    text: {
      title: "Experiences"
    },
    alt: "Experiences",
  },
]

export default Navbar;