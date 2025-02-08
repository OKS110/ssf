import json
import mysql.connector

# MySQL 연결 설정
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="mysql1234",
    database="shopping_mall"
)
cursor = db.cursor()

# JSON 데이터 (예제)
json_data = """
[
    {
        "id": 1,
        "username": "kqrd15",
        "email": "kqrd15@naver.com",
        "phone": "010-8848-6561",
        "name": "박세영",
        "password": "iezaY1WM",
        "address": "울산광역시 남구 삼산로 58",
        "additional_address": null,
        "birth_date": "1986-05-18",
        "status": [
            "Active"
        ],
        "gender": [
            "여"
        ],
        "membership_level": "Silver",
        "loyalty_points": 4538,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 2,
        "username": "qdkj98",
        "email": "qdkj98@naver.com",
        "phone": "010-2174-7582",
        "name": "조윤아",
        "password": "ChGfNSHK",
        "address": "대전광역시 유성구 대학로 25",
        "additional_address": null,
        "birth_date": "1999-08-24",
        "status": [
            "Active"
        ],
        "gender": [
            "남"
        ],
        "membership_level": "Platinum",
        "loyalty_points": 1829,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 3,
        "username": "ccds26",
        "email": "ccds26@daum.com",
        "phone": "010-8740-6222",
        "name": "이준호",
        "password": "3NOMQ0Js",
        "address": "인천광역시 남동구 구월로 67",
        "additional_address": null,
        "birth_date": "1983-07-19",
        "status": [
            "Active"
        ],
        "gender": [
            "여"
        ],
        "membership_level": "Bronze",
        "loyalty_points": 1695,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 4,
        "username": "nzbw00",
        "email": "nzbw00@google.com",
        "phone": "010-4562-1933",
        "name": "강동원",
        "password": "Pop4F6a4",
        "address": "대구광역시 중구 중앙대로 12",
        "additional_address": null,
        "birth_date": "1990-04-08",
        "status": [
            "Active"
        ],
        "gender": [
            "여"
        ],
        "membership_level": "Gold",
        "loyalty_points": 183,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 5,
        "username": "upfw90",
        "email": "upfw90@google.com",
        "phone": "010-2830-8929",
        "name": "정우성",
        "password": "3JzdE9ha",
        "address": "부산광역시 해운대구 센텀중앙로 45",
        "additional_address": null,
        "birth_date": "1991-09-24",
        "status": [
            "Active"
        ],
        "gender": [
            "여"
        ],
        "membership_level": "Bronze",
        "loyalty_points": 309,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 6,
        "username": "nacg22",
        "email": "nacg22@daum.com",
        "phone": "010-7391-6612",
        "name": "이준호",
        "password": "kid3oeaP",
        "address": "대전광역시 유성구 대학로 25",
        "additional_address": null,
        "birth_date": "1999-01-19",
        "status": [
            "Active"
        ],
        "gender": [
            "남"
        ],
        "membership_level": "Platinum",
        "loyalty_points": 4629,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 7,
        "username": "oxaz51",
        "email": "oxaz51@naver.com",
        "phone": "010-4475-7430",
        "name": "박지훈",
        "password": "we2UXAYd",
        "address": "경기도 수원시 팔달구 인계로 99",
        "additional_address": null,
        "birth_date": "2004-11-09",
        "status": [
            "Active"
        ],
        "gender": [
            "남"
        ],
        "membership_level": "Bronze",
        "loyalty_points": 4595,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 8,
        "username": "zwvq52",
        "email": "zwvq52@google.com",
        "phone": "010-3808-4001",
        "name": "정우성",
        "password": "Bxhyhn4e",
        "address": "서울특별시 강남구 테헤란로 123",
        "additional_address": null,
        "birth_date": "1994-09-26",
        "status": [
            "Active"
        ],
        "gender": [
            "남"
        ],
        "membership_level": "Silver",
        "loyalty_points": 3511,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 9,
        "username": "ugcc96",
        "email": "ugcc96@daum.com",
        "phone": "010-5898-3694",
        "name": "최서연",
        "password": "LQCtQGIc",
        "address": "전라남도 목포시 영산로 77",
        "additional_address": null,
        "birth_date": "1986-09-27",
        "status": [
            "Active"
        ],
        "gender": [
            "여"
        ],
        "membership_level": "Gold",
        "loyalty_points": 627,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 10,
        "username": "scod12",
        "email": "scod12@daum.com",
        "phone": "010-5853-7667",
        "name": "조윤아",
        "password": "ZXXrVTUo",
        "address": "대구광역시 중구 중앙대로 12",
        "additional_address": null,
        "birth_date": "2004-03-19",
        "status": [
            "Active"
        ],
        "gender": [
            "여"
        ],
        "membership_level": "Gold",
        "loyalty_points": 2282,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 11,
        "username": "xuiz16",
        "email": "xuiz16@naver.com",
        "phone": "010-6757-7682",
        "name": "한지민",
        "password": "v0DAjIDn",
        "address": "전라남도 목포시 영산로 77",
        "additional_address": null,
        "birth_date": "1994-02-22",
        "status": [
            "Active"
        ],
        "gender": [
            "여"
        ],
        "membership_level": "Gold",
        "loyalty_points": 2381,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 12,
        "username": "qqpb06",
        "email": "qqpb06@google.com",
        "phone": "010-5543-1540",
        "name": "조윤아",
        "password": "D4JaepGx",
        "address": "광주광역시 서구 상무대로 85",
        "additional_address": null,
        "birth_date": "1987-03-21",
        "status": [
            "Active"
        ],
        "gender": [
            "남"
        ],
        "membership_level": "Bronze",
        "loyalty_points": 127,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 13,
        "username": "yrai14",
        "email": "yrai14@google.com",
        "phone": "010-4096-6076",
        "name": "정우성",
        "password": "iEvO03Sd",
        "address": "인천광역시 남동구 구월로 67",
        "additional_address": null,
        "birth_date": "1983-05-21",
        "status": [
            "Active"
        ],
        "gender": [
            "남"
        ],
        "membership_level": "Platinum",
        "loyalty_points": 1115,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 14,
        "username": "khyt07",
        "email": "khyt07@google.com",
        "phone": "010-6223-8690",
        "name": "한지민",
        "password": "Xvl1aPd9",
        "address": "대구광역시 중구 중앙대로 12",
        "additional_address": null,
        "birth_date": "1983-06-23",
        "status": [
            "Active"
        ],
        "gender": [
            "남"
        ],
        "membership_level": "Silver",
        "loyalty_points": 1772,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 15,
        "username": "uexf56",
        "email": "uexf56@naver.com",
        "phone": "010-9482-1640",
        "name": "조윤아",
        "password": "kCbD2f4c",
        "address": "전라남도 목포시 영산로 77",
        "additional_address": null,
        "birth_date": "1986-06-28",
        "status": [
            "Active"
        ],
        "gender": [
            "여"
        ],
        "membership_level": "Platinum",
        "loyalty_points": 1546,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 16,
        "username": "rwsi43",
        "email": "rwsi43@google.com",
        "phone": "010-8336-9803",
        "name": "조윤아",
        "password": "u6lBQ0Qz",
        "address": "대구광역시 중구 중앙대로 12",
        "additional_address": null,
        "birth_date": "1989-02-22",
        "status": [
            "Active"
        ],
        "gender": [
            "남"
        ],
        "membership_level": "Gold",
        "loyalty_points": 2667,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 17,
        "username": "dfsd24",
        "email": "dfsd24@daum.com",
        "phone": "010-5131-1572",
        "name": "강동원",
        "password": "vYifcu8B",
        "address": "대전광역시 유성구 대학로 25",
        "additional_address": null,
        "birth_date": "1994-10-15",
        "status": [
            "Active"
        ],
        "gender": [
            "남"
        ],
        "membership_level": "Gold",
        "loyalty_points": 1153,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 18,
        "username": "fzcg38",
        "email": "fzcg38@google.com",
        "phone": "010-1857-7452",
        "name": "이준호",
        "password": "L62gbjAR",
        "address": "서울특별시 강남구 테헤란로 123",
        "additional_address": null,
        "birth_date": "1999-07-18",
        "status": [
            "Active"
        ],
        "gender": [
            "남"
        ],
        "membership_level": "Bronze",
        "loyalty_points": 4852,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 19,
        "username": "iihh38",
        "email": "iihh38@daum.com",
        "phone": "010-4773-3167",
        "name": "최서연",
        "password": "WyD3ZuiA",
        "address": "울산광역시 남구 삼산로 58",
        "additional_address": null,
        "birth_date": "1982-11-06",
        "status": [
            "Active"
        ],
        "gender": [
            "여"
        ],
        "membership_level": "Platinum",
        "loyalty_points": 731,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 20,
        "username": "yhjn25",
        "email": "yhjn25@naver.com",
        "phone": "010-3268-7452",
        "name": "최서연",
        "password": "34wQo5y8",
        "address": "충청북도 청주시 상당구 상당로 110",
        "additional_address": null,
        "birth_date": "1996-11-20",
        "status": [
            "Active"
        ],
        "gender": [
            "남"
        ],
        "membership_level": "Bronze",
        "loyalty_points": 1939,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 21,
        "username": "dzem64",
        "email": "dzem64@daum.com",
        "phone": "010-9764-6110",
        "name": "박세영",
        "password": "8ZXSkH1h",
        "address": "대전광역시 유성구 대학로 25",
        "additional_address": null,
        "birth_date": "1989-04-06",
        "status": [
            "Active"
        ],
        "gender": [
            "남"
        ],
        "membership_level": "Silver",
        "loyalty_points": 2544,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 22,
        "username": "cred51",
        "email": "cred51@daum.com",
        "phone": "010-8361-5810",
        "name": "한지민",
        "password": "vkR0ADhW",
        "address": "부산광역시 해운대구 센텀중앙로 45",
        "additional_address": null,
        "birth_date": "1990-07-02",
        "status": [
            "Active"
        ],
        "gender": [
            "남"
        ],
        "membership_level": "Gold",
        "loyalty_points": 737,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 23,
        "username": "bzkk70",
        "email": "bzkk70@google.com",
        "phone": "010-8516-2711",
        "name": "이영희",
        "password": "2DQthlGA",
        "address": "전라남도 목포시 영산로 77",
        "additional_address": null,
        "birth_date": "1980-03-02",
        "status": [
            "Active"
        ],
        "gender": [
            "여"
        ],
        "membership_level": "Silver",
        "loyalty_points": 3980,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 24,
        "username": "rxwy37",
        "email": "rxwy37@naver.com",
        "phone": "010-6858-4455",
        "name": "정우성",
        "password": "0Rk2Rdfo",
        "address": "대전광역시 유성구 대학로 25",
        "additional_address": null,
        "birth_date": "1990-08-02",
        "status": [
            "Active"
        ],
        "gender": [
            "남"
        ],
        "membership_level": "Silver",
        "loyalty_points": 2455,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 25,
        "username": "ljrg07",
        "email": "ljrg07@google.com",
        "phone": "010-9466-6691",
        "name": "이영희",
        "password": "oIMfHHZJ",
        "address": "울산광역시 남구 삼산로 58",
        "additional_address": null,
        "birth_date": "1986-07-25",
        "status": [
            "Active"
        ],
        "gender": [
            "여"
        ],
        "membership_level": "Silver",
        "loyalty_points": 2193,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 26,
        "username": "posu13",
        "email": "posu13@daum.com",
        "phone": "010-7710-9077",
        "name": "정우성",
        "password": "oW81CDg6",
        "address": "대전광역시 유성구 대학로 25",
        "additional_address": null,
        "birth_date": "2002-03-01",
        "status": [
            "Active"
        ],
        "gender": [
            "남"
        ],
        "membership_level": "Silver",
        "loyalty_points": 172,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 27,
        "username": "iuhg24",
        "email": "iuhg24@naver.com",
        "phone": "010-7551-7459",
        "name": "강동원",
        "password": "0qR6Dqxk",
        "address": "대전광역시 유성구 대학로 25",
        "additional_address": null,
        "birth_date": "2005-05-22",
        "status": [
            "Active"
        ],
        "gender": [
            "남"
        ],
        "membership_level": "Bronze",
        "loyalty_points": 2397,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 28,
        "username": "cbvw24",
        "email": "cbvw24@daum.com",
        "phone": "010-1707-8371",
        "name": "조윤아",
        "password": "j2RRJTSI",
        "address": "경기도 수원시 팔달구 인계로 99",
        "additional_address": null,
        "birth_date": "1983-06-11",
        "status": [
            "Active"
        ],
        "gender": [
            "남"
        ],
        "membership_level": "Silver",
        "loyalty_points": 2290,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 29,
        "username": "kjli87",
        "email": "kjli87@google.com",
        "phone": "010-9359-6655",
        "name": "최서연",
        "password": "3v0smNT9",
        "address": "충청북도 청주시 상당구 상당로 110",
        "additional_address": null,
        "birth_date": "1995-01-11",
        "status": [
            "Active"
        ],
        "gender": [
            "여"
        ],
        "membership_level": "Silver",
        "loyalty_points": 807,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 30,
        "username": "qudo34",
        "email": "qudo34@google.com",
        "phone": "010-3797-5951",
        "name": "이영희",
        "password": "GGVKyZHo",
        "address": "전라남도 목포시 영산로 77",
        "additional_address": null,
        "birth_date": "1984-06-10",
        "status": [
            "Active"
        ],
        "gender": [
            "남"
        ],
        "membership_level": "Silver",
        "loyalty_points": 2094,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 31,
        "username": "pepc93",
        "email": "pepc93@naver.com",
        "phone": "010-4097-8471",
        "name": "정우성",
        "password": "pvk2BiJa",
        "address": "광주광역시 서구 상무대로 85",
        "additional_address": null,
        "birth_date": "1992-10-26",
        "status": [
            "Active"
        ],
        "gender": [
            "남"
        ],
        "membership_level": "Gold",
        "loyalty_points": 1382,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 32,
        "username": "rgip98",
        "email": "rgip98@daum.com",
        "phone": "010-2737-4156",
        "name": "최서연",
        "password": "AS3oDypu",
        "address": "부산광역시 해운대구 센텀중앙로 45",
        "additional_address": null,
        "birth_date": "1980-08-11",
        "status": [
            "Active"
        ],
        "gender": [
            "남"
        ],
        "membership_level": "Gold",
        "loyalty_points": 1210,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 33,
        "username": "rjmg18",
        "email": "rjmg18@google.com",
        "phone": "010-8787-7240",
        "name": "최서연",
        "password": "arHHVSga",
        "address": "인천광역시 남동구 구월로 67",
        "additional_address": null,
        "birth_date": "1983-07-23",
        "status": [
            "Active"
        ],
        "gender": [
            "여"
        ],
        "membership_level": "Gold",
        "loyalty_points": 4470,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 34,
        "username": "alvg72",
        "email": "alvg72@naver.com",
        "phone": "010-1987-4694",
        "name": "조윤아",
        "password": "ThiDWLur",
        "address": "부산광역시 해운대구 센텀중앙로 45",
        "additional_address": null,
        "birth_date": "1985-11-24",
        "status": [
            "Active"
        ],
        "gender": [
            "여"
        ],
        "membership_level": "Bronze",
        "loyalty_points": 4600,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 35,
        "username": "mgmr63",
        "email": "mgmr63@naver.com",
        "phone": "010-3693-8439",
        "name": "최서연",
        "password": "wjX03NS3",
        "address": "울산광역시 남구 삼산로 58",
        "additional_address": null,
        "birth_date": "2000-04-25",
        "status": [
            "Active"
        ],
        "gender": [
            "여"
        ],
        "membership_level": "Silver",
        "loyalty_points": 914,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 36,
        "username": "fpmi21",
        "email": "fpmi21@daum.com",
        "phone": "010-2599-9188",
        "name": "최서연",
        "password": "oJv7S7zO",
        "address": "대구광역시 중구 중앙대로 12",
        "additional_address": null,
        "birth_date": "2001-03-16",
        "status": [
            "Active"
        ],
        "gender": [
            "여"
        ],
        "membership_level": "Silver",
        "loyalty_points": 3899,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 37,
        "username": "wugl86",
        "email": "wugl86@google.com",
        "phone": "010-6378-8208",
        "name": "박지훈",
        "password": "YtEzGtRZ",
        "address": "전라남도 목포시 영산로 77",
        "additional_address": null,
        "birth_date": "2005-04-20",
        "status": [
            "Active"
        ],
        "gender": [
            "남"
        ],
        "membership_level": "Gold",
        "loyalty_points": 2349,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 38,
        "username": "jffh30",
        "email": "jffh30@daum.com",
        "phone": "010-5621-8790",
        "name": "최서연",
        "password": "rXsmAkoQ",
        "address": "울산광역시 남구 삼산로 58",
        "additional_address": null,
        "birth_date": "1986-12-17",
        "status": [
            "Active"
        ],
        "gender": [
            "여"
        ],
        "membership_level": "Bronze",
        "loyalty_points": 204,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 39,
        "username": "xbsp95",
        "email": "xbsp95@naver.com",
        "phone": "010-1892-7947",
        "name": "한지민",
        "password": "PzqZ3kFm",
        "address": "경기도 수원시 팔달구 인계로 99",
        "additional_address": null,
        "birth_date": "2000-03-17",
        "status": [
            "Active"
        ],
        "gender": [
            "남"
        ],
        "membership_level": "Platinum",
        "loyalty_points": 3827,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    },
    {
        "id": 40,
        "username": "davz88",
        "email": "davz88@google.com",
        "phone": "010-7164-7413",
        "name": "이영희",
        "password": "oXX7BRzh",
        "address": "광주광역시 서구 상무대로 85",
        "additional_address": null,
        "birth_date": "2003-02-19",
        "status": [
            "Active"
        ],
        "gender": [
            "여"
        ],
        "membership_level": "Platinum",
        "loyalty_points": 4313,
        "last_login": "2025-02-07 12:39:34",
        "created_at": "2025-02-07 12:39:34",
        "updated_at": "2025-02-07 12:39:34"
    }
]
"""

# JSON 데이터 파싱
customers = json.loads(json_data)

# 고객 데이터 삽입
for customer in customers:
    cursor.execute("""
        INSERT INTO customers (
            id, username, email, phone, name, password, address, additional_address,
            birth_date, status, gender, membership_level, loyalty_points,
            last_login, created_at, updated_at
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        int(customer["id"]),
        customer["username"],
        customer["email"],
        customer["phone"],
        customer["name"],
        customer["password"],
        customer["address"],
        customer["additional_address"] if customer["additional_address"] else None,  # NULL 처리
        customer["birth_date"],
        json.dumps(customer["status"]),  # JSON 필드 변환
        json.dumps(customer["gender"]),  # JSON 필드 변환
        customer["membership_level"],
        customer["loyalty_points"],
        customer["last_login"],
        customer["created_at"],
        customer["updated_at"]
    ))

# 변경사항 저장
db.commit()

# 연결 닫기
cursor.close()
db.close()

print("고객 데이터 삽입 완료!")
