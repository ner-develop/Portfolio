(()=>{"use strict";var e={715:(e,t)=>{var n;Object.defineProperty(t,"__esModule",{value:!0}),t.GalleryHtmlConstructor=t.MediaType=void 0,function(e){e.Image="img",e.Video="video",e.SelfPage="self-page"}(n||(t.MediaType=n={})),t.GalleryHtmlConstructor=class{constructor(){}async loadContentsFromJson(e){const t=await fetch(e);return(await t.json()).contents}constructGalleryContents(e,t){const n=document.getElementById(e);if(n){for(const e of t)this.constructGalleryContent(n,e);this.initIframeSelfPage()}}constructGalleryContent(e,t){const n=this.generateCardBlockElement(t.media);e.appendChild(n);const i=this.generateDescriptionBlockElement(t);e.appendChild(i)}generateDescriptionBlockElement(e){const t=document.createElement("div");t.className="col s5";const n=document.createElement("h3");n.textContent=e.title,t.appendChild(n);for(const n of e.description){const e=document.createElement("p");e.innerHTML=n,t.appendChild(e)}if(e.github){const n=document.createElement("p");for(let t=0;t<e.github.length;t++){const i=e.github[t],r=document.createElement("a");r.textContent=i.title,r.href=i.url,n.appendChild(document.createTextNode("Github：")),n.appendChild(r),t<e.github.length-1&&n.appendChild(document.createElement("br"))}t.appendChild(n)}if(e.zenn){const n=document.createElement("p");for(let t=0;t<e.zenn.length;t++){const i=e.zenn[t],r=document.createElement("a");r.textContent=i.title,r.href=i.url,n.appendChild(document.createTextNode("技術ブログ：")),n.appendChild(r),t<e.zenn.length-1&&n.appendChild(document.createElement("br"))}t.appendChild(n)}return t}generateCardBlockElement(e){const t=document.createElement("div");if(t.className="col s7",this.isImageCarousel(e)){const i=e.src.map((e=>this.generateMediaElement({type:n.Image,src:e,link:null}))).map((e=>this.generateCardElement(e))),r=this.generateCarouselCardElement(i);t.appendChild(r)}else{const n=this.generateMediaElement(e),i=this.generateCardElement(n);t.appendChild(i)}return t}isImageCarousel(e){return e.type==n.Image&&Array.isArray(e.src)}generateCarouselCardElement(e){const t=document.createElement("div");t.className="carousel carousel-slider";for(const n of e){const e=document.createElement("div");e.className="carousel-item",e.appendChild(n),t.appendChild(e)}return t}generateCardElement(e){const t=document.createElement("div");t.className="card";const n=document.createElement("div");return n.className="card-image",n.appendChild(e),t.appendChild(n),t}generateMediaElement(e){if(Array.isArray(e.src))return alert("media.src is array"),document.createElement("div");switch(e.type){case n.Image:return e.link?this.generateLinkImageElement(e.src,e.link):this.generateImageElement(e.src);case n.Video:return this.generateVideoElement(e.src);case n.SelfPage:return this.generateSelfPageElement()}}generateVideoElement(e){const t=document.createElement("video");return t.className="materialboxed",t.src=e,t.autoplay=!0,t.muted=!0,t.loop=!0,t}generateImageElement(e){const t=document.createElement("img");return t.className="materialboxed",t.src=e,t}generateLinkImageElement(e,t){const n=document.createElement("a");n.className="tooltipped",n.href=t.url,n.setAttribute("data-position","top"),n.setAttribute("data-tooltip",t.title);const i=document.createElement("img");return i.src=e,n.appendChild(i),n}generateSelfPageElement(){const e=document.createElement("iframe");return e.id="iframe-self-page",e}initIframeSelfPage(){const e=document.getElementById("iframe-self-page");if(!e)return;const t=e,n=window.innerWidth,i=t?.parentElement,r=i?.clientWidth||0,a=i?.clientHeight||0,l=r/n;t&&(t.style.width=`${r}px`,t.style.height=`${a}px`,t.src=`index.html?iframe=true&zoom=${l}`);const o=new URL(document.location.href).searchParams;if("true"===o.get("iframe")&&t){const e=parseFloat(o.get("zoom")||"1");document.body.style.zoom=`${e}`,t.src=""}}}},180:function(e,t,n){var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=n(715),a=n(555),l=i(n(998)),o=i(n(464)),s=i(n(422));document.addEventListener("DOMContentLoaded",(async function(){const e=(new a.TypeWriterAnimator).play(document.getElementById("title")),t=async function(){await async function(){const e=new r.GalleryHtmlConstructor,t=l.default;e.constructGalleryContents("coding-gallery",t.contents);const n=o.default;e.constructGalleryContents("blog-gallery",n.contents);const i=s.default;e.constructGalleryContents("art-gallery",i.contents)}(),function(){const e=document.querySelector("body");if(!e)return;const t=e?.className||"",n=document.getElementById("coding-gallery"),i=null!==n,r=document.getElementById("blog-gallery"),a=null!==r,l=document.getElementById("art-gallery"),o=null!==l;function s(){let s=.5*window.innerHeight,d=window.scrollY,c=i?d+n.getBoundingClientRect().top:0,m=a?d+r.getBoundingClientRect().top:0,p=o?d+l.getBoundingClientRect().top:0;e.className=d<c-s?`${t} color-section1`:d<m-s?`${t} color-section2`:d<p-s?`${t} color-section3`:`${t} color-section4`}s(),window.addEventListener("scroll",s)}(),function(){const e=document.querySelectorAll(".materialboxed");M.Materialbox.init(e,{});const t=document.querySelectorAll(".carousel");M.Carousel.init(t,{indicators:!0,fullWidth:!0});const n=document.querySelectorAll(".tooltipped");M.Tooltip.init(n,{})}()}();await Promise.all([e,t])}))},555:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.TypeWriterAnimator=void 0;class n{async play(e){e&&(e.textContent="",await this.playCursorWaitAnimation(e,2e3,n.BLINK_INTERVAL),await this.playTypeWriterAnimation(e,n.TITLE_TEXT),this.addBlinkUnderscore(e,n.BLINK_INTERVAL))}addBlinkUnderscore(e,t){const n=document.createElement("span");return n.textContent="_",e.appendChild(n),setInterval((function(){n.style.visibility="hidden"===n.style.visibility?"visible":"hidden"}),t),n}async playCursorWaitAnimation(e,t,n){const i=this.addBlinkUnderscore(e,n);await this.sleep(t),i.remove()}async playTypeWriterAnimation(e,t){for(let n=0;n<t.length;n++)e.innerHTML+=t.charAt(n),await this.sleep(100)}sleep(e){return new Promise((t=>setTimeout(t,e)))}}t.TypeWriterAnimator=n,n.BLINK_INTERVAL=500,n.TITLE_TEXT="Portfolio"},422:e=>{e.exports=JSON.parse('{"contents":[{"title":"セルルックキャラモデリング","description":["キャラクターデザインは亥と卯(<a href=\'https://twitter.com/itou_nko\'>@itou_nko</a>)様のものです。動画のモデルは、モデリング講座のコースに沿った制作物です。","制作はBlenderで行いました。コースに沿った制作でも半年以上かかりましたが、キャラクターモデルの作成のフローを知ることができたのは良かったです。Blenderでの制作を通して、モーション作成時に前フレームのボーン位置が可視化されていればモーション作成がしやすそうなど、プログラマ視点でどういうツールがあれば製作上の効率化や課題解決ができそうかなども見えてきて、Blender用ツールなども今後は開発してみたいと思いました。"],"media":{"type":"video","src":"media/toon_character.mp4"}},{"title":"パンケーキ","description":["SubstancePainterを使用したリアルなアセットの作成フローについて知ろうと思い制作しました。","本作品はBlenderを使ったモデリングとSubstance Painterを使ったテクスチャ作成を行いました。フォトリアルなアセットを作る際にアーティストが使うツールについて触れられたのは良かったです。また、SubstancePainterを使うことで、プログラマでも趣味制作の幅が広がりそうだと感じました。"],"media":{"type":"img","src":["media/pancake1.png","media/pancake2.png","media/pancake3.png"]}}]}')},464:e=>{e.exports=JSON.parse('{"contents":[{"title":"PBD","description":["論文「Position Based Dynamics」(PBD)の解説記事を書きました。アルゴリズムの実装だけでなく、数式やアルゴリズムの説明について学びながら解説しました。","PBDは質点間に制約を与え、それを保持するように位置を直接変更して座標を更新する手法です。従来の力を加えて座標を更新する手法に比べて、直接座標を更新するため扱いやすく、比較的安定しているのでゲームなどによく使われる手法です。"],"media":{"type":"img","src":"media/blog_pbd.png","link":{"title":"[Unity] 論文を読んで紐物理を実装してみよう(PBD: Position Based Dynamics)","url":"https://zenn.dev/nrdev/articles/141dbc5774f666"}},"github":null,"zenn":[{"title":"[Unity] 論文を読んで紐物理を実装してみよう(PBD: Position Based Dynamics)","url":"https://zenn.dev/nrdev/articles/141dbc5774f666"}]},{"title":"XPBD","description":["論文「XPBD: Position-Based Simulation of Compliant Constrained Dynamics」の解説記事を書きました。PBDで課題となっていた剛性の精度の改善がされています。","PBDでは制約距離からのズレを修正距離としますが、その修正距離に剛性値をかけて調整します。そのため剛性が計算反復回数などにより副作用を受けます。一方で、XPBDでは剛性値を考えた運動方程式を解くことで修正距離を得るため、運動方程式に沿った剛性を得ることができます。"],"media":{"type":"img","src":"media/blog_xpbd.png","link":{"title":"[Unity] 論文を読んで紐物理を実装してみよう(XPBD: Extended Position Based Dynamics)","url":"https://zenn.dev/nrdev/articles/68ff50a19d91b9"}},"github":null,"zenn":[{"title":"[Unity] 論文を読んで紐物理を実装してみよう(XPBD: Extended Position Based Dynamics)","url":"https://zenn.dev/nrdev/articles/68ff50a19d91b9"}]},{"title":"Gerstner Waves","description":["波の形状を表現する実装です。数式を順に読み解きながらどういう仕組みなのか解説しました。Gerstner Wavesの式は分解すると高校数学で扱う三角関数と内積のみで表現されており、波の形状という幾何的な形状を表すものなので、一つずつ追っていくことで式の意味が理解しやすいです。"],"media":{"type":"img","src":"media/blog_gerstner_waves.png","link":{"title":"[Unity] 数式を読み解きながら頂点シェーダーで波の動きを作ってみる(Gerstner Waves)","url":"https://zenn.dev/nrdev/articles/a1a350e5d7e725"}},"github":null,"zenn":[{"title":"[Unity] 数式を読み解きながら頂点シェーダーで波の動きを作ってみる(Gerstner Waves)","url":"https://zenn.dev/nrdev/articles/a1a350e5d7e725"}]},{"title":"デカールペイント","description":["任意の3Dモデルにテクスチャを累積ペイントしていく実装について解説しました。任意の3Dモデルのテクスチャに描画するには直接UV空間で描画するのではなく、3D空間からUV空間に写像してテクスチャに描き込む必要があります。そこで、その写像をする専用シェーダーを実装します。デカールペイントをする際に、その専用シェーダーを介してデカール画像を描き込み、3Dモデルのテクスチャを更新していくことで実現しています。"],"media":{"type":"img","src":"media/blog_decal.png","link":{"title":"[Unity] 鮮血を、浴びせよ...!!","url":"https://zenn.dev/nrdev/articles/1ae096ef6d9637"}},"github":null,"zenn":[{"title":"[Unity] 鮮血を、浴びせよ...!!","url":"https://zenn.dev/nrdev/articles/1ae096ef6d9637"}]},{"title":"オイラー陽解法","description":["物理シミュレーションの基礎的な手法について学びながら技術ブログにしました。物理シミュレーションは未来の値を近似して計算していきます。そこでテイラー展開による近似式を使います。テイラー展開の近似式で必要な微分の値を、運動方程式から得ることでその運動について近似計算します。"],"media":{"type":"img","src":"media/blog_forward_euler_method.png","link":{"title":"[Unity] オイラー陽解法から始める物理シミュ入門","url":"https://zenn.dev/nrdev/articles/44c5a563846e06"}},"github":null,"zenn":[{"title":"[Unity] オイラー陽解法から始める物理シミュ入門","url":"https://zenn.dev/nrdev/articles/44c5a563846e06"}]},{"title":"シンプレクティック法","description":["オイラー陽解法にほんの少し手を加えるだけで精度が改善されるシンプレクティック法について調べたことについてまとめました。"],"media":{"type":"img","src":"media/blog_symplectic_method.png","link":{"title":"[Unity] シンプレクティック法でオイラー陽解法の精度改善","url":"https://zenn.dev/nrdev/articles/f45e118d5796a4"}},"github":null,"zenn":[{"title":"[Unity] シンプレクティック法でオイラー陽解法の精度改善","url":"https://zenn.dev/nrdev/articles/f45e118d5796a4"}]},{"title":"[UE5] 背景透過したカメラキャプチャ画像をUIに表示する","description":["UE5のUI実装に関する記事です。"],"media":{"type":"img","src":"media/blog_memo_ue5_capture.png","link":{"title":"[UE5] 背景透過したカメラキャプチャ画像をUIに表示する","url":"https://zenn.dev/nrdev/articles/8643d36c80049b"}},"github":null,"zenn":[{"title":"[UE5] 背景透過したカメラキャプチャ画像をUIに表示する","url":"https://zenn.dev/nrdev/articles/8643d36c80049b"}]}]}')},998:e=>{e.exports=JSON.parse('{"contents":[{"title":"UE5個人ゲーム開発 #1","description":["UE5 C++ で 2023/09 から制作を始めました。","C++開発経験を積みたいという思いと、「将棋」「MOBA系」「Fall GuysやParty Animalのような誰でもできる緩いアクション」という私が好きなゲームから着想を得て作ってみたいと考えた企画のゲーム開発を始めました。まだ開始したばかりですが、仕様書からのタスクばらしまで行い、日々時間のある時に開発を進めています。","将棋は難しいですが、プレイが難解にならない範囲で「紐を付ける」「駒ごとの特色」「棒銀、角換わりなどの戦術」「穴熊、船囲いなどの囲い防御」といった将棋要素も入れたいと思っています。"],"media":{"type":"video","src":"media/ue5_20240119.mp4"}},{"title":"紐物理の実装","description":["論文をもとにPBDとXPBD (Position Based Dynamics) の実装をしました。","実装はUnity、UE5(C++)、Godotでそれぞれ行いました。","PBDではどういう課題があり、それをXPBDではどう解決したのか、順に追って学べたのも面白かったです。アルゴリズムをただコーディングするだけでなく、論文を通して物理シミュレーションや数理最適などのテクニックなどに触れ、学びが多くありました。"],"media":{"type":"video","src":"media/XPBD.mp4"},"github":[{"title":"PositionBasedDynamics","url":"https://github.com/ner-develop/PositionBasedDynamics"},{"title":"PositionBasedDynamicsForUE","url":"https://github.com/ner-develop/PositionBasedDynamicsForUE"},{"title":"PositionBasedDynamicsForGodot","url":"https://github.com/ner-develop/PositionBasedDynamicsForGodot"}],"zenn":[{"title":"[Unity] 論文を読んで紐物理を実装してみよう(PBD: Position Based Dynamics)","url":"https://zenn.dev/nrdev/articles/141dbc5774f666"},{"title":"[Unity] 論文を読んで紐物理を実装してみよう(XPBD: Extended Position Based Dynamics)","url":"https://zenn.dev/nrdev/articles/68ff50a19d91b9"}]},{"title":"Gerstner Wavesの実装","description":["GPU Gemsを参考にUnity上で実装しました。通常のSin波に、距離に応じてCos値のずれを加えることで密度差を生み出す手法は、シンプルながら波の勾配を表現することができとても面白いと感じました。"],"media":{"type":"video","src":"media/gerstner_waves.mp4"},"github":[{"title":"GerstnerWaves","url":"https://github.com/ner-develop/GerstnerWaves"}],"zenn":[{"title":"[Unity] 数式を読み解きながら頂点シェーダーで波の動きを作ってみる(Gerstner Waves)","url":"https://zenn.dev/nrdev/articles/a1a350e5d7e725"}]},{"title":"デカールペイント","description":["スプラトゥーンのようなペイント表現、攻撃したあとの返り血の表現など、オブジェクトの任意の場所にテクスチャを累積描画する実装をしてみました。"],"media":{"type":"video","src":"media/decal_painter.mp4"},"github":[{"title":"DecalPainter","url":"https://github.com/ner-develop/DecalPainter"}],"zenn":[{"title":"[Unity] 鮮血を、浴びせよ...!!","url":"https://zenn.dev/nrdev/articles/1ae096ef6d9637"}]},{"title":"Active Ragdollの実装","description":["キャラクターをアニメーションで動かしつつ、物理影響を受けるラグドール化をする実装をしました。Fall GuysやHuman Fall Flatのようなキャラクターの動きを試してみたく実装しました。実装には誤差をフィードバックとして制御するPID制御を用いています。"],"media":{"type":"video","src":"media/active-ragdoll.mp4"},"github":[],"zenn":[]},{"title":"レイマーチングを使ったメタボール表現","description":["ピクセルごとに符号あり距離関数に応じてレイを進め、物体への当たり判定を取ります。その際に物体間を補完し、メタボール表現を行っています。レンダリング時に透過と屈折表現などを加え、ライブ演出として実装してみました。","なお、ライブはユニティちゃんライブステージ(© UTJ/UCL)を利用させていただき、そこへ変更・演出追加をしています。"],"media":{"type":"video","src":"media/metaball_live.mp4"},"github":[],"zenn":[]},{"title":"モバイル動作のためのメタボール表現の負荷軽減","description":["レイマーチングを使ったメタボール表現の実装では、ピクセルごとにレイを進める処理が走ります。そのため、画面のピクセルが多いほど処理負荷が大きくなります。低スペックAndroid端末で動作させたところ数秒に1フレーム更新できるかどうかでした。そこでレイマーチングだけ専用パスを用意し、低解像度で描画し、最後に合成することで低スペック端末でも動作するようにしました。"],"media":{"type":"video","src":"media/metaball.mp4"},"github":[],"zenn":[]},{"title":"水面の波紋シミュレーション","description":["波動方程式を使ったシミュレーションを実装しました。オイラー陽解法を学んだ後に学びましたが、これも加速度などの微分を式に持つ方程式を使ってテイラー級数による近似によって計算するという物理シミュレーションとしての根本は同じというのが面白かったです。今後の課題としては、キャラクターが浅い水場を歩いた際のエフェクトとして、実際にゲームで使えるような実装まで落とし込みたいと思います。"],"media":{"type":"video","src":"media/wave_equation.mp4"},"github":[],"zenn":[]},{"title":"ドロネー三角形分割","description":["「ラクガキ王国」で使われている、描いた線から3Dモデルを生成する手法の論文がきっかけで知ったドロネー三角形分割というアルゴリズムを実装してみました。本実装は水面の波紋シミュレーションの水面メッシュ生成にも使用しています。"],"media":{"type":"img","src":"media/delaunay_triangulation_20240108000025.png"},"github":[],"zenn":[]},{"title":"ポートフォリオサイト","description":["Github Pagesを使って、HTML/CSS/TypeScriptで作成しています。","内容はJSONで管理し、HTMLの中身を動的生成することで、ポートフォリオに追加する際にHTMLの修正をする必要をなくし手間を減らすようにしました。"],"media":{"type":"self-page","src":""},"github":[{"title":"Portfolio","url":"https://github.com/ner-develop/Portfolio"}]}]}')}},t={};!function n(i){var r=t[i];if(void 0!==r)return r.exports;var a=t[i]={exports:{}};return e[i].call(a.exports,a,a.exports,n),a.exports}(180)})();