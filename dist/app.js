const SITE_BASE = location.hostname.endsWith('github.io') ? '/ycx/' : '/';
const MAP_DATA_URL = location.hostname.endsWith('github.io') ? 'https://cdn.jsdelivr.net/npm/japan-choropleth@0.1.0/data/geojson/prefectures.geojson' : `${SITE_BASE}prefectures.geojson`;

const P = [
  ['北海道','北海道','nature,onsen,food','6–9月避暑；1–2月雪景','富良野花田｜知床五湖｜登别温泉｜小樽','上海→东京/大阪→新千岁；道内远距优先国内线'],
  ['青森','东北','nature,onsen,food','5月樱花；8月睡魔祭；10月红叶','奥入濑溪流｜弘前公园｜八甲田｜酸汤温泉','上海→东京→新青森（新干线）或青森机场'],
  ['岩手','东北','nature,onsen,food','5–6月新绿；10月红叶','平泉中尊寺｜龙泉洞｜八幡平｜花卷温泉','上海→东京→盛冈（新干线）'],
  ['宫城','东北','nature,food,culture','4月樱；10–11月松岛清爽','松岛｜藏王御釜｜仙台城址｜牛舌街','上海→东京→仙台（新干线/国内线）'],
  ['秋田','东北','nature,onsen,food','2月雪祭；9–10月红叶','角馆武家屋敷｜乳头温泉｜田泽湖｜男鹿半岛','上海→东京→秋田机场或秋田新干线'],
  ['山形','东北','nature,onsen,food','2–3月银山雪景；10月山寺红叶','银山温泉｜山寺｜藏王树冰｜加茂水族馆','上海→东京→山形新干线/仙台转巴士'],
  ['福岛','东北','nature,onsen,food','4月花见；10月红叶','五色沼｜大内宿｜会津若松｜东山温泉','上海→东京→郡山（新干线）'],
  ['茨城','关东','nature,food','4–5月粉蝶花；10月扫帚草','国营常陆海滨公园｜袋田瀑布｜偕乐园','上海→东京→常磐线/巴士'],
  ['栃木','关东','nature,onsen,culture','5–6月新绿；10月红叶','日光东照宫｜中禅寺湖｜那须高原｜鬼怒川温泉','上海→东京→日光/那须（铁路）'],
  ['群马','关东','nature,onsen','1–2月雪；5月新绿；10月红叶','草津温泉｜尾濑湿原｜伊香保温泉｜水上峡谷','上海→东京→高崎（新干线）再巴士'],
  ['埼玉','关东','culture,food','3–4月樱花；10月川越祭','川越藏造街｜秩父｜长瀞｜铁道博物馆','上海→东京→JR/私铁'],
  ['千叶','关东','nature,food,shopping','3–5月花季；夏季海岸','房总半岛｜养老溪谷｜成田山｜幕张','上海→东京→JR；成田机场直达'],
  ['东京','关东','culture,food,shopping','3–4月樱；11月银杏','浅草｜明治神宫｜高尾山｜丰洲市场','上海→羽田/成田直达；全日本转乘门户'],
  ['神奈川','关东','nature,onsen,culture','3–4月樱；10–11月红叶','箱根｜镰仓｜江之岛｜横滨港','上海→东京→小田急/JR'],
  ['新潟','甲信越','nature,onsen,food','1–3月滑雪；5月新绿；9月稻田','越后汤泽｜佐渡岛｜清津峡｜弥彦神社','上海→东京→越后汤泽（新干线）'],
  ['富山','北陆','nature,onsen,food','4–6月立山；10月红叶','立山黑部｜雨晴海岸｜宇奈月温泉｜五箇山','上海→东京→北陆新干线富山'],
  ['石川','北陆','culture,food,onsen','3–4月樱；11月兼六园红叶','兼六园｜金泽茶屋街｜轮岛｜和仓温泉','上海→东京→金泽（北陆新干线）'],
  ['福井','北陆','nature,food,culture','4月樱；10–11月红叶','东寻坊｜永平寺｜恐龙博物馆｜三方五湖','上海→大阪/东京→福井（新干线/特急）'],
  ['山梨','甲信越','nature,onsen,food','4月樱与桃花；10–11月晴日','河口湖｜富士山五合目｜西泽溪谷｜石和温泉','上海→东京→富士急/JR巴士'],
  ['长野','甲信越','nature,onsen,food','5–6月新绿；9–10月红叶；冬季雪场','上高地｜白马｜地狱谷｜野泽温泉','上海→东京→长野/松本（新干线/特急）'],
  ['岐阜','中部','nature,onsen,culture','4–5月新绿；10–11月红叶','白川乡｜高山古街｜下吕温泉｜新穗高','上海→名古屋→高山（JR/巴士）'],
  ['静冈','中部','nature,onsen,food','2–4月早樱；10–11月富士能见度高','伊豆｜富士山｜寸又峡｜热海温泉','上海→东京/名古屋→新干线/JR'],
  ['爱知','中部','food,shopping,culture','3–4月樱；秋季凉爽','名古屋城｜犬山｜香岚溪｜吉卜力公园','上海→名古屋中部机场；JR辐射中部'],
  ['三重','关西','nature,food,culture','4–5月；10–11月','伊势神宫｜熊野古道｜鸟羽｜御在所岳','上海→大阪/名古屋→近铁/JR'],
  ['滋贺','关西','nature,culture,food','3–4月樱；11月红叶','琵琶湖｜彦根城｜比叡山｜近江八幡','上海→大阪/京都→JR'],
  ['京都','关西','culture,food,shopping','3–4月樱；11月红叶','岚山｜伏见稻荷｜鞍马｜美山','上海→大阪关西→JR/特急'],
  ['大阪','关西','food,shopping,culture','3–4月；10–11月','道顿堀｜中之岛｜箕面瀑布｜堺','上海→大阪关西直达/经东京转机'],
  ['兵库','关西','nature,onsen,food','3–4月樱；11月红叶','城崎温泉｜六甲山｜竹田城｜神户港','上海→大阪→JR；神户机场可转国内线'],
  ['奈良','关西','nature,culture,food','4月樱；10–11月红叶','奈良公园｜吉野山｜室生寺｜十津川温泉','上海→大阪→近铁/JR'],
  ['和歌山','关西','nature,onsen,culture','4–5月；10–11月','熊野三山｜高野山｜白滨温泉｜那智瀑布','上海→大阪关西→JR/租车'],
  ['鸟取','中国','nature,onsen,food','4–5月；9–10月','鸟取砂丘｜浦富海岸｜三朝温泉｜大山','上海→大阪→鸟取机场/特急'],
  ['岛根','中国','nature,onsen,culture','4–5月；10–11月','出云大社｜石见银山｜玉造温泉｜宍道湖','上海→大阪→出云机场/特急'],
  ['冈山','中国','nature,culture,food','3–4月樱；10月晴朗','仓敷美观｜后乐园｜蒜山高原｜汤原温泉','上海→大阪→冈山（山阳新干线）'],
  ['广岛','中国','nature,culture,food','3–4月樱；10–11月红叶','宫岛｜尾道｜帝释峡｜广岛烧','上海→大阪/东京→广岛（新干线/国内线）'],
  ['山口','中国','nature,onsen,food','4–5月；10–11月','角岛大桥｜秋吉台｜元乃隅神社｜汤田温泉','上海→福冈→新山口（新干线）'],
  ['德岛','四国','nature,onsen,food','4–5月；10–11月','祖谷峡｜鸣门漩涡｜大步危｜祖谷温泉','上海→大阪→德岛机场/高速巴士'],
  ['香川','四国','nature,food,culture','3–5月；10–11月','直岛｜小豆岛｜栗林公园｜赞岐乌冬','上海→大阪→冈山→高松（JR/渡轮）'],
  ['爱媛','四国','nature,onsen,food','3–4月樱；10–11月','道后温泉｜石锤山｜内子｜濑户内岛波海道','上海→大阪→松山机场/冈山转JR'],
  ['高知','四国','nature,food,onsen','3–5月；10–11月','四万十川｜仁淀川｜室户岬｜马路温泉','上海→大阪→高知机场/冈山转JR'],
  ['福冈','九州','food,shopping,culture','3–4月樱；10–11月','太宰府｜门司港｜柳川｜博多屋台','上海→福冈直达或经大阪/东京'],
  ['佐贺','九州','nature,onsen,food','4月樱；10–11月','嬉野温泉｜唐津｜呼子｜有田','上海→福冈→JR/巴士'],
  ['长崎','九州','nature,onsen,culture','3–4月；10–11月','五岛列岛｜云仙温泉｜豪斯登堡｜军舰岛','上海→福冈→长崎新干线/国内线'],
  ['熊本','九州','nature,onsen,food','4–5月；10–11月','阿苏｜黑川温泉｜天草｜熊本城','上海→福冈→九州新干线/熊本机场'],
  ['大分','九州','onsen,nature,food','4–5月；10–11月','由布院｜别府｜九重梦大吊桥｜耶马溪','上海→福冈→特急/大分机场'],
  ['宫崎','九州','nature,food,culture','3–5月；10–11月','高千穗峡｜青岛｜日南海岸｜雾岛','上海→福冈→宫崎机场'],
  ['鹿儿岛','九州','nature,onsen,food','3–5月；10–11月','屋久岛｜樱岛｜指宿砂浴｜雾岛温泉','上海→福冈/大阪→鹿儿岛机场'],
  ['冲绳','冲绳','nature,food,culture','4–6月梅雨前后；10–11月','庆良间诸岛｜古宇利岛｜西表岛｜那霸市场','上海→东京/大阪/福冈→那霸；离岛国内线/船']
];

