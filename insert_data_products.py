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

# JSON 데이터 (복사해서 붙여넣기)
json_data = """
[
    {
        "id": 1001,
        "category": "하의",
        "sub_category": "슬랙스",
        "name": "Feminine Ruffle Skirt",
        "color": [
            "Beige",
            "Lavender",
            "White",
            "LightBlue"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_1_2.jpg",
            "https://example.com/images/product_1_3.jpg",
            "https://example.com/images/product_1_4.jpg",
            "https://example.com/images/product_1_5.jpg",
            "https://example.com/images/product_1_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 184180,
        "discount_rate": 14,
        "discounted_price": 158394,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1002,
        "category": "아우터",
        "sub_category": "가디건",
        "name": "Chic Wool Trench Coat",
        "color": [
            "Mint",
            "Beige",
            "Ivory",
            "Pink"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_2_2.jpg",
            "https://example.com/images/product_2_3.jpg",
            "https://example.com/images/product_2_4.jpg",
            "https://example.com/images/product_2_5.jpg",
            "https://example.com/images/product_2_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 90226,
        "discount_rate": 20,
        "discounted_price": 72180,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1003,
        "category": "아우터",
        "sub_category": "숏패딩",
        "name": "Lightweight Satin Wrap Dress",
        "color": [
            "Mint",
            "White",
            "LightBlue",
            "Ivory",
            "Pink"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_3_2.jpg",
            "https://example.com/images/product_3_3.jpg",
            "https://example.com/images/product_3_4.jpg",
            "https://example.com/images/product_3_5.jpg",
            "https://example.com/images/product_3_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 106043,
        "discount_rate": 16,
        "discounted_price": 89076,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1004,
        "category": "상의",
        "sub_category": "블라우스",
        "name": "Stylish High Heel Sandals",
        "color": [
            "Ivory",
            "Mint",
            "Beige"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_4_2.jpg",
            "https://example.com/images/product_4_3.jpg",
            "https://example.com/images/product_4_4.jpg",
            "https://example.com/images/product_4_5.jpg",
            "https://example.com/images/product_4_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 177950,
        "discount_rate": 10,
        "discounted_price": 160155,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1005,
        "category": "상의",
        "sub_category": "크롭탑",
        "name": "Cozy Faux Fur Jacket",
        "color": [
            "Mint",
            "Pink",
            "Ivory"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_5_2.jpg",
            "https://example.com/images/product_5_3.jpg",
            "https://example.com/images/product_5_4.jpg",
            "https://example.com/images/product_5_5.jpg",
            "https://example.com/images/product_5_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 167732,
        "discount_rate": 24,
        "discounted_price": 127476,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1006,
        "category": "하의",
        "sub_category": "롱스커트",
        "name": "Feminine Ruffle Skirt",
        "color": [
            "Beige",
            "LightBlue",
            "White",
            "Mint",
            "Lavender"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_6_2.jpg",
            "https://example.com/images/product_6_3.jpg",
            "https://example.com/images/product_6_4.jpg",
            "https://example.com/images/product_6_5.jpg",
            "https://example.com/images/product_6_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 85923,
        "discount_rate": 19,
        "discounted_price": 69597,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1007,
        "category": "하의",
        "sub_category": "레깅스",
        "name": "Romantic Floral Midi Dress",
        "color": [
            "Beige",
            "LightBlue",
            "Mint"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_7_2.jpg",
            "https://example.com/images/product_7_3.jpg",
            "https://example.com/images/product_7_4.jpg",
            "https://example.com/images/product_7_5.jpg",
            "https://example.com/images/product_7_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 78709,
        "discount_rate": 23,
        "discounted_price": 60605,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1008,
        "category": "하의",
        "sub_category": "슬랙스",
        "name": "Trendy Pleated Mini Skirt",
        "color": [
            "LightBlue",
            "Mint",
            "Ivory"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_8_2.jpg",
            "https://example.com/images/product_8_3.jpg",
            "https://example.com/images/product_8_4.jpg",
            "https://example.com/images/product_8_5.jpg",
            "https://example.com/images/product_8_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 145754,
        "discount_rate": 19,
        "discounted_price": 118060,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1009,
        "category": "상의",
        "sub_category": "블라우스",
        "name": "Soft Cashmere Knit Sweater",
        "color": [
            "White",
            "Beige",
            "LightBlue",
            "Mint",
            "Ivory"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_9_2.jpg",
            "https://example.com/images/product_9_3.jpg",
            "https://example.com/images/product_9_4.jpg",
            "https://example.com/images/product_9_5.jpg",
            "https://example.com/images/product_9_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 141232,
        "discount_rate": 17,
        "discounted_price": 117222,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1010,
        "category": "아우터",
        "sub_category": "롱코트",
        "name": "Chic Wool Trench Coat",
        "color": [
            "Ivory",
            "White",
            "Lavender",
            "Mint"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_10_2.jpg",
            "https://example.com/images/product_10_3.jpg",
            "https://example.com/images/product_10_4.jpg",
            "https://example.com/images/product_10_5.jpg",
            "https://example.com/images/product_10_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 104844,
        "discount_rate": 20,
        "discounted_price": 83875,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1011,
        "category": "하의",
        "sub_category": "레깅스",
        "name": "Trendy Pleated Mini Skirt",
        "color": [
            "Mint",
            "Ivory",
            "LightBlue"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_11_2.jpg",
            "https://example.com/images/product_11_3.jpg",
            "https://example.com/images/product_11_4.jpg",
            "https://example.com/images/product_11_5.jpg",
            "https://example.com/images/product_11_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 96768,
        "discount_rate": 11,
        "discounted_price": 86123,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1012,
        "category": "하의",
        "sub_category": "레깅스",
        "name": "Cozy Faux Fur Jacket",
        "color": [
            "White",
            "Ivory",
            "Lavender"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_12_2.jpg",
            "https://example.com/images/product_12_3.jpg",
            "https://example.com/images/product_12_4.jpg",
            "https://example.com/images/product_12_5.jpg",
            "https://example.com/images/product_12_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 111262,
        "discount_rate": 12,
        "discounted_price": 97910,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1013,
        "category": "신발",
        "sub_category": "샌들",
        "name": "Stylish High Heel Sandals",
        "color": [
            "Beige",
            "White",
            "Lavender",
            "Pink"
        ],
        "size": [
            "230",
            "235",
            "240",
            "245",
            "250",
            "255",
            "260"
        ],
        "image": [
            "https://example.com/images/product_13_2.jpg",
            "https://example.com/images/product_13_3.jpg",
            "https://example.com/images/product_13_4.jpg",
            "https://example.com/images/product_13_5.jpg",
            "https://example.com/images/product_13_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 93955,
        "discount_rate": 21,
        "discounted_price": 74224,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1014,
        "category": "신발",
        "sub_category": "샌들",
        "name": "Elegant Lace Blouse",
        "color": [
            "LightBlue",
            "Beige",
            "Mint",
            "White"
        ],
        "size": [
            "230",
            "235",
            "240",
            "245",
            "250",
            "255",
            "260"
        ],
        "image": [
            "https://example.com/images/product_14_2.jpg",
            "https://example.com/images/product_14_3.jpg",
            "https://example.com/images/product_14_4.jpg",
            "https://example.com/images/product_14_5.jpg",
            "https://example.com/images/product_14_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 92105,
        "discount_rate": 20,
        "discounted_price": 73684,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1015,
        "category": "아우터",
        "sub_category": "가디건",
        "name": "Elegant Lace Blouse",
        "color": [
            "Lavender",
            "LightBlue",
            "Pink"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_15_2.jpg",
            "https://example.com/images/product_15_3.jpg",
            "https://example.com/images/product_15_4.jpg",
            "https://example.com/images/product_15_5.jpg",
            "https://example.com/images/product_15_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 126978,
        "discount_rate": 20,
        "discounted_price": 101582,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1016,
        "category": "하의",
        "sub_category": "슬랙스",
        "name": "Feminine Ruffle Skirt",
        "color": [
            "LightBlue",
            "White",
            "Ivory"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_16_2.jpg",
            "https://example.com/images/product_16_3.jpg",
            "https://example.com/images/product_16_4.jpg",
            "https://example.com/images/product_16_5.jpg",
            "https://example.com/images/product_16_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 70569,
        "discount_rate": 22,
        "discounted_price": 55043,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1017,
        "category": "신발",
        "sub_category": "힐",
        "name": "Chic Wool Trench Coat",
        "color": [
            "Pink",
            "Ivory",
            "Mint",
            "White",
            "Beige"
        ],
        "size": [
            "230",
            "235",
            "240",
            "245",
            "250",
            "255",
            "260"
        ],
        "image": [
            "https://example.com/images/product_17_2.jpg",
            "https://example.com/images/product_17_3.jpg",
            "https://example.com/images/product_17_4.jpg",
            "https://example.com/images/product_17_5.jpg",
            "https://example.com/images/product_17_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 164887,
        "discount_rate": 23,
        "discounted_price": 126962,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1018,
        "category": "아우터",
        "sub_category": "숏패딩",
        "name": "Casual Cotton Cardigan",
        "color": [
            "Pink",
            "Beige",
            "Ivory",
            "White",
            "LightBlue"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_18_2.jpg",
            "https://example.com/images/product_18_3.jpg",
            "https://example.com/images/product_18_4.jpg",
            "https://example.com/images/product_18_5.jpg",
            "https://example.com/images/product_18_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 198825,
        "discount_rate": 24,
        "discounted_price": 151107,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1019,
        "category": "상의",
        "sub_category": "니트",
        "name": "Stylish High Heel Sandals",
        "color": [
            "Lavender",
            "Beige",
            "LightBlue"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_19_2.jpg",
            "https://example.com/images/product_19_3.jpg",
            "https://example.com/images/product_19_4.jpg",
            "https://example.com/images/product_19_5.jpg",
            "https://example.com/images/product_19_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 78359,
        "discount_rate": 10,
        "discounted_price": 70523,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1020,
        "category": "하의",
        "sub_category": "미니스커트",
        "name": "Soft Cashmere Knit Sweater",
        "color": [
            "White",
            "Mint",
            "LightBlue",
            "Pink"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_20_2.jpg",
            "https://example.com/images/product_20_3.jpg",
            "https://example.com/images/product_20_4.jpg",
            "https://example.com/images/product_20_5.jpg",
            "https://example.com/images/product_20_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 191844,
        "discount_rate": 16,
        "discounted_price": 161148,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1021,
        "category": "신발",
        "sub_category": "샌들",
        "name": "Romantic Floral Midi Dress",
        "color": [
            "LightBlue",
            "White",
            "Beige",
            "Lavender",
            "Pink"
        ],
        "size": [
            "230",
            "235",
            "240",
            "245",
            "250",
            "255",
            "260"
        ],
        "image": [
            "https://example.com/images/product_21_2.jpg",
            "https://example.com/images/product_21_3.jpg",
            "https://example.com/images/product_21_4.jpg",
            "https://example.com/images/product_21_5.jpg",
            "https://example.com/images/product_21_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 53528,
        "discount_rate": 24,
        "discounted_price": 40681,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1022,
        "category": "상의",
        "sub_category": "니트",
        "name": "Casual Cotton Cardigan",
        "color": [
            "Lavender",
            "LightBlue",
            "Pink",
            "Ivory"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_22_2.jpg",
            "https://example.com/images/product_22_3.jpg",
            "https://example.com/images/product_22_4.jpg",
            "https://example.com/images/product_22_5.jpg",
            "https://example.com/images/product_22_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 120751,
        "discount_rate": 18,
        "discounted_price": 99015,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1023,
        "category": "상의",
        "sub_category": "크롭탑",
        "name": "Trendy Pleated Mini Skirt",
        "color": [
            "Beige",
            "Ivory",
            "Pink"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_23_2.jpg",
            "https://example.com/images/product_23_3.jpg",
            "https://example.com/images/product_23_4.jpg",
            "https://example.com/images/product_23_5.jpg",
            "https://example.com/images/product_23_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 51821,
        "discount_rate": 21,
        "discounted_price": 40938,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1024,
        "category": "상의",
        "sub_category": "크롭탑",
        "name": "Soft Cashmere Knit Sweater",
        "color": [
            "Beige",
            "Ivory",
            "LightBlue"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_24_2.jpg",
            "https://example.com/images/product_24_3.jpg",
            "https://example.com/images/product_24_4.jpg",
            "https://example.com/images/product_24_5.jpg",
            "https://example.com/images/product_24_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 78424,
        "discount_rate": 10,
        "discounted_price": 70581,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1025,
        "category": "아우터",
        "sub_category": "롱코트",
        "name": "Casual Cotton Cardigan",
        "color": [
            "Mint",
            "White",
            "LightBlue",
            "Beige"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_25_2.jpg",
            "https://example.com/images/product_25_3.jpg",
            "https://example.com/images/product_25_4.jpg",
            "https://example.com/images/product_25_5.jpg",
            "https://example.com/images/product_25_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 141536,
        "discount_rate": 18,
        "discounted_price": 116059,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1026,
        "category": "상의",
        "sub_category": "레이스 티셔츠",
        "name": "Trendy Pleated Mini Skirt",
        "color": [
            "Pink",
            "Mint",
            "Beige",
            "LightBlue",
            "Ivory"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_26_2.jpg",
            "https://example.com/images/product_26_3.jpg",
            "https://example.com/images/product_26_4.jpg",
            "https://example.com/images/product_26_5.jpg",
            "https://example.com/images/product_26_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 138784,
        "discount_rate": 11,
        "discounted_price": 123517,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1027,
        "category": "하의",
        "sub_category": "슬랙스",
        "name": "Cozy Faux Fur Jacket",
        "color": [
            "Lavender",
            "Beige",
            "LightBlue",
            "Pink",
            "White"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_27_2.jpg",
            "https://example.com/images/product_27_3.jpg",
            "https://example.com/images/product_27_4.jpg",
            "https://example.com/images/product_27_5.jpg",
            "https://example.com/images/product_27_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 96984,
        "discount_rate": 14,
        "discounted_price": 83406,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1028,
        "category": "신발",
        "sub_category": "부츠",
        "name": "Lightweight Satin Wrap Dress",
        "color": [
            "Beige",
            "Ivory",
            "LightBlue",
            "Lavender"
        ],
        "size": [
            "230",
            "235",
            "240",
            "245",
            "250",
            "255",
            "260"
        ],
        "image": [
            "https://example.com/images/product_28_2.jpg",
            "https://example.com/images/product_28_3.jpg",
            "https://example.com/images/product_28_4.jpg",
            "https://example.com/images/product_28_5.jpg",
            "https://example.com/images/product_28_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 105261,
        "discount_rate": 16,
        "discounted_price": 88419,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1029,
        "category": "상의",
        "sub_category": "블라우스",
        "name": "Chic Wool Trench Coat",
        "color": [
            "Pink",
            "LightBlue",
            "Ivory",
            "Mint",
            "White"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_29_2.jpg",
            "https://example.com/images/product_29_3.jpg",
            "https://example.com/images/product_29_4.jpg",
            "https://example.com/images/product_29_5.jpg",
            "https://example.com/images/product_29_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 167294,
        "discount_rate": 12,
        "discounted_price": 147218,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1030,
        "category": "하의",
        "sub_category": "롱스커트",
        "name": "Soft Cashmere Knit Sweater",
        "color": [
            "Ivory",
            "Pink",
            "Beige",
            "Mint"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_30_2.jpg",
            "https://example.com/images/product_30_3.jpg",
            "https://example.com/images/product_30_4.jpg",
            "https://example.com/images/product_30_5.jpg",
            "https://example.com/images/product_30_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 144236,
        "discount_rate": 25,
        "discounted_price": 108177,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1031,
        "category": "하의",
        "sub_category": "슬랙스",
        "name": "Chic Wool Trench Coat",
        "color": [
            "White",
            "Ivory",
            "Lavender"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_31_2.jpg",
            "https://example.com/images/product_31_3.jpg",
            "https://example.com/images/product_31_4.jpg",
            "https://example.com/images/product_31_5.jpg",
            "https://example.com/images/product_31_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 64349,
        "discount_rate": 19,
        "discounted_price": 52122,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1032,
        "category": "하의",
        "sub_category": "슬랙스",
        "name": "Casual Cotton Cardigan",
        "color": [
            "Beige",
            "Pink",
            "White",
            "LightBlue",
            "Mint"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_32_2.jpg",
            "https://example.com/images/product_32_3.jpg",
            "https://example.com/images/product_32_4.jpg",
            "https://example.com/images/product_32_5.jpg",
            "https://example.com/images/product_32_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 152986,
        "discount_rate": 21,
        "discounted_price": 120858,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1033,
        "category": "상의",
        "sub_category": "블라우스",
        "name": "Romantic Floral Midi Dress",
        "color": [
            "Lavender",
            "Mint",
            "Pink"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_33_2.jpg",
            "https://example.com/images/product_33_3.jpg",
            "https://example.com/images/product_33_4.jpg",
            "https://example.com/images/product_33_5.jpg",
            "https://example.com/images/product_33_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 98746,
        "discount_rate": 13,
        "discounted_price": 85909,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1034,
        "category": "신발",
        "sub_category": "플랫슈즈",
        "name": "Feminine Ruffle Skirt",
        "color": [
            "Pink",
            "Mint",
            "Lavender"
        ],
        "size": [
            "230",
            "235",
            "240",
            "245",
            "250",
            "255",
            "260"
        ],
        "image": [
            "https://example.com/images/product_34_2.jpg",
            "https://example.com/images/product_34_3.jpg",
            "https://example.com/images/product_34_4.jpg",
            "https://example.com/images/product_34_5.jpg",
            "https://example.com/images/product_34_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 182412,
        "discount_rate": 11,
        "discounted_price": 162346,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1035,
        "category": "아우터",
        "sub_category": "롱코트",
        "name": "Cozy Faux Fur Jacket",
        "color": [
            "Beige",
            "Lavender",
            "Pink",
            "Mint"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_35_2.jpg",
            "https://example.com/images/product_35_3.jpg",
            "https://example.com/images/product_35_4.jpg",
            "https://example.com/images/product_35_5.jpg",
            "https://example.com/images/product_35_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 177147,
        "discount_rate": 18,
        "discounted_price": 145260,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1036,
        "category": "신발",
        "sub_category": "샌들",
        "name": "Cozy Faux Fur Jacket",
        "color": [
            "Lavender",
            "Pink",
            "Mint"
        ],
        "size": [
            "230",
            "235",
            "240",
            "245",
            "250",
            "255",
            "260"
        ],
        "image": [
            "https://example.com/images/product_36_2.jpg",
            "https://example.com/images/product_36_3.jpg",
            "https://example.com/images/product_36_4.jpg",
            "https://example.com/images/product_36_5.jpg",
            "https://example.com/images/product_36_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 158019,
        "discount_rate": 17,
        "discounted_price": 131155,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1037,
        "category": "신발",
        "sub_category": "힐",
        "name": "Romantic Floral Midi Dress",
        "color": [
            "Mint",
            "White",
            "Ivory",
            "LightBlue",
            "Beige"
        ],
        "size": [
            "230",
            "235",
            "240",
            "245",
            "250",
            "255",
            "260"
        ],
        "image": [
            "https://example.com/images/product_37_2.jpg",
            "https://example.com/images/product_37_3.jpg",
            "https://example.com/images/product_37_4.jpg",
            "https://example.com/images/product_37_5.jpg",
            "https://example.com/images/product_37_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 117119,
        "discount_rate": 14,
        "discounted_price": 100722,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1038,
        "category": "신발",
        "sub_category": "샌들",
        "name": "Stylish High Heel Sandals",
        "color": [
            "Lavender",
            "LightBlue",
            "Beige",
            "Mint",
            "Ivory"
        ],
        "size": [
            "230",
            "235",
            "240",
            "245",
            "250",
            "255",
            "260"
        ],
        "image": [
            "https://example.com/images/product_38_2.jpg",
            "https://example.com/images/product_38_3.jpg",
            "https://example.com/images/product_38_4.jpg",
            "https://example.com/images/product_38_5.jpg",
            "https://example.com/images/product_38_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 114098,
        "discount_rate": 19,
        "discounted_price": 92419,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1039,
        "category": "아우터",
        "sub_category": "롱코트",
        "name": "Feminine Ruffle Skirt",
        "color": [
            "Lavender",
            "Mint",
            "Ivory",
            "Pink"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_39_2.jpg",
            "https://example.com/images/product_39_3.jpg",
            "https://example.com/images/product_39_4.jpg",
            "https://example.com/images/product_39_5.jpg",
            "https://example.com/images/product_39_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 140024,
        "discount_rate": 17,
        "discounted_price": 116219,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1040,
        "category": "아우터",
        "sub_category": "숏패딩",
        "name": "Stylish High Heel Sandals",
        "color": [
            "Pink",
            "Beige",
            "White"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_40_2.jpg",
            "https://example.com/images/product_40_3.jpg",
            "https://example.com/images/product_40_4.jpg",
            "https://example.com/images/product_40_5.jpg",
            "https://example.com/images/product_40_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 182459,
        "discount_rate": 13,
        "discounted_price": 158739,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1041,
        "category": "아우터",
        "sub_category": "숏패딩",
        "name": "Feminine Ruffle Skirt",
        "color": [
            "LightBlue",
            "Pink",
            "Beige",
            "White",
            "Ivory"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_41_2.jpg",
            "https://example.com/images/product_41_3.jpg",
            "https://example.com/images/product_41_4.jpg",
            "https://example.com/images/product_41_5.jpg",
            "https://example.com/images/product_41_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 194055,
        "discount_rate": 25,
        "discounted_price": 145541,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1042,
        "category": "상의",
        "sub_category": "크롭탑",
        "name": "Elegant Lace Blouse",
        "color": [
            "LightBlue",
            "White",
            "Ivory",
            "Beige"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_42_2.jpg",
            "https://example.com/images/product_42_3.jpg",
            "https://example.com/images/product_42_4.jpg",
            "https://example.com/images/product_42_5.jpg",
            "https://example.com/images/product_42_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 127041,
        "discount_rate": 21,
        "discounted_price": 100362,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1043,
        "category": "하의",
        "sub_category": "미니스커트",
        "name": "Stylish High Heel Sandals",
        "color": [
            "Mint",
            "Pink",
            "Ivory",
            "LightBlue",
            "Lavender"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_43_2.jpg",
            "https://example.com/images/product_43_3.jpg",
            "https://example.com/images/product_43_4.jpg",
            "https://example.com/images/product_43_5.jpg",
            "https://example.com/images/product_43_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 101806,
        "discount_rate": 19,
        "discounted_price": 82462,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1044,
        "category": "신발",
        "sub_category": "플랫슈즈",
        "name": "Elegant Lace Blouse",
        "color": [
            "White",
            "Beige",
            "Lavender",
            "Mint"
        ],
        "size": [
            "230",
            "235",
            "240",
            "245",
            "250",
            "255",
            "260"
        ],
        "image": [
            "https://example.com/images/product_44_2.jpg",
            "https://example.com/images/product_44_3.jpg",
            "https://example.com/images/product_44_4.jpg",
            "https://example.com/images/product_44_5.jpg",
            "https://example.com/images/product_44_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 107356,
        "discount_rate": 18,
        "discounted_price": 88031,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1045,
        "category": "아우터",
        "sub_category": "트렌치코트",
        "name": "Elegant Lace Blouse",
        "color": [
            "White",
            "Lavender",
            "LightBlue",
            "Mint",
            "Beige"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_45_2.jpg",
            "https://example.com/images/product_45_3.jpg",
            "https://example.com/images/product_45_4.jpg",
            "https://example.com/images/product_45_5.jpg",
            "https://example.com/images/product_45_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 193742,
        "discount_rate": 19,
        "discounted_price": 156931,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1046,
        "category": "하의",
        "sub_category": "롱스커트",
        "name": "Elegant Lace Blouse",
        "color": [
            "Lavender",
            "Pink",
            "LightBlue"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_46_2.jpg",
            "https://example.com/images/product_46_3.jpg",
            "https://example.com/images/product_46_4.jpg",
            "https://example.com/images/product_46_5.jpg",
            "https://example.com/images/product_46_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 142980,
        "discount_rate": 11,
        "discounted_price": 127252,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1047,
        "category": "신발",
        "sub_category": "힐",
        "name": "Feminine Ruffle Skirt",
        "color": [
            "LightBlue",
            "Pink",
            "Ivory"
        ],
        "size": [
            "230",
            "235",
            "240",
            "245",
            "250",
            "255",
            "260"
        ],
        "image": [
            "https://example.com/images/product_47_2.jpg",
            "https://example.com/images/product_47_3.jpg",
            "https://example.com/images/product_47_4.jpg",
            "https://example.com/images/product_47_5.jpg",
            "https://example.com/images/product_47_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 90049,
        "discount_rate": 16,
        "discounted_price": 75641,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1048,
        "category": "아우터",
        "sub_category": "롱코트",
        "name": "Soft Cashmere Knit Sweater",
        "color": [
            "Beige",
            "LightBlue",
            "Lavender",
            "White",
            "Pink"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_48_2.jpg",
            "https://example.com/images/product_48_3.jpg",
            "https://example.com/images/product_48_4.jpg",
            "https://example.com/images/product_48_5.jpg",
            "https://example.com/images/product_48_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 118784,
        "discount_rate": 25,
        "discounted_price": 89088,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1049,
        "category": "하의",
        "sub_category": "슬랙스",
        "name": "Elegant Lace Blouse",
        "color": [
            "Pink",
            "White",
            "Mint",
            "Lavender",
            "Ivory"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_49_2.jpg",
            "https://example.com/images/product_49_3.jpg",
            "https://example.com/images/product_49_4.jpg",
            "https://example.com/images/product_49_5.jpg",
            "https://example.com/images/product_49_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 149824,
        "discount_rate": 18,
        "discounted_price": 122855,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    },
    {
        "id": 1050,
        "category": "하의",
        "sub_category": "레깅스",
        "name": "Cozy Faux Fur Jacket",
        "color": [
            "Lavender",
            "Mint",
            "White",
            "LightBlue",
            "Pink"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://example.com/images/product_50_2.jpg",
            "https://example.com/images/product_50_3.jpg",
            "https://example.com/images/product_50_4.jpg",
            "https://example.com/images/product_50_5.jpg",
            "https://example.com/images/product_50_6.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": 0.0,
        "stock": 50,
        "original_price": 136683,
        "discount_rate": 25,
        "discounted_price": 102512,
        "created_at": "2025-02-07 12:12:30",
        "updated_at": "2025-02-07 12:12:30"
    }
]
"""

