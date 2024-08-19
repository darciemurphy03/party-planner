import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-700 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-pink-400">Party</span> Planner
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-pink-400">Home</Link>
          <Link to="/cocktails" className="hover:text-pink-400">Cocktails</Link>
          <Link to="/recipes" className="hover:text-pink-400">Meals</Link>
        </div>
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center px-3 py-2 border rounded text-white border-white hover:text-pink-400 hover:border-pink-400"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
      </div>
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-2`}>
        <Link to="/" className="block px-4 py-2 text-white hover:text-pink-400">Home</Link>
        <Link to="/cocktails" className="block px-4 py-2 text-white hover:text-pink-400">Cocktails</Link>
        <Link to="/recipes" className="block px-4 py-2 text-white hover:text-pink-400">Meals</Link>
      </div>
    </nav>
  );
};

export default Navbar;
