<?php

// Generate unique id for aria-controls.
$unique_id = wp_unique_id( 'p-' );
$links = $attributes['links'] ?? [];
$copyrights = $attributes["copyrights"] ?? "";
// Start output buffering to capture the HTML.
?>
<footer
<?php echo get_block_wrapper_attributes(); ?>
>
  <div>
      <ul class="reset-list">
      <?php foreach ($links as $link): ?>
      <li><a class="" title="<?= esc_attr($link['title']) ?>" href="<?= esc_attr($link['url']) ?>"><?= esc_html($link['text']) ?></a></li>
    <?php endforeach; ?>
       
      </ul>
    <div class="copyrights">
        <?php  echo $copyrights ?>
  </div>
  </div>

</footer>
