import { prisma } from '@/lib/prisma'

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold">Popper Project</h1>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Current Etudes</h2>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {etudes.map((etude) => (
            <div key={etude.id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Etude #{etude.number}</h3>
              <p className="mt-2">{etude.description}</p>
              <div className="mt-4">
                <h4 className="font-medium">Available Videos:</h4>
                <ul className="mt-2 space-y-2">
                  {etude.videos.map((video) => (
                    <li key={video.id} className="text-sm">
                      • {video.title} (Week {video.weekNumber})
                      This is a Cello_course_overview page.
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 