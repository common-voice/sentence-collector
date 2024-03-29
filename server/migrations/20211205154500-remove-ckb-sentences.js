'use strict';

// https://github.com/common-voice/sentence-collector/issues/568

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DELETE FROM Sentences
      WHERE localeId="ckb" AND id IN (
        10047725,
        10047730,
        10047621,
        10047440,
        10047741,
        10047441,
        10047442,
        10047443,
        10047444,
        10047445,
        10047446,
        10047447,
        10047448,
        10047449,
        10047450,
        10047451,
        10047452,
        10047453,
        10047454,
        10047455,
        10047456,
        10047457,
        10047458,
        10047459,
        10047460,
        10047461,
        10047462,
        10047463,
        10047464,
        10047465,
        10047466,
        10047467,
        10047468,
        10047469,
        10047470,
        10047471,
        10047472,
        10047473,
        10047474,
        10047475,
        10047476,
        10047477,
        10047478,
        10047479,
        10047480,
        10047481,
        10047482,
        10047483,
        10047484,
        10047485,
        10047486,
        10047487,
        10047488,
        10047489,
        10047490,
        10047491,
        10047492,
        10047493,
        10047494,
        10047495,
        10047496,
        10047497,
        10047498,
        10047499,
        10047500,
        10047501,
        10047502,
        10047503,
        10047504,
        10047505,
        10047506,
        10047507,
        10047508,
        10047509,
        10047510,
        10047511,
        10047512,
        10047513,
        10047514,
        10047515,
        10047516,
        10047517,
        10047518,
        10047519,
        10047520,
        10047521,
        10047522,
        10047523,
        10047524,
        10047525,
        10047526,
        10047527,
        10047528,
        10047529,
        10047530,
        10047531,
        10047532,
        10047533,
        10047534,
        10047535,
        10047536,
        10047537,
        10047538,
        10047539,
        10047540,
        10047541,
        10047542,
        10047543,
        10047544,
        10047545,
        10047546,
        10047547,
        10047548,
        10047549,
        10047550,
        10047551,
        10047552,
        10047553,
        10047554,
        10047555,
        10047556,
        10047557,
        10047558,
        10047559,
        10047560,
        10047561,
        10047562,
        10047563,
        10047564,
        10047565,
        10047566,
        10047567,
        10047568,
        10047569,
        10047570,
        10047571,
        10047572,
        10047573,
        10047574,
        10047575,
        10047576,
        10047577,
        10047578,
        10047579,
        10047580,
        10047581,
        10047582,
        10047583,
        10047584,
        10047585,
        10047586,
        10047587,
        10047588,
        10047589,
        10047590,
        10047591,
        10047592,
        10047593,
        10047594,
        10047595,
        10047136,
        10047138,
        10047139,
        10047140,
        10047141,
        10047142,
        10047143,
        10047144,
        10047145,
        10047146,
        10047147,
        10047148,
        10047149,
        10047150,
        10047151,
        10047152,
        10047153,
        10047154,
        10047155,
        10047156,
        10047157,
        10047158,
        10047159,
        10047160,
        10047161,
        10047162,
        10047163,
        10047164,
        10047165,
        10047166,
        10047167,
        10047168,
        10047169,
        10047170,
        10047171,
        10047172,
        10047173,
        10047174,
        10047175,
        10047176,
        10047177,
        10047178,
        10047179,
        10047180,
        10047181,
        10047182,
        10047183,
        10047184,
        10047185,
        10047186,
        10047187,
        10047188,
        10047189,
        10047190,
        10047191,
        10047192,
        10047193,
        10047194,
        10047195,
        10047196,
        10047197,
        10047198,
        10047199,
        10047200,
        10047201,
        10047202,
        10047203,
        10047204,
        10047205,
        10047206,
        10047207,
        10047208,
        10047209,
        10047210,
        10047211,
        10047212,
        10047213,
        10047214,
        10047215,
        10047216,
        10047217,
        10047218,
        10047219,
        10047220,
        10047222,
        10047223,
        10047224,
        10047225,
        10047226,
        10047227,
        10047228,
        10047229,
        10047230,
        10047231,
        10047232,
        10047233,
        10047234,
        10047235,
        10047236,
        10047237,
        10047239,
        10047240,
        10047241,
        10047242,
        10047243,
        10047244,
        10047245,
        10047246,
        10047247,
        10047248,
        10047249,
        10047250,
        10047251,
        10047252,
        10047253,
        10047254,
        10047255,
        10047256,
        10047257,
        10047258,
        10047259,
        10047260,
        10047261,
        10047262,
        10047263,
        10047264,
        10047265,
        10047266,
        10047267,
        10047268,
        10047269,
        10047270,
        10047271,
        10047272,
        10047273,
        10047274,
        10047275,
        10047276,
        10047277,
        10047278,
        10047279,
        10047280,
        10047281,
        10047282,
        10047283,
        10047284,
        10047285,
        10047286,
        10047287,
        10047288,
        10047289,
        10047290,
        10047291,
        10047292,
        10047293,
        10047294,
        10047295,
        10047296,
        10047297,
        10047298,
        10047299,
        10047300,
        10047301,
        10047302,
        10047305,
        10047306,
        10047307,
        10047308,
        10047309,
        10047310,
        10047311,
        10047312,
        10047313,
        10047314,
        10047315,
        10047316,
        10047317,
        10047318,
        10047319,
        10047320,
        10047321,
        10047322,
        10047323,
        10047324,
        10047325,
        10047326,
        10047327,
        10047328,
        10047329,
        10047330,
        10047331,
        10047332,
        10047333,
        10047334,
        10047335,
        10047336,
        10047337,
        10047338,
        10047339,
        10047340,
        10047341,
        10047342,
        10047344,
        10047345,
        10047346,
        10047347,
        10047348,
        10047349,
        10047350,
        10047351,
        10047352,
        10047353,
        10047354,
        10047355,
        10047356,
        10047357,
        10047358,
        10047359,
        10047360,
        10047361,
        10047362,
        10047363,
        10047364,
        10047365,
        10047366,
        10047367,
        10047368,
        10047369,
        10047370,
        10047371,
        10047372,
        10047373,
        10047374,
        10047375,
        10047376,
        10047377,
        10047378,
        10047379,
        10047380,
        10047381,
        10047382,
        10047383,
        10047384,
        10047385,
        10047386,
        10047387,
        10047388,
        10047389,
        10047390,
        10047391,
        10047392,
        10047393,
        10047394,
        10047395,
        10047396,
        10047397,
        10047398,
        10047399,
        10047400,
        10047401,
        10047402,
        10047403,
        10047404,
        10047405,
        10047406,
        10047407,
        10047408,
        10047409,
        10047410,
        10047411,
        10047412,
        10047413,
        10047414,
        10047415,
        10047416,
        10047417,
        10047418,
        10047419,
        10047420,
        10047421,
        10047422,
        10047423,
        10047424,
        10047425,
        10047426,
        10047427,
        10047428,
        10047429,
        10047430,
        10047431,
        10047432,
        10047433,
        10047434,
        10047435,
        10047436,
        10047437,
        10047438,
        10047439,
        10046898,
        10046906,
        10046907,
        10046908,
        10046909,
        10046910,
        10046911,
        10046912,
        10046913,
        10046914,
        10046915,
        10046916,
        10046917,
        10046918,
        10046919,
        10046920,
        10046921,
        10046922,
        10046923,
        10046924,
        10046925,
        10046926,
        10046927,
        10046928,
        10046929,
        10046930,
        10046931,
        10046932,
        10046933,
        10046934,
        10046935,
        10046936,
        10046937,
        10046938,
        10046939,
        10046940,
        10046941,
        10046942,
        10046943,
        10046944,
        10046945,
        10046946,
        10046947,
        10046948,
        10046949,
        10046950,
        10046951,
        10046952,
        10046953,
        10046954,
        10046955,
        10046956,
        10046957,
        10046958,
        10046959,
        10046960,
        10046961,
        10046962,
        10046963,
        10046964,
        10046965,
        10046966,
        10046967,
        10046968,
        10046969,
        10046970,
        10046971,
        10046972,
        10046973,
        10046974,
        10046975,
        10046976,
        10046977,
        10046978,
        10046979,
        10046980,
        10046981,
        10046982,
        10046983,
        10046984,
        10046985,
        10046986,
        10046987,
        10046988,
        10046989,
        10046990,
        10046991,
        10046992,
        10046993,
        10046994,
        10046995,
        10046996,
        10046997,
        10046998,
        10046999,
        10047000,
        10047001,
        10047002,
        10047003,
        10047004,
        10047005,
        10047006,
        10047007,
        10047008,
        10047009,
        10047010,
        10047011,
        10047012,
        10047013,
        10047014,
        10047015,
        10047016,
        10047017,
        10047018,
        10047019,
        10047020,
        10047021,
        10047022,
        10047023,
        10047024,
        10047025,
        10047026,
        10047027,
        10047028,
        10047029,
        10047030,
        10047031,
        10047032,
        10047033,
        10047034,
        10047035,
        10047036,
        10047037,
        10047038,
        10047039,
        10047040,
        10047041,
        10047042,
        10047043,
        10047044,
        10047045,
        10047046,
        10047047,
        10047048,
        10047049,
        10047050,
        10047051,
        10047052,
        10047053,
        10047054,
        10047055,
        10047056,
        10047057,
        10047058,
        10047059,
        10047060,
        10047061,
        10047062,
        10047063,
        10047064,
        10047065,
        10047066,
        10047067,
        10047068,
        10047069,
        10047070,
        10047071,
        10047072,
        10047073,
        10047074,
        10047075,
        10047076,
        10047077,
        10047078,
        10047079,
        10047080,
        10047081,
        10047082,
        10047083,
        10047084,
        10047085,
        10047086,
        10047087,
        10047088,
        10047089,
        10047090,
        10047091,
        10047092,
        10047093,
        10047094,
        10047095,
        10047096,
        10047097,
        10047098,
        10047099,
        10047100,
        10047101,
        10047102,
        10047103,
        10047104,
        10047105,
        10047106,
        10047107,
        10047108,
        10047109,
        10047110,
        10047111,
        10047112,
        10047113,
        10047114,
        10047115,
        10047116,
        10047117,
        10047118,
        10047119,
        10047120,
        10047121,
        10047123,
        10047124,
        10047125,
        10047126,
        10047127,
        10047128,
        10047129,
        10047130,
        10047131,
        10047132,
        10047134,
        10047135,
        10046821,
        10046822,
        10046823,
        10046824,
        10046825,
        10046826,
        10046827,
        10046828,
        10046829,
        10046830,
        10046831,
        10046832,
        10046833,
        10046834,
        10046835,
        10046836,
        10046837,
        10046838,
        10046839,
        10046840,
        10046841,
        10046842,
        10046843,
        10046844,
        10046845,
        10046846,
        10046847,
        10046848,
        10046849,
        10046850,
        10046851,
        10046852,
        10046853,
        10046854,
        10046855,
        10046856,
        10046857,
        10046858,
        10046859,
        10046860,
        10046861,
        10046862,
        10046863,
        10046864,
        10046865,
        10046866,
        10046867,
        10046868,
        10046869,
        10046870,
        10046871,
        10046872,
        10046873,
        10046874,
        10046875,
        10046876,
        10046877,
        10046878,
        10046879,
        10046880,
        10046881,
        10046882,
        10046883,
        10046884,
        10046885,
        10046886,
        10046887,
        10046888,
        10046889,
        10046890,
        10046891,
        10046892,
        10046893,
        10046894,
        10046895,
        10046896,
        10046897,
        10046720,
        10046723,
        10046729,
        10046731,
        10046736,
        10046737,
        10046739,
        10046740,
        10046742,
        10046744,
        10046745,
        10046747,
        10046748,
        10046749,
        10046750,
        10046751,
        10046752,
        10046753,
        10046754,
        10046755,
        10046756,
        10046757,
        10046758,
        10046759,
        10046760,
        10046761,
        10046762,
        10046763,
        10046764,
        10046765,
        10046766,
        10046767,
        10046768,
        10046769,
        10046770,
        10046771,
        10046772,
        10046773,
        10046774,
        10046775,
        10046776,
        10046777,
        10046778,
        10046779,
        10046780,
        10046781,
        10046782,
        10046783,
        10046784,
        10046785,
        10046786,
        10046787,
        10046788,
        10046789,
        10046790,
        10046791,
        10046792,
        10046793,
        10046794,
        10046795,
        10046796,
        10046797,
        10046798,
        10046799,
        10046800,
        10046801,
        10046802,
        10046803,
        10046804,
        10046805,
        10046806,
        10046807,
        10046808,
        10046809,
        10046810,
        10046811,
        10046812,
        10046813,
        10046814,
        10046815,
        10046816,
        10046817,
        10046818,
        10046819,
        10046820,
        10046670,
        10046671,
        10046678,
        10046680,
        10046687,
        10046694,
        10046703,
        10046709,
        10046711,
        10046636,
        10046643,
        10046647,
        10046649,
        10046650,
        10046654,
        10046379,
        10046396,
        10046407,
        10046410,
        10046412,
        10046414,
        10046434,
        10046441,
        10046443,
        10046453,
        10046460,
        10046463,
        10046464,
        10046465,
        10046466,
        10046467,
        10046468,
        10046469,
        10046470,
        10046471,
        10046472,
        10046473,
        10046474,
        10046475,
        10046476,
        10046477,
        10046478,
        10046479,
        10046480,
        10046481,
        10046482,
        10046483,
        10046484,
        10046485,
        10046486,
        10046487,
        10046488,
        10046489,
        10046490,
        10046491,
        10046492,
        10046493,
        10046494,
        10046495,
        10046496,
        10046497,
        10046498,
        10046499,
        10046500,
        10046501,
        10046502,
        10046503,
        10046504,
        10046505,
        10046506,
        10046507,
        10046508,
        10046509,
        10046510,
        10046511,
        10046512,
        10046513,
        10046514,
        10046515,
        10046516,
        10046517,
        10046518,
        10046519,
        10046520,
        10046521,
        10046522,
        10046523,
        10046524,
        10046525,
        10046526,
        10046527,
        10046528,
        10046529,
        10046530,
        10046531,
        10046532,
        10046533,
        10046534,
        10046535,
        10046536,
        10046537,
        10046538,
        10046539,
        10046540,
        10046541,
        10046542,
        10046543,
        10046544,
        10046545,
        10046546,
        10046547,
        10046548,
        10046549,
        10046550,
        10046551,
        10046552,
        10046553,
        10046554,
        10046555,
        10046556,
        10046557,
        10046558,
        10046559,
        10046561,
        10046562,
        10046568,
        10046578,
        10046582,
        10046594,
        10046597,
        10046598,
        10046603,
        10046608,
        10046616,
        10046620,
        10046622,
        10046625,
        10046628,
        10046631,
        10046633,
        10046213,
        10046270,
        10046282,
        10046289,
        10046301,
        10046304,
        10046305,
        10046306,
        10046309,
        10046314,
        10046322,
        10046336,
        10046339,
        10046357,
        10046116,
        10046117,
        10046118,
        10046119,
        10046122,
        10046123,
        10046124,
        10046125,
        10046126,
        10046127,
        10046128,
        10046129,
        10046130,
        10046132,
        10046133,
        10046134,
        10046135,
        10046136,
        10046137,
        10046138,
        10046139,
        10046140,
        10046142,
        10046143,
        10046144,
        10046145,
        10046146,
        10046147,
        10046148,
        10046149,
        10046150,
        10046151,
        10046152,
        10046153,
        10046154,
        10046155,
        10046156,
        10046157,
        10046158,
        10046159,
        10046160,
        10046161,
        10046162,
        10046163,
        10046164,
        10046165,
        10046166,
        10046167,
        10046168,
        10046169,
        10046170,
        10046171,
        10046172,
        10045815,
        10045816,
        10045817,
        10045818,
        10045819,
        10045820,
        10045821,
        10045822,
        10045823,
        10045827,
        10045828,
        10045829,
        10045830,
        10045831,
        10045832,
        10045833,
        10045834,
        10045835,
        10045836,
        10045837,
        10045838,
        10045839,
        10045840,
        10045841,
        10045842,
        10045843,
        10045844,
        10045845,
        10045846,
        10045847,
        10045848,
        10045849,
        10045850,
        10045851,
        10045852,
        10045853,
        10045854,
        10045855,
        10045856,
        10045857,
        10045858,
        10045859,
        10045860,
        10045861,
        10045862,
        10045863,
        10045864,
        10045865,
        10045866,
        10045867,
        10045868,
        10045869,
        10045870,
        10045871,
        10045872,
        10045873,
        10045874,
        10045876,
        10045877,
        10045878,
        10045879,
        10045880,
        10045881,
        10045882,
        10045883,
        10045884,
        10045885,
        10045886,
        10045887,
        10045888,
        10045890,
        10045891,
        10045892,
        10045893,
        10045894,
        10045895,
        10045896,
        10045897,
        10045898,
        10045921,
        10045924,
        10045926,
        10045927,
        10045928,
        10045929,
        10045930,
        10045931,
        10045932,
        10045933,
        10045934,
        10045935,
        10045936,
        10045937,
        10045938,
        10045939,
        10045940,
        10045941,
        10045942,
        10045943,
        10045944,
        10045945,
        10045946,
        10045947,
        10045948,
        10045949,
        10045950,
        10045951,
        10045952,
        10045953,
        10045954,
        10045955,
        10045956,
        10045957,
        10045963,
        10045964,
        10045966,
        10045967,
        10045968,
        10045969,
        10045970,
        10045971,
        10045972,
        10045973,
        10045974,
        10045975,
        10045976,
        10045977,
        10045978,
        10045979,
        10045980,
        10045981,
        10045982,
        10045983,
        10045984,
        10045985,
        10045986,
        10045987,
        10045988,
        10045989,
        10045990,
        10045991,
        10045992,
        10045993,
        10045994,
        10045996,
        10045997,
        10045998,
        10045999,
        10046000,
        10046001,
        10046002,
        10046003,
        10046004,
        10046005,
        10046006,
        10046007,
        10046008,
        10046009,
        10046010,
        10046011,
        10046012,
        10046013,
        10046014,
        10046015,
        10046016,
        10046017,
        10046018,
        10046019,
        10046021,
        10046023,
        10046024,
        10046025,
        10046026,
        10046028,
        10046029,
        10046031,
        10046032,
        10046033,
        10046034,
        10046035,
        10046036,
        10046037,
        10046038,
        10046039,
        10046040,
        10046041,
        10046042,
        10046043,
        10046044,
        10046045,
        10046046,
        10046047,
        10046048,
        10046049,
        10046050,
        10046051,
        10046052,
        10046053,
        10046054,
        10046055,
        10046056,
        10046057,
        10046058,
        10046059,
        10046060,
        10046061,
        10046062,
        10046063,
        10046064,
        10046065,
        10046066,
        10046067,
        10046068,
        10046069,
        10046070,
        10046071,
        10046072,
        10046073,
        10046074,
        10046075,
        10046076,
        10046077,
        10046078,
        10046079,
        10046080,
        10046081,
        10046082,
        10046083,
        10046084,
        10046085,
        10046086,
        10046087,
        10046088,
        10046089,
        10046090,
        10046091,
        10046092,
        10046093,
        10046094,
        10046095,
        10046105,
        10046106,
        10046107,
        10046108,
        10046109,
        10046110,
        10046111,
        10046112,
        10046113,
        10046114,
        10046115,
        10045792,
        10045793,
        10045802,
        10045808,
        10045809,
        10045810,
        10045811,
        10045812,
        10045813,
        10045814,
        10045768,
        10045769,
        10045770,
        10045771,
        10045772,
        10045773,
        10045774,
        10045775,
        10045776,
        10045777,
        10045778,
        10045779,
        10045780,
        10045781,
        10045782,
        10045783,
        10045784,
        10045785,
        10045786,
        10045787,
        10045788,
        10045789,
        10045790,
        10045791,
        10045740,
        10045741,
        10045742,
        10045743,
        10045744,
        10045745,
        10045746,
        10045747,
        10045748,
        10045749,
        10045750,
        10045751,
        10045754,
        10045760,
        10045767,
        10045592,
        10045593,
        10045594,
        10045595,
        10045596,
        10045597,
        10045598,
        10045599,
        10045600,
        10045601,
        10045602,
        10045603,
        10045604,
        10045605,
        10045606,
        10045607,
        10045608,
        10045609,
        10045610,
        10045611,
        10045612,
        10045613,
        10045614,
        10045615,
        10045616,
        10045617,
        10045619,
        10045620,
        10045621,
        10045622,
        10045623,
        10045624,
        10045626,
        10045627,
        10045628,
        10045629,
        10045630,
        10045631,
        10045632,
        10045633,
        10045634,
        10045635,
        10045636,
        10045638,
        10045639,
        10045640,
        10045641,
        10045642,
        10045643,
        10045644,
        10045645,
        10045646,
        10045647,
        10045648,
        10045649,
        10045650,
        10045651,
        10045652,
        10045653,
        10045654,
        10045655,
        10045656,
        10045657,
        10045658,
        10045659,
        10045660,
        10045661,
        10045662,
        10045663,
        10045664,
        10045665,
        10045666,
        10045667,
        10045668,
        10045669,
        10045670,
        10045671,
        10045672,
        10045673,
        10045674,
        10045675,
        10045676,
        10045677,
        10045678,
        10045679,
        10045680,
        10045681,
        10045682,
        10045683,
        10045684,
        10045685,
        10045686,
        10045687,
        10045688,
        10045689,
        10045690,
        10045691,
        10045692,
        10045693,
        10045694,
        10045695,
        10045696,
        10045697,
        10045698,
        10045699,
        10045700,
        10045701,
        10045702,
        10045703,
        10045704,
        10045705,
        10045706,
        10045707,
        10045708,
        10045709,
        10045710,
        10045711,
        10045712,
        10045713,
        10045714,
        10045715,
        10045716,
        10045717,
        10045718,
        10045719,
        10045720,
        10045721,
        10045722,
        10045723,
        10045724,
        10045725,
        10045726,
        10045727,
        10045728,
        10045729,
        10045730,
        10045731,
        10045732,
        10045733,
        10045734,
        10045735,
        10045736,
        10045737,
        10045738,
        10045739,
        10045570,
        10045571,
        10045572,
        10045573,
        10045574,
        10045575,
        10045576,
        10045577,
        10045578,
        10045581,
        10045582,
        10045583,
        10045584,
        10045585,
        10045586,
        10045587,
        10045588,
        10045589,
        10045590,
        10045591,
        10045463,
        10045464,
        10045465,
        10045466,
        10045467,
        10045468,
        10045469,
        10045470,
        10045471,
        10045472,
        10045473,
        10045474,
        10045475,
        10045481,
        10045494,
        10045507,
        10045514,
        10045520,
        10045521,
        10045522,
        10045523,
        10045524,
        10045525,
        10045526,
        10045527,
        10045528,
        10045529,
        10045530,
        10045531,
        10045532,
        10045533,
        10045534,
        10045535,
        10045536,
        10045537,
        10045538,
        10045539,
        10045540,
        10045541,
        10045542,
        10045543,
        10045544,
        10045545,
        10045546,
        10045547,
        10045548,
        10045549,
        10045550,
        10045551,
        10045552,
        10045553,
        10045554,
        10045555,
        10045556,
        10045557,
        10045558,
        10045559,
        10045560,
        10045561,
        10045562,
        10045563,
        10045564,
        10045565,
        10045566,
        10045567,
        10045568,
        10045569,
        10045353,
        10045373,
        10045391,
        10045393,
        10045400,
        10045401,
        10045402,
        10045403,
        10045404,
        10045405,
        10045406,
        10045407,
        10045408,
        10045418,
        10045433,
        10045435,
        10045436,
        10045438,
        10045439,
        10045440,
        10045441,
        10045442,
        10045443,
        10045444,
        10045446,
        10045447,
        10045448,
        10045449,
        10045450,
        10045291,
        10045292,
        10038509,
        10038510,
        10038511,
        10038512,
        10038513,
        10038514,
        10038515,
        10038517,
        10038518,
        10038519,
        10038520,
        10038521,
        10038522,
        10038523,
        10038524,
        10038527,
        10038528,
        10038529,
        10038530,
        10038531,
        10038532,
        10038533,
        10038535,
        10038536,
        10038537,
        10038538,
        10038539,
        10038540,
        10038543,
        10038544,
        10038545,
        10038546,
        10038547,
        9662731,
        9662743,
        9662744,
        9662745,
        9662746,
        9662747,
        9662759,
        9662760,
        9662761,
        9662762,
        9662763,
        9662764,
        9662769,
        9662770,
        9662771,
        9662783,
        9662787,
        9662788,
        9662789,
        9662798,
        9662799,
        9662800,
        9662801,
        9662810,
        9662814,
        9662815,
        9662817,
        9662818,
        9662819,
        9662820,
        9662821,
        9662719,
        9662659,
        9607078,
        9607080,
        9607109,
        9607110,
        9607113,
        9606969,
        9607010,
        9607050,
        9607059,
        9583982,
        9568391,
        9557170,
        9551159,
        9551163,
        9551144,
        9551146,
        9551139,
        9551119,
        9551092,
        9551102,
        9551110,
        9551112,
        9551020,
        9551060,
        9550975,
        9550979,
        9550940,
        9550952,
        9550957,
        9550959,
        9550868,
        9550875,
        9550882,
        9550218,
        9549666,
        9549670,
        9549671,
        9549674,
        9549682,
        9549686,
        9549636,
        9549637,
        9549638,
        9549639,
        9549640,
        9549623,
        9549626,
        9549605,
        9549590,
        9549593,
        9549594,
        9549595,
        9549596,
        9549543,
        9549553,
        9549483,
        9549492,
        9549504,
        9549507,
        9549508,
        9549509,
        9549510,
        9549511,
        9549513,
        9549515,
        9549522,
        9549526,
        9549532,
        9549533,
        9549539,
        9549356,
        9549393,
        9549430,
        9549453,
        9549454,
        9545166,
        9545136,
        9545110,
        9545093,
        9545097,
        9529026,
        9529024,
        9529025,
        8979789,
        8979761,
        8979763,
        8979764,
        8979765,
        8979766,
        8979767,
        8979768,
        8979771,
        8979772,
        8979780,
        8979781,
        8979784,
        8979785,
        8979786,
        8979745,
        8979747,
        8979748,
        8979750,
        8924291,
        8916389,
        8916393,
        8916394,
        8916405,
        8916411,
        8916475,
        8916480,
        8916483,
        8916489,
        8916491,
        8915866,
        8915868,
        8915873,
        8915910,
        8915915,
        8915954,
        8916025,
        8916035,
        8916039,
        8916041,
        8916042,
        8916048,
        8916074,
        8916086,
        8916097,
        8916114,
        8916117,
        8916128,
        8916164,
        8916171,
        8916174,
        8916181,
        8916182,
        8916187,
        8916196,
        8916227,
        8916232,
        8916237,
        8916258,
        8916287,
        8916313,
        8916317,
        8916325,
        8916327,
        8916328,
        8916330,
        8916333,
        8916354,
        8916362,
        8916364,
        8916366,
        8916372,
        8916377,
        8910821,
        5355108,
        5355112,
        5355115,
        5355121,
        5355194,
        5355261,
        5355278,
        5355387,
        5355390,
        5355429,
        5355445,
        5355488,
        5355507,
        5355511,
        5355512,
        5355526,
        5355528,
        5355529,
        5355551,
        5355552,
        5355559,
        5355564,
        5355592,
        5355593,
        5355622,
        5355632,
        5355640,
        5355652,
        5355653,
        5355687,
        5355692,
        5355732,
        5355737,
        5355740,
        5355781,
        5355782,
        5355783,
        5355799,
        5355807,
        5355809,
        5355810,
        5355811,
        5355812,
        5355813,
        5355814,
        5355815,
        5355816,
        5355817,
        5355818,
        5355819,
        5355820,
        5355821,
        5355822,
        5355837,
        5355852,
        5355853,
        5355863,
        5355864,
        5355865,
        5355866,
        5355880,
        5355881,
        5355882,
        5355883,
        5355885,
        5355887,
        5355894,
        5355901,
        5355909,
        5355934,
        5355958,
        5355964,
        5355965,
        5355966,
        5355967,
        5355968,
        5355969,
        5355970,
        5355973,
        5355974,
        5355982,
        5355983,
        5355984,
        5355985,
        5355986,
        5355987,
        5355988,
        5355989,
        5355990,
        5355991,
        5355992,
        5355993,
        5355994,
        5355996,
        5355997,
        5355998,
        5355999,
        5356000,
        5356003,
        5356014,
        5356015,
        5356016,
        5356017,
        5356018,
        5356020,
        5356021,
        5356030,
        5356031,
        5356032,
        5356037,
        5356078,
        5356090,
        5356093,
        5356095,
        5356100,
        5356103,
        5356104,
        5356108,
        5356109,
        5356110,
        5356111,
        5356112,
        5356113,
        5356123,
        5356124,
        5356126,
        5356127,
        5356128,
        5356129,
        5356130,
        5356137,
        5356152,
        5356156,
        5356160,
        5356186
      )
    `);
  },
  down: () => Promise.resolve(),
};
