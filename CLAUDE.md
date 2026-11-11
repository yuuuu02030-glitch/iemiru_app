# イエミル住宅総合展示場 来場予約システム（ポートフォリオ / 訓練課題）

作成者：小野寺祐（職業訓練でWebエンジニアを勉強中。前職は住宅営業1年）
設計資料（企画・要件定義・基本設計・API一覧・API仕様書）は提出済み。これから実装する。
設計資料の正本は Google Drive にある。実装中に設計と食い違いが出たら、勝手に変えずに確認すること。

## 背景・目的
- 合同住宅展示場（8社8棟）の来場予約と、見学記録・顧客管理をWebで行う
- 現場の困りごと：紙のアンケート、スタンプラリー、来場者情報の手作業管理
- お客様はログインなし、スタッフはログインあり

## 技術構成
- フロントエンド：React（Vite）／ VS Code
- バックエンド：Spring Boot（Java）／ IntelliJ IDEA
- DB：MySQL（JPA、ID は AUTO_INCREMENT・@GeneratedValue(IDENTITY)）
- 認証：Spring Security のセッション方式（ログイン／ログアウト）
- API確認：Postman ／ ソース管理：GitHub
- 開発はローカル環境（Vite開発サーバー＋Spring Boot）
- データは JSON でやり取りする REST API。URLは複数形のリソース名
- 画面URL（/, /reserve, /admin/...）とAPIのURLは別物
- ステータスコード：200, 201, 400, 401, 403（権限なし）, 404, 500

## 権限
- お客様：ログインなし（トップ、予約、予約完了、見学記録）
- 一般職：予約一覧、簡易顧客詳細、顧客登録（画面のヘッダー表示は「スタッフでログイン中」）
- 管理職：上記＋顧客一覧・顧客詳細・顧客の更新・削除（ヘッダー表示は「管理職でログイン中」）
- アカウントは一般職用・管理職用の2つを初期データで登録する

## テーブル（5つ）
- login(login_id PK, password, role)
- houses(house_id PK, company_name, house_name, description, image_url_1〜image_url_4)
  - image_url_1=外観、2=内観1、3=内観2、4=間取り図（すべて任意）
  - 住宅は初期データで8棟登録。画面からの登録・編集はしない
- customers(customer_id PK, name, address, phone, build_type, build_timing, build_area, visit_reason)
- reservations(reservation_id PK, reception_no, customer_id FK, visit_datetime)
- visit_records(visit_record_id PK, reservation_id FK, house_id FK, wish, visited, favorite)
- customers 1-多 reservations、reservations 1-多 visit_records、houses 1-多 visit_records

## 画面と主なルール
| 画面 | URL | 利用API |
|---|---|---|
| トップ | / | GET /houses |
| 予約 | /reserve | GET /houses, POST /reservations |
| 予約完了 | /reserve/complete | なし（予約画面から結果を受け取る。直接開いたらトップへ） |
| 見学記録 | /visit-record | POST /visit-records/verify, PUT /visit-records |
| ログイン | /admin/login | POST /login |
| 管理者画面 | /admin | GET /me, POST /logout |
| 予約一覧 | /admin/reservations | GET /reservations?date={日付} |
| 簡易顧客詳細 | /admin/customers/:id/summary | GET /customers/{id}/summary |
| 顧客一覧（管理職） | /admin/customers | GET /customers |
| 顧客詳細（管理職） | /admin/customers/:id | GET/PUT/DELETE /customers/{id} |
| 顧客登録 | /admin/customers/new | POST /customers |

- 予約時：customers・reservations を登録し、8棟分の visit_records を作る（選んだ棟は wish=見たい）
- 受付番号：「月日-その日の連番」（例 1110-003）
- 見学記録：受付番号＋電話番号で確認。登録（更新）時にもサーバーで再確認。何度でも上書きできる
- 気に入った：見たにチェックがある棟だけ選べる
- 予約一覧：表示は来場時刻と氏名のみ。日付の初期値は今日、時刻の早い順
- 顧客一覧：登録日の新しい順。顧客一覧→顧客登録への移動はなし
- 顧客詳細：編集は詳細画面内で切り替え（編集画面は作らない）。見学記録は表示のみ。削除すると予約・見学記録も一緒に削除
- 顧客登録画面で登録した顧客には予約・受付番号・見学記録は作らない
- 営業時間 10:00〜17:00、水曜定休。予約できる時間帯は 10/11/13/14/15/16時、来場日は翌日以降

## 入力ルール
- 氏名：必須・30字以内
- 住所：必須・100字以内（市区町村まででも可）
- 電話番号：必須・半角数字10〜11桁（ハイフンなし）
- 予約画面：見たい棟 1棟以上必須、来場日・時間帯必須、建築区分・建築時期は必須、建築予定地（50字以内）・来場動機は任意
- 顧客登録・顧客詳細の編集：アンケート4項目はすべて任意
- 選択肢
  - 建築区分：新築／リフォーム／建て替え
  - 建築時期：半年以内／1年以内／2年以内／未定
  - 来場動機：チラシ／Web／SNS／紹介／通りがかり／その他

## 8社のモデルハウス（No.・会社名・住宅名・ブランドカラー）
1. 杜匠ホーム「杜の縁側の家」#7A5C3E
2. イワクラ建設「URBAN SHELTER 3」#4A5560
3. ユニテクト住宅「ENE-BOX」#2F6E8F
4. サーモアーク「ぬくもりBOX 07」#C0533A
5. スパンワークス「GARAGE LOFT」#1F1F1F
6. 白土工房「しろつちの家」#9A8A6A
7. ノルドリーフ「Hygge Hus」#5E7D74
8. コトリエホーム「ひらやの小箱 26」#D49A3A
（すべて架空の会社。間取り図は文字なしPNGを用意済み）

## 配色
- ネイビー #2E3A46（ヘッダー・文字）／ オレンジ #F07A1E（ボタン・アクセント、hover #E06A10、薄い色 #FFF1E6、薄い色の上の文字 #8A3E08）
- 背景 #FAFAF8、線 #E6E2DA、本文 #2B2A27、補足文字 #6B665E、エラー #D32F2F、成功 #2E7D32

## 進め方のお願い
- 学習中なので、コードは理由も短く説明しながら進める
- 説明は日本語で、専門用語はかみくだいて
