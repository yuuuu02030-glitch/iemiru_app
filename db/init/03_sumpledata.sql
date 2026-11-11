-- 動作確認用のサンプルデータ（架空の人物です)

INSERT INTO customers(name, address, phone, build_type, build_timing, build_area, visit_reason)
    VALUES('山田太郎', '岩手県奥州市', '11122223333', '新築', '1年以内', '奥州市 水沢方面', 'Web'),
          ('菊池花子', '岩手県盛岡市', '22233334444', '建て替え', '半年以内', NULL, NULL),
          ('佐藤二朗', '岩手県花巻市', '44455556666', NULL, NULL, NULL, NULL);
          
INSERT INTO reservations(reception_no, customer_id, visit_datetime)
    VALUES('1112-653', 1, '2026-11-12 13:00:00'),
          ('1112-887', 2, '2026-11-12 13:00:00');

INSERT INTO visit_records(reservation_id, house_id, wish, visited, favorite)
    VALUES(1, 1, TRUE, TRUE, FALSE),
          (1, 2, FALSE, FALSE, FALSE),
          (1, 3, FALSE, FALSE, FALSE),
          (1, 4, TRUE, TRUE, FALSE),
          (1, 5, TRUE, TRUE, TRUE),
          (1, 6, FALSE, FALSE, FALSE),
          (1, 7, FALSE, TRUE, TRUE),
          (1, 8, FALSE, FALSE, FALSE),

          (2, 1, FALSE, FALSE, FALSE),
          (2, 2, TRUE, FALSE, FALSE),
          (2, 3, FALSE, FALSE, FALSE),
          (2, 4, FALSE, FALSE, FALSE),
          (2, 5, TRUE, FALSE, FALSE),
          (2, 6, FALSE, FALSE, FALSE),
          (2, 7, TRUE, FALSE, FALSE),
          (2, 8, FALSE, FALSE, FALSE);