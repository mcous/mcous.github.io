import { type FunctionComponent, toChildArray } from 'preact'

import type { BioData } from '$lib/bio.ts'
import type { JobEntry, JobRole, JobRoles } from '$lib/jobs.ts'
import type { ProjectEntry } from '$lib/projects.ts'

export interface ResumeProps {
  site: URL | undefined
  bio: BioData
  jobs: JobEntry[]
  projects: ProjectEntry[]
}

export const Resume: FunctionComponent<ResumeProps> = ({
  site,
  bio,
  jobs,
  projects,
}) => (
  <>
    <nav class="mx-auto max-w-[8.5in] flex flex-row justify-between text-sm print:hidden">
      <a href="/" class="py-4 text-white hover:underline">
        Back
      </a>
      <a
        href="/michael-cousins.pdf"
        class="py-4 text-white hover:underline"
        data-astro-prefetch="false"
        data-astro-reload
      >
        Download PDF
      </a>
    </nav>
    <main class="mx-auto h-[11in] w-[8.5in] flex bg-white px-10 py-6 text-xs leading-normal">
      <div class="mr-8 h-full w-2/3 flex-shrink-0 border-r-1 border-dark-700 pr-8">
        <section class="mb-5 flex flex-col gap-2 border-b-1 border-dark-700 pb-5">
          <h1 class="text-2xl">
            {bio.firstName} {bio.lastName}
          </h1>
          <HorizontalList>
            <span>{bio.location}</span>
            <a
              href={`mailto:${bio.email}`}
              class="text-blue-700 hover:underline"
            >
              {bio.email}
            </a>
            <a href={site?.origin} class="text-blue-700 hover:underline">
              {site?.host}
            </a>
            <a
              href={`https://github.com/${bio.github}`}
              class="text-blue-700 hover:underline"
            >
              github.com/{bio.github}
            </a>
          </HorizontalList>
          <p>{bio.description}</p>
        </section>
        <section class="flex flex-col gap-4">
          <h2 class="text-xl -mb-2">Work Experience</h2>
          {jobs.map(
            ({ id, data: { name, description, url, roles, achievements } }) => (
              <div key={id} class="flex flex-col gap-2">
                <div class="flex items-baseline justify-between">
                  <h3 class="text-lg -mb-1">
                    {url ? (
                      <a href={url.href} class="hover:underline">
                        {name}
                      </a>
                    ) : (
                      name
                    )}
                  </h3>
                  <HorizontalList>
                    {description}
                    {formatDuration(roles)}
                  </HorizontalList>
                </div>
                <ul class="flex flex-col-reverse gap-0.5 text-2xs leading-normal">
                  {roles.map((role, index) => (
                    <li key={index}>{formatRole(role, index, roles)}</li>
                  ))}
                </ul>
                <ul class="flex flex-col list-circle gap-1">
                  {achievements.map((achievement, index) => (
                    <li key={index}>
                      <p>{achievement}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          )}
        </section>
      </div>
      <div class="w-1/3">
        <section class="mb-5 flex flex-col gap-2 border-b-1 border-dark-700 pb-5">
          <h2 class="mt-1 text-lg">Open-Source Projects</h2>
          {projects.map(
            ({ id, data: { repository, role, skills, description } }) => (
              <div key={id} class="flex flex-col gap-1">
                <h3 class="text-xs">
                  <a
                    href={`https://github.com/${repository}`}
                    class="text-blue-700 hover:underline"
                  >
                    {repository}
                  </a>
                </h3>
                <div class="flex items-baseline justify-between text-2xs leading-snug">
                  {role}
                  <HorizontalList>{skills}</HorizontalList>
                </div>
                <p class="whitespace-pre-line text-2xs leading-normal">
                  {description}
                </p>
              </div>
            ),
          )}
        </section>
        <section class="mb-5 flex flex-col gap-2 border-b-1 border-dark-700 pb-5">
          <h2 class="text-lg">Ask Me About</h2>
          <TitledList title="Languages">
            <span>TypeScript and JavaScript</span>
            <span>Python</span>
          </TitledList>
          <TitledList title="Testing">
            <span>Test-driven development</span>
            <span>Automated end-to-end testing</span>
          </TitledList>
          <TitledList title="Frontend">
            <span>Scalable, testable application architecture</span>
            <span>Component-based view libraries</span>
          </TitledList>
          <TitledList title="Backend">
            <span>HTTP API design</span>
            <span>Event-driven architecture</span>
          </TitledList>
          <TitledList title="Glue">
            <span>Technical leadership and mentorship</span>
            <span>Project management</span>
          </TitledList>
        </section>
        <section class="flex flex-col gap-2">
          <h2 class="text-lg">Education</h2>
          <TitledList title={bio.education.degree}>
            <span>{bio.education.details}</span>
            <span>
              {bio.education.school}, class of {bio.education.year}
            </span>
          </TitledList>
        </section>
      </div>
    </main>
  </>
)

const HorizontalList: FunctionComponent<{ class?: string }> = ({
  class: className = '',
  children,
}) => (
  <ul class={`flex flex-row items-baseline ${className}`}>
    {toChildArray(children).map((child, index) => (
      <li class={index > 0 ? 'before:px-[0.25em] before:content-["|"]' : ''}>
        {child}
      </li>
    ))}
  </ul>
)

const TitledList: FunctionComponent<{ title: string }> = ({
  title,
  children,
}) => (
  <div class="flex flex-col gap-1">
    <h3 class="text-sm">{title}</h3>
    <ul class="flex flex-col gap-0.5 text-2xs leading-normal">{children}</ul>
  </div>
)

const monthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

const formatRole = (role: JobRole, index: number, roles: JobRoles): string => {
  const { title, start, end = roles[index + 1]?.start } = role
  const startText = monthFormatter.format(start)
  const endText = end ? monthFormatter.format(end) : 'present'

  return `${title} — ${startText} to ${endText}`
}

const formatDuration = (roles: JobRoles): string => {
  const start = roles[0].start
  const end = roles.at(-1)?.end
  const { years, quarters } = getDuration(start, end)
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
