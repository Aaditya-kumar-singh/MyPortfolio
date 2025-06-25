import { Github, ExternalLink, Code } from 'lucide-react';

const ProjectsPage = () => {
  const projects = [
    {
      title: 'Typing Test Website',
      description:
        'A real-time typing test platform with single and multiplayer modes, performance tracking, and customizable themes.',
      tech: ['React', 'Node.js', 'Socket.io', 'Express'],
      image: '/TypingTest.png',
      github: 'https://github.com/Aaditya-kumar-singh/TypingTestWebsite',
      demo: '#',
      status: 'In Progress',
    },
    {
      title: 'Watch Together',
      description:
        'A collaborative video streaming web app where users can watch content simultaneously with synced controls and chat.',
      tech: ['React','WebRTC', 'Tailwind'],
      image: 'bg-gradient-to-br from-cyan-500 to-blue-600',
      github: '#',
      demo: '#',
      status: 'In Progress',
    },
    {
      title: 'Todo App',
      description:
        'A full-stack Todo application with Create, Read, Update, and Delete (CRUD) operations. It features a clean UI, real-time updates, and persistent storage.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB'],
      image: '/ToDoApp.png',
      github: 'https://github.com/Aaditya-kumar-singh/TodoApp',
      demo: 'https://radiant-rabanadas-8eec6b.netlify.app/',
      status: 'Completed',
    },
    {
      title: 'Phishing URL Detector',
      description:
        'AI-based CLI tool that classifies URLs as phishing or safe using machine learning models and URL feature extraction.',
      tech: ['Python', 'Scikit-learn', 'Pandas', 'Tkinter'],
      image: 'bg-gradient-to-br from-yellow-500 to-amber-600',
      github: '#',
      demo: '#',
      status: 'Completed',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-12 text-center">My Projects</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-orange-500 transition-colors group"
            >
              {project.image.startsWith('/') ? (
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className={`h-48 ${project.image} flex items-center justify-center`}>
                  <Code size={48} className="text-white opacity-80" />
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-orange-500 hover:text-orange-400 transition-colors"
                    >
                      <Github size={16} className="mr-1" />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-orange-500 hover:text-orange-400 transition-colors"
                    >
                      <ExternalLink size={16} className="mr-1" />
                      Demo
                    </a>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${project.status === 'Completed'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                  >
                    {project.status === 'Completed' ? '🟢 Completed' : '🟡 In Progress'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
