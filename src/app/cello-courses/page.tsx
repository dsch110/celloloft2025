'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { IoArrowForward, IoCheckmarkCircle, IoStar, IoPlay, IoTime, IoPeople, IoShield, IoRocket, IoMedal, IoCalendar } from 'react-icons/io5';

interface CourseVariant {
  id: 'self-study' | 'with-teacher';
  name: string;
  price: string;
  ctaLink: string;
  badge?: string;
}

interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price?: number;
  originalPrice?: number;
  duration: string;
  level: string;
  students: number;
  features: string[];
  image: string;
  category: 'teacher' | 'student' | 'advanced';
  cta: string;
  ctaLink?: string;
  badge?: string;
  videoUrl?: string;
  discountEnds?: string;
  guarantee?: string;
  variants?: CourseVariant[];
}

const courses: Course[] = [
  {
    id: 'cellosophy-student',
    title: 'Cellosophy Student Course',
    subtitle: 'Learn Cello the Revolutionary Way',
    description: 'Transform your cello playing with the innovative Cellosophy method designed for rapid progress and deep understanding.',
    duration: '16 weeks',
    level: 'Beginner to Intermediate',
    students: 390,
    features: [
      'Complete Cellosophy curriculum',
      'Step-by-step video lessons',
      'Practice tracks and exercises',
      'Progress tracking system',
      'Community forum access',
      'Lifetime access to materials',
      'Mobile-friendly learning'
    ],
    image: '/images/cellosophy-student.jpg',
    category: 'student',
    cta: 'Start Learning',
    videoUrl: 'https://youtu.be/example',
    discountEnds: '2024-12-31',
    guarantee: '30-day money-back guarantee',
    variants: [
      {
        id: 'with-teacher',
        name: 'With Teacher',
        price: '$39 or $399 annually',
        ctaLink: '/signup?plan=with-teacher',
        badge: 'Most Popular',
      },
      {
        id: 'self-study',
        name: 'Self-Study',
        price: '$99/month',
        ctaLink: '/signup?plan=self-study',
      }
    ]
  },
  {
    id: 'popper-course',
    title: 'Proper Popper Practice Project',
    subtitle: 'Master the Popper Etudes',
    description: 'Comprehensive study of the Popper etudes with detailed analysis, practice strategies, and performance guidance.',
    price: 3150,
    originalPrice: 3999,
    duration: '20 weeks',
    level: 'Advanced',
    students: 89,
    features: [
      'All 40 Popper etudes covered',
      'Detailed technique analysis',
      'Practice strategies for each etude',
      'Performance recordings',
      'Accompaniment tracks',
      'Technical exercises',
      'Performance tips and guidance'
    ],
    image: '/images/popper-course.jpg',
    category: 'advanced',
    cta: 'Master Popper',
    ctaLink: '/cello-course-overview/proper-popper-practice-project',
    badge: 'Premium',
    videoUrl: 'https://youtu.be/example',
    discountEnds: '2024-12-31',
    guarantee: '30-day money-back guarantee'
  },
  {
    id: 'cellosophy-teacher',
    title: 'Cellosophy Teacher Training',
    subtitle: 'Become a Certified Cellosophy Instructor',
    description: 'Master the revolutionary Cellosophy method and earn certification to teach this innovative approach to cello education.',
    price: 0,
    originalPrice: 999,
    duration: '12 weeks',
    level: 'Advanced',
    students: 47,
    features: [
      'Complete Cellosophy methodology training',
      'Teaching certification upon completion',
      'Access to all student materials',
      'Private coaching sessions',
      'Teaching resources and lesson plans',
      'Community of certified instructors',
      'Ongoing support and updates'
    ],
    image: '/images/cellosophy-teacher.jpg',
    category: 'teacher',
    cta: 'Start Teacher Training',
    ctaLink: '/cello-course-overview/cellosophy-cello-method',
    badge: 'Free Certification',
    videoUrl: 'https://youtu.be/example',
    discountEnds: '2024-12-31',
    guarantee: '30-day money-back guarantee'
  },
];

