import React from 'react';
import TiltText from '../components/TiltText';
import Page1Bottom from '../components/Page1Bottom';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code, User, Briefcase, MessageSquare, ChevronDown } from 'lucide-react';

export default function Page1() {
  function mouseMoving(e) {
    console.log(e.clientX, e.clientY);
  }

  return (
    <div onMouseMove={mouseMoving} className='h-screen px-8 py-8 bg-white'>
      <div
        className='h-full w-full rounded-3xl bg-cover bg-center overflow-hidden shadow-lg shadow-gray-700'
        style={{ backgroundImage: `url('/Aaditya_pic.jpg')` }}
      >
        
        <TiltText />
        <Page1Bottom />
      </div>
    </div>
  );
}
