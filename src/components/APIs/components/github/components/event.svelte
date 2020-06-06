<script>
  import octicons from '@primer/octicons-v2'
  import {
    isEmpty,
  } from 'ramda'

  export let event = {}

  const eventIcons = {
    CommitCommentEvent: {
      any: octicons['dot'],
    },
    CreateEvent: {
      any: octicons['dot'],
    },
    DeleteEvent: {
      any: octicons['dot'],
    },
    ForkEvent: {
      any: octicons['dot'],
    },
    GollumEvent: {
      any: octicons['dot'],
    },
    IssueCommentEvent: {
      any: octicons['dot'],
    },
    IssuesEvent: {
      any: octicons['issue-opened'],
      opened: octicons['issue-opened'],
      closed: octicons['issue-closed'],
      reopened: octicons['issue-reopened'],
    },
    MemberEvent: {
      any: octicons['dot'],
    },
    PublicEvent: {
      any: octicons['dot'],
    },
    PullRequestEvent: {
      any: octicons['dot'],
    },
    PullRequestReviewCommentEvent: {
      any: octicons['dot'],
    },
    PushEvent: {
      any: octicons['dot'],
    },
    ReleaseEvent: {
      any: octicons['dot'],
    },
    SponsorshipEvent: {
      any: octicons['dot'],
    },
    WatchEvent: {
      any: octicons['star-fill'],
    },
  }

  let icon = ''

  if (!isEmpty(eventIcons[event.type])) {
    const action = event.action || 'any'

    if (eventIcons[event.type][action]) {
      icon = eventIcons[event.type][action].toSVG({ 'class': 'event-octicon' })
    } else {
      icon = eventIcons[event.type].any.toSVG({ 'class': 'event-octicon' })
    }
  }

  console.log(octicons)

</script>

<style type="text/scss" lang="scss">
  :global(.event-octicon path) {
    fill: currentColor;
  }
</style>

<li>
  {#if !isEmpty(icon)}
    {@html icon}
  {/if}
  {event.repo}
</li>
