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
        "category": "아우터",
        "sub_category": "코트",
        "name": "Trendy Long Wool Coat",
        "color": [
            "Navy",
            "White",
            "Red",
            "Brown",
            "Black"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/WMBR/24/09/24/GM0024092433237_0_THNAIL_ORGINL_20240930113118712.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/WMBR/24/09/24/GM0024092433237_4_THNAIL_ORGINL_20241008134129385.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/WMBR/24/09/24/GM0024092433237_5_THNAIL_ORGINL_20241008134129385.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/WMBR/24/09/24/GM0024092433237_6_THNAIL_ORGINL_20241008134129385.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/WMBR/24/09/24/GM0024092433237_7_THNAIL_ORGINL_20241008134129385.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 117204,
        "discount_rate": 13,
        "discounted_price": 101967,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "PRADA"
    },
    {
        "id": 1002,
        "category": "아우터",
        "sub_category": "코트",
        "name": "Prestige Long Wool Coat",
        "color": [
            "Navy",
            "Black",
            "White"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/11/13/GP2N24111326328_0_THNAIL_ORGINL_20241113185234182.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/11/13/GP2N24111326328_1_THNAIL_ORGINL_20241113185234182.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/11/13/GP2N24111326328_4_THNAIL_ORGINL_20241113185234182.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/11/13/GP2N24111326328_2_THNAIL_ORGINL_20241113185234182.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/11/13/GP2N24111326328_3_THNAIL_ORGINL_20241113185234182.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 145248,
        "discount_rate": 22,
        "discounted_price": 113293,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "GUCCI"
    },
    {
        "id": 1003,
        "category": "아우터",
        "sub_category": "블레이저",
        "name": "Sophisticated Sleek Office Blazer",
        "color": [
            "Red",
            "White",
            "LightGray",
            "Brown"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/HMBR/24/08/12/GM0024081257729_0_THNAIL_ORGINL_20240828124633842.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/HMBR/24/08/12/GM0024081257729_1_THNAIL_ORGINL_20240828124633842.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/HMBR/24/08/12/GM0024081257729_0_THNAIL_ORGINL_20240816153656930.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/HMBR/24/08/12/GM0024081257729_1_THNAIL_ORGINL_20240816153656930.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/HMBR/24/08/12/GM0024081257729_2_THNAIL_ORGINL_20240816153656930.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 247190,
        "discount_rate": 14,
        "discounted_price": 212583,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "GUCCI"
    },
    {
        "id": 1004,
        "category": "아우터",
        "sub_category": "재킷",
        "name": "Chic Urban Blazer",
        "color": [
            "Yellow",
            "Brown",
            "Red"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/12/26/GM0024122630607_0_THNAIL_ORGINL_20250102185057142.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/12/26/GM0024122630607_1_THNAIL_ORGINL_20250102185057142.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/12/26/GM0024122630607_2_THNAIL_ORGINL_20250102185057142.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/12/26/GM0024122630607_3_THNAIL_ORGINL_20250102185057142.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/12/26/GM0024122630607_4_THNAIL_ORGINL_20250102185057142.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 170527,
        "discount_rate": 25,
        "discounted_price": 127895,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "GUCCI"
    },
    {
        "id": 1005,
        "category": "아우터",
        "sub_category": "재킷",
        "name": "Urban Luxury Biker Jacket",
        "color": [
            "Red",
            "White",
            "Brown",
            "Yellow",
            "LightGray"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/MCBR/24/08/19/GM0024081975025_0_THNAIL_ORGINL_20241010182917297.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/MCBR/24/08/19/GM0024081975025_1_THNAIL_ORGINL_20241010182917297.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/MCBR/24/08/19/GM0024081975025_4_THNAIL_ORGINL_20241010182917297.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/MCBR/24/08/19/GM0024081975025_5_THNAIL_ORGINL_20241010182917297.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/MCBR/24/08/19/GM0024081975025_6_THNAIL_ORGINL_20241010182917297.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 210354,
        "discount_rate": 18,
        "discounted_price": 172490,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "GUCCI"
    },
    {
        "id": 1006,
        "category": "아우터",
        "sub_category": "코트",
        "name": "Chic Cashmere Wool Coat",
        "color": [
            "Brown",
            "Navy",
            "Black",
            "LightGray",
            "Red"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/11/28/GM0024112853528_0_THNAIL_ORGINL_20250122133413435.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/11/28/GM0024112853528_1_THNAIL_ORGINL_20250122133413435.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/11/28/GM0024112853528_2_THNAIL_ORGINL_20250122133413435.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/11/28/GM0024112853528_0_THNAIL_ORGINL_20241203152746575.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/11/28/GM0024112853528_1_THNAIL_ORGINL_20241203152746575.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 199155,
        "discount_rate": 20,
        "discounted_price": 159324,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "GUCCI"
    },
    {
        "id": 1007,
        "category": "아우터",
        "sub_category": "코트",
        "name": "Modern Cashmere Wool Coat",
        "color": [
            "Black",
            "Navy",
            "White",
            "Brown",
            "Red"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/HMBR/24/08/22/GM0024082224484_5_THNAIL_ORGINL_20241024151700162.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/HMBR/24/08/22/GM0024082224484_0_THNAIL_ORGINL_20240826172501683.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/HMBR/24/08/22/GM0024082224484_1_THNAIL_ORGINL_20240826172501683.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/HMBR/24/08/22/GM0024082224484_2_THNAIL_ORGINL_20240826172501683.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/HMBR/24/08/22/GM0024082224484_3_THNAIL_ORGINL_20240826172501683.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 101616,
        "discount_rate": 16,
        "discounted_price": 85357,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "PRADA"
    },
    {
        "id": 1008,
        "category": "아우터",
        "sub_category": "패딩",
        "name": "Premium Winter Quilted Jacket",
        "color": [
            "LightGray",
            "Yellow",
            "Brown",
            "Black",
            "White"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/09/30/GM0024093017052_0_THNAIL_ORGINL_20241004181233832.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/09/30/GM0024093017052_1_THNAIL_ORGINL_20241004181233832.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/09/30/GM0024093017052_5_THNAIL_ORGINL_20241004181233832.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/09/30/GM0024093017052_6_THNAIL_ORGINL_20241004181233832.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/09/30/GM0024093017052_7_THNAIL_ORGINL_20241004181233832.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 187448,
        "discount_rate": 10,
        "discounted_price": 168703,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "PRADA"
    },
    {
        "id": 1009,
        "category": "아우터",
        "sub_category": "코트",
        "name": "Metropolitan Classic Overcoat",
        "color": [
            "Red",
            "Brown",
            "Yellow",
            "LightGray",
            "White"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/MCBR/24/10/10/GM0024101037311_0_THNAIL_ORGINL_20241111191635088.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/MCBR/24/10/10/GM0024101037311_3_THNAIL_ORGINL_20241111191635088.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/MCBR/24/10/10/GM0024101037311_4_THNAIL_ORGINL_20241111191635088.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/MCBR/24/10/10/GM0024101037311_5_THNAIL_ORGINL_20241111191635088.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/MCBR/24/10/10/GM0024101037311_6_THNAIL_ORGINL_20241111191635088.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 226505,
        "discount_rate": 16,
        "discounted_price": 190264,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "PRADA"
    },
    {
        "id": 1010,
        "category": "아우터",
        "sub_category": "재킷",
        "name": "Sleek Tailored Blazer Jacket",
        "color": [
            "Red",
            "LightGray",
            "Brown",
            "Navy"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/25/01/22/GM0025012245930_0_THNAIL_ORGINL_20250131200032156.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/25/01/22/GM0025012245930_1_THNAIL_ORGINL_20250131200032156.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/25/01/22/GM0025012245930_2_THNAIL_ORGINL_20250131200032156.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/25/01/22/GM0025012245930_3_THNAIL_ORGINL_20250131200032156.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/25/01/22/GM0025012245930_5_THNAIL_ORGINL_20250131200032156.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 139381,
        "discount_rate": 11,
        "discounted_price": 124049,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "PRADA"
    },
    {
        "id": 1011,
        "category": "상의",
        "sub_category": "스웨터",
        "name": "Elegant Chic Soft Sweater",
        "color": [
            "gray",
            "Navy",
            "Red",
            "LightBeige"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://product-image.wconcept.co.kr/images/upload/board/304027593/2023111313505975.jpg",
            "https://product-image.wconcept.co.kr/images/upload/board/304027593/2023111609104766.jpg",
            "https://product-image.wconcept.co.kr/images/upload/board/304027593/2023111313510785.jpg",
            "https://product-image.wconcept.co.kr/images/upload/board/304027593/2023111313511569.jpg",
            "https://magjay.co.kr/images/j234/nt/J234FNT033_navy/J234FNT033_navy_02.jpg",
            "https://magjay.co.kr/images/j234/nt/J234FNT033_navy/J234FNT033_navy_03.jpg",
            "https://magjay.co.kr/images/j244/wconcept/J234FNT033_RD/J234FNT033_RD_06.jpg",
            "https://magjay.co.kr/images/j244/wconcept/J234FNT033_RD/J234FNT033_RD_09.jpg",
            "https://magjay.co.kr/images/j244/wconcept/J234FNT033_LB/J234FNT033_LB_05.jpg",
            "https://magjay.co.kr/images/j244/wconcept/J234FNT033_LB/J234FNT033_LB_10.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 208754,
        "discount_rate": 17,
        "discounted_price": 173265,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "PRADA"
    },
    {
        "id": 1012,
        "category": "상의",
        "sub_category": "니트",
        "name": "Timeless Sophisticated Mock Neck Knit",
        "color": [
            "IVORY",
            "Black",
            "BLUE-GREEN",
            "SNOW WHITE",
            "BROWN"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://product-image.wconcept.co.kr/productimg/image/img0/85/306161185_GL17731.jpg",
            "https://chicfox.cdn.smart-img.com/nonnnon/2024/1016/09/nt_03.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/85/306161185_add3_IF22045.jpg",
            "https://chicfox.cdn.smart-img.com/nonnnon/2024/1023/05/t_02.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/85/306161185_add4_XU93547.jpg",
            "https://chicfox.cdn.smart-img.com/nonnnon/2024/1023/10/nt1_04.jpg",
            "https://chicfox.cdn.smart-img.com/nonnnon/2024/1023/12/t_08.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/85/306161185_add5_NW71925.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/85/306161185_add6_VI66281.jpg",
            "https://chicfox.cdn.smart-img.com/nonnnon/2024/1016/08/n_04.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 179404,
        "discount_rate": 25,
        "discounted_price": 134553,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "PRADA"
    },
    {
        "id": 1013,
        "category": "상의",
        "sub_category": "스웨터",
        "name": "Avant-Garde Chic Soft Sweater",
        "color": [
            "Blue",
            "Brown",
            "Charcoal",
            "Black"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://product-image.wconcept.co.kr/productimg/image/img0/53/306240453_add2_WF16919.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/53/306240453_add3_ME95215.jpg",
            "https://leseiziemekr.cafe24.com/leseizieme/24WT/soft%20turtleneck-blue%20(4).jpg",
            "https://leseiziemekr.cafe24.com/leseizieme/24WT/soft%20turtleneck-blue%20(5).jpg",
            "https://leseiziemekr.cafe24.com/leseizieme/24WT/soft%20turtleneck-brown%20(4).jpg",
            "https://leseiziemekr.cafe24.com/leseizieme/24WT/soft%20turtleneck-brown%20(5).jpg",
            "https://leseiziemekr.cafe24.com/leseizieme/24WT/soft%20turtleneck-gray%20(2).jpg",
            "https://leseiziemekr.cafe24.com/leseizieme/24WT/soft%20turtleneck-gray%20(3).jpg",
            "https://leseiziemekr.cafe24.com/leseizieme/24WT/soft%20turtleneck-black%20(4).jpg",
            "https://leseiziemekr.cafe24.com/leseizieme/24WT/soft%20turtleneck-black%20(5).jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 288067,
        "discount_rate": 24,
        "discounted_price": 218930,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "PRADA"
    },
    {
        "id": 1014,
        "category": "상의",
        "sub_category": "티셔츠",
        "name": "Luxury Refined Urban Tee",
        "color": [
            "White",
            "Sky Blue"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://product-image.wconcept.co.kr/productimg/image/img0/76/305841276_FS15844.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/76/305841276_add1_OU22664.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/76/305841276_add3_FA29153.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/76/305841276_add4_OV64157.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/76/305841276_add5_ME39644.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/81/305841281_RL47003.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/81/305841281_add2_LM15264.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/81/305841281_add3_FP14111.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/81/305841281_add4_KU71670.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/81/305841281_add5_XB59670.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 259821,
        "discount_rate": 16,
        "discounted_price": 218249,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "BALENCIAGA"
    },
    {
        "id": 1015,
        "category": "상의",
        "sub_category": "티셔츠",
        "name": "Sophisticated Premium Graphic Tee",
        "color": [
            "White"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://product-image.wconcept.co.kr/productimg/image/img0/54/305777754_GL11677.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/54/305777754_add1_NU95107.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/54/305777754_add2_OM11706.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 286007,
        "discount_rate": 13,
        "discounted_price": 248826,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "BALENCIAGA"
    },
    {
        "id": 1016,
        "category": "상의",
        "sub_category": "블라우스",
        "name": "Prestige Minimalist Satin Blouse",
        "color": [
            "IVORY"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://product-image.wconcept.co.kr/productimg/image/img0/21/303701921_LO68944.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/21/303701921_add1_JE20959.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/21/303701921_add2_CG67812.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/21/303701921_add3_QV79137.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 240095,
        "discount_rate": 23,
        "discounted_price": 184873,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "BALENCIAGA"
    },
    {
        "id": 1017,
        "category": "상의",
        "sub_category": "블라우스",
        "name": "Metropolitan Sophisticated Silk Blouse",
        "color": [
            "Light Pink",
            "Ivory"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://product-image.wconcept.co.kr/productimg/image/img0/14/301827414_SX96035.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/14/301827414_add1_OR19041.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/14/301827414_add2_FN81588.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/14/301827414_add3_RG51747.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/14/301827414_add4_NB91074.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/14/301827414_add5_DR71637.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 292728,
        "discount_rate": 21,
        "discounted_price": 231255,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "BALENCIAGA"
    },
    {
        "id": 1018,
        "category": "상의",
        "sub_category": "셔츠",
        "name": "Chic Classic Dress Shirt",
        "color": [
            "Blue"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://product-image.wconcept.co.kr/productimg/image/img0/70/305725370_GN50238.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/70/305725370_add1_YJ57047.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/70/305725370_add2_SX25677.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 287024,
        "discount_rate": 17,
        "discounted_price": 238229,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "NIKE"
    },
    {
        "id": 1019,
        "category": "상의",
        "sub_category": "블라우스",
        "name": "Trendy Modern Flared Blouse",
        "color": [
            "Pink"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://product-image.wconcept.co.kr/productimg/image/img0/03/306219803_LN11515.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/03/306219803_add1_GN17541.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/03/306219803_add2_GN17541.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 141512,
        "discount_rate": 21,
        "discounted_price": 111794,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "NIKE"
    },
    {
        "id": 1020,
        "category": "상의",
        "sub_category": "니트",
        "name": "Sleek Luxury Wool Knit Sweater",
        "color": [
            "IVORY"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://product-image.wconcept.co.kr/productimg/image/img0/29/306155529_NP73863.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/29/306155529_add1_JA76982.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/29/306155529_add2_WI14209.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/29/306155529_add3_AA91291.jpg",
            "https://product-image.wconcept.co.kr/productimg/image/img0/29/306155529_add4_XB36622.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 146466,
        "discount_rate": 11,
        "discounted_price": 130354,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "NIKE"
    },
    {
        "id": 1021,
        "category": "상의",
        "sub_category": "니트",
        "name": "Elite Luxury Wool Knit Sweater",
        "color": [
            "Brown",
            "Navy",
            "LightGray",
            "Black"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/CGCG/25/01/16/GM0025011602857_0_THNAIL_ORGINL_20250120143623169.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/CGCG/25/01/16/GM0025011602857_1_THNAIL_ORGINL_20250120143623169.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/CGCG/25/01/16/GM0025011602857_2_THNAIL_ORGINL_20250120143623169.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/CGCG/25/01/16/GM0025011602857_3_THNAIL_ORGINL_20250120143623169.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 132137,
        "discount_rate": 16,
        "discounted_price": 110995,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "NIKE"
    },
    {
        "id": 1022,
        "category": "상의",
        "sub_category": "셔츠",
        "name": "Avant-Garde Elegant Silk Shirt",
        "color": [
            "Red",
            "Black",
            "Brown"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/25/01/14/GM0025011482635_0_THNAIL_ORGINL_20250116143629530.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/25/01/14/GM0025011482635_1_THNAIL_ORGINL_20250116143629530.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/25/01/14/GM0025011482635_2_THNAIL_ORGINL_20250116143629530.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/25/01/14/GM0025011482635_3_THNAIL_ORGINL_20250116143629530.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/25/01/14/GM0025011482635_4_THNAIL_ORGINL_20250116143629530.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 238483,
        "discount_rate": 20,
        "discounted_price": 190786,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "PUMA"
    },
    {
        "id": 1023,
        "category": "상의",
        "sub_category": "티셔츠",
        "name": "Prestige Slim-Fit Trendy Tee",
        "color": [
            "Brown",
            "Black",
            "Navy",
            "Yellow",
            "White"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/10/28/GM0024102881872_0_THNAIL_ORGINL_20241118165113022.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/10/28/GM0024102881872_1_THNAIL_ORGINL_20241118165113022.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/10/28/GM0024102881872_2_THNAIL_ORGINL_20241118165113022.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/10/28/GM0024102881872_0_THNAIL_ORGINL_20241030150903196.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/10/28/GM0024102881872_1_THNAIL_ORGINL_20241030150903196.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 150877,
        "discount_rate": 16,
        "discounted_price": 126736,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "PUMA"
    },
    {
        "id": 1024,
        "category": "상의",
        "sub_category": "티셔츠",
        "name": "Luxury Luxury Cotton Basic Tee",
        "color": [
            "Navy",
            "Black",
            "Red",
            "Brown",
            "LightGray"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/MCBR/24/12/23/GM0024122398658_0_THNAIL_ORGINL_20250110144017063.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/MCBR/24/12/23/GM0024122398658_2_THNAIL_ORGINL_20250110144017063.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/MCBR/24/12/23/GM0024122398658_4_THNAIL_ORGINL_20250110144017063.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/MCBR/24/12/23/GM0024122398658_0_THNAIL_ORGINL_20241227193508376.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/MCBR/24/12/23/GM0024122398658_1_THNAIL_ORGINL_20241227193508376.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 292051,
        "discount_rate": 18,
        "discounted_price": 239481,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "BEANPOLE"
    },
    {
        "id": 1025,
        "category": "상의",
        "sub_category": "니트",
        "name": "Metropolitan Luxury Wool Knit Sweater",
        "color": [
            "Black",
            "Yellow",
            "Red"
        ],
        "size": [
            "S",
            "M",
            "L",
            "XL"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/25/01/02/GP2N25010294589_0_THNAIL_ORGINL_20250116101553550.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/25/01/02/GP2N25010294589_1_THNAIL_ORGINL_20250103115400944.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/25/01/02/GP2N25010294589_2_THNAIL_ORGINL_20250103115400944.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/25/01/02/GP2N25010294589_3_THNAIL_ORGINL_20250103115400944.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/25/01/02/GP2N25010294589_4_THNAIL_ORGINL_20250103115400944.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 225782,
        "discount_rate": 10,
        "discounted_price": 203203,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "BEANPOLE"
    },
    {
        "id": 1026,
        "category": "하의",
        "sub_category": "조거팬츠",
        "name": "Fashionable Urban Relaxed Joggers",
        "color": [
            "LightGray",
            "White",
            "Yellow"
        ],
        "size": [
            "28",
            "30",
            "32",
            "34"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/25/02/03/GRK025020308847_0_ORGINL_20250203113958825.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/25/02/03/GRK025020308847_1_ORGINL_20250203113958825.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/25/02/03/GRK025020308847_2_ORGINL_20250203113958825.jpg"

        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 224805,
        "discount_rate": 22,
        "discounted_price": 175347,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "BEANPOLE"
    },
    {
        "id": 1027,
        "category": "하의",
        "sub_category": "스커트",
        "name": "Avant-Garde Minimalist Chic Skirt",
        "color": [
            "White",
            "Brown",
            "Black",
            "Yellow",
            "LightGray"
        ],
        "size": [
            "28",
            "30",
            "32",
            "34"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/8SBR/24/12/11/GM0024121142036_0_THNAIL_ORGINL_20241231105416614.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/8SBR/24/12/11/GM0024121142036_1_THNAIL_ORGINL_20241231105416614.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/8SBR/24/12/11/GM0024121142036_2_THNAIL_ORGINL_20241231105416614.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/8SBR/24/12/11/GM0024121142036_4_THNAIL_ORGINL_20241231105416614.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/8SBR/24/12/11/GM0024121142036_5_THNAIL_ORGINL_20241231105416614.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 219098,
        "discount_rate": 13,
        "discounted_price": 190615,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "BEANPOLE"
    },
    {
        "id": 1028,
        "category": "하의",
        "sub_category": "청바지",
        "name": "Luxury Timeless Skinny Denim Jeans",
        "color": [
            "Red",
            "Brown",
            "Black"
        ],
        "size": [
            "28",
            "30",
            "32",
            "34"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/8SBR/24/08/19/GM0024081968891_0_THNAIL_ORGINL_20240912182649129.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/8SBR/24/08/19/GM0024081968891_1_THNAIL_ORGINL_20240912182649129.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/8SBR/24/08/19/GM0024081968891_2_THNAIL_ORGINL_20240912182649129.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/8SBR/24/08/19/GM0024081968891_4_THNAIL_ORGINL_20240912182649129.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/8SBR/24/08/19/GM0024081968891_5_THNAIL_ORGINL_20240912182649129.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 274950,
        "discount_rate": 19,
        "discounted_price": 222709,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "BEANPOLE"
    },
    {
        "id": 1029,
        "category": "하의",
        "sub_category": "슬랙스",
        "name": "Sophisticated Tailored Slim-Fit Trousers",
        "color": [
            "Yellow",
            "Black",
            "LightGray",
            "Red"
        ],
        "size": [
            "28",
            "30",
            "32",
            "34"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/09/09/GRCV24090907706_0_ORGINL_20240909143837074.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/09/09/GRCV24090907706_1_ORGINL_20240909143837074.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/09/09/GRCV24090907706_2_ORGINL_20240909143837074.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/09/09/GRCV24090907706_3_ORGINL_20240909143837074.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 244226,
        "discount_rate": 22,
        "discounted_price": 190496,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "BEANPOLE"
    },
    {
        "id": 1030,
        "category": "하의",
        "sub_category": "와이드팬츠",
        "name": "Sleek Modern Relaxed Wide Pants",
        "color": [
            "White",
            "LightGray",
            "Black"
        ],
        "size": [
            "28",
            "30",
            "32",
            "34"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/12/24/GQZR24122412102_0_ORGINL_20241224125431693.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/12/24/GQZR24122412102_1_ORGINL_20241224125431693.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/12/24/GQZR24122412102_2_ORGINL_20241224125431693.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/12/24/GQZR24122412102_3_ORGINL_20241224125431693.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/12/24/GQZR24122412102_4_ORGINL_20241224125431693.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 294298,
        "discount_rate": 20,
        "discounted_price": 235438,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "ADIDAS"
    },
    {
        "id": 1031,
        "category": "하의",
        "sub_category": "와이드팬츠",
        "name": "Modern High-Waist Flowy Pants",
        "color": [
            "Red",
            "Black",
            "LightGray",
            "White"
        ],
        "size": [
            "28",
            "30",
            "32",
            "34"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/LUXR/B2/41/21/GQC9B24121856298_0_ORGINL_20241218230704735.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/LUXR/B2/41/21/GQC9B24121856298_1_ORGINL_20241218230704735.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/LUXR/B2/41/21/GQC9B24121856298_2_ORGINL_20241218230704735.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/LUXR/B2/41/21/GQC9B24121856298_3_ORGINL_20241218230704735.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 279120,
        "discount_rate": 17,
        "discounted_price": 231669,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "ADIDAS"
    },
    {
        "id": 1032,
        "category": "하의",
        "sub_category": "조거팬츠",
        "name": "Refined Casual Athletic Joggers",
        "color": [
            "Red",
            "Navy",
            "LightGray",
            "Yellow"
        ],
        "size": [
            "28",
            "30",
            "32",
            "34"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/25/01/02/GQ6425010291806_0_ORGINL_20250102131703733.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/25/01/02/GQ6425010291806_1_ORGINL_20250102131703733.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/25/01/02/GQ6425010291806_2_ORGINL_20250102131703733.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 108973,
        "discount_rate": 22,
        "discounted_price": 84998,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "ADIDAS"
    },
    {
        "id": 1033,
        "category": "하의",
        "sub_category": "청바지",
        "name": "Contemporary Premium Wide-Leg Jeans",
        "color": [
            "Navy",
            "White",
            "Brown",
            "Red",
            "Yellow"
        ],
        "size": [
            "28",
            "30",
            "32",
            "34"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/BPBR/24/12/27/GM0024122749754_0_THNAIL_ORGINL_20241231121143304.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/BPBR/24/12/27/GM0024122749754_1_THNAIL_ORGINL_20241231121143304.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/BPBR/24/12/27/GM0024122749754_2_THNAIL_ORGINL_20241231121143304.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/BPBR/24/12/27/GM0024122749754_3_THNAIL_ORGINL_20241231121143304.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/BPBR/24/12/27/GM0024122749754_4_THNAIL_ORGINL_20241231121143304.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 105692,
        "discount_rate": 24,
        "discounted_price": 80325,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "ADIDAS"
    },
    {
        "id": 1034,
        "category": "하의",
        "sub_category": "슬랙스",
        "name": "Sleek Luxury High-Waist Trousers",
        "color": [
            "Yellow",
            "LightGray",
            "Brown",
            "Black",
            "Navy"
        ],
        "size": [
            "28",
            "30",
            "32",
            "34"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/MCBR/24/12/23/GM0024122398665_0_THNAIL_ORGINL_20250206184228379.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/MCBR/24/12/23/GM0024122398665_1_THNAIL_ORGINL_20250206184228379.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/MCBR/24/12/23/GM0024122398665_2_THNAIL_ORGINL_20250206184228379.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/MCBR/24/12/23/GM0024122398665_3_THNAIL_ORGINL_20250206184228379.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/MCBR/24/12/23/GM0024122398665_5_THNAIL_ORGINL_20250206184228379.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 296666,
        "discount_rate": 10,
        "discounted_price": 266999,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "MUSINSA"
    },
    {
        "id": 1035,
        "category": "하의",
        "sub_category": "와이드팬츠",
        "name": "Minimal Luxury Palazzo Trousers",
        "color": [
            "Yellow",
            "Navy",
            "White",
            "LightGray"
        ],
        "size": [
            "28",
            "30",
            "32",
            "34"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/D2/50/12/GPFVD25012033915_0_ORGINL_20250120151338078.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/D2/50/12/GPFVD25012033915_1_ORGINL_20250120151338078.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/D2/50/12/GPFVD25012033915_2_ORGINL_20250120151338078.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/D2/50/12/GPFVD25012033915_3_ORGINL_20250120151338078.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/D2/50/12/GPFVD25012033915_4_ORGINL_20250120151338078.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 122477,
        "discount_rate": 24,
        "discounted_price": 93082,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "MUSINSA"
    },
    {
        "id": 1036,
        "category": "하의",
        "sub_category": "청바지",
        "name": "Avant-Garde Timeless Skinny Denim Jeans",
        "color": [
            "Red",
            "Navy",
            "White"
        ],
        "size": [
            "28",
            "30",
            "32",
            "34"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/07/11/GM0024071185525_0_THNAIL_ORGINL_20240913141318649.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/07/11/GM0024071185525_1_THNAIL_ORGINL_20240913141318649.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/07/11/GM0024071185525_2_THNAIL_ORGINL_20240913141318649.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/MCBR/24/07/11/GM0024071185525_0_THNAIL_ORGINL_20240712123425438.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/MCBR/24/07/11/GM0024071185525_1_THNAIL_ORGINL_20240712123425438.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 113245,
        "discount_rate": 15,
        "discounted_price": 96258,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "MUSINSA"
    },
    {
        "id": 1037,
        "category": "하의",
        "sub_category": "조거팬츠",
        "name": "Refined Urban Relaxed Joggers",
        "color": [
            "Red",
            "LightGray",
            "Navy"
        ],
        "size": [
            "28",
            "30",
            "32",
            "34"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/12/19/GRHV24121975966_0_THNAIL_ORGINL_20241219120057119.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/12/19/GRHV24121975966_1_THNAIL_ORGINL_20241219120057119.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/12/19/GRHV24121975966_2_THNAIL_ORGINL_20241219120057119.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/12/19/GRHV24121975966_11_THNAIL_ORGINL_20241219120057119.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/12/19/GRHV24121975966_12_THNAIL_ORGINL_20241219120057119.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 123553,
        "discount_rate": 14,
        "discounted_price": 106255,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "MUSINSA"
    },
    {
        "id": 1038,
        "category": "하의",
        "sub_category": "스커트",
        "name": "Sophisticated Refined Timeless Skirt",
        "color": [
            "Navy",
            "Brown",
            "Yellow",
            "Red",
            "Black"
        ],
        "size": [
            "28",
            "30",
            "32",
            "34"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/MCBR/25/01/16/GM0025011602258_0_THNAIL_ORGINL_20250122182416884.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/MCBR/25/01/16/GM0025011602258_1_THNAIL_ORGINL_20250122182416884.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/MCBR/25/01/16/GM0025011602258_2_THNAIL_ORGINL_20250122182416884.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/MCBR/25/01/16/GM0025011602258_0_THNAIL_ORGINL_20250120113805756.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/MCBR/25/01/16/GM0025011602258_1_THNAIL_ORGINL_20250120113805756.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 198799,
        "discount_rate": 21,
        "discounted_price": 157051,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "MUSINSA"
    },
    {
        "id": 1039,
        "category": "하의",
        "sub_category": "청바지",
        "name": "Sleek Premium Wide-Leg Jeans",
        "color": [
            "Brown",
            "White",
            "LightGray",
            "Navy"
        ],
        "size": [
            "28",
            "30",
            "32",
            "34"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/25/01/13/GM0025011375658_0_THNAIL_ORGINL_20250115180340574.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/25/01/13/GM0025011375658_1_THNAIL_ORGINL_20250115180340574.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/25/01/13/GM0025011375658_2_THNAIL_ORGINL_20250115180340574.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/25/01/13/GM0025011375658_3_THNAIL_ORGINL_20250115180340574.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/25/01/13/GM0025011375658_4_THNAIL_ORGINL_20250115180340574.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 204530,
        "discount_rate": 10,
        "discounted_price": 184077,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "MUSINSA"
    },
    {
        "id": 1040,
        "category": "하의",
        "sub_category": "슬랙스",
        "name": "Modern Luxury High-Waist Trousers",
        "color": [
            "Red",
            "Navy",
            "Yellow"
        ],
        "size": [
            "28",
            "30",
            "32",
            "34"
        ],
        "image": [
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/11/29/GM0024112972322_0_THNAIL_ORGINL_20250206184727215.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/11/29/GM0024112972322_1_THNAIL_ORGINL_20250206184727215.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/11/29/GM0024112972322_2_THNAIL_ORGINL_20250206184727215.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/11/29/GM0024112972322_0_THNAIL_ORGINL_20241205112242177.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/11/29/GM0024112972322_1_THNAIL_ORGINL_20241205112242177.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 267997,
        "discount_rate": 10,
        "discounted_price": 241197,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "MUSINSA"
    },
    {
        "id": 1041,
        "category": "신발",
        "sub_category": "로퍼",
        "name": "Avant-Garde Timeless Penny Loafers",
        "color": [
            "Yellow",
            "Brown",
            "Black",
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
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/WMBR/24/12/26/GM0024122631283_0_THNAIL_ORGINL_20241227151458781.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/WMBR/24/12/26/GM0024122631283_1_THNAIL_ORGINL_20241227151458781.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/WMBR/24/12/26/GM0024122631283_2_THNAIL_ORGINL_20250103194601067.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/WMBR/24/12/26/GM0024122631283_3_THNAIL_ORGINL_20250103194601067.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/WMBR/24/12/26/GM0024122631283_4_THNAIL_ORGINL_20250103194601067.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 247073,
        "discount_rate": 23,
        "discounted_price": 190246,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "MUSINSA"
    },
    {
        "id": 1042,
        "category": "신발",
        "sub_category": "부츠",
        "name": "Contemporary Modern Heeled Boots",
        "color": [
            "Black",
            "White",
            "LightGray",
            "Yellow"
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
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/11/11/GM0024111182655_0_THNAIL_ORGINL_20241112165122435.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/11/11/GM0024111182655_1_THNAIL_ORGINL_20241112165122435.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/11/11/GM0024111182655_2_THNAIL_ORGINL_20241112165122435.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/11/11/GM0024111182655_4_THNAIL_ORGINL_20241112165122435.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/11/11/GM0024111182655_6_THNAIL_ORGINL_20241112165122435.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 256737,
        "discount_rate": 17,
        "discounted_price": 213091,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "MUSINSA"
    },
    {
        "id": 1043,
        "category": "신발",
        "sub_category": "로퍼",
        "name": "Fashionable Elegant Classic Leather Loafers",
        "color": [
            "Black",
            "LightGray",
            "White",
            "Red"
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
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/12/26/GM0024122631279_0_THNAIL_ORGINL_20241226143757897.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/12/26/GM0024122631279_1_THNAIL_ORGINL_20241226143757897.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/12/26/GM0024122631279_2_THNAIL_ORGINL_20250103194628841.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/12/26/GM0024122631279_3_THNAIL_ORGINL_20250103194628841.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/12/26/GM0024122631279_4_THNAIL_ORGINL_20250103194628841.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 271749,
        "discount_rate": 18,
        "discounted_price": 222834,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "MUSINSA"
    },
    {
        "id": 1044,
        "category": "신발",
        "sub_category": "스니커즈",
        "name": "Elegant Luxury Low-Top Sneakers",
        "color": [
            "Red",
            "Brown",
            "Yellow"
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
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/LUXR/B2/41/21/GQC9B24121856946_0_ORGINL_20241218231359932.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/LUXR/B2/41/21/GQC9B24121856946_1_ORGINL_20241218231359932.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/LUXR/B2/41/21/GQC9B24121856946_2_ORGINL_20241218231359932.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 208678,
        "discount_rate": 16,
        "discounted_price": 175289,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "MUSINSA"
    },
    {
        "id": 1045,
        "category": "신발",
        "sub_category": "로퍼",
        "name": "Sleek Elegant Classic Leather Loafers",
        "color": [
            "LightGray",
            "Black",
            "Brown"
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
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/12/13/GM0024121385187_0_THNAIL_ORGINL_20250107183327317.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/12/13/GM0024121385187_1_THNAIL_ORGINL_20250107183327317.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/12/13/GM0024121385187_10_THNAIL_ORGINL_20250107183327317.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/12/13/GM0024121385187_11_THNAIL_ORGINL_20250107183327317.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/12/13/GM0024121385187_12_THNAIL_ORGINL_20250107183327317.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 140501,
        "discount_rate": 18,
        "discounted_price": 115210,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "MUSINSA"
    },
    {
        "id": 1046,
        "category": "신발",
        "sub_category": "힐",
        "name": "Premium Minimalist Pointed Heels",
        "color": [
            "Brown",
            "White",
            "Navy",
            "LightGray",
            "Yellow"
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
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/11/21/GM0024112102978_0_ORGINL_TB_20241121113923032.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/11/21/GM0024112102978_1_ORGINL_TB_20241121113923032.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/11/21/GM0024112102978_2_ORGINL_TB_20241121113923032.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/11/21/GM0024112102978_3_ORGINL_TB_20241121113923032.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 138360,
        "discount_rate": 24,
        "discounted_price": 105153,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "NIKE"
    },
    {
        "id": 1047,
        "category": "신발",
        "sub_category": "힐",
        "name": "Chic Timeless Elegant Kitten Heels",
        "color": [
            "White",
            "LightGray",
            "Yellow"
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
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/07/19/GM0024071970326_0_THNAIL_ORGINL_20240723164400153.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/07/19/GM0024071970326_1_THNAIL_ORGINL_20240723164400153.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/07/19/GM0024071970326_2_THNAIL_ORGINL_20240723164400153.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/07/19/GM0024071970326_0_THNAIL_ORGINL_20240722161842286.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/24/07/19/GM0024071970326_1_THNAIL_ORGINL_20240722161842286.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 183262,
        "discount_rate": 17,
        "discounted_price": 152107,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "BALENTINO"
    },
    {
        "id": 1048,
        "category": "신발",
        "sub_category": "샌들",
        "name": "Elegant Timeless Luxury Sandals",
        "color": [
            "Black",
            "White",
            "Red",
            "Brown"
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
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/LUXR/25/01/23/GPD125012352716_0_ORGINL_20250123093851385.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/LUXR/25/01/23/GPD125012352716_1_ORGINL_20250123093851385.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/LUXR/25/01/23/GPD125012352716_2_ORGINL_20250123093851385.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/LUXR/25/01/23/GPD125012352716_3_ORGINL_20250123093851385.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 279540,
        "discount_rate": 21,
        "discounted_price": 220836,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "BALENTINO"
    },
    {
        "id": 1049,
        "category": "신발",
        "sub_category": "로퍼",
        "name": "Minimal Timeless Penny Loafers",
        "color": [
            "Navy",
            "Yellow",
            "Red",
            "White",
            "Black"
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
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/09/10/GQK224091078481_0_ORGINL_20240910184243861.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/09/10/GQK224091078481_1_ORGINL_20240910184243861.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/09/10/GQK224091078481_2_ORGINL_20240910184243861.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/09/10/GQK224091078481_3_ORGINL_20240910184243861.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/09/10/GQK224091078481_4_ORGINL_20240910184243861.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 232027,
        "discount_rate": 14,
        "discounted_price": 199543,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "BALENTINO"
    },
    {
        "id": 1050,
        "category": "신발",
        "sub_category": "로퍼",
        "name": "Urban Timeless Penny Loafers",
        "color": [
            "White",
            "Black",
            "Yellow"
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
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/09/03/GPW924090379037_0_THNAIL_ORGINL_20240903132710361.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/09/03/GPW924090379037_1_THNAIL_ORGINL_20240903132710361.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/09/03/GPW924090379037_2_THNAIL_ORGINL_20240903132710361.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/09/03/GPW924090379037_3_THNAIL_ORGINL_20240903132710361.jpg",
            "https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ORBR/24/09/03/GPW924090379037_4_THNAIL_ORGINL_20240903132710361.jpg"
        ],
        "likes": 0,
        "cart_count": 0,
        "star": "0.0",
        "stock": 50,
        "original_price": 124074,
        "discount_rate": 18,
        "discounted_price": 101740,
        "created_at": "2025-02-07 03:12:30",
        "updated_at": "2025-02-07 03:12:30",
        "brand": "BALENTINO"
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
            pid, category, sub_category, name, color, size, image, likes, cart_count, star, 
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
