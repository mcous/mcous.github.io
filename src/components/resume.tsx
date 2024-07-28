import { type FunctionComponent, toChildArray } from 'preact'

import type { BioData } from '$lib/bio.ts'
import type { JobEntry, JobRole, JobRoles } from '$lib/jobs.ts'
import type { ProjectEntry } from '$lib/projects.ts'
import type { SkillsEntry } from '$lib/skills.ts'

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
        Download
        <span aria-label="pdf" role="img" class="i-octicon-file-pdf" />
      </a>
    </nav>
    <main class="mx-auto h-full flex flex-col bg-white px-8 py-6 text-xs leading-normal shadow-sm md:mb-8 md:h-[11in] md:max-w-[8.5in] md:flex-row md:px-10">
      <div class="mb-8 h-full w-full flex-shrink-0 border-b-1 border-dark-700 pb-8 md:mb-0 md:mr-8 md:w-2/3 md:border-b-0 md:border-r-1 md:pb-0 md:pr-8">
        <section class="mb-8 flex flex-col gap-2 border-b-1 border-dark-700 pb-8 md:mb-4 md:pb-4">
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
          <p class="md:whitespace-pre-line">{bio.description}</p>
        </section>
        <section class="flex flex-col gap-4">
          <h2 class="text-xl -mb-2">Work Experience</h2>
          {jobs.map(
            ({ id, data: { name, description, url, roles, achievements } }) => (
              <div key={id} class="flex flex-col gap-2">
                <div class="flex flex-col md:flex-row md:items-baseline md:justify-between">
                  <h3 class="mb-1 text-lg md:-mb-1">
                    {url ? (
                      <a href={url.href} class="hover:underline">
                        {name}
                      </a>
                    ) : (
                      name
                    )}
                  </h3>
                  <HorizontalList>
                    {formatDuration(roles)}
                    {description}
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
      <div class="w-full md:w-1/3 md:pt-1">
        <section class="mb-8 flex flex-col gap-2 border-b-1 border-dark-700 pb-8 md:mb-4 md:pb-4">
          <h2 class="text-lg">Open-Source Projects</h2>
          {projects.map(({ id, data: { repository, role, description } }) => (
            <div key={id} class="flex flex-col gap-1">
              <h3 class="md:text-xs">
                <a
                  href={`https://github.com/${repository}`}
                  class="text-blue-700 hover:underline"
                >
                  {repository}
                </a>
              </h3>
              <div class="flex items-baseline justify-between text-xs leading-snug md:text-2xs">
                {role}
              </div>
              <p class="leading-normal md:whitespace-pre-line md:text-2xs">
                {description}
              </p>
            </div>
          ))}
        </section>
        <section class="mb-8 flex flex-col gap-2 border-b-1 border-dark-700 pb-8 md:mb-4 md:pb-4">
          <h2 class="text-lg">Skills</h2>
          {skills.map(({ id, data: { name, skills } }) => (
            <TitledList key={id} title={name}>
              {skills}
            </TitledList>
          ))}
        </section>
        <section class="flex flex-col gap-2">
          <h2 class="text-lg">Education</h2>
          <TitledList title={bio.education.degree}>
            <span>
              {bio.education.school}, class of {bio.education.year}
            </span>
            <span>{bio.education.details}</span>
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
  <ul
    class={`flex flex-wrap gap-x-3 gap-y-1 md:gap-0 items-baseline ${className}`}
  >
    {toChildArray(children).map((child, index) => (
      <li
        key={index}
        class={index > 0 ? 'md:before:px-[0.25em] md:before:content-["|"]' : ''}
      >
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
    <ul class="flex flex-col list-circle gap-0.5 text-xs leading-normal md:text-2xs">
      {toChildArray(children).map((child, index) => (
        <li key={index}>{child}</li>
      ))}
    </ul>
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
