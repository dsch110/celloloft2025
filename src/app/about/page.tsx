import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Eric Moore</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Professional Experience</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium text-gray-700">Founder & Director</h3>
                <p className="text-gray-600">CelloLoft.com | 2018 - Present</p>
                <ul className="list-disc list-inside mt-2 text-gray-600">
                  <li>Created and developed an online platform for cello education</li>
                  <li>Produced and directed educational content for cello students worldwide</li>
                  <li>Managed digital marketing and content strategy</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-gray-700">Professional Cellist</h3>
                <p className="text-gray-600">Freelance | 2000 - Present</p>
                <ul className="list-disc list-inside mt-2 text-gray-600">
                  <li>Performed with various orchestras and chamber ensembles</li>
                  <li>Specialized in contemporary and classical repertoire</li>
                  <li>Collaborated with renowned musicians and composers</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Education</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-700">Master of Music in Cello Performance</h3>
                <p className="text-gray-600">The Juilliard School</p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-700">Bachelor of Music in Cello Performance</h3>
                <p className="text-gray-600">Cleveland Institute of Music</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Teaching Experience</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-gray-700">Cello Instructor</h3>
                <p className="text-gray-600">Private Studio | 2000 - Present</p>
                <ul className="list-disc list-inside mt-2 text-gray-600">
                  <li>Taught students of all levels, from beginners to advanced</li>
                  <li>Developed comprehensive teaching methodology</li>
                  <li>Prepared students for competitions and auditions</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Skills & Expertise</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>Advanced cello performance and technique</li>
              <li>Music education and pedagogy</li>
              <li>Digital content creation and production</li>
              <li>Online course development</li>
              <li>Chamber music and orchestral performance</li>
              <li>Contemporary and classical repertoire</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
} 