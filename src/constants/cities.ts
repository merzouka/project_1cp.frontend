export interface City {
    name: string,
    id: number,
    population: number,
    province: number,
}

export function getCityName(id: number): string | undefined {
    return cities.find((city) => city.id == id)?.name;
}

export function getCityNameId(name: string): number | undefined {
    return cities.find((city) => city.name == name)?.id;
}

export const cities: City[] = [
    {
        "id": 0,
        "name": "Algiers",
        "population": 1012973369,
        "province": 16
    },
    {
        "id": 1,
        "name": "Dar el Beida",
        "population": 1012987727,
        "province": 16
    },
    {
        "id": 2,
        "name": "Rouiba",
        "population": 1012334934,
        "province": 16
    },
    {
        "id": 3,
        "name": "El Marsa",
        "population": 1012716943,
        "province": 16
    },
    {
        "id": 4,
        "name": "Oran",
        "population": 1012126319,
        "province": 31
    },
    {
        "id": 5,
        "name": "Es Senia",
        "population": 1012779789,
        "province": 31
    },
    {
        "id": 6,
        "name": "Bettioua",
        "population": 1012337546,
        "province": 31
    },
    {
        "id": 7,
        "name": "El Ancor",
        "population": 1012598945,
        "province": 31
    },
    {
        "id": 8,
        "name": "Constantine",
        "population": 1012275076,
        "province": 25
    },
    {
        "id": 9,
        "name": "Didouche Mourad",
        "population": 1012151355,
        "province": 25
    },
    {
        "id": 10,
        "name": "Ain Abid",
        "population": 1012017837,
        "province": 25
    },
    {
        "id": 11,
        "name": "Blida",
        "population": 1012045589,
        "province": 9
    },
    {
        "id": 12,
        "name": "Boufarik",
        "population": 1012512259,
        "province": 9
    },
    {
        "id": 13,
        "name": "Souma",
        "population": 1012378735,
        "province": 9
    },
    {
        "id": 14,
        "name": "Bougara",
        "population": 1012764987,
        "province": 9
    },
    {
        "id": 15,
        "name": "Batna",
        "population": 1012093229,
        "province": 5
    },
    {
        "id": 16,
        "name": "N'Gaous",
        "population": 1012978553,
        "province": 5
    },
    {
        "id": 17,
        "name": "Setif",
        "population": 1012981116,
        "province": 19
    },
    {
        "id": 18,
        "name": "El Eulma",
        "population": 1012292620,
        "province": 19
    },
    {
        "id": 19,
        "name": "'Ain Azel",
        "population": 1012746080,
        "province": 19
    },
    {
        "id": 20,
        "name": "'Ain Arnat",
        "population": 1012453452,
        "province": 19
    },
    {
        "id": 21,
        "name": "Amoucha",
        "population": 1012766595,
        "province": 19
    },
    {
        "id": 22,
        "name": "Tala Yfassene",
        "population": 1012098651,
        "province": 19
    },
    {
        "id": 23,
        "name": "Arbaoun",
        "population": 1012971347,
        "province": 19
    },
    {
        "id": 24,
        "name": "Beni Fouda",
        "population": 1012660842,
        "province": 19
    },
    {
        "id": 25,
        "name": "'Ain Abessa",
        "population": 1012074116,
        "province": 19
    },
    {
        "id": 26,
        "name": "'Ain Roua",
        "population": 1012529757,
        "province": 19
    },
    {
        "id": 27,
        "name": "Djelfa",
        "population": 1012268984,
        "province": 17
    },
    {
        "id": 28,
        "name": "Messaad",
        "population": 1012278908,
        "province": 17
    },
    {
        "id": 29,
        "name": "Ain Oussera",
        "population": 1012469007,
        "province": 17
    },
    {
        "id": 30,
        "name": "Moudjbara",
        "population": 1012667528,
        "province": 17
    },
    {
        "id": 31,
        "name": "Annaba",
        "population": 1012600001,
        "province": 23
    },
    {
        "id": 32,
        "name": "Sidi Bel Abbes",
        "population": 1012123414,
        "province": 22
    },
    {
        "id": 33,
        "name": "Sidi Brahim",
        "population": 1012460249,
        "province": 22
    },
    {
        "id": 34,
        "name": "Biskra",
        "population": 1012947247,
        "province": 7
    },
    {
        "id": 35,
        "name": "Tebessa",
        "population": 1012196375,
        "province": 12
    },
    {
        "id": 36,
        "name": "Tiaret",
        "population": 1012785868,
        "province": 14
    },
    {
        "id": 37,
        "name": "Béjaïa",
        "population": 1012140298,
        "province": 6
    },
    {
        "id": 38,
        "name": "Akbou",
        "population": 1012950888,
        "province": 6
    },
    {
        "id": 39,
        "name": "El Kseur",
        "population": 1012893043,
        "province": 6
    },
    {
        "id": 40,
        "name": "Tizi-n-Bechar",
        "population": 1012925118,
        "province": 6
    },
    {
        "id": 41,
        "name": "Tichi",
        "population": 1012798792,
        "province": 6
    },
    {
        "id": 42,
        "name": "Toudja",
        "population": 1012114797,
        "province": 6
    },
    {
        "id": 43,
        "name": "Seddouk Oufella",
        "population": 1012348181,
        "province": 6
    },
    {
        "id": 44,
        "name": "Boukhralfa",
        "population": 1012066745,
        "province": 6
    },
    {
        "id": 45,
        "name": "Tifra",
        "population": 1012591585,
        "province": 6
    },
    {
        "id": 46,
        "name": "Amalou",
        "population": 1012045463,
        "province": 6
    },
    {
        "id": 47,
        "name": "Tlemcen",
        "population": 1012978325,
        "province": 13
    },
    {
        "id": 48,
        "name": "Bordj Bou Arreridj",
        "population": 1012016677,
        "province": 34
    },
    {
        "id": 49,
        "name": "Skikda",
        "population": 1012619903,
        "province": 21
    },
    {
        "id": 50,
        "name": "Azzaba",
        "population": 1012969588,
        "province": 21
    },
    {
        "id": 51,
        "name": "Bechar",
        "population": 1012371820,
        "province": 8
    },
    {
        "id": 52,
        "name": "Abadla",
        "population": 1012262770,
        "province": 8
    },
    {
        "id": 53,
        "name": "Beni Ounif",
        "population": 1012327989,
        "province": 8
    },
    {
        "id": 54,
        "name": "Chlef",
        "population": 1012772239,
        "province": 2
    },
    {
        "id": 55,
        "name": "Souk Ahras",
        "population": 1012419619,
        "province": 41
    },
    {
        "id": 56,
        "name": "M'sila",
        "population": 1012857730,
        "province": 28
    },
    {
        "id": 57,
        "name": "Bou Saada",
        "population": 1012931222,
        "province": 28
    },
    {
        "id": 58,
        "name": "Mostaganem",
        "population": 1012061703,
        "province": 27
    },
    {
        "id": 59,
        "name": "Medea",
        "population": 1012758282,
        "province": 26
    },
    {
        "id": 60,
        "name": "Bir Ghbalou",
        "population": 1012249358,
        "province": 26
    },
    {
        "id": 61,
        "name": "Tizi Ouzou",
        "population": 1012126997,
        "province": 15
    },
    {
        "id": 62,
        "name": "Azazga",
        "population": 1012087552,
        "province": 15
    },
    {
        "id": 63,
        "name": "Boghni",
        "population": 1012740129,
        "province": 15
    },
    {
        "id": 64,
        "name": "L'Arbaa Nait Irathen",
        "population": 1012117061,
        "province": 15
    },
    {
        "id": 65,
        "name": "Timizart",
        "population": 1012767619,
        "province": 15
    },
    {
        "id": 66,
        "name": "Freha",
        "population": 1012372550,
        "province": 15
    },
    {
        "id": 67,
        "name": "Mekla",
        "population": 1012384530,
        "province": 15
    },
    {
        "id": 68,
        "name": "Beni Douala",
        "population": 1012742443,
        "province": 15
    },
    {
        "id": 69,
        "name": "'Ain el Hammam",
        "population": 1012595495,
        "province": 15
    },
    {
        "id": 70,
        "name": "Tirmitine",
        "population": 1012932001,
        "province": 15
    },
    {
        "id": 71,
        "name": "Tizi Rached",
        "population": 1012966884,
        "province": 15
    },
    {
        "id": 72,
        "name": "Ain Zaouia",
        "population": 1012695288,
        "province": 15
    },
    {
        "id": 73,
        "name": "Azeffoun",
        "population": 1012290725,
        "province": 15
    },
    {
        "id": 74,
        "name": "Ouadhia",
        "population": 1012312650,
        "province": 15
    },
    {
        "id": 75,
        "name": "Boudjima",
        "population": 1012379618,
        "province": 15
    },
    {
        "id": 76,
        "name": "Tizi-n-Tleta",
        "population": 1012925920,
        "province": 15
    },
    {
        "id": 77,
        "name": "Ait Yaich",
        "population": 1012677951,
        "province": 15
    },
    {
        "id": 78,
        "name": "Iflissen",
        "population": 1012326451,
        "province": 15
    },
    {
        "id": 79,
        "name": "Mechtras",
        "population": 1012201497,
        "province": 15
    },
    {
        "id": 80,
        "name": "Arhribs",
        "population": 1012696122,
        "province": 15
    },
    {
        "id": 81,
        "name": "Iferhounene",
        "population": 1012745524,
        "province": 15
    },
    {
        "id": 82,
        "name": "Yakouren",
        "population": 1012612535,
        "province": 15
    },
    {
        "id": 83,
        "name": "Tigzirt",
        "population": 1012150824,
        "province": 15
    },
    {
        "id": 84,
        "name": "Souama",
        "population": 1012240654,
        "province": 15
    },
    {
        "id": 85,
        "name": "Bou Nouh",
        "population": 1012718665,
        "province": 15
    },
    {
        "id": 86,
        "name": "Ifigha",
        "population": 1012938624,
        "province": 15
    },
    {
        "id": 87,
        "name": "El Oued",
        "population": 1012148937,
        "province": 39
    },
    {
        "id": 88,
        "name": "Laghouat",
        "population": 1012233848,
        "province": 3
    },
    {
        "id": 89,
        "name": "Tadjmout",
        "population": 1012533662,
        "province": 3
    },
    {
        "id": 90,
        "name": "Jijel",
        "population": 1012782547,
        "province": 18
    },
    {
        "id": 91,
        "name": "El Milia",
        "population": 1012706826,
        "province": 18
    },
    {
        "id": 92,
        "name": "Ouargla",
        "population": 1012425687,
        "province": 30
    },
    {
        "id": 93,
        "name": "Hassi Messaoud",
        "population": 1012339655,
        "province": 30
    },
    {
        "id": 94,
        "name": "Ben Nasseur",
        "population": 1012048018,
        "province": 30
    },
    {
        "id": 95,
        "name": "Relizane",
        "population": 1012939885,
        "province": 48
    },
    {
        "id": 96,
        "name": "Saida",
        "population": 1012285874,
        "province": 20
    },
    {
        "id": 97,
        "name": "Guelma",
        "population": 1012266321,
        "province": 24
    },
    {
        "id": 98,
        "name": "Ghardaia",
        "population": 1012074690,
        "province": 47
    },
    {
        "id": 99,
        "name": "Ain Beida",
        "population": 1012021090,
        "province": 4
    },
    {
        "id": 100,
        "name": "Oum el Bouaghi",
        "population": 1012958880,
        "province": 4
    },
    {
        "id": 101,
        "name": "Ain M'Lila",
        "population": 1012438002,
        "province": 4
    },
    {
        "id": 102,
        "name": "Khenchela",
        "population": 1012495148,
        "province": 40
    },
    {
        "id": 103,
        "name": "Babar",
        "population": 1012018384,
        "province": 40
    },
    {
        "id": 104,
        "name": "Mascara",
        "population": 1012738269,
        "province": 29
    },
    {
        "id": 105,
        "name": "Tighenif",
        "population": 1012981905,
        "province": 29
    },
    {
        "id": 106,
        "name": "El Bayadh",
        "population": 1012906892,
        "province": 32
    },
    {
        "id": 107,
        "name": "Aïn Témouchent",
        "population": 1012763655,
        "province": 46
    },
    {
        "id": 108,
        "name": "Tamanrasset",
        "population": 1012765474,
        "province": 11
    },
    {
        "id": 109,
        "name": "Abalessa",
        "population": 1012479386,
        "province": 11
    },
    {
        "id": 110,
        "name": "I-n-Amguel",
        "population": 1012162135,
        "province": 11
    },
    {
        "id": 111,
        "name": "Tissemsilt",
        "population": 1012743339,
        "province": 38
    },
    {
        "id": 112,
        "name": "Bouira",
        "population": 1012006499,
        "province": 10
    },
    {
        "id": 113,
        "name": "Lakhdaria",
        "population": 1012284313,
        "province": 10
    },
    {
        "id": 114,
        "name": "Draa el Mizan",
        "population": 1012563094,
        "province": 10
    },
    {
        "id": 115,
        "name": "Kadiria",
        "population": 1012278992,
        "province": 10
    },
    {
        "id": 116,
        "name": "Aomar",
        "population": 1012376964,
        "province": 10
    },
    {
        "id": 117,
        "name": "Chorfa",
        "population": 1012035343,
        "province": 10
    },
    {
        "id": 118,
        "name": "Ouled Sidi Brahim",
        "population": 1012821401,
        "province": 10
    },
    {
        "id": 119,
        "name": "Takerbouzt",
        "population": 1012858445,
        "province": 10
    },
    {
        "id": 120,
        "name": "El Adjiba",
        "population": 1012383350,
        "province": 10
    },
    {
        "id": 121,
        "name": "Bechloul",
        "population": 1012563877,
        "province": 10
    },
    {
        "id": 122,
        "name": "Bordj Okhriss",
        "population": 1012057188,
        "province": 10
    },
    {
        "id": 123,
        "name": "Ouled Rached",
        "population": 1012727170,
        "province": 10
    },
    {
        "id": 124,
        "name": "Adrar",
        "population": 1012462113,
        "province": 1
    },
    {
        "id": 125,
        "name": "Reggane",
        "population": 1012709576,
        "province": 1
    },
    {
        "id": 126,
        "name": "Timoktene",
        "population": 1012254407,
        "province": 1
    },
    {
        "id": 127,
        "name": "Sali",
        "population": 1012996789,
        "province": 1
    },
    {
        "id": 128,
        "name": "Charouine",
        "population": 1012755999,
        "province": 1
    },
    {
        "id": 129,
        "name": "Boudouaou",
        "population": 1012554481,
        "province": 35
    },
    {
        "id": 130,
        "name": "Boumerdès",
        "population": 1012627486,
        "province": 35
    },
    {
        "id": 131,
        "name": "Khemis el Khechna",
        "population": 1012679229,
        "province": 35
    },
    {
        "id": 132,
        "name": "Bordj Menaiel",
        "population": 1012287430,
        "province": 35
    },
    {
        "id": 133,
        "name": "Ouled Moussa",
        "population": 1012623458,
        "province": 35
    },
    {
        "id": 134,
        "name": "Dellys",
        "population": 1012717910,
        "province": 35
    },
    {
        "id": 135,
        "name": "Draa Ben Khedda",
        "population": 1012011041,
        "province": 35
    },
    {
        "id": 136,
        "name": "Tizi Gheniff",
        "population": 1012794312,
        "province": 35
    },
    {
        "id": 137,
        "name": "Beni Amrane",
        "population": 1012420167,
        "province": 35
    },
    {
        "id": 138,
        "name": "Makouda",
        "population": 1012786926,
        "province": 35
    },
    {
        "id": 139,
        "name": "Tadmait",
        "population": 1012245949,
        "province": 35
    },
    {
        "id": 140,
        "name": "Naciria",
        "population": 1012065880,
        "province": 35
    },
    {
        "id": 141,
        "name": "Djinet",
        "population": 1012989318,
        "province": 35
    },
    {
        "id": 142,
        "name": "Thenia",
        "population": 1012908635,
        "province": 35
    },
    {
        "id": 143,
        "name": "Sidi Daoud",
        "population": 1012618002,
        "province": 35
    },
    {
        "id": 144,
        "name": "Afir",
        "population": 1012675026,
        "province": 35
    },
    {
        "id": 145,
        "name": "Si Mustapha",
        "population": 1012130143,
        "province": 35
    },
    {
        "id": 146,
        "name": "Sidi Namane",
        "population": 1012820383,
        "province": 35
    },
    {
        "id": 147,
        "name": "Ben N'Choud",
        "population": 1012044380,
        "province": 35
    },
    {
        "id": 148,
        "name": "Tindouf",
        "population": 1012450434,
        "province": 37
    },
    {
        "id": 149,
        "name": "El Golea",
        "population": 1012834851,
        "province": 58
    },
    {
        "id": 150,
        "name": "Touggourt",
        "population": 1012546670,
        "province": 55
    },
    {
        "id": 151,
        "name": "Timimoun",
        "population": 1012351010,
        "province": 49
    },
    {
        "id": 152,
        "name": "I-n-Salah",
        "population": 1012201146,
        "province": 53
    },
    {
        "id": 153,
        "name": "El Tarf",
        "population": 1012205687,
        "province": 36
    },
    {
        "id": 154,
        "name": "Tipasa",
        "population": 1012866308,
        "province": 42
    },
    {
        "id": 155,
        "name": "Illizi",
        "population": 1012499058,
        "province": 33
    },
    {
        "id": 156,
        "name": "I-n-Amenas",
        "population": 1012221429,
        "province": 33
    },
    {
        "id": 157,
        "name": "Bordj Mokhtar",
        "population": 1012945794,
        "province": 50
    },
    {
        "id": 158,
        "name": "Naama",
        "population": 1012850542,
        "province": 45
    },
    {
        "id": 159,
        "name": "Mecheria",
        "population": 1012958256,
        "province": 45
    },
    {
        "id": 160,
        "name": "Ain Sefra",
        "population": 1012884513,
        "province": 45
    },
    {
        "id": 161,
        "name": "Djanet",
        "population": 1012827195,
        "province": 56
    },
    {
        "id": 162,
        "name": "Beni Abbes",
        "population": 1012633792,
        "province": 52
    },
    {
        "id": 163,
        "name": "In Guezzam",
        "population": 1012000031,
        "province": 54
    },
    {
        "id": 164,
        "name": "Ain Defla",
        "population": 1012656497,
        "province": 44
    },
    {
        "id": 165,
        "name": "Khemis Miliana",
        "population": 1012116292,
        "province": 44
    },
    {
        "id": 166,
        "name": "Mila",
        "population": 1012656063,
        "province": 43
    },
    {
        "id": 167,
        "name": "Chelghoum el Aid",
        "population": 1012048079,
        "province": 43
    },
    {
        "id": 168,
        "name": "Ouled Djellal",
        "population": 1012109892,
        "province": 51
    },
    {
        "id": 169,
        "name": "El M'Ghair",
        "population": 1012153214,
        "province": 57
    }
]