export default function CelloCoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'teacher' | 'student' | 'advanced'>('all');
  const [studentPlan, setStudentPlan] = useState<'self-study' | 'with-teacher'>('with-teacher');
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState('');

  // Countdown timer for urgency
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const endDate = new Date('2024-12-31').getTime();
      const distance = endDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        setTimeLeft(`${days}d ${hours}h`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Courses', count: courses.length },
    { id: 'teacher', label: 'Teacher Training', count: courses.filter(c => c.category === 'teacher').length },
    { id: 'student', label: 'Student Courses', count: courses.filter(c => c.category === 'student').length },
    { id: 'advanced', label: 'Advanced Studies', count: courses.filter(c => c.category === 'advanced').length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
      {/* Urgency Banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 py-3">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white font-medium">
            🎉 Holiday Sale: Save up to 90% on courses! Teacher certification now FREE! Ends in {timeLeft}
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              Your Journey in Cello Mastery
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 mb-8 max-w-3xl mx-auto">
              Learn the cello, master your practice, and teach the next generation.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <div className="flex items-center gap-2 text-neutral-300">
                <IoPeople className="text-blue-400" />
                <span>370+ Students</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <IoStar className="text-yellow-400" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <IoTime className="text-green-400" />
                <span>Lifetime Access</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <IoShield className="text-purple-400" />
                <span>30-Day Guarantee</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as any)}
              className={`px-6 py-3 rounded-full transition-all ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white/10 text-neutral-300 hover:bg-white/20'
              }`}
            >
              {category.label}
              <span className="ml-2 text-sm opacity-75">({category.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => {
            const isStudentCourse = course.id === 'cellosophy-student' && course.variants;
            const selectedVariant = isStudentCourse ? course.variants.find(v => v.id === studentPlan) : null;

            const displayPrice = (isStudentCourse && selectedVariant ? selectedVariant.price : course.price) || '';
            const ctaLink = isStudentCourse && selectedVariant ? selectedVariant.ctaLink : course.ctaLink;
            const displayBadge = isStudentCourse && selectedVariant ? selectedVariant.badge : course.badge;
            
            let ctaText = course.cta;
            if (isStudentCourse) {
              ctaText = studentPlan === 'with-teacher' ? 'Start with Teacher' : 'Start Learning';
            }

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredCourse(course.id)}
                onHoverEnd={() => setHoveredCourse(null)}
                className="bg-neutral-800/50 rounded-2xl shadow-lg overflow-hidden flex flex-col h-full"
              >
                <div className="p-6 flex flex-col flex-grow">
                  {displayBadge && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{displayBadge}</div>
                  )}
                  <div className="mb-4">
                    <h3 className="text-2xl font-semibold text-white mb-2">{course.title}</h3>
                    <p className="text-neutral-400 text-sm">{course.subtitle}</p>
                  </div>

                  {isStudentCourse && course.variants && (
                    <div className="flex justify-center my-4 bg-neutral-900 p-1 rounded-full">
                      {course.variants.map(variant => (
                        <button
                          key={variant.id}
                          onClick={() => setStudentPlan(variant.id)}
                          className={`w-1/2 px-3 py-2 text-sm font-medium rounded-full transition-colors ${
                            studentPlan === variant.id ? 'bg-blue-600 text-white shadow-md' : 'text-neutral-300 hover:bg-neutral-700/50'
                          }`}
                        >
                          {variant.name} {variant.id === 'with-teacher' && `✨`}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="my-4 text-center">
                    <span className="text-4xl font-bold text-white">{displayPrice}</span>
                  </div>

                  <ul className="space-y-3 text-left mb-6 flex-grow">
                    {course.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <IoCheckmarkCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-neutral-300">{feature}</span>
                      </li>
                    ))}
                     {isStudentCourse && studentPlan === 'with-teacher' && (
                      <li className="flex items-start">
                        <IoCheckmarkCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-neutral-300">Personal teacher guidance</span>
                      </li>
                    )}
                  </ul>
                  
                  <div className="mt-auto">
                    <Link href={ctaLink || '#'} passHref>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                      >
                        {ctaText}
                        <IoArrowForward className="ml-2" />
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Course Comparison Table */}
      <div className="bg-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-12">Course Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white/10 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-white/10">
                  <th className="p-4 text-left">Feature</th>
                  <th className="p-4 text-center">Cellosophy Student</th>
                  <th className="p-4 text-center">Cellosophy + Teacher</th>
                  <th className="p-4 text-center">Teacher Training</th>
                  <th className="p-4 text-center">Popper Course</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="p-4">Price</td>
                  <td className="p-4 text-center">$99</td>
                  <td className="p-4 text-center">$39</td>
                  <td className="p-4 text-center">FREE</td>
                  <td className="p-4 text-center">$3,150</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4">Duration</td>
                  <td className="p-4 text-center">16 weeks</td>
                  <td className="p-4 text-center">16 weeks</td>
                  <td className="p-4 text-center">12 weeks</td>
                  <td className="p-4 text-center">20 weeks</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4">Level</td>
                  <td className="p-4 text-center">Beginner-Intermediate</td>
                  <td className="p-4 text-center">Beginner-Intermediate</td>
                  <td className="p-4 text-center">Advanced</td>
                  <td className="p-4 text-center">Advanced</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4">Video Lessons</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">✅</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4">Practice Tracks</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">✅</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4">Personal Teacher</td>
                  <td className="p-4 text-center">❌</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">❌</td>
                  <td className="p-4 text-center">❌</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4">Certification</td>
                  <td className="p-4 text-center">❌</td>
                  <td className="p-4 text-center">❌</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">❌</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4">Private Coaching</td>
                  <td className="p-4 text-center">❌</td>
                  <td className="p-4 text-center">❌</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">❌</td>
                </tr>
                <tr>
                  <td className="p-4">Lifetime Access</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">✅</td>
                  <td className="p-4 text-center">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Enhanced Social Proof Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4">What Our Students Say</h2>
            <p className="text-neutral-300">Join hundreds of satisfied cellists who've transformed their playing</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <IoStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-neutral-200 mb-4">
                "The Cellosophy method completely changed how I approach the cello. I've made more progress in 6 months than in 2 years of traditional lessons."
              </p>
              <div className="text-sm text-neutral-400">
                — Sarah M., Cellosophy Student
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <IoStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-neutral-200 mb-4">
                "As a teacher, the Cellosophy certification has given me a whole new toolkit. My students are progressing faster and enjoying lessons more."
              </p>
              <div className="text-sm text-neutral-400">
                — Michael R., Certified Instructor
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <IoStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-neutral-200 mb-4">
                "The Popper course is incredibly detailed. Each etude is broken down perfectly with practice strategies that actually work."
              </p>
              <div className="text-sm text-neutral-400">
                — Elena K., Advanced Student
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">370+</div>
              <div className="text-neutral-300">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">4.9/5</div>
              <div className="text-neutral-300">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">47</div>
              <div className="text-neutral-300">Certified Teachers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">30</div>
              <div className="text-neutral-300">Day Guarantee</div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Reversal Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <IoShield className="text-white text-6xl" />
          </div>
          <h2 className="text-3xl font-light mb-4">100% Risk-Free Guarantee</h2>
          <p className="text-xl text-green-100 mb-8">
            Try any course for 30 days. If you're not completely satisfied, we'll refund every penny. No questions asked.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">30-Day Trial</h3>
              <p className="text-sm text-green-100">Full access to all course materials for 30 days</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">No Questions Asked</h3>
              <p className="text-sm text-green-100">Simple refund process with no hassle</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Keep the Bonuses</h3>
              <p className="text-sm text-green-100">Even if you refund, keep the bonus materials</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-light text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">How long do I have access to the courses?</h3>
              <p className="text-neutral-300">All courses come with lifetime access. You can revisit the materials anytime and access future updates.</p>
            </div>

            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">What if I'm not satisfied with the course?</h3>
              <p className="text-neutral-300">We offer a 30-day money-back guarantee. If you're not completely satisfied, we'll refund your purchase.</p>
            </div>

            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">Do I need to be at a specific level to start?</h3>
              <p className="text-neutral-300">The Cellosophy Student Course is designed for beginners to intermediate players. The Teacher Training and Popper courses require intermediate to advanced skills.</p>
            </div>

            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">Can I get help if I have questions?</h3>
              <p className="text-neutral-300">Yes! All courses include access to our community forums where you can ask questions and get support from instructors and fellow students.</p>
            </div>

            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">When does the sale end?</h3>
              <p className="text-neutral-300">The current holiday sale ends on December 31st, 2024. After that, prices will return to their original amounts.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA with Urgency */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white/20 rounded-lg p-6 mb-8">
            <h3 className="text-2xl font-semibold mb-2">⏰ Limited Time Offer</h3>
            <p className="text-lg">Sale ends in {timeLeft} - Don't miss out on these savings!</p>
          </div>
          <h2 className="text-3xl font-light mb-4">Ready to Transform Your Cello Playing?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Choose your course and start your journey to cello mastery today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#courses"
              className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Browse All Courses
              <IoArrowForward className="ml-2" />
            </Link>
            <Link
              href="/cello-course-overview/cellosophy-cello-method"
              className="bg-green-500 text-white font-semibold px-8 py-4 rounded-lg text-lg hover:bg-green-600 transition-colors inline-flex items-center justify-center"
            >
              Start Free Trial
              <IoRocket className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 