# JSON 파싱
products = json.loads(json_data, strict=False)  # JSON 제어 문자 허용

# 중복 방지를 위한 세트
existing_product_ids = set()

# 상품 데이터 삽입
for product in products:
    product_id = int(product["id"])  # ID를 정수로 변환

    # 중복된 product_id 방지
    if product_id in existing_product_ids:
        continue  # 중복이면 삽입하지 않음

    # 중복이 없으면 추가
    existing_product_ids.add(product_id)

    cursor.execute("""
        INSERT INTO products (
            id, category, sub_category, name, color, size, image, likes, cart_count, star, 
            stock, original_price, discount_rate, discounted_price, created_at, updated_at
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        product_id, 
        product["category"], 
        product["sub_category"], 
        product["name"], 
        json.dumps(product["color"]),  # JSON 저장
        json.dumps(product["size"]),   # JSON 저장
        json.dumps(product["image"]),  # JSON 저장
        product["likes"], 
        product["cart_count"], 
        product["star"], 
        product["stock"], 
        product["original_price"], 
        product["discount_rate"], 
        product["discounted_price"], 
        product["created_at"], 
        product["updated_at"]
    ))

# 변경사항 저장
db.commit()

# 연결 닫기
cursor.close()
db.close()

print("상품 데이터 삽입 완료! ✅")