const slugs = ['hokkaido','aomori','iwate','miyagi','akita','yamagata','fukushima','ibaraki','tochigi','gunma','saitama','chiba','tokyo','kanagawa','niigata','toyama','ishikawa','fukui','yamanashi','nagano','gifu','shizuoka','aichi','mie','shiga','kyoto','osaka','hyogo','nara','wakayama','tottori','shimane','okayama','hiroshima','yamaguchi','tokushima','kagawa','ehime','kochi','fukuoka','saga','nagasaki','kumamoto','oita','miyazaki','kagoshima','okinawa'];
const tagNames = { nature:'自然风光', onsen:'温泉', food:'美食', culture:'人文', shopping:'购物' };

const data = P.map((row, index) => {
  const [name, region, tags, season, spots, transit] = row;
  return { code:String(index + 1).padStart(2,'0'), slug:slugs[index], name, region, tags:tags.split(','), season, spots:spots.split('｜'), transit };
});

function mapRegion(code) {
  const n = Number(code);
  if (n === 1) return 'hokkaido';
  if (n <= 7) return 'tohoku';
  if (n <= 14) return 'kanto';
  if (n <= 24) return 'chubu';
  if (n <= 30) return 'kinki';
  if (n <= 35) return 'chugoku';
  if (n <= 39) return 'shikoku';
  return 'kyushu';
}

