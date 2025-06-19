'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

// Add a type for piece categories
type PieceCategory = 'bach' | 'etude' | 'excerpt' | 'standard';

interface RepertoireItem {
  composer: string;
  title: string;
  id: string;
  category?: PieceCategory;
}

interface BookItem {
  title: string;
  id: string;
  description?: string;
}

interface VolumeSection {
  title: string;
  pieces: RepertoireItem[];
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  const cellosophyBooks: BookItem[] = [
    { 
      title: "Rhythm Workbook",
      id: "rhythm-workbook",
      description: "Begin"
    },
    {
      title: "Béla Bartók: Mikrokosmos",
      id: "mikrokosmos",
      description: "for two cellos"
    },
    {
      title: "Eric Moore: Prisms, Fractals, Waves",
      id: "prisms",
      description: "for two cellos"
    }
  ];

  const cellosophyVol1: RepertoireItem[] = [
    { composer: "Hildegard von Bingen", title: "Caritas Variations", id: "caritas" },
    { composer: "Béla Bartók", title: "Two Hungarian Songs", id: "hungarian" },
    { composer: "Felix Mendelssohn", title: "Song Without Words", id: "mendelssohn" },
    { composer: "Ludwig van Beethoven", title: "Symphony #9 Variations", id: "beethoven" },
    { composer: "Erik Satie", title: "Gymnopedies", id: "satie" },
    { composer: "Modest Mussorgsky", title: "Promenade", id: "mussorgsky" },
    { composer: "Daniel Pesca", title: "Moto Perpetuo #1", id: "pesca" },
    { composer: "Sergei Rachmaninoff", title: "Piano Concerto #2", id: "rachmaninoff" },
    { composer: "Piotr Ilyich Tchaikovsky", title: "Symphony #5", id: "tchaikovsky" },
    { composer: "Johannes Brahms", title: "Symphony #1", id: "brahms" },
    { composer: "Maurice Ravel", title: "Alborada del Gracioso", id: "ravel" },
    { composer: "Andrew Lloyd Webber", title: "Music of the Night", id: "webber" },
    { composer: "Edgar Meyer", title: "Short Trip Home", id: "meyer" },
    { composer: "Wolfgang Amadeus Mozart", title: "Piano Concerto #24", id: "mozart" },
    { composer: "J.S. Bach", title: "Menuet from French Suite #5", id: "bach" },
    { composer: "Eric Moore", title: "Fission", id: "moore" }
  ];

