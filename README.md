# slack-daemon

Slackの書き込みを常に表示させるChrome拡張です。

対応するかわからないけどTODOを書いておきます。
- 拡張機能のアイコンがチュートリアルの画像のまま
- typescriptのany型を解決していない
- slackのメッセージのパース部分が適当
- 透明なところクリックできなくて邪魔
- 型を共通化したい
- スクロール中にメッセージを取得すると一番下に戻される
- 肥大化しているクラスがあるのでComponentに切り分けたい
- seの音量調整できない
- window非表示のときは音も切って読み込み自体やめたい
- cssが現在開いているページに引っ張られてしまう
- config周り共通化しないと既に厳しい

# 使いかた
Dockerとnodejsがインストールされている必要があります。
git cloneした後、make runを実行するとbundleにjsとcssが書き出されます。
その後 chrome://extensions/ アクセスし、『パッケージ化されていない拡張機能を読み込む』ボタンから、
manifest.jsonのあるディレクトリを選択して追加します。
追加後、拡張機能のアイコンに自分のSlackTokenと検索文字列を設定します。
設定したらwindowが表示されます。

こんな感じ
<img src="https://user-images.githubusercontent.com/25458018/97812476-e4a33100-1cc4-11eb-9db9-ab523fa558b7.png" alt="サンプル" title="サンプル">

