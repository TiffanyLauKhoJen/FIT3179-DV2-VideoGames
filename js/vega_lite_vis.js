// Embed every Vega-Lite chart on the page (one vegaEmbed call per chart, as in the studio lab).
// "renderer: svg" lets the CSS shrink a chart on narrow screens without breaking tooltips.
var embedOptions = { "renderer": "svg" };

// Maps: add a "Reset view" button next to the Zoom and Map Centre controls.
// It sets both parameters back to the full-world view (the values in each map's spec);
// the slider and dropdown update themselves because they are bound to the same parameters.
function addMapReset(result) {
  var view = result.view;
  var startZoom = view.signal("zoom_level");
  var startCentre = view.signal("center_to");
  var container = view.container();
  var panel = container.querySelector(".vega-bindings");
  if (!panel) { return; }
  var button = document.createElement("button");
  button.type = "button";
  button.className = "map-reset";
  button.textContent = "Reset view";
  button.addEventListener("click", function () {
    view.signal("zoom_level", startZoom).signal("center_to", startCentre).runAsync();
  });
  panel.appendChild(button);
}


// Level 1: the catalogue keeps growing
var vg_release_trend = "js/release_trend.vg.json";
var vg_genre_dumbbell = "js/igdb_genre_dumbbell_8_2010_2024.vg.json";
var vg_theme_bump = "js/theme_bump_2016_2024.vg.json";

// Level 2: new ways to see and play
var vg_perspective_slope = "js/player_perspective_slope_2010_2024.vg.json";
var vg_game_mode_bar = "js/game_mode_bar_counts_1980_2024.vg.json";

// Level 3: where games are released
var vg_platform_treemap = "js/platform_family_treemap.vg.json";   // Vega spec (treemap transform)

// Level 4: who makes games, and where
var vg_publisher_genre_stacked = "js/publisher_genre_stacked_5x5.vg.json";
var vg_organisation_dot_map = "js/gamedev_organization_dot_map_110m.vg.json";
var vg_company_symbol_map = "js/gamecompanies_world_overlaid_symbols.vg.json";
var vg_publisher_heatmap = "js/publisher_regional_share_heatmap_12.vg.json";

// Level 5: a global audience, a few giant hits
var vg_participation_map = "js/gaming_participation_map.vg.json";
var vg_top_sales_lollipop = "js/top15_games_global_sales_lollipop.vg.json";


vegaEmbed("#release_trend", vg_release_trend, embedOptions).catch(console.error);
vegaEmbed("#genre_dumbbell", vg_genre_dumbbell, embedOptions).catch(console.error);
vegaEmbed("#theme_bump", vg_theme_bump, embedOptions).catch(console.error);

vegaEmbed("#perspective_slope", vg_perspective_slope, embedOptions).catch(console.error);
vegaEmbed("#game_mode_bar", vg_game_mode_bar, embedOptions).catch(console.error);

vegaEmbed("#platform_treemap", vg_platform_treemap, embedOptions).catch(console.error);

vegaEmbed("#publisher_genre_stacked", vg_publisher_genre_stacked, embedOptions).catch(console.error);
vegaEmbed("#organisation_dot_map", vg_organisation_dot_map, embedOptions).then(addMapReset).catch(console.error);
vegaEmbed("#company_symbol_map", vg_company_symbol_map, embedOptions).then(addMapReset).catch(console.error);
vegaEmbed("#publisher_heatmap", vg_publisher_heatmap, embedOptions).catch(console.error);

vegaEmbed("#participation_map", vg_participation_map, embedOptions).then(addMapReset).catch(console.error);
vegaEmbed("#top_sales_lollipop", vg_top_sales_lollipop, embedOptions).catch(console.error);
