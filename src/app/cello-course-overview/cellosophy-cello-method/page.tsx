'use client'

import Link from 'next/link'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

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

export default function CellosophyOverview() {
  const [isLoaded, setIsLoaded] = useState(false)
  const scrollRef = useRef(null)

  const cellosophyBooks: BookItem[] = [];

  const volumes: VolumeSection[] = [
    {
      title: "Cellosophy Volume One",
      pieces: [
        // Dark Ages/Renaissance
        { composer: "Hildegard von Bingen", title: "Caritas Variations", id: "caritas" },
        // Baroque
        { composer: "J.S. Bach", title: "Menuet from French Suite #5", id: "bach" },
        // Romantic
        { composer: "Felix Mendelssohn", title: "Song Without Words", id: "mendelssohn" },
        { composer: "Ludwig van Beethoven", title: "Symphony #9 Variations", id: "beethoven" },
        { composer: "Erik Satie", title: "Gymnopedies", id: "satie" },
        { composer: "Modest Mussorgsky", title: "Promenade", id: "mussorgsky" },
        { composer: "Sergei Rachmaninoff", title: "Piano Concerto #2", id: "rachmaninoff" },
        { composer: "Piotr Ilyich Tchaikovsky", title: "Symphony #5", id: "tchaikovsky" },
        { composer: "Johannes Brahms", title: "Symphony #1", id: "brahms" },
        { composer: "Maurice Ravel", title: "Alborada del Gracioso", id: "ravel" },
        { composer: "Wolfgang Amadeus Mozart", title: "Piano Concerto #24", id: "mozart" },
        // 20th Century
        { composer: "Béla Bartók", title: "Two Hungarian Songs", id: "hungarian" },
        // Popular Style
        { composer: "Andrew Lloyd Webber", title: "Music of the Night", id: "webber" },
        { composer: "Edgar Meyer", title: "Short Trip Home", id: "meyer" },
        // Contemporary
        { composer: "Daniel Pesca", title: "Moto Perpetuo #1", id: "pesca" },
        { composer: "Eric Moore", title: "Fission", id: "moore" }
      ]
    },
    {
      title: "Cellosophy Volume Two",
      pieces: [
        // Baroque
        { composer: "J.S. Bach", title: "Menuet from Violin Partita #3", id: "menuet-3" },
        // Classical
        { composer: "Franz Joseph Haydn", title: "Surprise Symphony", id: "surprise" },
        { composer: "Ludwig van Beethoven", title: "Violin Concerto", id: "violin-concerto" },
        // Romantic
        { composer: "Nicolai Rimsky-Korsakov", title: "Scheherazade", id: "scheherazade" },
        { composer: "Gustav Mahler", title: "Symphony #1", id: "mahler-1" },
        { composer: "John Dowland", title: "Flow My Tears", id: "flow-tears" },
        // 20th Century
        { composer: "Béla Bartók", title: "Dance Suite", id: "dance-suite" },
        { composer: "Eve Beglarian", title: "I Am Writing To You From a Far Off Country", id: "far-off" },
        // Popular Style
        { composer: "Air", title: "Alone in Kyoto", id: "kyoto" },
        { composer: "Brandon Vance", title: "Meaghan's Moonbeam", id: "moonbeam" },
        // Contemporary
        { composer: "Eric Moore", title: "Nine Clouds", id: "nine-clouds" },
        { composer: "Missy Mazzoli", title: "Wayward Free Radical Dreams", id: "wayward" },
        { composer: "Daniel Pesca", title: "Moto Perpetuo #2", id: "moto-2" }
      ]
    },
    {
      title: "Cellosophy Volume Three",
      pieces: [
        // Baroque
        { composer: "J.S. Bach", title: "Menuet from French Suite #2", id: "menuet-2" },
        { composer: "Carl Friedrich Abel", title: "Adagio for Viola da Gamba", id: "abel-adagio", category: 'bach' },
        { composer: "Carl Friedrich Abel", title: "Allegro for Viola da Gamba", id: "abel-allegro", category: 'bach' },
        { composer: "Antonio Vivaldi", title: "Winter: III", id: "winter-3" },
        // Classical
        { composer: "Ludwig van Beethoven", title: "Für Elise", id: "fur-elise" },
        { composer: "Jean-Philippe Rameau", title: "Overture to Zaïs", id: "zais" },
        // Romantic
        { composer: "Frédéric Chopin", title: "Nocturne op. 9 #2", id: "nocturne" },
        { composer: "Claude Debussy", title: "Syrinx", id: "syrinx" },
        // 20th Century
        { composer: "Béla Bartók", title: "Romanian Folk Dances: I", id: "romanian-1" },
        { composer: "György Kurtág", title: "Perpetuum Mobile A", id: "perpetuum" },
        // Popular Style
        { composer: "John Williams", title: "Hedwig's Theme", id: "hedwig" },
        { composer: "Dream Theater", title: "Stream of Consciousness", id: "stream" },
        // Contemporary
        { composer: "Leah Asher", title: "Caprice for Solo Cello", id: "caprice" },
        { composer: "Lera Auerbach", title: "Dancing with Oneself", id: "dancing" },
        { composer: "Eric Moore", title: "Song Without Words #1", id: "song-1" },
        { composer: "Martin Torch-Ishii", title: "Reflection", id: "reflection" }
      ]
    },
    {
      title: "Cellosophy Volume Four",
      pieces: [
        // Baroque
        { composer: "J.S. Bach", title: "Cello Suite #1: Allemande", id: "suite1-allemande", category: 'bach' },
        { composer: "J.S. Bach", title: "Cello Suite #1: Gigue", id: "suite1-gigue", category: 'bach' },
        { composer: "J.S. Bach", title: "Cello Suite #1: Sarabande", id: "suite1-sarabande", category: 'bach' },
        { composer: "Alfredo Piatti", title: "Caprice #1", id: "piatti-1" },
        // Romantic
        { composer: "Gabriel Fauré", title: "Après un Rêve (with cello 2 accompaniment)", id: "apres" },
        { composer: "Auguste Franchomme", title: "Etude op. 35 #6", id: "franchomme-6", category: 'etude' },
        { composer: "Auguste Franchomme", title: "Etude op. 35 #8", id: "franchomme-8", category: 'etude' },
        { composer: "David Popper", title: "Etude op. 73 #34", id: "popper-34", category: 'etude' },
        { composer: "David Popper", title: "Etude op. 76 #1", id: "popper-76-1", category: 'etude' },
        { composer: "Camille Saint-Saëns", title: "Allegro Appassionato (with cello 2 accompaniment)", id: "allegro" },
        { composer: "Camille Saint-Saëns", title: "The Swan (with cello 2 accompaniment)", id: "swan" },
        // Contemporary
        { composer: "Eric Moore", title: "40 Variations on Schindler's List: Cycle I\n\n• Introduction\n• Theme\n• Homage to Eric Tanguy\n• Homage to J.S. Bach\n• Homage to Anna Clyne\n• Homage to Philip Glass\n• Homage to Trent Reznor", id: "schindler-1" }
      ]
    },
    {
      title: "Cellosophy Volume Five",
      pieces: [
        // Baroque
        { composer: "J.S. Bach", title: "Cello Suite #1: Courante", id: "suite1-courante", category: 'bach' },
        { composer: "J.S. Bach", title: "Cello Suite #1: Minuets", id: "suite1-minuets", category: 'bach' },
        { composer: "J.S. Bach", title: "Cello Suite #1: Prelude", id: "suite1-prelude", category: 'bach' },
        { composer: "Jean-Louis Duport", title: "21 Etudes #7", id: "duport-7" },
        // Romantic
        { composer: "Gabriel Fauré", title: "Élégie (with cello 2 accompaniment)", id: "elegie" },
        { composer: "Gabriel Fauré", title: "Papillon (with cello 2 accompaniment)", id: "papillon" },
        { composer: "Gabriel Fauré", title: "Sicilienne (with cello 2 accompaniment)", id: "sicilienne" },
        { composer: "Auguste Franchomme", title: "Etude op. 35 #5", id: "franchomme-5", category: 'etude' },
        { composer: "Auguste Franchomme", title: "Etude op. 35 #7", id: "franchomme-7", category: 'etude' },
        { composer: "Auguste Franchomme", title: "Etude op. 35 #12", id: "franchomme-12", category: 'etude' },
        { composer: "David Popper", title: "Etude op. 73 #5", id: "popper-5", category: 'etude' },
        { composer: "David Popper", title: "Etude op. 73 #15", id: "popper-15", category: 'etude' },
        { composer: "David Popper", title: "Etude op. 73 #27", id: "popper-27", category: 'etude' },
        { composer: "David Popper", title: "Etude op. 76 #6", id: "popper-76-6", category: 'etude' },
        // Contemporary
        { composer: "Eric Moore", title: "40 Variations on Schindler's List: Cycle III\n\n• Introduction III\n• Theme III\n• Homage to Martin Torch-Ishii\n• Homage to Mark Summer\n• Homage to Steve Reich\n• Homage to Michael Gordon\n• Homage to Peter Ablinger", id: "schindler-3" },
        { composer: "Eric Moore", title: "Circles for Cello and String Orchestra", id: "circles" },
        // Orchestral Excerpts
        { composer: "Orchestral Excerpts", title: "La Mer (Debussy) • Symphony #2 (Brahms) • Symphony #4 (Tchaikovsky)", id: "excerpts", category: 'excerpt' }
      ]
    },
    {
      title: "Cellosophy Volume Six",
      pieces: [
        // Baroque
        { composer: "J.S. Bach", title: "Cello Suite #1: Allemande", id: "suite1-allemande", category: 'bach' },
        { composer: "J.S. Bach", title: "Cello Suite #1: Gigue", id: "suite1-gigue", category: 'bach' },
        { composer: "J.S. Bach", title: "Cello Suite #1: Sarabande", id: "suite1-sarabande", category: 'bach' },
        { composer: "Domenico Gabrielli", title: "7 Ricercares: #3", id: "ricercare-3" },
        { composer: "Domenico Gabrielli", title: "7 Ricercares: #6", id: "ricercare-6" },
        // Romantic
        { composer: "Camille Saint-Saëns", title: "Cello Concerto #1 (with cello 2 accompaniment)", id: "concerto-1" },
        // Contemporary
        { composer: "Eric Moore", title: "40 Variations on Schindler's List: Cycle Four\n\n• Introduction IV\n• Theme IV\n• Homage to Ernst Krenek\n• Homage to Dimitri Shostakovich\n• Homage to Iannis Xenakis\n• Homage to György Kurtág\n• Homage to Morton Feldman", id: "schindler-4" },
        // Orchestral Excerpts
        { composer: "Orchestral Excerpts", title: "La Mer (Debussy) • Symphony #2 (Brahms) • Symphony #4 (Tchaikovsky)", id: "excerpts", category: 'excerpt' }
      ]
    },
    {
      title: "Cellosophy Volume Seven",
      pieces: [
        // Baroque
        { composer: "J.S. Bach", title: "Cello Suite #3: Allemande", id: "suite3-allemande", category: 'bach' },
        { composer: "J.S. Bach", title: "Cello Suite #3: Courante", id: "suite3-courante", category: 'bach' },
        { composer: "J.S. Bach", title: "Cello Suite #3: Gigue", id: "suite3-gigue", category: 'bach' },
        { composer: "Antonio Vivaldi", title: "Cello Sonata #6 (second cello accompaniment, Moore)", id: "vivaldi-6" },
        // Classical
        { composer: "Jean-Louis Duport", title: "21 Etudes: #7 (variations)", id: "duport-7-var", category: 'etude' },
        { composer: "Henry Eccles", title: "Cello Sonata (second cello accompaniment, Moore)", id: "eccles" },
        // Romantic
        { composer: "Auguste Franchomme", title: "Etude op. 35 #2", id: "franchomme-2", category: 'etude' },
        { composer: "David Popper", title: "Etude op. 73: #1", id: "popper-1", category: 'etude' },
        { composer: "David Popper", title: "Etude op. 73: #11", id: "popper-11", category: 'etude' },
        { composer: "David Popper", title: "Etude op. 73: #17", id: "popper-17", category: 'etude' },
        { composer: "David Popper", title: "Etude op. 73: #25", id: "popper-25", category: 'etude' },
        { composer: "David Popper", title: "Etude op. 73: #36", id: "popper-36", category: 'etude' },
        { composer: "Alfredo Piatti", title: "12 Caprices, op. 25: #1 (variations)", id: "piatti-1-var" },
        // Contemporary
        { composer: "Eric Moore", title: "40 Variations on Schindler's List: Cycle Five\n\n• Introduction V\n• Theme V\n• Homage to Henri Dutilleux\n• Homage to Thomas Adès\n• Homage to Pierre Boulez\n• Homage to Jason Eckardt\n• Homage to Luciano Berio", id: "schindler-5" },
        // Orchestral Excerpts
        { composer: "Orchestral Excerpts", title: "Symphony #5 (Beethoven) - movements II and III • A Midsummer Night's Dream (Mendelssohn) - Scherzo • Marriage of Figaro (Mozart) - Overture", id: "excerpts-7", category: 'excerpt' }
      ]
    },
    {
      title: "Cellosophy Volume Eight",
      pieces: [
        // Baroque
        { composer: "J.S. Bach", title: "Cello Suite #3: Bourrées", id: "suite3-bourrees", category: 'bach' },
        { composer: "J.S. Bach", title: "Cello Suite #3: Sarabande", id: "suite3-sarabande", category: 'bach' },
        { composer: "J.S. Bach", title: "Cello Suite #3: Prelude", id: "suite3-prelude", category: 'bach' },
        { composer: "Giovanni Sammartini", title: "Cello Sonata (second cello accompaniment, Moore)", id: "sammartini" },
        // Classical
        { composer: "Jean-Louis Duport", title: "21 Etudes: #1", id: "duport-1", category: 'etude' },
        { composer: "Jean-Louis Duport", title: "21 Etudes: #9", id: "duport-9", category: 'etude' },
        { composer: "Franz Joseph Haydn", title: "Divertimento (second cello accompaniment, Moore)", id: "haydn-div" },
        // Romantic
        { composer: "Auguste Franchomme", title: "Etude op. 35: #3", id: "franchomme-3", category: 'etude' },
        { composer: "Friedrich Grützmacher", title: "Etude #13", id: "grutz-13", category: 'etude' },
        { composer: "David Popper", title: "Etude op. 73: #6", id: "popper-6", category: 'etude' },
        { composer: "David Popper", title: "Etude op. 73: #14", id: "popper-14", category: 'etude' },
        { composer: "Alfredo Piatti", title: "12 Caprices, op. 25: #5", id: "piatti-5" },
        // Contemporary
        { composer: "Eric Moore", title: "40 Variations on Schindler's List: Cycle Six\n\n• Introduction VI\n• Theme VI\n• Homage to Helmut Lachenmann\n• Homage to Heinz Holliger\n• Homage to Alvin Lucier\n• Homage to Wolfgang Von Schweinitz\n• Homage to Kaija Saariaho", id: "schindler-6" },
        { composer: "Eric Moore", title: "Mantra (of choice) for solo cello", id: "mantra" },
        // Orchestral Excerpts
        { composer: "Orchestral Excerpts", title: "Piano Concerto #2 (Brahms) • William Tell (Rossini) • Don Juan (complete) (Strauss) • Ein Heldenleben (complete) (Strauss)", id: "excerpts-9", category: 'excerpt' }
      ]
    },
    {
      title: "Cellosophy Volume Nine",
      pieces: [
        // Baroque
        { composer: "J.S. Bach", title: "Gamba Sonata #1 (second cello accompaniment, Moore)", id: "gamba-1" },
        // Classical
        { composer: "François Francoeur", title: "Cello Sonata (second cello accompaniment, Moore)", id: "francoeur" },
        { composer: "Franz Joseph Haydn", title: "Cello Concerto in C (complete, 2nd cello accompaniment, Moore)", id: "haydn-c" },
        // Contemporary
        { composer: "Eric Moore", title: "40 Variations on Schindler's List: Cycle Six\n\n• Introduction VI\n• Theme VI\n• Homage to Helmut Lachenmann\n• Homage to Heinz Holliger\n• Homage to Alvin Lucier\n• Homage to Wolfgang Von Schweinitz\n• Homage to Kaija Saariaho", id: "schindler-6" },
        { composer: "Eric Moore", title: "Mantra (of choice) for solo cello", id: "mantra" },
        // Orchestral Excerpts
        { composer: "Orchestral Excerpts", title: "Piano Concerto #2 (Brahms) • William Tell (Rossini) • Don Juan (complete) (Strauss) • Ein Heldenleben (complete) (Strauss)", id: "excerpts-9", category: 'excerpt' }
      ]
    }
  ];

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -10 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.2
      }
    }
  };

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
        <div className="grid grid-cols-12 gap-8">
          {/* Left side - empty for now */}
          <div className="col-span-5">
          </div>

          {/* Right side - content */}
          <div className="col-span-7" ref={scrollRef}>
            {/* Course Books Section */}
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="mb-16 relative"
            >
              <h2 className="text-3xl font-light mb-8 pl-8">Course Books</h2>
              <div className="space-y-6">
                {cellosophyBooks.map((book, index) => {
                  const { scrollYProgress } = useScroll({
                    target: scrollRef,
                    offset: [`start ${index * 100}px`, `start ${(index + 1) * 100}px`]
                  });

                  return (
                    <motion.div 
                      key={book.id}
                      variants={item}
                      className="relative pl-8 group"
                    >
                      {/* Progress Dot */}
                      <motion.div 
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-neutral-600"
                        animate={{
                          backgroundColor: scrollYProgress.get() > 0 ? "#3B82F6" : "#4B5563"
                        }}
                      />

                      <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-lg p-4 shadow hover:shadow-lg transition-all cursor-pointer">
                        <h3 className="text-lg font-medium">{book.title}</h3>
                        {book.description && (
                          <p className="text-sm text-neutral-400">{book.description}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Volumes Section */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
            >
              <h2 className="text-3xl font-light mb-8 pl-8">Course Volumes</h2>
              <div className="space-y-8">
                {volumes.map((volume, volumeIndex) => {
                  const { scrollYProgress } = useScroll({
                    target: scrollRef,
                    offset: [`start ${(volumeIndex + cellosophyBooks.length) * 100}px`, `start ${(volumeIndex + cellosophyBooks.length + 1) * 100}px`]
                  });

                  // Group pieces by historical period
                  const groupedPieces: Record<string, RepertoireItem[]> = {
                    'Dark Ages/Renaissance': [],
                    'Baroque': [],
                    'Classical': [],
                    'Romantic': [],
                    'Impressionist/20th Century': [],
                    'Popular Style': [],
                    'Contemporary': [],
                    'Orchestral Excerpts': []
                  };

                  volume.pieces.forEach(piece => {
                    if (piece.composer === 'Orchestral Excerpts') {
                      groupedPieces['Orchestral Excerpts'].push(piece);
                    } else if (piece.composer === 'Hildegard von Bingen' || piece.composer === 'John Dowland') {
                      groupedPieces['Dark Ages/Renaissance'].push(piece);
                    } else if (['J.S. Bach', 'Antonio Vivaldi', 'Domenico Gabrielli', 'Carl Friedrich Abel', 'Alfredo Piatti', 'Giovanni Sammartini', 'Jean-Philippe Rameau'].includes(piece.composer)) {
                      groupedPieces['Baroque'].push(piece);
                    } else if (['Franz Joseph Haydn', 'Wolfgang Amadeus Mozart', 'Ludwig van Beethoven', 'Jean-Louis Duport', 'Henry Eccles', 'François Francoeur'].includes(piece.composer)) {
                      groupedPieces['Classical'].push(piece);
                    } else if (['Felix Mendelssohn', 'Modest Mussorgsky', 'Sergei Rachmaninoff', 'Piotr Ilyich Tchaikovsky', 'Johannes Brahms', 'Frédéric Chopin', 'Gabriel Fauré', 'Auguste Franchomme', 'David Popper', 'Camille Saint-Saëns', 'Nicolai Rimsky-Korsakov', 'Gustav Mahler', 'Friedrich Grützmacher', 'Alfredo Piatti'].includes(piece.composer)) {
                      groupedPieces['Romantic'].push(piece);
                    } else if (['Béla Bartók', 'Maurice Ravel', 'Erik Satie', 'Claude Debussy'].includes(piece.composer)) {
                      groupedPieces['Impressionist/20th Century'].push(piece);
                    } else if (['Andrew Lloyd Webber', 'Edgar Meyer', 'Air', 'John Williams', 'Dream Theater', 'Brandon Vance'].includes(piece.composer)) {
                      groupedPieces['Popular Style'].push(piece);
                    } else {
                      groupedPieces['Contemporary'].push(piece);
                    }
                  });

                  return (
                    <motion.div 
                      key={volume.title}
                      variants={item}
                      className="relative pl-8 group"
                    >
                      {/* Progress Dot */}
                      <motion.div 
                        className="absolute left-0 top-8 w-2.5 h-2.5 rounded-full bg-neutral-600"
                        animate={{
                          backgroundColor: scrollYProgress.get() > 0 ? "#3B82F6" : "#4B5563"
                        }}
                      />

                      <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-lg p-6">
                        <h3 className="text-xl font-medium mb-6">{volume.title}</h3>
                        <div className="space-y-6">
                          {Object.entries(groupedPieces).map(([period, pieces]) => {
                            if (pieces.length === 0) return null;
                            
                            return (
                              <div key={period} className="space-y-3">
                                <h4 className="text-sm font-medium text-neutral-300 uppercase tracking-wide border-b border-neutral-700 pb-1">
                                  {period}
                                </h4>
                                <div className="space-y-2 pl-4">
                                  {pieces.map((piece) => (
                                    <div 
                                      key={piece.id}
                                      className="p-2 rounded hover:bg-white/5 transition-colors cursor-pointer"
                                    >
                                      <h5 className="text-sm font-medium">{piece.title}</h5>
                                      <p className="text-xs text-neutral-400">{piece.composer}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 