  const volumes: VolumeSection[] = [
    {
      title: "Cellosophy Volume One",
      pieces: cellosophyVol1 // existing pieces
    },
    {
      title: "Cellosophy Volume Two",
      pieces: [
        { composer: "Brandon Vance", title: "Meaghan's Moonbeam", id: "moonbeam" },
        { composer: "Béla Bartók", title: "Dance Suite", id: "dance-suite" },
        { composer: "Ludwig van Beethoven", title: "Violin Concerto", id: "violin-concerto" },
        { composer: "Nicolai Rimsky-Korsakov", title: "Scheherazade", id: "scheherazade" },
        { composer: "Eric Moore", title: "Nine Clouds", id: "nine-clouds" },
        { composer: "Franz Joseph Haydn", title: "Surprise Symphony", id: "surprise" },
        { composer: "Air", title: "Alone in Kyoto", id: "kyoto" },
        { composer: "Missy Mazzoli", title: "Wayward Free Radical Dreams", id: "wayward" },
        { composer: "J.S. Bach", title: "Menuet from Violin Partita #3", id: "menuet-3" },
        { composer: "Daniel Pesca", title: "Moto Perpetuo #2", id: "moto-2" },
        { composer: "Gustav Mahler", title: "Symphony #1", id: "mahler-1" },
        { composer: "John Dowland", title: "Flow My Tears", id: "flow-tears" },
        { composer: "Eve Beglarian", title: "I Am Writing To You From a Far Off Country", id: "far-off" }
      ]
    },
    {
      title: "Cellosophy Volume Three",
      pieces: [
        { composer: "Leah Asher", title: "Caprice for Solo Cello", id: "caprice" },
        { composer: "Ludwig van Beethoven", title: "Für Elise", id: "fur-elise" },
        { composer: "Béla Bartók", title: "Romanian Folk Dances: I", id: "romanian-1" },
        { composer: "J.S. Bach", title: "Menuet from French Suite #2", id: "menuet-2" },
        { composer: "Frédéric Chopin", title: "Nocturne op. 9 #2", id: "nocturne" },
        { composer: "Lera Auerbach", title: "Dancing with Oneself", id: "dancing" },
        { composer: "Jean-Philippe Rameau", title: "Overture to Zaïs", id: "zais" },
        { composer: "György Kurtág", title: "Perpetuum Mobile A", id: "perpetuum" },
        { composer: "John Williams", title: "Hedwig's Theme", id: "hedwig" },
        { composer: "Claude Debussy", title: "Syrinx", id: "syrinx" },
        { composer: "Eric Moore", title: "Song Without Words #1", id: "song-1" },
        { composer: "Antonio Vivaldi", title: "Winter: III", id: "winter-3" },
        { composer: "Martin Torch-Ishii", title: "Reflection", id: "reflection" },
        { composer: "Carl Friedrich Abel", title: "Adagio for Viola da Gamba", id: "abel-adagio", category: 'bach' },
        { composer: "Carl Friedrich Abel", title: "Allegro for Viola da Gamba", id: "abel-allegro", category: 'bach' },
        { composer: "Dream Theater", title: "Stream of Consciousness", id: "stream" }
      ]
    },
    {
      title: "Cellosophy Volume Four",
      pieces: [
        { composer: "J.S. Bach", title: "Cello Suite #1: Allemande", id: "suite1-allemande", category: 'bach' },
        { composer: "J.S. Bach", title: "Cello Suite #1: Gigue", id: "suite1-gigue", category: 'bach' },
        { composer: "J.S. Bach", title: "Cello Suite #1: Sarabande", id: "suite1-sarabande", category: 'bach' },
        { composer: "Gabriel Fauré", title: "Après un Rêve (with cello 2 accompaniment)", id: "apres" },
        { composer: "Auguste Franchomme", title: "Etude op. 35 #6", id: "franchomme-6", category: 'etude' },
        { composer: "Auguste Franchomme", title: "Etude op. 35 #8", id: "franchomme-8", category: 'etude' },
        { composer: "Eric Moore", title: "40 Variations on Schindler's List: Cycle I\nIntroduction, Theme, Homages to Eric Tanguy, J.S. Bach, Anna Clyne, Philip Glass, Trent Reznor", id: "schindler-1" },
        { composer: "David Popper", title: "Etude op. 73 #34", id: "popper-34", category: 'etude' },
        { composer: "David Popper", title: "Etude op. 76 #1", id: "popper-76-1", category: 'etude' },
        { composer: "Alfredo Piatti", title: "Caprice #1", id: "piatti-1" },
        { composer: "Camille Saint-Saëns", title: "Allegro Appassionato (with cello 2 accompaniment)", id: "allegro" },
        { composer: "Camille Saint-Saëns", title: "The Swan (with cello 2 accompaniment)", id: "swan" }
      ]
    },
    {
      title: "Cellosophy Volume Five",
      pieces: [
        { composer: "J.S. Bach", title: "Cello Suite #1: Courante", id: "suite1-courante", category: 'bach' },
        { composer: "J.S. Bach", title: "Cello Suite #1: Minuets", id: "suite1-minuets", category: 'bach' },
        { composer: "J.S. Bach", title: "Cello Suite #1: Prelude", id: "suite1-prelude", category: 'bach' },
        { composer: "Gabriel Fauré", title: "Élégie (with cello 2 accompaniment)", id: "elegie" },
        { composer: "Gabriel Fauré", title: "Papillon (with cello 2 accompaniment)", id: "papillon" },
        { composer: "Gabriel Fauré", title: "Sicilienne (with cello 2 accompaniment)", id: "sicilienne" },
        { composer: "Jean-Louis Duport", title: "21 Etudes #7", id: "duport-7" },
        { composer: "Auguste Franchomme", title: "Etude op. 35 #5", id: "franchomme-5", category: 'etude' },
        { composer: "Auguste Franchomme", title: "Etude op. 35 #7", id: "franchomme-7", category: 'etude' },
        { composer: "Auguste Franchomme", title: "Etude op. 35 #12", id: "franchomme-12", category: 'etude' },
        { composer: "Eric Moore", title: "40 Variations on Schindler's List: Cycle II\nIntroduction II, Theme II, Self-Portrait I, Homages to William Bolcom, David Lang, Salvatore Sciarrino, Arvo Pärt", id: "schindler-2" },
        { composer: "David Popper", title: "Etude op. 73 #5", id: "popper-5", category: 'etude' },
        { composer: "David Popper", title: "Etude op. 73 #15", id: "popper-15", category: 'etude' },
        { composer: "David Popper", title: "Etude op. 73 #27", id: "popper-27", category: 'etude' },
        { composer: "David Popper", title: "Etude op. 76 #6", id: "popper-76-6", category: 'etude' }
      ]
    },
    {
      title: "Cellosophy Volume Six",
      pieces: [
        { composer: "J.S. Bach", title: "Cello Suite #1: Allemande", id: "suite1-allemande", category: 'bach' },
        { composer: "J.S. Bach", title: "Cello Suite #1: Gigue", id: "suite1-gigue", category: 'bach' },
        { composer: "J.S. Bach", title: "Cello Suite #1: Sarabande", id: "suite1-sarabande", category: 'bach' },
        { composer: "Domenico Gabrielli", title: "7 Ricercares: #3", id: "ricercare-3" },
        { composer: "Domenico Gabrielli", title: "7 Ricercares: #6", id: "ricercare-6" },
        { composer: "Eric Moore", title: "40 Variations on Schindler's List: Cycle III\nIntroduction III, Theme III, Homages to Martin Torch-Ishii, Mark Summer, Steve Reich, Michael Gordon, Peter Ablinger", id: "schindler-3" },
        { composer: "Eric Moore", title: "Circles for Cello and String Orchestra", id: "circles" },
        { composer: "Camille Saint-Saëns", title: "Cello Concerto #1 (with cello 2 accompaniment)", id: "concerto-1" },
        { composer: "Orchestral Excerpts", title: "La Mer (Debussy) • Symphony #2 (Brahms) • Symphony #4 (Tchaikovsky)", id: "excerpts", category: 'excerpt' }
      ]
    },
    {
      title: "Cellosophy Volume Seven",
      pieces: [
        { composer: "J.S. Bach", title: "Cello Suite #3: Allemande", id: "suite3-allemande", category: 'bach' },
        { composer: "J.S. Bach", title: "Cello Suite #3: Courante", id: "suite3-courante", category: 'bach' },
        { composer: "J.S. Bach", title: "Cello Suite #3: Gigue", id: "suite3-gigue", category: 'bach' },
        { composer: "Jean-Louis Duport", title: "21 Etudes: #7 (variations)", id: "duport-7-var", category: 'etude' },
        { composer: "Henry Eccles", title: "Cello Sonata (second cello accompaniment, Moore)", id: "eccles" },
        { composer: "Auguste Franchomme", title: "Etude op. 35 #2", id: "franchomme-2", category: 'etude' },
        { composer: "Eric Moore", title: "40 Variations on Schindler's List: Cycle Four\nIntroduction IV, Theme IV, Homages to Ernst Krenek, Dimitri Shostakovich, Iannis Xenakis, György Kurtág, Morton Feldman", id: "schindler-4" },
        { composer: "Alfredo Piatti", title: "12 Caprices, op. 25: #1 (variations)", id: "piatti-1-var" },
        { composer: "David Popper", title: "Etude op. 73: #1", id: "popper-1", category: 'etude' },
        { composer: "David Popper", title: "Etude op. 73: #11", id: "popper-11", category: 'etude' },
        { composer: "David Popper", title: "Etude op. 73: #17", id: "popper-17", category: 'etude' },
        { composer: "David Popper", title: "Etude op. 73: #25", id: "popper-25", category: 'etude' },
        { composer: "David Popper", title: "Etude op. 73: #36", id: "popper-36", category: 'etude' },
        { composer: "Antonio Vivaldi", title: "Cello Sonata #6 (second cello accompaniment, Moore)", id: "vivaldi-6" },
        { composer: "Orchestral Excerpts", title: "Symphony #5 (Beethoven) - movements II and III • A Midsummer Night's Dream (Mendelssohn) - Scherzo • Marriage of Figaro (Mozart) - Overture", id: "excerpts-7", category: 'excerpt' }
      ]
    },
    {
      title: "Cellosophy Volume Eight",
      pieces: [
        { composer: "J.S. Bach", title: "Cello Suite #3: Bourrées", id: "suite3-bourrees", category: 'bach' },
        { composer: "J.S. Bach", title: "Cello Suite #3: Sarabande", id: "suite3-sarabande", category: 'bach' },
        { composer: "J.S. Bach", title: "Cello Suite #3: Prelude", id: "suite3-prelude", category: 'bach' },
        { composer: "Jean-Louis Duport", title: "21 Etudes: #1", id: "duport-1", category: 'etude' },
        { composer: "Jean-Louis Duport", title: "21 Etudes: #9", id: "duport-9", category: 'etude' },
        { composer: "Franz Joseph Haydn", title: "Divertimento (second cello accompaniment, Moore)", id: "haydn-div" },
        { composer: "Auguste Franchomme", title: "Etude op. 35: #3", id: "franchomme-3", category: 'etude' },
        { composer: "Friedrich Grützmacher", title: "Etude #13", id: "grutz-13", category: 'etude' },
        { composer: "Eric Moore", title: "40 Variations on Schindler's List: Cycle Five\nIntroduction V, Theme V, Homages to Henri Dutilleux, Thomas Adès, Pierre Boulez, Jason Eckardt, Luciano Berio", id: "schindler-5" },
        { composer: "Alfredo Piatti", title: "12 Caprices, op. 25: #5", id: "piatti-5" },
        { composer: "David Popper", title: "Etude op. 73: #6", id: "popper-6", category: 'etude' },
        { composer: "David Popper", title: "Etude op. 73: #14", id: "popper-14", category: 'etude' },
        { composer: "Giovanni Sammartini", title: "Cello Sonata (second cello accompaniment, Moore)", id: "sammartini" },
        { composer: "Orchestral Excerpts", title: "Symphony #8 (Beethoven) • Symphony #35 (Mozart) • Symphony #40 (Mozart) • Requiem (Verdi)", id: "excerpts-8", category: 'excerpt' }
      ]
    },
    {
      title: "Cellosophy Volume Nine",
      pieces: [
        { composer: "J.S. Bach", title: "Gamba Sonata #1 (second cello accompaniment, Moore)", id: "gamba-1" },
        { composer: "François Francoeur", title: "Cello Sonata (second cello accompaniment, Moore)", id: "francoeur" },
        { composer: "Franz Joseph Haydn", title: "Cello Concerto in C (complete, 2nd cello accompaniment, Moore)", id: "haydn-c" },
        { composer: "Eric Moore", title: "40 Variations on Schindler's List: Cycle Six\nIntroduction VI, Theme VI, Homages to Helmut Lachenmann, Heinz Holliger, Alvin Lucier, Wolfgang Von Schweinitz, Kaija Saariaho", id: "schindler-6" },
        { composer: "Eric Moore", title: "Mantra (of choice) for solo cello", id: "mantra" },
        { composer: "Orchestral Excerpts", title: "Piano Concerto #2 (Brahms) • William Tell (Rossini) • Don Juan (complete) (Strauss) • Ein Heldenleben (complete) (Strauss)", id: "excerpts-9", category: 'excerpt' }
      ]
    }
  ];

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 overflow-hidden">
      {/* Dynamic Background Grid */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(50px,1fr))] grid-rows-[repeat(auto-fill,minmax(50px,1fr))]">
          {[...Array(100)].map((_, i) => (
            <div 
              key={i} 
              className="border-[0.5px] border-white/5"
              style={{
                transform: `scale(${1 + Math.sin(i * 0.1) * 0.1})`,
                opacity: 0.1 + Math.sin(i * 0.1) * 0.05
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative px-8 pt-24 max-w-6xl mx-auto text-neutral-100">
        <Navigation />

        {/* === HERO SECTION === */}
        <div className="w-full max-w-6xl mx-auto mb-16 mt-8 px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-blue-900/80 to-neutral-900/80 rounded-3xl shadow-lg p-8 md:p-16">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Unlock Your Cello Potential with the Cellosophy Method</h1>
              <p className="text-lg md:text-2xl text-neutral-200 mb-6">A modern, holistic approach to cello mastery—trusted by students and professionals worldwide.</p>
              <Link href="/cello-course-overview/cellosophy-cello-method">
                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg text-lg shadow transition">Start Your Journey</button>
              </Link>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <span className="text-yellow-400 font-bold text-lg">★★★★★</span>
                <span className="text-neutral-300 text-sm">1000+ students served</span>
                <span className="text-neutral-400 text-sm">As seen in <span className="font-semibold">Strings Magazine</span>, <span className="font-semibold">Juilliard Journal</span></span>
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center">
              {/* Optional: Replace with your photo or a video intro */}
              <img src="/images/eric-moore-cello-hero.jpg" alt="Eric Moore teaching cello" className="rounded-2xl shadow-lg w-64 h-64 object-cover border-4 border-white/10" />
            </div>
          </div>
        </div>

        {/* === CELLOSOPHY METHOD OVERVIEW === */}
        <div className="w-full max-w-4xl mx-auto mb-16 px-4">
          <div className="bg-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 shadow">
            <div className="flex-1">
              <h2 className="text-3xl font-semibold mb-2 text-white">What is the Cellosophy Method?</h2>
              <p className="text-lg text-neutral-200 mb-4">Cellosophy is a comprehensive, step-by-step system for advancing your cello technique, musicality, and artistry. Developed by Eric Moore, it blends tradition with modern neuroscience and creative practice strategies.</p>
              <Link href="/cello-course-overview/cellosophy-cello-method">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition">Learn More</button>
              </Link>
            </div>
            <div className="flex-1 flex justify-center">
              <img src="/images/cellosophy-book-cover.png" alt="Cellosophy Book Cover" className="rounded-xl w-48 shadow-lg border-2 border-white/10" />
            </div>
          </div>
        </div>

        {/* === SHEET MUSIC SECTION === */}
        <div className="w-full max-w-4xl mx-auto mb-16 px-4">
          <div className="bg-gradient-to-r from-purple-800/80 to-blue-800/80 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 shadow">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2 text-white">Shop Cellosophy Sheet Music</h2>
              <p className="text-lg text-neutral-200 mb-4">Explore original works, arrangements, and exclusive practice materials from the Cellosophy curriculum.</p>
              <Link href="/sheet-music">
                <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition">Browse Sheet Music</button>
              </Link>
            </div>
            <div className="flex-1 flex justify-center">
              <img src="/images/sheet-music-preview.png" alt="Sheet Music Preview" className="rounded-xl w-48 shadow-lg border-2 border-white/10" />
            </div>
          </div>
        </div>

        {/* === OTHER COURSES SECTION === */}
        <div className="w-full max-w-4xl mx-auto mb-16 px-4">
          <div className="bg-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 shadow">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2 text-white">Explore More Courses</h2>
              <p className="text-lg text-neutral-200 mb-4">Master the Popper Etudes, develop advanced technique, and join cohort-based video courses for all levels.</p>
              <Link href="/cello-course-overview/proper-popper-practice-project">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition">View All Courses</button>
              </Link>
            </div>
            <div className="flex-1 flex justify-center">
              <img src="/images/popper-project-cover.png" alt="Popper Project" className="rounded-xl w-48 shadow-lg border-2 border-white/10" />
            </div>
          </div>
        </div>

        {/* === ABOUT ERIC MOORE SECTION === */}
        <div className="w-full max-w-4xl mx-auto mb-16 px-4">
          <div className="bg-gradient-to-r from-green-800/80 to-blue-800/80 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 shadow">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2 text-white">Meet Eric Moore</h2>
              <p className="text-lg text-neutral-200 mb-4">Cellist, educator, and creator of the Cellosophy Method. Eric has performed internationally, taught at leading conservatories, and helped hundreds of students unlock their musical potential.</p>
              <ul className="text-neutral-100 text-sm mb-4 list-disc pl-5">
                <li>DMA, Cello Performance</li>
                <li>Featured in Strings Magazine, Juilliard Journal</li>
                <li>Faculty, [Your Institution Here]</li>
                <li>Winner, [Award Name Here]</li>
              </ul>
              <Link href="/about">
                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition">Learn About Eric</button>
              </Link>
            </div>
            <div className="flex-1 flex justify-center">
              <img src="/images/Promotional Still 1.jpg" alt="Eric Moore performing cello" className="rounded-2xl w-64 h-64 object-cover border-4 border-white/10 shadow-lg" />
            </div>
          </div>
        </div>

        {/* === STUDENT SUCCESS STORIES === */}
        <div className="w-full max-w-4xl mx-auto mb-24 px-4">
          <h2 className="text-2xl font-semibold mb-6 text-white text-center">Student Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 rounded-xl p-6 shadow flex flex-col">
              <p className="text-lg text-neutral-100 mb-4">“The Cellosophy Method completely transformed my playing. I finally feel confident and creative on the cello!”</p>
              <span className="text-neutral-400 text-sm">— Alex, Adult Learner</span>
            </div>
            <div className="bg-white/10 rounded-xl p-6 shadow flex flex-col">
              <p className="text-lg text-neutral-100 mb-4">“Eric's approach is both inspiring and practical. My technique and musicality have never been better.”</p>
              <span className="text-neutral-400 text-sm">— Jamie, Conservatory Student</span>
            </div>
            <div className="bg-white/10 rounded-xl p-6 shadow flex flex-col">
              <p className="text-lg text-neutral-100 mb-4">“The video courses are clear, motivating, and fun. I love the practice tracks and community!”</p>
              <span className="text-neutral-400 text-sm">— Taylor, High School Student</span>
            </div>
            <div className="bg-white/10 rounded-xl p-6 shadow flex flex-col">
              <p className="text-lg text-neutral-100 mb-4">“I've tried many methods, but Cellosophy is the only one that made everything click.”</p>
              <span className="text-neutral-400 text-sm">— Morgan, Professional Cellist</span>
            </div>
          </div>
        </div>

        {/* === FOOTER === */}
        <footer className="w-full bg-neutral-900/90 py-8 mt-12">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
              <Link href="/" className="text-white font-bold text-lg tracking-widest">Cello Loft</Link>
              <Link href="/cello-course-overview/cellosophy-cello-method" className="text-neutral-300 hover:text-white transition">Courses</Link>
              <Link href="/sheet-music" className="text-neutral-300 hover:text-white transition">Sheet Music</Link>
              <Link href="/about" className="text-neutral-300 hover:text-white transition">About</Link>
              <Link href="/contact" className="text-neutral-300 hover:text-white transition">Contact</Link>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm6.25.75a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"/></svg></a>
              <a href="https://youtube.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21.8 8.001s-.2-1.4-.8-2.001c-.7-.8-1.5-.8-1.9-.9C16.1 5 12 5 12 5h-.1s-4.1 0-7.1.1c-.4.1-1.2.1-1.9.9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.6c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.7.8 1.7.8 2.1.9c1.5.1 6.9.1 6.9.1s4.1 0 7.1-.1c.4-.1 1.2-.1 1.9-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.6c0-1.6-.2-3.2-.2-3.2zM9.8 15.2V8.8l6.4 3.2l-6.4 3.2z"/></svg></a>
            </div>
            <div className="text-neutral-500 text-xs mt-4 md:mt-0">© {new Date().getFullYear()} Cello Loft. All rights reserved.</div>
          </div>
        </footer>

        {/* Animated Logo */}
        <div className="relative h-[24rem] mb-8">
          <AnimatePresence>
            {isLoaded && (
              <>
                {/* CEL */}
                <motion.span
                  className="absolute text-[12rem] font-extralight tracking-[0.2em] leading-none"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                >
                  CEL
                </motion.span>

                {/* LO that comes from right */}
                <motion.span
                  className="absolute left-[calc(3ch*1.2)] text-[12rem] font-extralight tracking-[0.2em] leading-none"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
                >
                  LO
                </motion.span>

                {/* Icon */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1, ease: [0.19, 1, 0.22, 1] }}
                >
                  <img 
                    src="/images/Cello loft Icon Logo Square.svg"
                    alt="Cello Icon" 
                    className="w-full h-full"
                  />
                </motion.div>

                {/* Duplicate LO that drops down */}
                <motion.span
                  className="absolute left-[calc(3ch*1.2)] text-[12rem] font-extralight tracking-[0.2em] leading-none"
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: "100%" }}
                  transition={{ 
                    opacity: { duration: 0.3, delay: 1.3 },
                    y: { duration: 0.8, delay: 1.3, ease: [0.19, 1, 0.22, 1] }
                  }}
                >
                  LO
                </motion.span>

                {/* FT that fades in from bottom */}
                <motion.span
                  className="absolute right-0 bottom-0 text-[12rem] font-extralight tracking-[0.2em] leading-none"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    opacity: { duration: 0.5, delay: 1.6 },
                    y: { duration: 0.8, delay: 1.6, ease: [0.19, 1, 0.22, 1] }
                  }}
                >
                  FT
                </motion.span>
              </>
            )}
          </AnimatePresence>
        </div>

        <motion.p 
          className="text-4xl font-extralight tracking-[0.15em] mb-32 text-neutral-300 max-w-2xl ml-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Advanced cello education reimagined
        </motion.p>

        {/* Rest of the content with enhanced animations */}
        <motion.div 
          className="space-y-40"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          {/* Cellosophy */}
          <div className="p-16 bg-white/5 rounded-3xl hover:bg-white/10 transition-all">
            <h2 className="text-3xl font-light tracking-wider mb-4 text-neutral-400">
              ERIC R. MOORE
            </h2>
            <h3 className="text-8xl font-extralight tracking-wider mb-8">
              CELLOSOPHY
            </h3>
            <p className="text-2xl font-light tracking-wide mb-12 text-neutral-300 max-w-2xl">
              A comprehensive methodology for advancing your cello technique
            </p>
            <Link 
              href="cello-course-overview/cellosophy-cello-method" 
              className="inline-flex items-center text-2xl tracking-wide hover:opacity-80 transition-all"
            >
              Explore Method →
            </Link>
          </div>

          {/* Popper */}
          <div className="p-16 bg-white/5 rounded-3xl hover:bg-white/10 transition-all">
            <h2 className="text-8xl font-extralight tracking-wider mb-8">
              POPPER PROJECT
            </h2>
            <p className="text-2xl font-light tracking-wide mb-12 text-neutral-300 max-w-2xl">
              Master the essential etudes with detailed video instruction
            </p>
            <Link 
              href="cello-course-overview/proper-popper-practice-project" 
              className="inline-flex items-center text-2xl tracking-wide hover:opacity-80 transition-all"
            >
              Start Learning →
            </Link>
          </div>

          <div className="space-y-32">
            {volumes.map((volume, volumeIndex) => (
              <section key={volume.title} className="relative">
                <h2 className="text-5xl font-light tracking-wider mb-24 text-center">{volume.title}</h2>
                
                <div className="space-y-24">
                  {volume.pieces.map((piece, index) => (
                    <div key={piece.id} className="relative flex justify-end items-center">
                      {/* Books on the left side */}
                      {index < cellosophyBooks.length && (
                        <motion.div 
                          className="w-1/2 pr-12"
                          initial={{ opacity: 0, x: -50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="relative">
                            {/* Connection dot */}
                            <div className="absolute right-[-25px] top-1/2 w-3 h-3 rounded-full bg-blue-500 transform -translate-y-1/2" />
                            {/* Connection line */}
                            <div className="absolute right-[-22px] top-1/2 w-5 h-0.5 bg-blue-500 transform -translate-y-1/2" />
                            {/* Content card */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/15 transition-all duration-300 text-right">
                              <h3 className="font-light text-xl tracking-wide mb-2">{cellosophyBooks[index].title}</h3>
                              {cellosophyBooks[index].description && (
                                <p className="text-neutral-300">{cellosophyBooks[index].description}</p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Empty left side if no book */}
                      {index >= cellosophyBooks.length && <div className="w-1/2" />}

                      {/* Pieces on the right side */}
                      <motion.div 
                        key={piece.id}
                        className={`w-1/2 pl-12 ${
                          piece.category === 'excerpt' ? 'bg-white/5' : ''
                        }`}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="relative">
                          {/* Connection dot */}
                          <div className="absolute left-[-25px] top-1/2 w-3 h-3 rounded-full bg-blue-500 transform -translate-y-1/2" />
                          {/* Connection line */}
                          <div className="absolute left-[-22px] top-1/2 w-5 h-0.5 bg-blue-500 transform -translate-y-1/2" />
                          {/* Content card */}
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/15 transition-all duration-300">
                            <h3 className="font-light text-xl tracking-wide mb-2">
                              {piece.category === 'excerpt' ? 'Orchestral Excerpts' : piece.composer}
                            </h3>
                            <p className={`text-neutral-300 ${
                              piece.category === 'bach' ? 'text-blue-300' : ''
                            }`}>
                              {piece.title}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 