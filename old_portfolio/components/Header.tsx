import { useState } from 'react';
import { VscCode } from 'react-icons/vsc';
import { AiOutlineGithub } from 'react-icons/ai';
import { RxHamburgerMenu } from 'react-icons/rx';

const MenuItem = ({
  text,
  location = '#',
  accent = false
}: {
  text: string;
  location?: string;
  accent?: boolean;
}) => {
  return (
    <a
      href={location}
      className={`block py-2 pl-3 pr-4 rounded md:p-0 md:hover:text-white ${
        accent && 'md:text-accent text-gray-700 bg-accent md:bg-transparent'
      } hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700`}
    >
      {text}
    </a>
  );
};

const Header = () => {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <nav className='border-gray-200 px-2 sm:px-4 py-2.5 rounded bg-gray-900'>
      <div className='container flex flex-wrap items-center justify-between mx-auto'>
        <a href='https://malekd5.dev' className='flex items-center'>
          <VscCode
            className='h-6 mr-3 sm:h-9 text-[#9fef00] self-center'
            size='1.5rem'
          />
          <span className='self-center text-xl font-normal whitespace-nowrap text-white'>
            Malek<span className='font-bold'>D5</span>
          </span>
        </a>
        <div className='flex md:order-2'>
          <button
            type='button'
            className='text-accent outline outline-2 outline-gray-800 hover:bg-accent hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-accent font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 flex items-center gap-1.5 justify-center'
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <AiOutlineGithub
              className={`${
                hover ? 'text-gray-900' : 'text-white'
              } self-center`}
              size='1.5rem'
            />
            <p className='self-center'>Github</p>
          </button>
          <button
            type='button'
            className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
            onClick={() => setOpen((v) => !v)}
          >
            <span className='sr-only'>Open main menu</span>
            <RxHamburgerMenu className='w-6 h-6' />
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            open ? 'block' : 'hidden'
          } w-full md:flex md:w-auto md:order-1`}
        >
          <ul className='flex flex-col p-4 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700'>
            <li>
              <MenuItem text='Home' accent />
            </li>
            <li>
              <MenuItem text='About' location='#about' />
            </li>
            <li>
              <MenuItem text='Projects' location='#projects' />
            </li>
            <li>
              <MenuItem text='Contact' location='#contact' />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
