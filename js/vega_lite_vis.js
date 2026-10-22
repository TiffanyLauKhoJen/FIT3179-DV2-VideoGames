// Embed every chart on the page (one vegaEmbed call per chart, as in the studio lab):
// 11 Vega-Lite specs and 1 Vega spec (the treemap); vegaEmbed handles both.
// "renderer: svg" lets the CSS shrink a chart on narrow screens without breaking tooltips.
// tells vega embed to draw charts as SVG
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

// Maps: drag with the mouse to move the map, and hold Ctrl while scrolling to zoom.
// Vega-Lite cannot drag maps by itself (Week 10 studio), so this updates the same
// "center_to" and "zoom_level" parameters that the slider and dropdown control.
// The normal arrow cursor is kept; plain scrolling still scrolls the page,
// and touch screens keep normal swiping.
function addMapDrag(result) {
  var view = result.view;
  var svg = view.container().querySelector("svg");
  var slider = view.container().querySelector('input[type="range"]');
  var minZoom = slider ? +slider.min : 174;
  var maxZoom = slider ? +slider.max : 1200;
  var dragStart = null;

  svg.style.userSelect = "none";   // dragging should move the map, not highlight its text

  svg.addEventListener("pointerdown", function (event) {
    if (event.pointerType !== "mouse" || event.button !== 0) { return; }
    event.preventDefault();   // stop the drag from selecting text on the page
    dragStart = { x: event.clientX, y: event.clientY, centre: view.signal("center_to").slice() };
    svg.setPointerCapture(event.pointerId);
  });

  svg.addEventListener("pointermove", function (event) {
    if (!dragStart) { return; }
    // Pixels moved → degrees moved: one radian (57.3°) spans "zoom_level" pixels.
    var degreesPerPixel = (180 / Math.PI) / view.signal("zoom_level");
    var lon = dragStart.centre[0] - (event.clientX - dragStart.x) * degreesPerPixel;
    var lat = dragStart.centre[1] + (event.clientY - dragStart.y) * degreesPerPixel;
    lon = Math.max(-180, Math.min(180, lon));
    lat = Math.max(-80, Math.min(80, lat));
    view.signal("center_to", [lon, lat]).runAsync();
  });

  function endDrag() {
    dragStart = null;
  }
  svg.addEventListener("pointerup", endDrag);
  svg.addEventListener("pointercancel", endDrag);

  svg.addEventListener("wheel", function (event) {
    if (!event.ctrlKey) { return; }   // without Ctrl, let the page scroll as normal
    event.preventDefault();
    var zoom = view.signal("zoom_level") * (event.deltaY < 0 ? 1.15 : 1 / 1.15);
    zoom = Math.max(minZoom, Math.min(maxZoom, Math.round(zoom)));
    view.signal("zoom_level", zoom).runAsync();
  }, { passive: false });
}

// Both map extras, run once each map has finished drawing
function addMapInteractions(result) {
  addMapReset(result);
  addMapDrag(result);
}

// It saves the map’s initial zoom level and centre.
// It finds the map’s controls panel; if none exists, it stops.
// It creates and adds the button to that panel.
// Clicking the button restores the saved zoom and centre, then updates the map.


// Chart specs, in page order (each path points to one JSON spec in the js folder)
// store the file path for each chart's JSON specification in a variable
// Section 1: How Have Video Games Changed Over Time?
var vg_release_trend = "js/release_trend.vg.json";
var vg_genre_dumbbell = "js/igdb_genre_dumbbell_8_2010_2024.vg.json";
var vg_theme_bump = "js/theme_bump_2016_2024.vg.json";

// Section 2: How Are Video Games Designed to Be Played?
var vg_perspective_slope = "js/player_perspective_slope_2010_2024.vg.json";
var vg_game_mode_bar = "js/game_mode_bar_counts_1980_2024.vg.json";

// Section 3: How Do Game Libraries Differ Across Platforms?
var vg_platform_treemap = "js/platform_family_treemap.vg.json";   // Vega spec (treemap transform)

// Section 4: Where Is the Game Industry Concentrated?
var vg_organisation_dot_map = "js/gamedev_organization_dot_map_110m.vg.json";
var vg_company_symbol_map = "js/gamecompanies_world_overlaid_symbols.vg.json";

// Section 5: How Do Publishers Differ Across Genres and Markets?
var vg_publisher_genre_stacked = "js/publisher_genre_stacked_5x5.vg.json";
var vg_publisher_heatmap = "js/publisher_regional_share_heatmap_12.vg.json";

// Section 6: How Popular Are Video Games Worldwide?
var vg_participation_map = "js/gaming_participation_map.vg.json";
var vg_top_sales_lollipop = "js/top15_games_global_sales_lollipop.vg.json";


// Draw each chart into its HTML container (matched by id).
// The three maps also get a "Reset view" button and drag-to-move once they have finished drawing.
// load and display each chart on the HTML webpage
// Section 1

// "#release_trend" identifies the HTML container where the chart goes
// vg_release_trend supplies the chart’s JSON file path.
// embedOptions tells it to render as SVG.
// .then(addMapInteractions) adds the reset button and drag-to-move after a map loads successfully.
// .catch(console.error) logs any loading or rendering errors in the browser console.

vegaEmbed("#release_trend", vg_release_trend, embedOptions).catch(console.error);
vegaEmbed("#genre_dumbbell", vg_genre_dumbbell, embedOptions).catch(console.error);
vegaEmbed("#theme_bump", vg_theme_bump, embedOptions).catch(console.error);

// Section 2
vegaEmbed("#perspective_slope", vg_perspective_slope, embedOptions).catch(console.error);
vegaEmbed("#game_mode_bar", vg_game_mode_bar, embedOptions).catch(console.error);

// Section 3
vegaEmbed("#platform_treemap", vg_platform_treemap, embedOptions).catch(console.error);

// Section 4
vegaEmbed("#organisation_dot_map", vg_organisation_dot_map, embedOptions).then(addMapInteractions).catch(console.error);
vegaEmbed("#company_symbol_map", vg_company_symbol_map, embedOptions).then(addMapInteractions).catch(console.error);

// Section 5
vegaEmbed("#publisher_genre_stacked", vg_publisher_genre_stacked, embedOptions).catch(console.error);
vegaEmbed("#publisher_heatmap", vg_publisher_heatmap, embedOptions).catch(console.error);

// Section 6
vegaEmbed("#participation_map", vg_participation_map, embedOptions).then(addMapInteractions).catch(console.error);
vegaEmbed("#top_sales_lollipop", vg_top_sales_lollipop, embedOptions).catch(console.error);
