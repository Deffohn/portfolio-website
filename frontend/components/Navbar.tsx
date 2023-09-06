const Navbar: React.FC = () => {
  return (
    <nav className='sticky top-0'>
      <div className='ml-4 flex flex-row items-center gap-4 px-1'>
        {navList.map((navItem) => (
          <a key={navItem.id} className="py-4 flex flex-row gap-1 items-center h-full" href={navItem.href}>
            {navItem.icon && 
              // eslint-disable-next-line @next/next/no-img-element
              <img className="h-8 w-8 rounded-full" src={navItem.icon} alt={navItem.alt} />
            }
            {navItem.text && 
              <div className="ml-3">
                <h3 className="text-lg leading-6 font-medium text-white">
                  {navItem.text?.title}
                </h3>
              </div>
            }
          </a>
        ))}
      </div>
    </nav>
  );
};

type NavListItem = {
  id: string,
  href: string,
  icon?: string,
  text?: {
    title: string
  },
  alt: string
}

const navList: NavListItem[] = [
  {
    id: "home",
    href: "/",
    icon: "/homeicon.png",
    alt: "Home"
  },
  {
    id: "projects",
    href: "#projects",
    text: {
      title: "Projects"
    },
    alt: "Projects"
  },
  {
    id: "experiences",
    href: "#experiences",
    text: {
      title: "Experiences"
    },
    alt: "Experiences"
  },
  {
    id: "studies",
    href: "#studies",
    text: {
      title: "Studies"
    },
    alt: "Studies"
  }
]

export default Navbar;