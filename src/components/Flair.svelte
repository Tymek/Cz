<script>
  export let name = ''
  export let image = ''
</script>

<style type="text/scss" lang="scss">
  .avatar {
    width: 4rem;
    height: 4rem;
    border-radius: (2rem / 16);
  }

  .columns {
    display: flex;
    margin-bottom: 1.5rem;
  }

  .flair {
    display: flex;
    flex-direction: column;
    margin: 0.5rem 0 0 0.67rem;
  }

  .name {
		font-size: 1.243539882rem;
    font-weight: 500;
  }
</style>

<div class="columns">
  <img class="avatar" src={image} alt="avatar" />

  <div class="flair">
    <div class="name">{name}</div>

    <div>
      <slot></slot>
    </div>
  </div>
</div>
