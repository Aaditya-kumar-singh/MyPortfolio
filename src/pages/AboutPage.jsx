
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code, User, Briefcase, MessageSquare, ChevronDown } from 'lucide-react';
const AboutPage = () => (
  <div className="min-h-screen bg-gray-900 py-16">
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-white mb-12 text-center">About Me</h1>

      <div className="flex flex-col gap-12 items-center">
        
        <div className="w-64 h-64 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-2xl overflow-hidden">
          <img
            src="./Aaditya.png"
            alt="Aaditya Kumar"
            className="w-full h-full object-cover"
          />
        </div>

        
        <div className="space-y-6 text-center md:text-left">
          <p className="text-gray-300 text-lg leading-relaxed">
            I'm a dedicated full-stack developer and a Computer Science Engineering student who loves diving into the world of web applications.
            There's something incredibly satisfying about transforming intricate concepts into sleek, responsive, and user-friendly designs.
            My expertise includes modern JavaScript frameworks like React and Node.js, backend development with Express, and managing databases such as MongoDB.
            I've also had the chance to work on projects that feature real-time capabilities and collaborative tools.
          </p>
          

          <p className="text-gray-300 text-lg leading-relaxed">
            With the rising interest in cybersecurity and new technologies,
            I’m always excited to learn, grow, and be part of meaningful and innovative projects.
            I really enjoy working in teams, tackling challenges,
            and I’m always on the lookout for new tools and frameworks to boost my development process.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h3 className="text-orange-500 font-semibold mb-2">Frontend</h3>
              <p className="text-gray-400 text-sm">React, TypeScript</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h3 className="text-orange-500 font-semibold mb-2">Backend</h3>
              <p className="text-gray-400 text-sm">Node.js, Express.js, Python, PostgreSQL</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h3 className="text-orange-500 font-semibold mb-2">Cloud</h3>
              <p className="text-gray-400 text-sm">AWS, Docker</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h3 className="text-orange-500 font-semibold mb-2">Tools</h3>
              <p className="text-gray-400 text-sm">Git/Github, VS Code, Canva, Figma, Postman, </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h3 className="text-orange-500 font-semibold mb-2">Database</h3>
              <p className="text-gray-400 text-sm">MongoDB, SQL, SqlLite</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h3 className="text-orange-500 font-semibold mb-2">Programming Languages</h3>
              <p className="text-gray-400 text-sm">Html5, C, C++, JavaScript, Python, </p>
            </div>


          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage;