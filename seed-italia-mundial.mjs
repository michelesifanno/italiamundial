/**
 * seed-italia-mundial.mjs
 * Popola il database Supabase "italia-mundial" con tutte le rose da 7a0.com.br
 *
 * USO:
 *   1. npm install @supabase/supabase-js
 *   2. Imposta le variabili d'ambiente:
 *        SUPABASE_URL=https://mkupqwzevymfoupmagte.supabase.co
 *        SUPABASE_SERVICE_KEY=<tua service_role key>
 *   3. node seed-italia-mundial.mjs
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || "https://mkupqwzevymfoupmagte.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_KEY) {
  console.error("❌  Imposta SUPABASE_SERVICE_KEY come variabile d'ambiente");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Rating squadre avversarie (da manifest 7a0 - array q)
const SQUAD_RATINGS = {
  "BRA:1950":{overall:83,band:86},"CHI:1950":{overall:77,band:80},"ENG:1950":{overall:85,band:88},
  "ESP:1950":{overall:83,band:86},"ITA:1950":{overall:81,band:84},"MEX:1950":{overall:77,band:79},
  "PAR:1950":{overall:76,band:76},"SUI:1950":{overall:79,band:80},"SWE:1950":{overall:81,band:84},
  "URU:1950":{overall:83,band:86},"USA:1950":{overall:76,band:79},"YUG:1950":{overall:83,band:86},
  "AUT:1954":{overall:83,band:86},"BRA:1954":{overall:82,band:85},"ENG:1954":{overall:82,band:85},
  "FRA:1954":{overall:81,band:84},"GER:1954":{overall:83,band:86},"HUN:1954":{overall:86,band:89},
  "ITA:1954":{overall:80,band:81},"SCO:1954":{overall:77,band:79},"SUI:1954":{overall:79,band:80},
  "TCH:1954":{overall:76,band:79},"TUR:1954":{overall:77,band:79},"URU:1954":{overall:83,band:86},
  "YUG:1954":{overall:83,band:86},"ARG:1958":{overall:80,band:83},"BRA:1958":{overall:87,band:90},
  "ENG:1958":{overall:81,band:84},"FRA:1958":{overall:83,band:86},"GER:1958":{overall:81,band:84},
  "HUN:1958":{overall:80,band:83},"NIR:1958":{overall:81,band:84},"PAR:1958":{overall:79,band:80},
  "SWE:1958":{overall:84,band:87},"URS:1958":{overall:83,band:86},"WAL:1958":{overall:80,band:83},
  "YUG:1958":{overall:81,band:84},"ARG:1962":{overall:79,band:82},"BRA:1962":{overall:87,band:90},
  "CHI:1962":{overall:80,band:82},"ENG:1962":{overall:83,band:86},"ESP:1962":{overall:86,band:89},
  "GER:1962":{overall:81,band:84},"HUN:1962":{overall:82,band:85},"ITA:1962":{overall:82,band:85},
  "MEX:1962":{overall:78,band:80},"TCH:1962":{overall:82,band:85},"URS:1962":{overall:83,band:86},
  "YUG:1962":{overall:80,band:83},"ARG:1966":{overall:82,band:85},"BRA:1966":{overall:83,band:86},
  "ENG:1966":{overall:86,band:89},"ESP:1966":{overall:84,band:87},"FRA:1966":{overall:77,band:77},
  "GER:1966":{overall:82,band:85},"HUN:1966":{overall:82,band:85},"ITA:1966":{overall:84,band:87},
  "MEX:1966":{overall:78,band:81},"POR:1966":{overall:82,band:84},"URS:1966":{overall:81,band:84},
  "BEL:1970":{overall:76,band:78},"BRA:1970":{overall:85,band:88},"BUL:1970":{overall:78,band:80},
  "ENG:1970":{overall:83,band:86},"GER:1970":{overall:86,band:89},"ITA:1970":{overall:82,band:85},
  "MEX:1970":{overall:75,band:77},"PER:1970":{overall:78,band:80},"ROU:1970":{overall:77,band:79},
  "URU:1970":{overall:79,band:80},"ARG:1974":{overall:81,band:81},"BRA:1974":{overall:82,band:84},
  "CHI:1974":{overall:81,band:84},"GER:1974":{overall:86,band:89},"ITA:1974":{overall:86,band:89},
  "NED:1974":{overall:85,band:87},"POL:1974":{overall:82,band:84},"SCO:1974":{overall:83,band:85},
  "SWE:1974":{overall:80,band:82},"URU:1974":{overall:79,band:81},"ARG:1978":{overall:84,band:85},
  "AUT:1978":{overall:78,band:79},"BRA:1978":{overall:82,band:84},"ESP:1978":{overall:80,band:82},
  "FRA:1978":{overall:79,band:81},"ITA:1978":{overall:83,band:86},"MEX:1978":{overall:74,band:75},
  "NED:1978":{overall:82,band:83},"PER:1978":{overall:78,band:80},"POL:1978":{overall:83,band:86},
  "SCO:1978":{overall:79,band:81},"ALG:1982":{overall:76,band:76},"ARG:1982":{overall:84,band:87},
  "AUT:1982":{overall:78,band:79},"BEL:1982":{overall:81,band:84},"BRA:1982":{overall:83,band:86},
  "CMR:1982":{overall:75,band:77},"ENG:1982":{overall:84,band:87},"FRA:1982":{overall:84,band:87},
  "GER:1982":{overall:84,band:86},"ITA:1982":{overall:84,band:87},"POL:1982":{overall:80,band:82},
  "SCO:1982":{overall:80,band:83},"ARG:1986":{overall:83,band:84},"BEL:1986":{overall:79,band:82},
  "BRA:1986":{overall:83,band:86},"BUL:1986":{overall:78,band:78},"DEN:1986":{overall:82,band:83},
  "ENG:1986":{overall:84,band:86},"ESP:1986":{overall:82,band:84},"FRA:1986":{overall:83,band:84},
  "GER:1986":{overall:85,band:88},"ITA:1986":{overall:84,band:86},"MAR:1986":{overall:79,band:82},
  "MEX:1986":{overall:78,band:79},"PAR:1986":{overall:76,band:78},"POL:1986":{overall:80,band:82},
  "URU:1986":{overall:80,band:82},"ARG:1990":{overall:81,band:82},"BRA:1990":{overall:85,band:88},
  "CMR:1990":{overall:77,band:79},"COL:1990":{overall:80,band:82},"CZE:1990":{overall:79,band:79},
  "EGY:1990":{overall:77,band:77},"ENG:1990":{overall:82,band:85},"GER:1990":{overall:86,band:87},
  "IRL:1990":{overall:79,band:80},"ITA:1990":{overall:86,band:89},"NED:1990":{overall:85,band:88},
  "ROU:1990":{overall:81,band:83},"YUG:1990":{overall:82,band:82},"ARG:1994":{overall:85,band:87},
  "BRA:1994":{overall:83,band:86},"BUL:1994":{overall:79,band:80},"COL:1994":{overall:80,band:81},
  "GER:1994":{overall:86,band:89},"ITA:1994":{overall:83,band:86},"MEX:1994":{overall:82,band:84},
  "NED:1994":{overall:84,band:87},"NGA:1994":{overall:80,band:81},"ROU:1994":{overall:81,band:83},
  "SWE:1994":{overall:81,band:82},"USA:1994":{overall:78,band:78},"ARG:1998":{overall:85,band:88},
  "BRA:1998":{overall:84,band:87},"COL:1998":{overall:80,band:82},"CRO:1998":{overall:82,band:85},
  "DEN:1998":{overall:81,band:84},"ENG:1998":{overall:84,band:87},"FRA:1998":{overall:87,band:90},
  "GER:1998":{overall:83,band:86},"ITA:1998":{overall:85,band:88},"NED:1998":{overall:86,band:88},
  "NGA:1998":{overall:83,band:85},"PAR:1998":{overall:79,band:81},"YUG:1998":{overall:81,band:81},
  "ARG:2002":{overall:86,band:89},"BRA:2002":{overall:85,band:88},"CMR:2002":{overall:79,band:81},
  "DEN:2002":{overall:81,band:82},"ESP:2002":{overall:82,band:83},"FRA:2002":{overall:88,band:91},
  "GER:2002":{overall:83,band:86},"IRL:2002":{overall:79,band:81},"JPN:2002":{overall:78,band:80},
  "KOR:2002":{overall:78,band:78},"MEX:2002":{overall:80,band:83},"NGA:2002":{overall:81,band:84},
  "SEN:2002":{overall:77,band:77},"TUR:2002":{overall:80,band:80},"USA:2002":{overall:79,band:79},
  "ARG:2006":{overall:86,band:88},"AUS:2006":{overall:79,band:79},"BRA:2006":{overall:88,band:91},
  "CIV:2006":{overall:80,band:81},"CZE:2006":{overall:82,band:84},"ECU:2006":{overall:79,band:82},
  "ENG:2006":{overall:87,band:90},"FRA:2006":{overall:84,band:86},"GER:2006":{overall:85,band:88},
  "ITA:2006":{overall:86,band:89},"POR:2006":{overall:83,band:86},"SUI:2006":{overall:79,band:80},
  "UKR:2006":{overall:80,band:81},"ARG:2010":{overall:86,band:88},"BRA:2010":{overall:86,band:88},
  "CHI:2010":{overall:82,band:84},"CIV:2010":{overall:82,band:83},"ENG:2010":{overall:83,band:86},
  "ESP:2010":{overall:87,band:90},"GHA:2010":{overall:77,band:77},"GRE:2010":{overall:79,band:80},
  "JPN:2010":{overall:79,band:80},"KOR:2010":{overall:81,band:84},"MEX:2010":{overall:79,band:79},
  "NED:2010":{overall:84,band:87},"PAR:2010":{overall:78,band:78},"URU:2010":{overall:81,band:83},
  "ALG:2014":{overall:79,band:79},"ARG:2014":{overall:84,band:85},"BRA:2014":{overall:85,band:88},
  "CHI:2014":{overall:81,band:83},"CIV:2014":{overall:81,band:82},"COL:2014":{overall:81,band:82},
  "CRC:2014":{overall:77,band:77},"FRA:2014":{overall:84,band:86},"GER:2014":{overall:89,band:92},
  "GHA:2014":{overall:81,band:83},"GRE:2014":{overall:79,band:80},"NED:2014":{overall:84,band:87},
  "NGA:2014":{overall:80,band:82},"SUI:2014":{overall:80,band:80},"URU:2014":{overall:84,band:86},
  "ARG:2018":{overall:86,band:89},"BEL:2018":{overall:84,band:86},"BRA:2018":{overall:86,band:89},
  "CRO:2018":{overall:83,band:84},"EGY:2018":{overall:78,band:79},"ENG:2018":{overall:80,band:80},
  "ESP:2018":{overall:88,band:91},"FRA:2018":{overall:86,band:87},"KOR:2018":{overall:77,band:77},
  "MAR:2018":{overall:80,band:82},"POR:2018":{overall:81,band:82},"RUS:2018":{overall:79,band:79},
  "SUI:2018":{overall:80,band:80},"SWE:2018":{overall:81,band:83},"ARG:2022":{overall:84,band:85},
  "AUS:2022":{overall:77,band:78},"BRA:2022":{overall:85,band:86},"CRC:2022":{overall:80,band:81},
  "CRO:2022":{overall:85,band:87},"ECU:2022":{overall:78,band:78},"FRA:2022":{overall:85,band:86},
  "JPN:2022":{overall:79,band:79},"KOR:2022":{overall:84,band:85},"MAR:2022":{overall:79,band:79},
  "POR:2022":{overall:83,band:84},"SEN:2022":{overall:82,band:83},"SRB:2022":{overall:81,band:81},
  "ARG:2026":{overall:87,band:88},"BEL:2026":{overall:81,band:82},"BRA:2026":{overall:86,band:87},
  "ECU:2026":{overall:80,band:81},"ENG:2026":{overall:84,band:84},"ESP:2026":{overall:86,band:88},
  "FRA:2026":{overall:86,band:87},"GER:2026":{overall:85,band:86},"NED:2026":{overall:84,band:85},
  "POR:2026":{overall:86,band:87},
};

// Tutti gli slug dal manifest 7a0 (play/page chunk)
const ALL_SLUGS = [
  {sel:"BRA",copa:1950,slug:"BRA-1950-3e1bc7e8"},{sel:"CHI",copa:1950,slug:"CHI-1950-4d5ff96e"},
  {sel:"ENG",copa:1950,slug:"ENG-1950-bd1e7a8a"},{sel:"ESP",copa:1950,slug:"ESP-1950-37ae195f"},
  {sel:"ITA",copa:1950,slug:"ITA-1950-e7f51af6"},{sel:"MEX",copa:1950,slug:"MEX-1950-34bf1476"},
  {sel:"PAR",copa:1950,slug:"PAR-1950-7584d619"},{sel:"SUI",copa:1950,slug:"SUI-1950-927eba0f"},
  {sel:"SWE",copa:1950,slug:"SWE-1950-549806f6"},{sel:"URU",copa:1950,slug:"URU-1950-e944d999"},
  {sel:"USA",copa:1950,slug:"USA-1950-546b95c2"},{sel:"YUG",copa:1950,slug:"YUG-1950-598ccc8e"},
  {sel:"AUT",copa:1954,slug:"AUT-1954-c8428152"},{sel:"BRA",copa:1954,slug:"BRA-1954-9c1e700e"},
  {sel:"ENG",copa:1954,slug:"ENG-1954-191f7705"},{sel:"FRA",copa:1954,slug:"FRA-1954-cb2de5df"},
  {sel:"GER",copa:1954,slug:"GER-1954-06d313ed"},{sel:"HUN",copa:1954,slug:"HUN-1954-a90b62df"},
  {sel:"ITA",copa:1954,slug:"ITA-1954-ba5e3a72"},{sel:"SCO",copa:1954,slug:"SCO-1954-e99c4013"},
  {sel:"SUI",copa:1954,slug:"SUI-1954-9870c624"},{sel:"TCH",copa:1954,slug:"TCH-1954-53fd9832"},
  {sel:"TUR",copa:1954,slug:"TUR-1954-88869659"},{sel:"URU",copa:1954,slug:"URU-1954-71080984"},
  {sel:"YUG",copa:1954,slug:"YUG-1954-ff5e64f9"},{sel:"ARG",copa:1958,slug:"ARG-1958-d03f17b4"},
  {sel:"BRA",copa:1958,slug:"BRA-1958-a006aee5"},{sel:"ENG",copa:1958,slug:"ENG-1958-daac4730"},
  {sel:"FRA",copa:1958,slug:"FRA-1958-91bedb09"},{sel:"GER",copa:1958,slug:"GER-1958-7ddeef5f"},
  {sel:"HUN",copa:1958,slug:"HUN-1958-58e3213e"},{sel:"NIR",copa:1958,slug:"NIR-1958-efd234e3"},
  {sel:"PAR",copa:1958,slug:"PAR-1958-1760a62e"},{sel:"SWE",copa:1958,slug:"SWE-1958-1358b240"},
  {sel:"URS",copa:1958,slug:"URS-1958-906d1467"},{sel:"WAL",copa:1958,slug:"WAL-1958-87111af8"},
  {sel:"YUG",copa:1958,slug:"YUG-1958-ac04696b"},{sel:"ARG",copa:1962,slug:"ARG-1962-d278f1d4"},
  {sel:"BRA",copa:1962,slug:"BRA-1962-4fc1204d"},{sel:"CHI",copa:1962,slug:"CHI-1962-9d4830f5"},
  {sel:"ENG",copa:1962,slug:"ENG-1962-44d83955"},{sel:"ESP",copa:1962,slug:"ESP-1962-5dde5cde"},
  {sel:"GER",copa:1962,slug:"GER-1962-d869e1cc"},{sel:"HUN",copa:1962,slug:"HUN-1962-3a59756b"},
  {sel:"ITA",copa:1962,slug:"ITA-1962-b81b270f"},{sel:"MEX",copa:1962,slug:"MEX-1962-976fab8d"},
  {sel:"TCH",copa:1962,slug:"TCH-1962-4381dfa0"},{sel:"URS",copa:1962,slug:"URS-1962-486efa4e"},
  {sel:"YUG",copa:1962,slug:"YUG-1962-664213a7"},{sel:"ARG",copa:1966,slug:"ARG-1966-29bd2c4c"},
  {sel:"BRA",copa:1966,slug:"BRA-1966-8345321c"},{sel:"ENG",copa:1966,slug:"ENG-1966-563bbe24"},
  {sel:"ESP",copa:1966,slug:"ESP-1966-d85a75a4"},{sel:"FRA",copa:1966,slug:"FRA-1966-058f0f96"},
  {sel:"GER",copa:1966,slug:"GER-1966-8706630d"},{sel:"HUN",copa:1966,slug:"HUN-1966-2ae7123a"},
  {sel:"ITA",copa:1966,slug:"ITA-1966-6aec38fa"},{sel:"MEX",copa:1966,slug:"MEX-1966-ccec0bd7"},
  {sel:"POR",copa:1966,slug:"POR-1966-ecd3d76c"},{sel:"URS",copa:1966,slug:"URS-1966-7389e73d"},
  {sel:"BEL",copa:1970,slug:"BEL-1970-d3603631"},{sel:"BRA",copa:1970,slug:"BRA-1970-43aa9180"},
  {sel:"BUL",copa:1970,slug:"BUL-1970-8fa82926"},{sel:"ENG",copa:1970,slug:"ENG-1970-23cf2edc"},
  {sel:"GER",copa:1970,slug:"GER-1970-c2caee74"},{sel:"ITA",copa:1970,slug:"ITA-1970-8dc490d2"},
  {sel:"MEX",copa:1970,slug:"MEX-1970-c8c6f229"},{sel:"PER",copa:1970,slug:"PER-1970-2754b47e"},
  {sel:"ROU",copa:1970,slug:"ROU-1970-b4ebef0c"},{sel:"URU",copa:1970,slug:"URU-1970-0563329f"},
  {sel:"ARG",copa:1974,slug:"ARG-1974-01b799f9"},{sel:"BRA",copa:1974,slug:"BRA-1974-d584069d"},
  {sel:"CHI",copa:1974,slug:"CHI-1974-6f51a496"},{sel:"GER",copa:1974,slug:"GER-1974-89ccf8fa"},
  {sel:"ITA",copa:1974,slug:"ITA-1974-a1c388a3"},{sel:"NED",copa:1974,slug:"NED-1974-198e7987"},
  {sel:"POL",copa:1974,slug:"POL-1974-219bc6d4"},{sel:"SCO",copa:1974,slug:"SCO-1974-212066bf"},
  {sel:"SWE",copa:1974,slug:"SWE-1974-8e21b6b0"},{sel:"URU",copa:1974,slug:"URU-1974-3b52f1ca"},
  {sel:"ARG",copa:1978,slug:"ARG-1978-358b85ad"},{sel:"AUT",copa:1978,slug:"AUT-1978-35a6d64d"},
  {sel:"BRA",copa:1978,slug:"BRA-1978-931bf7bc"},{sel:"ESP",copa:1978,slug:"ESP-1978-9a4b5ad2"},
  {sel:"FRA",copa:1978,slug:"FRA-1978-01be4668"},{sel:"ITA",copa:1978,slug:"ITA-1978-44b516c0"},
  {sel:"MEX",copa:1978,slug:"MEX-1978-587c42ed"},{sel:"NED",copa:1978,slug:"NED-1978-8a58bd0b"},
  {sel:"PER",copa:1978,slug:"PER-1978-9bd34e95"},{sel:"POL",copa:1978,slug:"POL-1978-e0340a39"},
  {sel:"SCO",copa:1978,slug:"SCO-1978-564a16ba"},{sel:"ALG",copa:1982,slug:"ALG-1982-5735b11b"},
  {sel:"ARG",copa:1982,slug:"ARG-1982-30b54478"},{sel:"AUT",copa:1982,slug:"AUT-1982-030f8db6"},
  {sel:"BEL",copa:1982,slug:"BEL-1982-69e58cd0"},{sel:"BRA",copa:1982,slug:"BRA-1982-64c3a185"},
  {sel:"CMR",copa:1982,slug:"CMR-1982-5f48085c"},{sel:"ENG",copa:1982,slug:"ENG-1982-d8d9e331"},
  {sel:"FRA",copa:1982,slug:"FRA-1982-6fff2200"},{sel:"GER",copa:1982,slug:"GER-1982-6a6a9c94"},
  {sel:"ITA",copa:1982,slug:"ITA-1982-c20450c2"},{sel:"POL",copa:1982,slug:"POL-1982-f988770a"},
  {sel:"SCO",copa:1982,slug:"SCO-1982-104a0b56"},{sel:"ARG",copa:1986,slug:"ARG-1986-c6660fb9"},
  {sel:"BEL",copa:1986,slug:"BEL-1986-94480851"},{sel:"BRA",copa:1986,slug:"BRA-1986-eb85267c"},
  {sel:"BUL",copa:1986,slug:"BUL-1986-d0da2273"},{sel:"DEN",copa:1986,slug:"DEN-1986-27a08d5b"},
  {sel:"ENG",copa:1986,slug:"ENG-1986-9cbf0804"},{sel:"ESP",copa:1986,slug:"ESP-1986-d22c7552"},
  {sel:"FRA",copa:1986,slug:"FRA-1986-e11bb4f8"},{sel:"GER",copa:1986,slug:"GER-1986-aed6ca0b"},
  {sel:"ITA",copa:1986,slug:"ITA-1986-a2f072f8"},{sel:"MAR",copa:1986,slug:"MAR-1986-73335111"},
  {sel:"MEX",copa:1986,slug:"MEX-1986-363480bd"},{sel:"PAR",copa:1986,slug:"PAR-1986-0e2244ca"},
  {sel:"POL",copa:1986,slug:"POL-1986-84f523ef"},{sel:"URU",copa:1986,slug:"URU-1986-3d8a3e36"},
  {sel:"ARG",copa:1990,slug:"ARG-1990-4fe030ba"},{sel:"BRA",copa:1990,slug:"BRA-1990-59ae2e7a"},
  {sel:"CMR",copa:1990,slug:"CMR-1990-7bb02393"},{sel:"COL",copa:1990,slug:"COL-1990-f60f4108"},
  {sel:"CZE",copa:1990,slug:"CZE-1990-18ae2351"},{sel:"EGY",copa:1990,slug:"EGY-1990-19c2634c"},
  {sel:"ENG",copa:1990,slug:"ENG-1990-c12ddb68"},{sel:"GER",copa:1990,slug:"GER-1990-104f1c8e"},
  {sel:"IRL",copa:1990,slug:"IRL-1990-27a14fc6"},{sel:"ITA",copa:1990,slug:"ITA-1990-80e2f0c6"},
  {sel:"NED",copa:1990,slug:"NED-1990-8948a78e"},{sel:"ROU",copa:1990,slug:"ROU-1990-c5e947c0"},
  {sel:"YUG",copa:1990,slug:"YUG-1990-f72a256b"},{sel:"ARG",copa:1994,slug:"ARG-1994-df1b7c51"},
  {sel:"BRA",copa:1994,slug:"BRA-1994-888e847a"},{sel:"BUL",copa:1994,slug:"BUL-1994-e690714c"},
  {sel:"COL",copa:1994,slug:"COL-1994-426b9a0a"},{sel:"GER",copa:1994,slug:"GER-1994-b47d4269"},
  {sel:"ITA",copa:1994,slug:"ITA-1994-f23bb7b0"},{sel:"MEX",copa:1994,slug:"MEX-1994-9fcce309"},
  {sel:"NED",copa:1994,slug:"NED-1994-d73b3100"},{sel:"NGA",copa:1994,slug:"NGA-1994-bb1536ba"},
  {sel:"ROU",copa:1994,slug:"ROU-1994-baee99f9"},{sel:"SWE",copa:1994,slug:"SWE-1994-aa33c650"},
  {sel:"USA",copa:1994,slug:"USA-1994-53ff57fd"},{sel:"ARG",copa:1998,slug:"ARG-1998-139e51a9"},
  {sel:"BRA",copa:1998,slug:"BRA-1998-c4c00f8c"},{sel:"COL",copa:1998,slug:"COL-1998-fa757fb5"},
  {sel:"CRO",copa:1998,slug:"CRO-1998-e7dd9838"},{sel:"DEN",copa:1998,slug:"DEN-1998-5815dac7"},
  {sel:"ENG",copa:1998,slug:"ENG-1998-438cf0af"},{sel:"FRA",copa:1998,slug:"FRA-1998-c7161f55"},
  {sel:"GER",copa:1998,slug:"GER-1998-d37750bd"},{sel:"ITA",copa:1998,slug:"ITA-1998-f65c4a41"},
  {sel:"NED",copa:1998,slug:"NED-1998-fed5b9a9"},{sel:"NGA",copa:1998,slug:"NGA-1998-71639d32"},
  {sel:"PAR",copa:1998,slug:"PAR-1998-1e13ef4f"},{sel:"YUG",copa:1998,slug:"YUG-1998-07d5209f"},
  {sel:"ARG",copa:2002,slug:"ARG-2002-2f0d0150"},{sel:"BRA",copa:2002,slug:"BRA-2002-fb67ed67"},
  {sel:"CMR",copa:2002,slug:"CMR-2002-3e9c81c2"},{sel:"DEN",copa:2002,slug:"DEN-2002-e3fd39ae"},
  {sel:"ESP",copa:2002,slug:"ESP-2002-6e3ebe2a"},{sel:"FRA",copa:2002,slug:"FRA-2002-7be6bd26"},
  {sel:"GER",copa:2002,slug:"GER-2002-b758bd4a"},{sel:"IRL",copa:2002,slug:"IRL-2002-3423dc1b"},
  {sel:"JPN",copa:2002,slug:"JPN-2002-969d3382"},{sel:"KOR",copa:2002,slug:"KOR-2002-64876c9d"},
  {sel:"MEX",copa:2002,slug:"MEX-2002-13060e3a"},{sel:"NGA",copa:2002,slug:"NGA-2002-8713fea8"},
  {sel:"SEN",copa:2002,slug:"SEN-2002-845efd6d"},{sel:"TUR",copa:2002,slug:"TUR-2002-d843d03d"},
  {sel:"USA",copa:2002,slug:"USA-2002-c8bd4f18"},{sel:"ARG",copa:2006,slug:"ARG-2006-d2d4ed18"},
  {sel:"AUS",copa:2006,slug:"AUS-2006-54514fcf"},{sel:"BRA",copa:2006,slug:"BRA-2006-22135ead"},
  {sel:"CIV",copa:2006,slug:"CIV-2006-c2353ebe"},{sel:"CZE",copa:2006,slug:"CZE-2006-bf85f5ca"},
  {sel:"ECU",copa:2006,slug:"ECU-2006-f3c2934a"},{sel:"ENG",copa:2006,slug:"ENG-2006-4200cdfc"},
  {sel:"FRA",copa:2006,slug:"FRA-2006-f0a807b1"},{sel:"GER",copa:2006,slug:"GER-2006-4ddc11cd"},
  {sel:"ITA",copa:2006,slug:"ITA-2006-cee92a32"},{sel:"POR",copa:2006,slug:"POR-2006-79eabcef"},
  {sel:"SUI",copa:2006,slug:"SUI-2006-a9d0dff3"},{sel:"UKR",copa:2006,slug:"UKR-2006-57bf8ad0"},
  {sel:"ARG",copa:2010,slug:"ARG-2010-94bb274f"},{sel:"BRA",copa:2010,slug:"BRA-2010-6eb1c310"},
  {sel:"CHI",copa:2010,slug:"CHI-2010-785b2c31"},{sel:"CIV",copa:2010,slug:"CIV-2010-c2868372"},
  {sel:"ENG",copa:2010,slug:"ENG-2010-5e195449"},{sel:"ESP",copa:2010,slug:"ESP-2010-f44877f3"},
  {sel:"GHA",copa:2010,slug:"GHA-2010-09a4ee72"},{sel:"GRE",copa:2010,slug:"GRE-2010-1972207d"},
  {sel:"JPN",copa:2010,slug:"JPN-2010-f190c56c"},{sel:"KOR",copa:2010,slug:"KOR-2010-e7466020"},
  {sel:"MEX",copa:2010,slug:"MEX-2010-493017a4"},{sel:"NED",copa:2010,slug:"NED-2010-cef16c61"},
  {sel:"PAR",copa:2010,slug:"PAR-2010-836cc26e"},{sel:"URU",copa:2010,slug:"URU-2010-ae72ac71"},
  {sel:"ALG",copa:2014,slug:"ALG-2014-ecee73df"},{sel:"ARG",copa:2014,slug:"ARG-2014-c90d8010"},
  {sel:"BRA",copa:2014,slug:"BRA-2014-2e4b6eb7"},{sel:"CHI",copa:2014,slug:"CHI-2014-f271e2aa"},
  {sel:"CIV",copa:2014,slug:"CIV-2014-b0db6bc7"},{sel:"COL",copa:2014,slug:"COL-2014-5b2f42d5"},
  {sel:"CRC",copa:2014,slug:"CRC-2014-2ae817b7"},{sel:"FRA",copa:2014,slug:"FRA-2014-79b1b2c6"},
  {sel:"GER",copa:2014,slug:"GER-2014-13eaae2c"},{sel:"GHA",copa:2014,slug:"GHA-2014-53e66043"},
  {sel:"GRE",copa:2014,slug:"GRE-2014-3f5e99ae"},{sel:"NED",copa:2014,slug:"NED-2014-76453810"},
  {sel:"NGA",copa:2014,slug:"NGA-2014-17d97507"},{sel:"SUI",copa:2014,slug:"SUI-2014-a639e695"},
  {sel:"URU",copa:2014,slug:"URU-2014-a047534e"},{sel:"ARG",copa:2018,slug:"ARG-2018-cf2c3faa"},
  {sel:"BEL",copa:2018,slug:"BEL-2018-8941c39d"},{sel:"BRA",copa:2018,slug:"BRA-2018-12f56a45"},
  {sel:"CRO",copa:2018,slug:"CRO-2018-152c2130"},{sel:"EGY",copa:2018,slug:"EGY-2018-69c6e186"},
  {sel:"ENG",copa:2018,slug:"ENG-2018-1ce31ac0"},{sel:"ESP",copa:2018,slug:"ESP-2018-01b1fd2c"},
  {sel:"FRA",copa:2018,slug:"FRA-2018-a217e6b4"},{sel:"KOR",copa:2018,slug:"KOR-2018-b0cc60b4"},
  {sel:"MAR",copa:2018,slug:"MAR-2018-58ae40b9"},{sel:"POR",copa:2018,slug:"POR-2018-c7d33df5"},
  {sel:"RUS",copa:2018,slug:"RUS-2018-50c67f83"},{sel:"SUI",copa:2018,slug:"SUI-2018-c51ab49e"},
  {sel:"SWE",copa:2018,slug:"SWE-2018-f66d46cd"},{sel:"ARG",copa:2022,slug:"ARG-2022-b496c7d3"},
  {sel:"AUS",copa:2022,slug:"AUS-2022-6f7f7b7b"},{sel:"BRA",copa:2022,slug:"BRA-2022-d1a1956c"},
  {sel:"CRC",copa:2022,slug:"CRC-2022-e583969d"},{sel:"CRO",copa:2022,slug:"CRO-2022-889b02e7"},
  {sel:"ECU",copa:2022,slug:"ECU-2022-b73f4bc9"},{sel:"FRA",copa:2022,slug:"FRA-2022-717cfb1f"},
  {sel:"JPN",copa:2022,slug:"JPN-2022-5e0f014f"},{sel:"KOR",copa:2022,slug:"KOR-2022-5a35f18c"},
  {sel:"MAR",copa:2022,slug:"MAR-2022-56840d6c"},{sel:"POR",copa:2022,slug:"POR-2022-e262ce0f"},
  {sel:"SEN",copa:2022,slug:"SEN-2022-a462e9ea"},{sel:"SRB",copa:2022,slug:"SRB-2022-ae3730fe"},
  {sel:"ARG",copa:2026,slug:"ARG-2026-c06fa70b"},{sel:"BEL",copa:2026,slug:"BEL-2026-a20e548a"},
  {sel:"BRA",copa:2026,slug:"BRA-2026-1bd55ff0"},{sel:"ECU",copa:2026,slug:"ECU-2026-d7561c3a"},
  {sel:"ENG",copa:2026,slug:"ENG-2026-93e73b03"},{sel:"ESP",copa:2026,slug:"ESP-2026-6316a035"},
  {sel:"FRA",copa:2026,slug:"FRA-2026-66f888a2"},{sel:"GER",copa:2026,slug:"GER-2026-31761346"},
  {sel:"NED",copa:2026,slug:"NED-2026-df852bdd"},{sel:"POR",copa:2026,slug:"POR-2026-76851170"},
];

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchSquad(slug) {
  const res = await fetch(`https://7a0.com.br/squads/${slug}.json`, {
    headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${slug}`);
  return res.json();
}

async function run() {
  console.log(`\n🇮🇹 Italia Mundial — Seed Script`);
  console.log(`📦 Totale squadre: ${ALL_SLUGS.length}\n`);

  let ok = 0, err = 0;

  for (const entry of ALL_SLUGS) {
    const key = `${entry.sel}:${entry.copa}`;
    const rating = SQUAD_RATINGS[key] || { overall: 80, band: 82 };

    try {
      // 1. Upsert squad metadata
      const { error: squadErr } = await supabase
        .from("squads")
        .upsert({
          slug: entry.slug,
          sel: entry.sel,
          copa: entry.copa,
          overall: rating.overall,
          band: rating.band,
        }, { onConflict: "slug" });

      if (squadErr) throw squadErr;

      // 2. Fetch squad JSON from 7a0
      const data = await fetchSquad(entry.slug);

      // 3. Upsert all players
      const players = data.squad.map((p) => ({
        player_id: p.playerId,
        slug: entry.slug,
        sel: entry.sel,
        copa: entry.copa,
        name: p.name,
        number: p.number,
        positions: JSON.stringify(p.positions),
        force: p.force,
        legend: p.legend ?? false,
      }));

      const { error: playersErr } = await supabase
        .from("players")
        .upsert(players, { onConflict: "player_id,slug" });

      if (playersErr) throw playersErr;

      ok++;
      process.stdout.write(`✓ ${entry.sel} ${entry.copa} (${players.length} giocatori)\n`);
    } catch (e) {
      err++;
      console.error(`✗ ${entry.sel} ${entry.copa}: ${e.message}`);
    }

    // Delay per non sovraccaricare 7a0 (rispetto + evita rate limit)
    await delay(350);
  }

  console.log(`\n✅ Completato: ${ok} squadre inserite, ${err} errori`);
}

run();
