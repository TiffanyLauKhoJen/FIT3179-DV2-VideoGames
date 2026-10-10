// Embed every Vega-Lite chart on the page (one vegaEmbed call per chart, as in the studio lab).
// "renderer: svg" lets the CSS shrink a chart on narrow screens without breaking tooltips.
var embedOptions = { "actions": false, "renderer": "svg" };

// Level 1: the catalogue keeps growing
var vg_release_trend = "js/release_trend.vg.json";
var vg_genre_dumbbell = "js/igdb_genre_dumbbell_8_2010_2024.vg.json";
var vg_theme_bump = "js/theme_bump_2016_2024.vg.json";

// Level 2: new ways to see and play
var vg_perspective_slope = "js/player_perspective_slope_2010_2024.vg.json";
var vg_game_mode_radial = "js/game_mode_radial_counts_1980_2024.vg.json";

// Level 3: where games are released
var vg_platform_treemap = "js/platform_family_treemap.vg.json";   // Vega spec (treemap transform)

// Level 4: who makes games, and where
var vg_publisher_marimekko = "js/publisher_genre_marimekko_5x5.vg.json";
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
vegaEmbed("#game_mode_radial", vg_game_mode_radial, embedOptions).catch(console.error);

vegaEmbed("#platform_treemap", vg_platform_treemap, embedOptions).catch(console.error);

vegaEmbed("#publisher_marimekko", vg_publisher_marimekko, embedOptions).catch(console.error);
vegaEmbed("#organisation_dot_map", vg_organisation_dot_map, embedOptions).catch(console.error);
vegaEmbed("#company_symbol_map", vg_company_symbol_map, embedOptions).catch(console.error);
vegaEmbed("#publisher_heatmap", vg_publisher_heatmap, embedOptions).catch(console.error);

vegaEmbed("#participation_map", vg_participation_map, embedOptions).catch(console.error);
vegaEmbed("#top_sales_lollipop", vg_top_sales_lollipop, embedOptions).catch(console.error);
