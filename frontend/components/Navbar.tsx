"use client";
import { useState } from 'react';

const Navbar: React.FC = () => {
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
      className="flex flex-row gap-2 items-center h-full hover:bg-slate-500 text-black hover:text-slate-100" href={navItem.href}
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