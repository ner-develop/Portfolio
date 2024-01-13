// CORS対策で直接JSとして読み込む
codingGalleryJson =
{
    "contents": [
        {
            "title": "紐物理の実装",
            "description": [
                "論文をもとにPBD/XPBD(PositionBasedDynamics)の実装をしました。PBDではどういう課題があり、それをXPBDではどう解決したのか、順に追って学べたのも面白かったです。アルゴリズムをただコーディングするだけでなく、論文を通して物理シミュレーションや数理最適などのテクニックなどに触れ、学びが多くありました。また、PBDは多く使われている技術のため、どのような実装がされているのか知ることができ興味深く、楽しく実装できました。"
            ],
            "media": {
                "type": "video",
                "src": "media/XPBD.mp4"
            },
            "github": [
                {
                    "title": "PositionBasedDynamics",
                    "url": "https://github.com/ner-develop/PositionBasedDynamics"
                },
                {
                    "title": "PositionBasedDynamicsForUE",
                    "url": "https://github.com/ner-develop/PositionBasedDynamicsForUE"
                },
                {
                    "title": "PositionBasedDynamicsForGodot",
                    "url": "https://github.com/ner-develop/PositionBasedDynamicsForGodot"
                }
            ],
            "zenn": [
                {
                    "title": "[Unity] 論文を読んで紐物理を実装してみよう(PBD: Position Based Dynamics)",
                    "url": "https://zenn.dev/nrdev/articles/141dbc5774f666"
                },
                {
                    "title": "[Unity] 論文を読んで紐物理を実装してみよう(XPBD: Extended Position Based Dynamics)",
                    "url": "https://zenn.dev/nrdev/articles/68ff50a19d91b9"
                }
            ]
        },
        {
            "title": "Gerstner Wavesの実装",
            "description": [
                "GPU Gemsを参考にUnity上で実装しました。通常のSin波に、距離に応じてCos値のずれを加えることで密度差を生み出す手法は、シンプルながら波の勾配を表現することができとても面白いと感じました。"
            ],
            "media": {
                "type": "video",
                "src": "media/gerstner_waves.mp4"
            },
            "github": [
                {
                    "title": "GerstnerWaves",
                    "url": "https://github.com/ner-develop/GerstnerWaves"
                }
            ],
            "zenn": [
                {
                    "title": "[Unity] 数式を読み解きながら頂点シェーダーで波の動きを作ってみる(Gerstner Waves)",
                    "url": "https://zenn.dev/nrdev/articles/a1a350e5d7e725"
                }
            ]
        },
        {
            "title": "デカールペイント",
            "description": [
                "スプラトゥーンのようなペイント表現、攻撃したあとの返り血の表現など、オブジェクトの任意の場所にテクスチャを累積描画する実装をしてみました。"
            ],
            "media": {
                "type": "video",
                "src": "media/decal_painter.mp4"
            },
            "github": [
                {
                    "title": "DecalPainter",
                    "url": "https://github.com/ner-develop/DecalPainter"
                }
            ],
            "zenn": [
                {
                    "title": "[Unity] 鮮血を、浴びせよ...!!",
                    "url": "https://zenn.dev/nrdev/articles/1ae096ef6d9637"
                }
            ]
        },
        {
            "title": "Active Ragdollの実装",
            "description": [
                "キャラクターをアニメーションで動かしつつ、物理影響を受けるラグドール化をする実装をしました。Fall GuysやHuman Fall Flatのようなキャラクターの動きを試してみたく実装しました。実装には誤差をフィードバックとして制御するPID制御を用いています。"
            ],
            "media": {
                "type": "video",
                "src": "media/active-ragdoll.mp4"
            },
            "github": [],
            "zenn": []
        },
        {
            "title": "レイマーチングを使ったメタボール表現",
            "description": [
                "ピクセルごとに符号あり距離関数に応じてレイを進め、物体への当たり判定を取ります。その際に物体間を補完し、メタボール表現を行っています。レンダリング時に透過と屈折表現などを加え、ライブ演出として実装してみました。",
                "なお、ライブはユニティちゃんライブステージ(© UTJ/UCL)を利用させていただき、そこへ変更・演出追加をしています。"
            ],
            "media": {
                "type": "video",
                "src": "media/metaball_live.mp4"
            },
            "github": [],
            "zenn": []
        },
        {
            "title": "モバイル動作のためのメタボール表現の負荷軽減",
            "description": [
                "レイマーチングを使ったメタボール表現の実装では、ピクセルごとにレイを進める処理が走ります。そのため、画面のピクセルが多いほど処理負荷が大きくなります。低スペックAndroid端末で動作させたところ数秒に1フレーム更新できるかどうかでした。そこでレイマーチングだけ専用パスを用意し、低解像度で描画し、最後に合成することで低スペック端末でも動作するようにしました。"
            ],
            "media": {
                "type": "video",
                "src": "media/metaball.mp4"
            },
            "github": [],
            "zenn": []
        },
        {
            "title": "水面の波紋シミュレーション",
            "description": [
                "波動方程式を使ったシミュレーションを実装しました。オイラー陽解法を学んだ後に学びましたが、これも加速度などの微分を式に持つ方程式を使ってテイラー級数による近似によって計算するという物理シミュレーションとしての根本は同じというのが面白かったです。今後の課題としては、キャラクターが浅い水場を歩いた際のエフェクトとして、実際にゲームで使えるような実装まで落とし込みたいと思います。"
            ],
            "media": {
                "type": "video",
                "src": "media/wave_equation.mp4"
            },
            "github": [],
            "zenn": []
        },
        {
            "title": "ドロネー三角形分割",
            "description": [
                "「ラクガキ王国」で使われている、描いた線から3Dモデルを生成する手法の論文がきっかけで知ったドロネー三角形分割というアルゴリズムを実装してみました。本実装は水面の波紋シミュレーションの水面メッシュ生成にも使用しています。"
            ],
            "media": {
                "type": "img",
                "src": "media/delaunay_triangulation_20240108000025.png"
            },
            "github": [],
            "zenn": []
        },
        {
            "title": "ポートフォリオサイト",
            "description": [
                "Github Pagesを使って、HTML/CSS/Javascriptで作成しています。"
            ],
            "media": {
                "type": "iframe",
                "src": ""
            },
            "github": [
                {
                    "title": "Portfolio",
                    "url": "https://github.com/ner-develop/Portfolio"
                }
            ]
        }
    ]
};