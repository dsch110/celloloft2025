import { prisma } from '@/lib/prisma'
import YouTubeEmbed from '@/components/YouTubeEmbed'
import NewsletterForm from '@/components/NewsletterForm'

async function getActiveEtudes() {
  const etudes = await prisma.etude.findMany({
    include: {
      videos: {
        orderBy: {
          orderInWeek: 'asc'
        }
      },
      cohortProgress: {
        where: {
          isActive: true
        }
      }
    },
    orderBy: {
      number: 'asc'
    }
  })
  return etudes
}

export default async function PopperCoursePage() {
  const etudes = await getActiveEtudes()

  return (
    <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 min-h-screen text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* === HERO SECTION WITH VIDEO === */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-400 mb-4">The Proper Popper Practice Project</h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-300 mb-8">
            Master the 40 essential etudes of David Popper's "Hohe Schule des Violoncellospiels", Op. 73, with guided video lessons, practice-alongs, and a supportive community.
          </p>
          <div className="max-w-3xl mx-auto rounded-lg overflow-hidden shadow-2xl border-4 border-neutral-700">
            <YouTubeEmbed videoId="placeholder_video_id" title="Introduction to the Proper Popper Practice Project" />
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold text-center mb-8">Currently Active Etudes</h2>
          <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {etudes.map((etude) => (
              <div key={etude.id} className="bg-neutral-800/50 p-6 rounded-lg shadow-lg border border-neutral-700/50">
                <h3 className="text-xl font-semibold text-blue-400">Etude #{etude.number}</h3>
                <p className="mt-2 text-neutral-300">{etude.description}</p>
                <div className="mt-4">
                  <h4 className="font-medium text-neutral-200">Available Videos:</h4>
                  <ul className="mt-2 space-y-2 text-sm text-neutral-400">
                    {etude.videos.map((video) => (
                      <li key={video.id}>
                        • {video.title} (Week {video.weekNumber})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <NewsletterForm note="Eric - you need to customize the .env.local so the MiailerLite GroupID reflects the correct subscriber sequence." />
      </div>
    </div>
  )
} 