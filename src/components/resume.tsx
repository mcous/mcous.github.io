import { clsx } from 'clsx'
import type { FunctionComponent } from 'preact'

import type { BioData } from '$lib/bio.ts'
import type { JobEntry, JobRole, JobRoles } from '$lib/jobs.ts'
import type { ProjectEntry } from '$lib/projects.ts'
import type { SkillsEntry } from '$lib/skills.ts'

/** Dotted underline that marks text as a link. */
const linkClass =
  'underline decoration-dotted underline-offset-2 hover:decoration-solid'

export interface ResumeProps {
  site: URL | undefined
  bio: BioData
  jobs: JobEntry[]
  projects: ProjectEntry[]
  skills: SkillsEntry[]
}

export const Resume: FunctionComponent<ResumeProps> = ({
  site,
  bio,
  jobs,
  projects,
  skills,
}) => (
  <>
    <nav class="mx-auto max-w-[8.5in] flex flex-row justify-between px-8 text-sm print:hidden md:px-10">
      <a href="/" class="py-4 text-white hover:underline">
        Back
      </a>
      <a
        href="/michael-cousins.pdf"
        class="flex items-center gap-1 py-4 text-white hover:underline"
        data-astro-prefetch="false"
        data-astro-reload
      >
        <span aria-hidden="true" class="i-octicon-file-pdf" />
        Download
        <span class="sr-only"> PDF</span>
      </a>
    </nav>
    <main class="[text-wrap:pretty] mx-auto h-full flex flex-col bg-white px-8 py-6 text-xs leading-normal shadow-sm md:mb-8 md:h-[11in] md:max-w-[8.5in] md:flex-row divide-y divide-black md:px-10 md:divide-x md:divide-y-0">
      <div class="h-full w-full flex flex-shrink-0 flex-col pb-4 md:w-2/3 md:pb-0 md:pr-8">
        <section class="flex flex-col gap-2 pb-4">
          <h1 class="text-2xl font-serif">
            {bio.firstName} {bio.lastName}
          </h1>
          <ul class="flex flex-wrap items-center gap-x-3 gap-y-1">
            <ContactItem icon="i-octicon-location-16">
              {bio.location}
            </ContactItem>
            <ContactItem icon="i-octicon-mail-16">
              <a href={`mailto:${bio.email}`} class={linkClass}>
                {bio.email}
              </a>
            </ContactItem>
            <ContactItem icon="i-octicon-globe-16">
              <a href={site?.origin} class={linkClass}>
                {site?.host}
              </a>
            </ContactItem>
            <ContactItem icon="i-octicon-mark-github-16">
              <a href={`https://github.com/${bio.github}`} class={linkClass}>
                GitHub
              </a>
            </ContactItem>
            <ContactItem icon="i-fa6-brands-linkedin">
              <a
                href={`https://www.linkedin.com/in/${bio.linkedIn}`}
                class={linkClass}
              >
                LinkedIn
              </a>
            </ContactItem>
          </ul>
          <p class="md:whitespace-pre-line">{bio.description}</p>
        </section>
        <hr class="border-0 border-t border-black md:my-auto" />
        <section class="flex flex-col pt-4">
          <h2 class="mb-2 text-sm font-medium font-serif">Work Experience</h2>
          <div class="flex flex-col divide-y divide-gray-300">
            {jobs.map(
              ({
                id,
                data: { name, description, url, roles, achievements },
              }) => (
                <div
                  key={id}
                  class="flex flex-col gap-1 py-2 first:pt-0 last:pb-0"
                >
                  <div>
                    <div class="flex items-baseline justify-between gap-4">
                      <h3 class="text-xs font-semibold">
                        {url ? (
                          <a href={url.href} class={linkClass}>
                            {name}
                          </a>
                        ) : (
                          name
                        )}
                      </h3>
                      <span class="whitespace-nowrap text-2xs text-gray-600">
                        {formatDuration(roles)}
                      </span>
                    </div>
                    <p class="mb-1 text-2xs text-gray-600 leading-normal">
                      {description}
                    </p>
                    <RoleList roles={roles} />
                  </div>
                  {achievements.length > 0 && (
                    <ul class="flex flex-col list-circle gap-1">
                      {achievements.map((achievement, index) => (
                        <li key={index}>
                          <p>{achievement}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ),
            )}
          </div>
        </section>
      </div>
      <div class="w-full flex flex-col pt-4 md:w-1/3 md:pl-8 md:pt-2.5">
        <section class="pb-4">
          <h2 class="mb-2 text-sm font-medium font-serif">
            Open-Source Projects
          </h2>
          <div class="divide-y divide-gray-300">
            {projects.map(
              ({ id, data: { repository, roles, description } }) => (
                <div
                  key={id}
                  class="flex flex-col gap-1 py-2 first:pt-0 last:pb-0"
                >
                  <h3 class="text-xs font-semibold">
                    <a
                      href={`https://github.com/${repository}`}
                      class={clsx(linkClass, 'inline-block')}
                    >
                      <RepositoryName repository={repository} />
                    </a>
                  </h3>
                  <RoleList roles={roles} />
                  <p class="leading-normal md:whitespace-pre-line">
                    {description}
                  </p>
                </div>
              ),
            )}
          </div>
        </section>
        <hr class="border-0 border-t border-black md:my-auto" />

        <section class="py-4">
          <h2 class="mb-2 text-sm font-medium font-serif">Skills</h2>
          <div class="flex flex-col gap-4">
            {skills.map(({ id, data: { name, skills } }) => (
              <div key={id} class="flex flex-col">
                <h3 class="text-xs font-semibold">{name}</h3>
                <p class="leading-normal">{skills.join(', ')}</p>
              </div>
            ))}
          </div>
        </section>
        <hr class="border-0 border-t border-black md:my-auto" />

        <section class="flex flex-col gap-2 pt-4">
          <h2 class="text-sm font-medium font-serif">Education</h2>
          <div class="leading-normal">
            <h3 class="text-xs font-semibold">{bio.education.degree}</h3>
            <p>
              {bio.education.school}, {bio.education.year}
            </p>
            <p>{bio.education.details}</p>
          </div>
        </section>
      </div>
    </main>
  </>
)

/** Render a contact detail with a decorative leading icon. */
const ContactItem: FunctionComponent<{ icon: string }> = ({
  icon,
  children,
}) => (
  <li class="flex items-center gap-1">
    <span
      aria-hidden="true"
      class={clsx(
        icon,
        'text-gray-600 [-webkit-print-color-adjust:exact] [print-color-adjust:exact]',
      )}
    />
    {children}
  </li>
)

const RoleList: FunctionComponent<{ roles: JobRoles }> = ({ roles }) => (
  <ul class="flex flex-col gap-0.5 text-2xs leading-normal">
    {roles.toReversed().map((role, index) => (
      <li key={index} class="flex items-baseline justify-between gap-4">
        <span class="font-medium">{role.title}</span>
        <span class="whitespace-nowrap text-gray-600">
          {formatRoleDates(role, index, roles)}
        </span>
      </li>
    ))}
  </ul>
)

/** Render a repository slug with a de-emphasized owner prefix. */
const RepositoryName: FunctionComponent<{ repository: string }> = ({
  repository,
}) => {
  const [owner, name] = repository.split('/')

  return (
    <>
      <span class="text-gray-600 font-normal">
        {owner}
        <span class="px-0.5">/</span>
      </span>
      {name}
    </>
  )
}

const monthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

const formatRoleDates = (
  role: JobRole,
  reversedIndex: number,
  roles: JobRoles,
): string => {
  const { start, end = roles[roles.length - reversedIndex]?.start } = role
  const startText = monthFormatter.format(start)
  const endText = end ? monthFormatter.format(end) : 'present'

  if (start > new Date()) {
    return `Starting ${startText}`
  }

  return `${startText} – ${endText}`
}

/** Format the total time across roles, or "New!" for under a quarter. */
const formatDuration = (roles: JobRoles): string => {
  const start = roles[0].start
  const end = roles.at(-1)?.end
  const { years, quarters } = getDuration(start, end)

  if (start > new Date() || (years === 0 && quarters === 0)) {
    return 'New!'
  }

  const formattedQuarters = ['', '¼', '½', '¾'][quarters] ?? ''
  const units = years === 1 && quarters === 0 ? 'year' : 'years'

  return `${years}${formattedQuarters} ${units}`
}

const getDuration = (
  start: Date,
  end: Date = new Date(),
): { years: number; quarters: number } => {
  const months = end.getUTCMonth() - start.getUTCMonth()
  let years = end.getUTCFullYear() - start.getUTCFullYear()
  let quarters = Math.round(months / 3)

  if (quarters === 4) {
    years += 1
    quarters = 0
  } else if (quarters < 0) {
    years -= 1
    quarters += 4
  }

  return { years, quarters }
}
