import { Github, Linkedin, Mail } from 'lucide-react';

const HeroSection = () => (
  <div
    className="min-h-screen bg-cover bg-center relative flex items-center justify-end text-white"
    style={{ backgroundImage: `url(Aaditya_pic.jpg)` }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-60" />

    <div className="relative z-10 text-right px-8 md:px-16 max-w-xl w-full ">
      <h2 className="text-xl md:text-2xl font-medium text-gray-300 tracking-wide mb-2">
        I am a <span className="font-bold text-white">WONDERFUL</span> DESIGNER &
      </h2>

      <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4">
        FullStack <span className="text-orange-500">Developer</span>
      </h1>

      <p className="text-lg md:text-xl text-gray-300 mb-8">
        Passionate about designing sleek
        experiences in <span className="text-orange-400 flex items-center justify-center"> <br />
          Creative Development <br /> Available for hire.</span> 
      </p>
      


      <div className="flex items-center justify-center space-x-6 mb-10">
        <a href="https://github.com/Aaditya-kumar-singh" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">
          <Github size={28} />
        </a>

        <a href="https://www.linkedin.com/in/aadityakumar1" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">
          <Linkedin size={28} />
        </a>

        <a href="mailto:kumaraaditya324@gmail.com" className="hover:text-orange-500 transition-colors">
          <Mail size={28} />
        </a>
      </div>

      <div className="flex items-center justify-center">
        <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg text-white font-semibold shadow-lg transition-colors">
          View My Work
          
        </button>
      </div>

      <p className="mt-8 text-sm text-gray-400 text-right">Made by @Aaditya</p>
    </div>
  </div>
);

export default HeroSection;