function destination(d) { return `${SITE_BASE}prefectures/${d.slug}/`; }

const routeMatch = location.pathname.match(/^\/prefectures\/([^/]+)\/?$/);
const routeSlug = routeMatch?.[1] || new URLSearchParams(location.search).get('pref');
const current = routeSlug && data.find(d => d.slug === routeSlug);

if (current) renderPrefecture(current);
else renderHome();

function renderHome() {
  document.getElementById('homeView').hidden = false;
  document.getElementById('prefectureView').hidden = true;
  document.title = '日本47都道府县旅行图鉴';
  setupFilters();
  renderDirectory(data);
  loadMap();
}

function setupFilters() {
  document.querySelectorAll('.filters button').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelector('.filters .active')?.classList.remove('active');
      button.classList.add('active');
      applyFilter(button.dataset.filter);
    });
  });
}

function applyFilter(filter) {
  const list = data.filter(d => filter === 'all' || d.tags.includes(filter));
  document.getElementById('resultCount').textContent = `${list.length} 个目的地`;
  renderDirectory(list);
  document.querySelectorAll('.prefecture-shape').forEach(shape => {
    const d = data[Number(shape.dataset.code) - 1];
    shape.classList.toggle('is-muted', !list.includes(d));
  });
  if (list[0]) showInspector(list[0]);
}

function renderDirectory(list) {
  const directory = document.getElementById('prefDirectory');
  directory.innerHTML = list.map(d => `<a href="${destination(d)}"><b>${d.code}</b><span>${d.name}</span><small>${d.region}</small></a>`).join('');
}

function showInspector(d) {
  const inspector = document.getElementById('mapInspector');
  inspector.innerHTML = `<p class="eyebrow">JP-${d.code} · ${d.region}</p><h3>${d.name}</h3><p class="inspector-season">最佳旅行期：${d.season}</p><p>${d.spots.slice(0,3).join(' · ')}</p><a href="${destination(d)}">进入${d.name}旅行页 <span>→</span></a>`;
}

async function loadMap() {
  const container = document.getElementById('mapCanvas');
  try {
    const response = await fetch(MAP_DATA_URL);
    if (!response.ok) throw new Error('map unavailable');
    const geojson = await response.json();
    container.innerHTML = buildMap(geojson);
    container.querySelectorAll('.prefecture-shape').forEach(shape => {
      const d = data[Number(shape.dataset.code) - 1];
      shape.addEventListener('mouseenter', () => showInspector(d));
      shape.addEventListener('focus', () => showInspector(d));
      shape.addEventListener('click', () => location.href = destination(d));
      shape.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          location.href = destination(d);
        }
      });
    });
    showInspector(data[0]);
  } catch {
    container.innerHTML = '<div class="map-error">地图暂时无法载入，请使用右侧都道府县目录。</div>';
  }
}

