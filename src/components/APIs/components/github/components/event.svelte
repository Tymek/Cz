<script>
  import { translations, _ } from 'svelte-intl'
  import octicons from '@primer/octicons-v2'
  import moment from 'moment'
  import { isEmpty } from 'ramda'

  export let event = {}

  const texts = {
    at: 'at',
  }

  translations.update({
    pl: {
      [texts.at]: 'w',
    },
  })

  const eventIcons = {
    CommitCommentEvent: {
      any: octicons['comment-discussion'],
    },
    CreateEvent: {
      any: octicons['star'],
      branch: octicons['git-branch'],
      repository: octicons['repo'],
      tag: octicons['tag'],
    },
    DeleteEvent: {
      any: octicons['trash'],
    },
    ForkEvent: {
      any: octicons['git-fork'],
    },
    GollumEvent: {
      any: octicons['book'],
    },
    IssueCommentEvent: {
      any: octicons['comment'],
    },
    IssuesEvent: {
      any: octicons['issue-opened'],
      opened: octicons['issue-opened'],
      closed: octicons['issue-closed'],
      reopened: octicons['issue-reopened'],
    },
    MemberEvent: {
      any: octicons['person'],
    },
    PublicEvent: {
      any: octicons['unlock'],
    },
    PullRequestEvent: {
      any: octicons['git-pull-request'],
    },
    PullRequestReviewCommentEvent: {
      any: octicons['comment-discussion'],
    },
    PushEvent: {
      any: octicons['git-commit'],
    },
    ReleaseEvent: {
      any: octicons['repo-push'],
    },
    SponsorshipEvent: {
      any: octicons['rocket'],
    },
    WatchEvent: {
      any: octicons['star-fill'],
    },
  }

  let icon = ''

  if (!isEmpty(eventIcons[event.type])) {
    const action = event.action || event.ref_type || 'any'

    if (eventIcons[event.type][action]) {
      icon = eventIcons[event.type][action].toSVG({ 'class': 'event-octicon' })
    } else if (eventIcons[event.type].any) {
      icon = eventIcons[event.type].any.toSVG({ 'class': 'event-octicon' })
    } else {
      icon = octicons['dot'].toSVG({ 'class': 'event-octicon' })
    }
  }
</script>

<style type="text/scss" lang="scss">
  :global(.event-octicon) {
    margin-right: (2rem / 16);
  }
  :global(.event-octicon path) {
    fill: currentColor;
  }

  li {
    white-space: nowrap;
    overflow-x: hidden;
    overflow-y: visible;
    text-overflow: ellipsis;
  }

  a {
    text-decoration: none;

    &:hover,
    &:active,
    &:focus {
      text-decoration: underline;
    }
  }
</style>

<li>
  {#if !isEmpty(icon)}
    {@html icon}
  {/if}
  {moment(event.created_at).fromNow()}
  {$_(texts.at)}
  <a href="//github.com/{event.repo}">
    {event.repo}
  </a>
</li>
