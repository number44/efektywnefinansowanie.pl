<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
// Generate unique id for aria-controls.
$unique_id = wp_unique_id( 'p-' );
$links = $attributes['links'] ?? [];
$content = $attributes["copyrights"] ?? "";
// Start output buffering to capture the HTML.
?>
<footer>
  <div class="container">
    <nav>
      <ul class="reset-list">
      <?php foreach ($links as $link): ?>
      <li><a class="" title="<?= esc_attr($link['title']) ?>" href="<?= esc_attr($link['url']) ?>"><?= esc_html($link['text']) ?></a></li>
    <?php endforeach; ?>
       
      </ul>
    </nav>
    <div class="copyrights">
        <?php  echo $content ?>
  </div>
  </div>
</footer>