function buildMap(geojson) {
  const features = [...geojson.features].sort((a,b) => Number(a.id) - Number(b.id));
  const shapes = features.map(feature => {
    const d = data[Number(feature.id) - 1];
    const polygons = feature.geometry.type === 'Polygon' ? [feature.geometry.coordinates] : feature.geometry.coordinates;
    const visiblePolygons = feature.id === '47' ? polygons : polygons.filter(poly => {
      const box = ringBounds(poly[0]);
      return box.maxLat >= 29.5 && box.maxLon >= 128.2 && box.minLon <= 146.6;
    });
    const path = visiblePolygons.map(poly => poly.map(ring => ringToPath(ring, feature.id === '47')).join(' ')).join(' ');
    const largest = visiblePolygons.reduce((best, poly) => polygonSize(poly[0]) > polygonSize(best?.[0] || []) ? poly : best, null);
    const label = largest ? labelPosition(largest[0], feature.id === '47') : null;
    return `<g class="prefecture-shape region-${mapRegion(feature.id)}" data-code="${feature.id}" tabindex="0" role="link" aria-label="打开${d.name}旅行页"><path d="${path}" fill-rule="evenodd"></path>${label ? `<text class="map-label" x="${label.x.toFixed(1)}" y="${label.y.toFixed(1)}">${d.name}</text>` : ''}<title>${d.name}</title></g>`;
  }).join('');
  return `<svg class="japan-map" viewBox="0 0 900 930" role="img" aria-label="日本47都道府县互动地图"><rect class="okinawa-inset" x="18" y="540" width="205" height="145" rx="8"></rect><text class="inset-label" x="30" y="563">冲绳群岛</text>${shapes}</svg>`;
}

function project(point, inset) {
  const [lon, lat] = point;
  return inset ? [28 + (lon - 122.8) * 21.4, 570 + (28.9 - lat) * 21.4] : [70 + (lon - 128.5) * 42.5, 28 + (45.8 - lat) * 52];
}

function ringToPath(ring, inset) {
  return ring.map((point, index) => {
    const [x,y] = project(point, inset);
    return `${index ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join('') + 'Z';
}

function ringBounds(ring) {
  return ring.reduce((box, [lon,lat]) => ({minLon:Math.min(box.minLon,lon), maxLon:Math.max(box.maxLon,lon), minLat:Math.min(box.minLat,lat), maxLat:Math.max(box.maxLat,lat)}), {minLon:180,maxLon:-180,minLat:90,maxLat:-90});
}

function polygonSize(ring) {
  if (!ring.length) return 0;
  const b = ringBounds(ring);
  return (b.maxLon - b.minLon) * (b.maxLat - b.minLat);
}

function labelPosition(ring, inset) {
  const b = ringBounds(ring);
  const [x1,y1] = project([b.minLon,b.minLat], inset);
  const [x2,y2] = project([b.maxLon,b.maxLat], inset);
  return {x:(x1+x2)/2, y:(y1+y2)/2 + 3};
}

function renderPrefecture(d) {
  document.getElementById('homeView').hidden = true;
  const view = document.getElementById('prefectureView');
  view.hidden = false;
  document.title = `${d.name}旅行指南｜日本47都道府县旅行图鉴`;
  const index = data.indexOf(d);
  const previous = data[(index + data.length - 1) % data.length];
  const next = data[(index + 1) % data.length];
  view.innerHTML = `
    <a class="back-link" href="${SITE_BASE}#map">← 返回全国地图</a>
    <section class="pref-hero region-surface-${mapRegion(d.code)}">
      <div><p class="eyebrow">JP-${d.code} · ${d.region}</p><h1>${d.name}</h1><p>${d.spots.slice(0,3).join('、')}，从季节与地域风味开始认识这里。</p></div>
      <div class="pref-code">${d.code}</div>
    </section>
    <section class="quick-facts">
      <article><span>最佳旅行期</span><strong>${d.season}</strong></article>
      <article><span>从上海出发</span><strong>${d.transit}</strong></article>
      <article><span>旅行主题</span><strong>${d.tags.map(t => tagNames[t]).join(' · ')}</strong></article>
    </section>
    <section class="pref-content">
      <div class="content-main">
        <p class="eyebrow">PLACES TO BEGIN</p><h2>从这些地方开始</h2>
        <div class="spot-list">${d.spots.map((spot,i) => `<article><b>${String(i+1).padStart(2,'0')}</b><div><h3>${spot}</h3><p>景点特色、建议停留时间与周边路线将在后续版本中继续补充。</p></div></article>`).join('')}</div>
      </div>
      <aside class="content-aside"><p class="eyebrow">PAGE FRAME</p><h2>待继续完善</h2><p>这个独立页面已经预留扩写方向：</p><ul><li>自然景点与季节玩法</li><li>温泉区域与住宿选择</li><li>当地美食与代表店铺</li><li>上海出发的详细班次</li><li>县内分区和多日路线</li></ul></aside>
    </section>
    <nav class="pref-pagination" aria-label="相邻都道府县"><a href="${destination(previous)}"><small>上一个</small><span>← ${previous.name}</span></a><a href="${destination(next)}"><small>下一个</small><span>${next.name} →</span></a></nav>`;
}

