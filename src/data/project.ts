export const project = {
  name: 'WindCraft BR', version: '0.6.0', minecraft: '26.3', forge: '66.1.8', java: '25',
  repository: 'https://github.com/jairomartins/windcraft-br',
  download: 'https://github.com/jairomartins/windcraft-br/raw/refs/heads/main/dist/windcraft-0.6.0.jar',
  forgeDownload: 'https://files.minecraftforge.net/net/minecraftforge/forge/index_26.3.html',
  // No official gameplay video has been supplied. Set an HTTPS video URL to show the player.
  gameplayVideo: '',
  verifiedAt: '2026-11-16',
};
export const gallery = ["planador-oceano-0.6.0.png", "planador-vista-superior-0.6.0.png", "planador-vista-inferior-0.6.0.png", "planador-curva-0.6.0.png", "planador-montanhas-0.6.0.png", "planador-planicie-0.6.0.png"];
// Ingredient indexes correspond to the translated ingredients list; 6 is an empty slot.
export const recipes = { glider: [0, 1, 0, 0, 2, 0, 3, 2, 3], anemometer: [6, 4, 6, 4, 5, 4, 6, 2, 6] };
// Keep these IDs aligned with the roadmap translations. No release dates are promised.
export const roadmap = { implemented: ['wind', 'glider', 'physics', 'updrafts', 'anemometer', 'hud', 'atmosphere'], planned: ['kites', 'windmills', 'wind-power', 'sailboats', 'airships', 'weather'] };
