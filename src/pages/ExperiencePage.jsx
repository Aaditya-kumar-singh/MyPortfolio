
import { ExternalLink, Award } from 'lucide-react';

const CertificationPage = () => {
  const certifications = [
    {
      title: 'C++ Programming',
      issuer: 'Udemy',
      period: 'Completed in 2025',
      description: 'Covered object-oriented programming, STL, and problem-solving techniques.',
      link: 'https://drive.google.com/file/d/1MjhcCekwqDaEjmmyO3shcHZHJBLIP9vA/view?usp=sharing',
    },
    {
      title: 'Full-Stack Web Development',
      issuer: 'Udemy',
      period: 'Completed in 2025',
      description: 'Covers HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, Git, Docker, Microservices with MoleculerJS, Software Testing, and deployment.',
      link: 'https://drive.google.com/file/d/1eAxDWd56Ron3enWzE2hykfjdLJm6D1rr/view?usp=sharing', 
    },
    {
      title: 'JavaScript Programming',
      issuer: 'Udemy',
      period: 'Completed in 2025',
      description: 'Includes ES6, DOM manipulation, async programming, and test-driven development.',
      link: 'https://drive.google.com/file/d/1eU-C3utmAXZLC2LCOwr3fHVOLtgSkMuR/view?usp=sharing',
    },
    {
      title: 'Python for Beginners to Advanced',
      issuer: 'Great Learning / Udemy',
      period: 'In progress',
      description: 'Covered basics to advanced topics including OOP, file handling, and modules.',
      link: '#',
    },
    
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-12 text-center">Certifications</h1>
        
        <div className="space-y-8">
          {certifications.map((cert, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-orange-500 transition-colors">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1 flex items-center gap-2">
                    <Award className="w-5 h-5 text-orange-400" />
                    {cert.title}
                  </h3>
                  <p className="text-orange-500 font-medium">{cert.issuer}</p>
                </div>
                <span className="text-gray-400 text-sm mt-2 md:mt-0">{cert.period}</span>
              </div>

              <p className="text-gray-300 mb-4 leading-relaxed">{cert.description}</p>

              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm rounded-md transition"
              >
                View Certificate <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificationPage;
