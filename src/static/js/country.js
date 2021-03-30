// *** 国家控件 ***
const airports = [{
	"id": "AD",
	"cityname": "安道尔共和国",
	"ids": "Andorra"
}, {
	"id": "AE",
	"cityname": "阿拉伯联合酋长国",
	"ids": "United Arab Emirates"
}, {
	"id": "AF",
	"cityname": "阿富汗",
	"ids": "Afghanistan"
}, {
	"id": "AG",
	"cityname": "安提瓜和巴布达",
	"ids": "Antigua and Barbuda"
}, {
	"id": "AI",
	"cityname": "安圭拉岛",
	"ids": "Anguilla"
}, {
	"id": "AL",
	"cityname": "阿尔巴尼亚",
	"ids": "Albania"
}, {
	"id": "AM",
	"cityname": "亚美尼亚",
	"ids": "Armenia"
}, {
	"id": "AO",
	"cityname": "安哥拉",
	"ids": "Angola"
}, {
	"id": "AR",
	"cityname": "阿根廷",
	"ids": "Argentina"
}, {
	"id": "AT",
	"cityname": "奥地利",
	"ids": "Austria"
}, {
	"id": "AU",
	"cityname": "澳大利亚",
	"ids": "Australia"
}, {
	"id": "AZ",
	"cityname": "阿塞拜疆",
	"ids": "Azerbaijan"
}, {
	"id": "BB",
	"cityname": "巴巴多斯",
	"ids": "Barbados"
}, {
	"id": "BD",
	"cityname": "孟加拉国",
	"ids": "Bangladesh"
}, {
	"id": "BE",
	"cityname": "比利时",
	"ids": "Belgium"
}, {
	"id": "BF",
	"cityname": "布基纳法索",
	"ids": "Burkina-faso"
}, {
	"id": "BG",
	"cityname": "保加利亚",
	"ids": "Bulgaria"
}, {
	"id": "BH",
	"cityname": "巴林",
	"ids": "Bahrain"
}, {
	"id": "BI",
	"cityname": "布隆迪",
	"ids": "Burundi"
}, {
	"id": "BJ",
	"cityname": "贝宁",
	"ids": "Benin"
}, {
	"id": "BL",
	"cityname": "巴勒斯坦",
	"ids": "Palestine"
}, {
	"id": "BM",
	"cityname": "百慕大群岛",
	"ids": "Bermuda Is."
}, {
	"id": "BN",
	"cityname": "文莱",
	"ids": "Brunei"
}, {
	"id": "BO",
	"cityname": "玻利维亚",
	"ids": "Bolivia"
}, {
	"id": "BR",
	"cityname": "巴西",
	"ids": "Brazil"
}, {
	"id": "BS",
	"cityname": "巴哈马",
	"ids": "Bahamas"
}, {
	"id": "BW",
	"cityname": "博茨瓦纳",
	"ids": "Botswana"
}, {
	"id": "BY",
	"cityname": "白俄罗斯",
	"ids": "Belarus"
}, {
	"id": "BZ",
	"cityname": "伯利兹",
	"ids": "Belize"
}, {
	"id": "CA",
	"cityname": "加拿大",
	"ids": "Canada"
}, {
	"id": "CF",
	"cityname": "中非共和国",
	"ids": "Central African Republic"
}, {
	"id": "CG",
	"cityname": "刚果",
	"ids": "Congo"
}, {
	"id": "CH",
	"cityname": "瑞士",
	"ids": "Switzerland"
}, {
	"id": "CK",
	"cityname": "库克群岛",
	"ids": "Cook Is"
}, {
	"id": "CL",
	"cityname": "智利",
	"ids": "Chile"
}, {
	"id": "CM",
	"cityname": "喀麦隆",
	"ids": "Cameroon"
}, {
	"id": "CN",
	"cityname": "中国",
	"ids": "China"
}, {
	"id": "CO",
	"cityname": "哥伦比亚",
	"ids": "Colombia"
}, {
	"id": "CR",
	"cityname": "哥斯达黎加",
	"ids": "Costa Rica"
}, {
	"id": "CU",
	"cityname": "古巴",
	"ids": "Cuba"
}, {
	"id": "CY",
	"cityname": "塞浦路斯",
	"ids": "Cyprus"
}, {
	"id": "CZ",
	"cityname": "捷克",
	"ids": "Czech Republic"
}, {
	"id": "DE",
	"cityname": "德国",
	"ids": "Germany"
}, {
	"id": "DJ",
	"cityname": "吉布提",
	"ids": "Djibouti"
}, {
	"id": "DK",
	"cityname": "丹麦",
	"ids": "Denmark"
}, {
	"id": "DO",
	"cityname": "多米尼加共和国",
	"ids": "Dominica Rep."
}, {
	"id": "DZ",
	"cityname": "阿尔及利亚",
	"ids": "Algeria"
}, {
	"id": "EC",
	"cityname": "厄瓜多尔",
	"ids": "Ecuador"
}, {
	"id": "EE",
	"cityname": "爱沙尼亚",
	"ids": "Estonia"
}, {
	"id": "EG",
	"cityname": "埃及",
	"ids": "Egypt"
}, {
	"id": "ES",
	"cityname": "西班牙",
	"ids": "Spain"
}, {
	"id": "ET",
	"cityname": "埃塞俄比亚",
	"ids": "Ethiopia"
}, {
	"id": "FI",
	"cityname": "芬兰",
	"ids": "Finland"
}, {
	"id": "FJ",
	"cityname": "斐济",
	"ids": "Fiji"
}, {
	"id": "FR",
	"cityname": "法国",
	"ids": "France"
}, {
	"id": "GA",
	"cityname": "加蓬",
	"ids": "Gabon"
}, {
	"id": "GB",
	"cityname": "英国",
	"ids": "United Kiongdom"
}, {
	"id": "GD",
	"cityname": "格林纳达",
	"ids": "Grenada"
}, {
	"id": "GE",
	"cityname": "格鲁吉亚",
	"ids": "Georgia"
}, {
	"id": "GF",
	"cityname": "法属圭亚那",
	"ids": "French Guiana"
}, {
	"id": "GH",
	"cityname": "加纳",
	"ids": "Ghana"
}, {
	"id": "GI",
	"cityname": "直布罗陀",
	"ids": "Gibraltar"
}, {
	"id": "GM",
	"cityname": "冈比亚",
	"ids": "Gambia"
}, {
	"id": "GN",
	"cityname": "几内亚",
	"ids": "Guinea"
}, {
	"id": "GR",
	"cityname": "希腊",
	"ids": "Greece"
}, {
	"id": "GT",
	"cityname": "危地马拉",
	"ids": "Guatemala"
}, {
	"id": "GU",
	"cityname": "关岛",
	"ids": "Guam"
}, {
	"id": "GY",
	"cityname": "圭亚那",
	"ids": "Guyana"
}, {
	"id": "HK",
	"cityname": "香港（中华人民共和国特别行政区）",
	"ids": "Hongkong"
}, {
	"id": "HN",
	"cityname": "洪都拉斯",
	"ids": "Honduras"
}, {
	"id": "HT",
	"cityname": "海地",
	"ids": "Haiti"
}, {
	"id": "HU",
	"cityname": "匈牙利",
	"ids": "Hungary"
}, {
	"id": "ID",
	"cityname": "印度尼西亚",
	"ids": "Indonesia"
}, {
	"id": "IE",
	"cityname": "爱尔兰",
	"ids": "Ireland"
}, {
	"id": "IL",
	"cityname": "以色列",
	"ids": "Israel"
}, {
	"id": "IN",
	"cityname": "印度",
	"ids": "India"
}, {
	"id": "IQ",
	"cityname": "伊拉克",
	"ids": "Iraq"
}, {
	"id": "IR",
	"cityname": "伊朗",
	"ids": "Iran"
}, {
	"id": "IS",
	"cityname": "冰岛",
	"ids": "Iceland"
}, {
	"id": "IT",
	"cityname": "意大利",
	"ids": "Italy"
}, {
	"id": "JM",
	"cityname": "牙买加",
	"ids": "Jamaica"
}, {
	"id": "JO",
	"cityname": "约旦",
	"ids": "Jordan"
}, {
	"id": "JP",
	"cityname": "日本",
	"ids": "Japan"
}, {
	"id": "KE",
	"cityname": "肯尼亚",
	"ids": "Kenya"
}, {
	"id": "KG",
	"cityname": "吉尔吉斯坦",
	"ids": "Kyrgyzstan"
}, {
	"id": "KH",
	"cityname": "柬埔寨",
	"ids": "Kampuchea (Cambodia )"
}, {
	"id": "KP",
	"cityname": "朝鲜",
	"ids": "North Korea"
}, {
	"id": "KR",
	"cityname": "韩国",
	"ids": "Korea"
}, {
	"id": "KT",
	"cityname": "科特迪瓦共和国",
	"ids": "Republic of Ivory Coast"
}, {
	"id": "KW",
	"cityname": "科威特",
	"ids": "Kuwait"
}, {
	"id": "KZ",
	"cityname": "哈萨克斯坦",
	"ids": "Kazakstan"
}, {
	"id": "LA",
	"cityname": "老挝",
	"ids": "Laos"
}, {
	"id": "LB",
	"cityname": "黎巴嫩",
	"ids": "Lebanon"
}, {
	"id": "LC",
	"cityname": "圣卢西亚",
	"ids": "St.Lucia"
}, {
	"id": "LI",
	"cityname": "列支敦士登",
	"ids": "Liechtenstein"
}, {
	"id": "LK",
	"cityname": "斯里兰卡",
	"ids": "Sri Lanka"
}, {
	"id": "LR",
	"cityname": "利比里亚",
	"ids": "Liberia"
}, {
	"id": "LS",
	"cityname": "莱索托",
	"ids": "Lesotho"
}, {
	"id": "LT",
	"cityname": "立陶宛",
	"ids": "Lithuania"
}, {
	"id": "LU",
	"cityname": "卢森堡",
	"ids": "Luxembourg"
}, {
	"id": "LV",
	"cityname": "拉脱维亚",
	"ids": "Latvia"
}, {
	"id": "LY",
	"cityname": "利比亚",
	"ids": "Libya"
}, {
	"id": "MA",
	"cityname": "摩洛哥",
	"ids": "Morocco"
}, {
	"id": "MC",
	"cityname": "摩纳哥",
	"ids": "Monaco"
}, {
	"id": "MD",
	"cityname": "摩尔多瓦",
	"ids": "Moldova, Republic of"
}, {
	"id": "MG",
	"cityname": "马达加斯加",
	"ids": "Madagascar"
}, {
	"id": "ML",
	"cityname": "马里",
	"ids": "Mali"
}, {
	"id": "MM",
	"cityname": "缅甸",
	"ids": "Burma"
}, {
	"id": "MN",
	"cityname": "蒙古",
	"ids": "Mongolia"
}, {
	"id": "MO",
	"cityname": "澳门（中华人民共和国特别行政区）",
	"ids": "Macao"
}, {
	"id": "MS",
	"cityname": "蒙特塞拉特岛",
	"ids": "Montserrat Is"
}, {
	"id": "MT",
	"cityname": "马耳他",
	"ids": "Malta"
}, {
	"id": "MU",
	"cityname": "毛里求斯",
	"ids": "Mauritius"
}, {
	"id": "MV",
	"cityname": "马尔代夫",
	"ids": "Maldives"
}, {
	"id": "MW",
	"cityname": "马拉维",
	"ids": "Malawi"
}, {
	"id": "MX",
	"cityname": "墨西哥",
	"ids": "Mexico"
}, {
	"id": "MY",
	"cityname": "马来西亚",
	"ids": "Malaysia"
}, {
	"id": "MZ",
	"cityname": "莫桑比克",
	"ids": "Mozambique"
}, {
	"id": "NA",
	"cityname": "纳米比亚",
	"ids": "Namibia"
}, {
	"id": "NE",
	"cityname": "尼日尔",
	"ids": "Niger"
}, {
	"id": "NG",
	"cityname": "尼日利亚",
	"ids": "Nigeria"
}, {
	"id": "NI",
	"cityname": "尼加拉瓜",
	"ids": "Nicaragua"
}, {
	"id": "NL",
	"cityname": "荷兰",
	"ids": "Netherlands"
}, {
	"id": "NO",
	"cityname": "挪威",
	"ids": "Norway"
}, {
	"id": "NP",
	"cityname": "尼泊尔",
	"ids": "Nepal"
}, {
	"id": "NR",
	"cityname": "瑙鲁",
	"ids": "Nauru"
}, {
	"id": "NZ",
	"cityname": "新西兰",
	"ids": "New Zealand"
}, {
	"id": "OM",
	"cityname": "阿曼",
	"ids": "Oman"
}, {
	"id": "PA",
	"cityname": "巴拿马",
	"ids": "Panama"
}, {
	"id": "PE",
	"cityname": "秘鲁",
	"ids": "Peru"
}, {
	"id": "PF",
	"cityname": "法属玻利尼西亚",
	"ids": "French Polynesia"
}, {
	"id": "PG",
	"cityname": "巴布亚新几内亚",
	"ids": "Papua New Cuinea"
}, {
	"id": "PH",
	"cityname": "菲律宾",
	"ids": "Philippines"
}, {
	"id": "PK",
	"cityname": "巴基斯坦",
	"ids": "Pakistan"
}, {
	"id": "PL",
	"cityname": "波兰",
	"ids": "Poland"
}, {
	"id": "PR",
	"cityname": "波多黎各",
	"ids": "Puerto Rico"
}, {
	"id": "PT",
	"cityname": "葡萄牙",
	"ids": "Portugal"
}, {
	"id": "PY",
	"cityname": "巴拉圭",
	"ids": "Paraguay"
}, {
	"id": "QA",
	"cityname": "卡塔尔",
	"ids": "Qatar"
}, {
	"id": "RO",
	"cityname": "罗马尼亚",
	"ids": "Romania"
}, {
	"id": "RU",
	"cityname": "俄罗斯",
	"ids": "Russia"
}, {
	"id": "SA",
	"cityname": "沙特阿拉伯",
	"ids": "Saudi Arabia"
}, {
	"id": "SB",
	"cityname": "所罗门群岛",
	"ids": "Solomon Is"
}, {
	"id": "SC",
	"cityname": "塞舌尔",
	"ids": "Seychelles"
}, {
	"id": "SD",
	"cityname": "苏丹",
	"ids": "Sudan"
}, {
	"id": "SE",
	"cityname": "瑞典",
	"ids": "Sweden"
}, {
	"id": "SG",
	"cityname": "新加坡",
	"ids": "Singapore"
}, {
	"id": "SI",
	"cityname": "斯洛文尼亚",
	"ids": "Slovenia"
}, {
	"id": "SK",
	"cityname": "斯洛伐克",
	"ids": "Slovakia"
}, {
	"id": "SL",
	"cityname": "塞拉利昂",
	"ids": "Sierra Leone"
}, {
	"id": "SM",
	"cityname": "圣马力诺",
	"ids": "San Marino"
}, {
	"id": "SN",
	"cityname": "塞内加尔",
	"ids": "Senegal"
}, {
	"id": "SO",
	"cityname": "索马里",
	"ids": "Somali"
}, {
	"id": "SR",
	"cityname": "苏里南",
	"ids": "Suriname"
}, {
	"id": "ST",
	"cityname": "圣多美和普林西比",
	"ids": "Sao Tome and Principe"
}, {
	"id": "SV",
	"cityname": "萨尔瓦多",
	"ids": "EI Salvador"
}, {
	"id": "SY",
	"cityname": "叙利亚",
	"ids": "Syria"
}, {
	"id": "SZ",
	"cityname": "斯威士兰",
	"ids": "Swaziland"
}, {
	"id": "TD",
	"cityname": "乍得",
	"ids": "Chad"
}, {
	"id": "TG",
	"cityname": "多哥",
	"ids": "Togo"
}, {
	"id": "TH",
	"cityname": "泰国",
	"ids": "Thailand"
}, {
	"id": "TJ",
	"cityname": "塔吉克斯坦",
	"ids": "Tajikstan"
}, {
	"id": "TM",
	"cityname": "土库曼斯坦",
	"ids": "Turkmenistan"
}, {
	"id": "TN",
	"cityname": "突尼斯",
	"ids": "Tunisia"
}, {
	"id": "TO",
	"cityname": "汤加",
	"ids": "Tonga"
}, {
	"id": "TR",
	"cityname": "土耳其",
	"ids": "Turkey"
}, {
	"id": "TT",
	"cityname": "特立尼达和多巴哥",
	"ids": "Trinidad and Tobago"
}, {
	"id": "TW",
	"cityname": "中国台湾省",
	"ids": "Taiwan"
}, {
	"id": "TZ",
	"cityname": "坦桑尼亚",
	"ids": "Tanzania"
}, {
	"id": "UA",
	"cityname": "乌克兰",
	"ids": "Ukraine"
}, {
	"id": "UG",
	"cityname": "乌干达",
	"ids": "Uganda"
}, {
	"id": "US",
	"cityname": "美国",
	"ids": "United States of America"
}, {
	"id": "UY",
	"cityname": "乌拉圭",
	"ids": "Uruguay"
}, {
	"id": "UZ",
	"cityname": "乌兹别克斯坦",
	"ids": "Uzbekistan"
}, {
	"id": "VC",
	"cityname": "圣文森特岛",
	"ids": "Saint Vincent"
}, {
	"id": "VE",
	"cityname": "委内瑞拉",
	"ids": "Venezuela"
}, {
	"id": "VN",
	"cityname": "越南",
	"ids": "Vietnam"
}, {
	"id": "YE",
	"cityname": "也门",
	"ids": "Yemen"
}, {
	"id": "YU",
	"cityname": "南斯拉夫",
	"ids": "Yugoslavia"
}, {
	"id": "ZA",
	"cityname": "南非",
	"ids": "South Africa"
}, {
	"id": "ZM",
	"cityname": "赞比亚",
	"ids": "Zambia"
}, {
	"id": "ZR",
	"cityname": "扎伊尔",
	"ids": "Zaire"
}, {
	"id": "ZW",
	"cityname": "津巴布韦",
	"ids": "Zimbabwe"
}]

export default airports
