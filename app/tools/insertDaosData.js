var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Pool = require('pg').Pool;
var pool = new Pool({
    connectionString: "postgres://default:QgXvW2xrmz3p@ep-billowing-bonus-a4vriafo-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
});
function insertData(data) {
    return __awaiter(this, void 0, void 0, function () {
        var client, _i, data_1, item, _a, _b, chainId, _c, _d, governorId, error_1, error_2;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 21, , 22]);
                    return [4 /*yield*/, pool.connect()];
                case 1:
                    client = _e.sent();
                    return [4 /*yield*/, client.query('BEGIN')];
                case 2:
                    _e.sent();
                    _e.label = 3;
                case 3:
                    _e.trys.push([3, 17, 19, 20]);
                    _i = 0, data_1 = data;
                    _e.label = 4;
                case 4:
                    if (!(_i < data_1.length)) return [3 /*break*/, 15];
                    item = data_1[_i];
                    // Insert into entities
                    return [4 /*yield*/, client.query('INSERT INTO tally_entities(id, slug, name, proposals_count, active_proposals_count, token_holders_count, voters_count, metadata) VALUES($1, $2, $3, $4, $5, $6, $7, $8)', [
                            item.id,
                            item.slug,
                            item.name,
                            item.proposalsCount,
                            item.activeProposalsCount,
                            item.tokenHoldersCount,
                            item.votersCount,
                            item.metadata,
                        ])];
                case 5:
                    // Insert into entities
                    _e.sent();
                    console.log('Entry inserted successfully into tally_entities');
                    _a = 0, _b = item.chainIds;
                    _e.label = 6;
                case 6:
                    if (!(_a < _b.length)) return [3 /*break*/, 9];
                    chainId = _b[_a];
                    return [4 /*yield*/, client.query('INSERT INTO tally_chain_ids(entity_id, chain_id) VALUES($1, $2)', [item.id, chainId])];
                case 7:
                    _e.sent();
                    _e.label = 8;
                case 8:
                    _a++;
                    return [3 /*break*/, 6];
                case 9:
                    console.log('Entry inserted successfully into tally_chain_ids');
                    _c = 0, _d = item.governorIds;
                    _e.label = 10;
                case 10:
                    if (!(_c < _d.length)) return [3 /*break*/, 13];
                    governorId = _d[_c];
                    return [4 /*yield*/, client.query('INSERT INTO tally_governor_ids(entity_id, governor_id) VALUES($1, $2)', [item.id, governorId])];
                case 11:
                    _e.sent();
                    _e.label = 12;
                case 12:
                    _c++;
                    return [3 /*break*/, 10];
                case 13:
                    console.log('Entry inserted successfully into tally_governor_ids');
                    _e.label = 14;
                case 14:
                    _i++;
                    return [3 /*break*/, 4];
                case 15: return [4 /*yield*/, client.query('COMMIT')];
                case 16:
                    _e.sent();
                    return [3 /*break*/, 20];
                case 17:
                    error_1 = _e.sent();
                    return [4 /*yield*/, client.query('ROLLBACK')];
                case 18:
                    _e.sent();
                    throw error_1;
                case 19:
                    client.release();
                    return [7 /*endfinally*/];
                case 20:
                    console.log('Data inserted successfully');
                    return [3 /*break*/, 22];
                case 21:
                    error_2 = _e.sent();
                    console.error('Error inserting data:', error_2);
                    return [3 /*break*/, 22];
                case 22: return [2 /*return*/];
            }
        });
    });
}
var daos_data = [
    {
        "id": "2206072050299176543",
        "slug": "moonwell",
        "name": "Moonwell",
        "chainIds": [
            "eip155:1284"
        ],
        "proposalsCount": 65,
        "activeProposalsCount": 9,
        "tokenHoldersCount": 5344,
        "votersCount": 1082,
        "governorIds": [
            "eip155:1284:0xfc4DFB17101A12C5CEc5eeDd8E92B5b16557666d"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/f9ac362d-e9d1-4563-9a03-852c2318f0a8_original.jpeg"
        }
    },
    {
        "id": "2206072050307565231",
        "slug": "nounsdao",
        "name": "Nouns Dao",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 509,
        "activeProposalsCount": 5,
        "tokenHoldersCount": 260,
        "votersCount": 211,
        "governorIds": [
            "eip155:1:0x6f3E6272A167e8AcCb32072d08E0957F9c79223d"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/1decbb17-b472-4eb9-9141-92c3f86770de_400x400.jpg"
        }
    },
    {
        "id": "2206072050215290763",
        "slug": "yam-finance",
        "name": "Yam Finance",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 44,
        "activeProposalsCount": 3,
        "tokenHoldersCount": 11698,
        "votersCount": 1928,
        "governorIds": [
            "eip155:1:0x2DA253835967D6E721C6c077157F9c9742934aeA"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/925ada58-23fc-4025-9e43-a27776757e99_400x400.jpg"
        }
    },
    {
        "id": "2206072049913300407",
        "slug": "daxio",
        "name": "DaxioDAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 38,
        "activeProposalsCount": 3,
        "tokenHoldersCount": 3196,
        "votersCount": 432,
        "governorIds": [
            "eip155:1:0xDA9C9eD96f6D42f7e74f3C7eEa6772d64eD84bdf"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/ca2416ce-a4a4-4e23-8e77-c0d1791a968d_original.png"
        }
    },
    {
        "id": "2206072049862969321",
        "slug": "gitcoin",
        "name": "Gitcoin",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 90,
        "activeProposalsCount": 2,
        "tokenHoldersCount": 92654,
        "votersCount": 12533,
        "governorIds": [
            "eip155:1:0x9D4C63565D5618310271bF3F3c01b2954C1D1639",
            "eip155:1:0xDbD27635A534A3d3169Ef0498beB56Fb9c937489"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/52fdf6fc-c2a4-4539-b36f-16c47f4c7de9_400x400.jpg"
        }
    },
    {
        "id": "2206072050315953936",
        "slug": "arbitrum",
        "name": "Arbitrum",
        "chainIds": [
            "eip155:42161"
        ],
        "proposalsCount": 27,
        "activeProposalsCount": 1,
        "tokenHoldersCount": 928646,
        "votersCount": 164862,
        "governorIds": [
            "eip155:42161:0xf07DeD9dC292157749B6Fd268E37DF6EA38395B9",
            "eip155:42161:0x789fC99093B09aD01C34DC7251D0C89ce743e5a4"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/b817e120-3169-47b5-a6c7-0bc42b7e0877_original.jpeg"
        }
    },
    {
        "id": "2206072050408228377",
        "slug": "hop",
        "name": "Hop",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 13,
        "activeProposalsCount": 1,
        "tokenHoldersCount": 13801,
        "votersCount": 4201,
        "governorIds": [
            "eip155:1:0xed8Bdb5895B8B7f9Fdb3C087628FD8410E853D48"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/e791fd56-5374-476f-acc0-190587ffa3e7_original.png"
        }
    },
    {
        "id": "2206072050408228378",
        "slug": "lil-nouns",
        "name": "Lil Nouns",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 185,
        "activeProposalsCount": 1,
        "tokenHoldersCount": 2230,
        "votersCount": 2120,
        "governorIds": [
            "eip155:1:0x5d2C31ce16924C2a71D317e5BbFd5ce387854039"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/6b7f8135-d235-41c8-827b-ee8eecc5a2b2_original.png"
        }
    },
    {
        "id": "2206072050416617018",
        "slug": "rari-foundation",
        "name": "Rari DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 29,
        "activeProposalsCount": 1,
        "tokenHoldersCount": 0,
        "votersCount": 598,
        "governorIds": [
            "eip155:1:0x6552C8fb228f7776Fc0e4056AA217c139D4baDa1"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/761ec77f-7666-4a51-867c-1e49f9cb0c15_original.jpeg"
        }
    },
    {
        "id": "2206072050416616999",
        "slug": "softdao",
        "name": "SoftDAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 4,
        "activeProposalsCount": 1,
        "tokenHoldersCount": 3605,
        "votersCount": 355,
        "governorIds": [
            "eip155:1:0x0ADd6d42bBfe6c40e15B02A2C8A1b81B36a2B326"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/f8ee2903-7d35-4fbb-be50-f3a000647849_original.png"
        }
    },
    {
        "id": "2206072050307565245",
        "slug": "unlock",
        "name": "Unlock",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 26,
        "activeProposalsCount": 1,
        "tokenHoldersCount": 4482,
        "votersCount": 73,
        "governorIds": [
            "eip155:1:0x440d9D4E66d39bb28FB58729Cb4D3ead2A595591",
            "eip155:1:0x7757f7f21F5Fa9b1fd168642B79416051cd0BB94"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/2f981707-a5e8-4b49-9d61-52120f2bce58_400x400.jpg"
        }
    },
    {
        "id": "2206072050416616996",
        "slug": "reflexer-ungovernor",
        "name": "Reflexer Ungovernor",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 42,
        "activeProposalsCount": 1,
        "tokenHoldersCount": 3760,
        "votersCount": 37,
        "governorIds": [
            "eip155:1:0x7a6BBe7fDd793CC9ab7e0fc33605FCd2D19371E8"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/eba37ab8-f4ee-459a-8270-2c8d79690a72_original.png"
        }
    },
    {
        "id": "2206072049846191992",
        "slug": "polkadot-builders",
        "name": "Polkadot Builders",
        "chainIds": [
            "eip155:1284"
        ],
        "proposalsCount": 7,
        "activeProposalsCount": 1,
        "tokenHoldersCount": 53,
        "votersCount": 23,
        "governorIds": [
            "eip155:1284:0x311346FDe706FEBAB09cCEd059A05566248b1351"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/3f5a8d36-0be8-46f3-8e9e-9c5d00b73e4b_original.png"
        }
    },
    {
        "id": "2206072050458560378",
        "slug": "zhidao",
        "name": "ZHIDAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 10,
        "activeProposalsCount": 1,
        "tokenHoldersCount": 116,
        "votersCount": 16,
        "governorIds": [
            "eip155:137:0x5835F8C675BE78F991fE8c3004c649428F768442"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/08b7f89f-9f4a-4147-b7a3-2e84afe1c934_original.jpeg"
        }
    },
    {
        "id": "2206072050324342582",
        "slug": "exodus-town",
        "name": "Exodus Town",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 1,
        "tokenHoldersCount": 31,
        "votersCount": 16,
        "governorIds": [
            "eip155:137:0x7E96f5242D1256E56E15b46EB2Fa1b1152dF5923"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/c1e5dfa1-3073-458c-8e7d-86ad80468765_original.png"
        }
    },
    {
        "id": "2206072049862968332",
        "slug": "kroma-security-council-l1",
        "name": "Kroma Security Council (L1)",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 4,
        "activeProposalsCount": 1,
        "tokenHoldersCount": 9,
        "votersCount": 9,
        "governorIds": [
            "eip155:1:0xb3c415c2Aad428D5570208e1772cb68e7D06a537"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/4e53f0bb-e0c9-46d4-b83f-b3f08311de7a_original.png"
        }
    },
    {
        "id": "2206072049871356990",
        "slug": "optimism",
        "name": "Optimism",
        "chainIds": [
            "eip155:10"
        ],
        "proposalsCount": 23,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1101955,
        "votersCount": 123838,
        "governorIds": [
            "eip155:10:0xcDF27F107725988f2261Ce2256bDfCdE8B382B10"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/4f89fa07-7d2a-4884-a9db-5484890f2b2f_original.png"
        }
    },
    {
        "id": "2206072049829414624",
        "slug": "aave",
        "name": "Aave",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 417,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 73871,
        "votersCount": 72019,
        "governorIds": [
            "eip155:1:0xEC568fffba86c094cf06b22134B23074DFE2252c"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/de0e6dc7-1c07-4ae4-9f42-e46367984fd2_original.png"
        }
    },
    {
        "id": "2206072050458560434",
        "slug": "uniswap",
        "name": "Uniswap",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 59,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 377136,
        "votersCount": 34627,
        "governorIds": [
            "eip155:1:0x408ED6354d4973f66138C91495F2f2FCbd8724C3"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/d9e8442f-5cb7-4357-9567-3cdd7ae5930e_400x400.jpg"
        }
    },
    {
        "id": "2235789849409881260",
        "slug": "opendollar",
        "name": "OpenDollar",
        "chainIds": [
            "eip155:42161"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 4086,
        "votersCount": 3255,
        "governorIds": [
            "eip155:42161:0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/002e7178-5ad0-4764-aa8b-803ad13bba50_original.png"
        }
    },
    {
        "id": "2206072049946855142",
        "slug": "diva",
        "name": "Diva Staking",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 9,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 4553,
        "votersCount": 2965,
        "governorIds": [
            "eip155:1:0xFb6B7C11a55C57767643F1FF65c34C8693a11A70"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/00c9ecd3-0887-4e59-92ba-cb2f61be56c4_original.png"
        }
    },
    {
        "id": "2206072049871357011",
        "slug": "ondo-dao",
        "name": "Ondo DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 9,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 16066,
        "votersCount": 1582,
        "governorIds": [
            "eip155:1:0x336505EC1BcC1A020EeDe459f57581725D23465A"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/28a0e1d0-1aa0-4587-a751-3f55a55de833_original.png"
        }
    },
    {
        "id": "2206072050408228379",
        "slug": "spellsdao",
        "name": "SpellsDAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 982,
        "votersCount": 981,
        "governorIds": [
            "eip155:1:0x2f8da73e52Ec56FeB0aE63FBDD50c01dd04E8CC9"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/65636b9e-7b57-4d68-aa58-d7b2c025598c_original.png"
        }
    },
    {
        "id": "2206072050408228380",
        "slug": "euler",
        "name": "Euler",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 2632,
        "votersCount": 888,
        "governorIds": [
            "eip155:1:0xd8E2114f6bCbaee83CDEB1bD6650a28BBcF144D5"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/9a1bd5cd-11c2-4638-a0ca-4b5887c07631_original.png"
        }
    },
    {
        "id": "2260960194542438166",
        "slug": "hai",
        "name": "HAI",
        "chainIds": [
            "eip155:10"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 793,
        "votersCount": 791,
        "governorIds": [
            "eip155:10:0xe807f3282f3391d237BA8B9bECb0d8Ea3ba23777"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/1552e0c9-8ca9-4152-be43-61f27d772a6d_original.png"
        }
    },
    {
        "id": "2206072050433394348",
        "slug": "truefi",
        "name": "TrueFi",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 16,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 616,
        "votersCount": 621,
        "governorIds": [
            "eip155:1:0x585CcA060422ef1779Fb0Dd710A49e7C49A823C9"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/424f4510-f966-416d-aac2-249a340805a1_original.png"
        }
    },
    {
        "id": "2212202486389802088",
        "slug": "seamless-protocol-governor-long",
        "name": "Seamless Protocol Governor Long",
        "chainIds": [
            "eip155:8453"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 3763,
        "votersCount": 603,
        "governorIds": [
            "eip155:8453:0x04faA2826DbB38a7A4E9a5E3dB26b9E389E761B6"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/e1d90a69-d535-4887-a6b6-a7f2284090de_original.png"
        }
    },
    {
        "id": "2212190090728309863",
        "slug": "seamless-protocol",
        "name": "Seamless Protocol",
        "chainIds": [
            "eip155:8453"
        ],
        "proposalsCount": 4,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 3763,
        "votersCount": 603,
        "governorIds": [
            "eip155:8453:0x8768c789C6df8AF1a92d96dE823b4F80010Db294"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/9ee059d0-710e-4fa6-95fe-2b57226007aa_original.png"
        }
    },
    {
        "id": "2206072050206902109",
        "slug": "gasdao",
        "name": "Gas Dao",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 45196,
        "votersCount": 601,
        "governorIds": [
            "eip155:1:0x5B1751306597A76C8E6D2BFb8e952f8855Ed976d"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/285b3971-0dbc-4fdb-a7e6-6b998cb04a3c_400x400.jpg"
        }
    },
    {
        "id": "2206072049972021115",
        "slug": "mahadao-old",
        "name": "MahaDAO [Depreciated]",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 549,
        "votersCount": 544,
        "governorIds": [
            "eip155:1:0x0fBd92eA11e23D959E1489A9Abb84ae2E4778D31"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/93a41fa1-05ab-4812-b4ff-12aaf15d7f88_original.png"
        }
    },
    {
        "id": "2206072049896523061",
        "slug": "mahadao-master-governor",
        "name": "Maha Master [Depreciated]",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 549,
        "votersCount": 544,
        "governorIds": [
            "eip155:1:0xADaA4758F532F3e7A6E2c0F08Ed66362c3d118C2"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/f73f7729-01a0-4386-9545-4d5b5c564a42_original.png"
        }
    },
    {
        "id": "2206072049888134366",
        "slug": "mahadao-1",
        "name": "MahaDAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 549,
        "votersCount": 544,
        "governorIds": [
            "eip155:1:0xe7D23C2B3E9148c46ceC796F018842ab72D5867F"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/f7c3307b-8353-4d3c-b19c-0d266e992eb5_original.png"
        }
    },
    {
        "id": "2206072050332731289",
        "slug": "collab-land",
        "name": "Collab.Land",
        "chainIds": [
            "eip155:10"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 111236,
        "votersCount": 528,
        "governorIds": [
            "eip155:10:0xb18c10E49bC7C5f09A564f3A8DaF28Df54dc6672"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/e9964d8b-ea37-4950-9da4-0e5b727655ee_original.png"
        }
    },
    {
        "id": "2206072050324342616",
        "slug": "pooltogether",
        "name": "PoolTogether",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 89,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 8608,
        "votersCount": 514,
        "governorIds": [
            "eip155:1:0x8a907De47E00830a2b742db65e938a3ea1070A2E",
            "eip155:1:0xB3a87172F555ae2a2AB79Be60B336D2F7D0187f0"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/0d2f9100-f0f7-4781-9d7b-c546ed6a73d3_400x400.jpg"
        }
    },
    {
        "id": "2206072050215290764",
        "slug": "metastonez-dao",
        "name": "MetaStonez DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 413,
        "votersCount": 414,
        "governorIds": [
            "eip155:1:0x1E9dbb304d1e65429EFf0D4B0C38d813A6135ad9"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/c6679817-a03a-4d33-b82b-3e7e617819db_original.png"
        }
    },
    {
        "id": "2206072050131403990",
        "slug": "rari-capital",
        "name": "Rari Capital",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 12,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 24030,
        "votersCount": 348,
        "governorIds": [
            "eip155:1:0x91d9c2b5cF81D55a5f2Ecc0fC84E62f9cd2ceFd6",
            "eip155:1:0x637deEED4e4deb1D222650bD4B64192abf002c00"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/3222d0f0-2e45-4209-b610-3ec0d16c591e_400x400.jpg"
        }
    },
    {
        "id": "2206072050307565251",
        "slug": "indexed",
        "name": "Indexed",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 29,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 5406,
        "votersCount": 336,
        "governorIds": [
            "eip155:1:0x95129751769f99CC39824a0793eF4933DD8Bb74B"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/2ceb8659-4a73-46d1-b2a2-1309b4246945_400x400.jpg"
        }
    },
    {
        "id": "2206072050408228382",
        "slug": "tribe-nopedao",
        "name": "Tribe NopeDAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 9,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 14524,
        "votersCount": 332,
        "governorIds": [
            "eip155:1:0x6C7aF43Ce97686e0C8AcbBc03b2E4f313c0394C7"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/3fd69663-c5d5-4d56-9244-e754c3b7cd23_original.png"
        }
    },
    {
        "id": "2206072049997186188",
        "slug": "increment",
        "name": "Increment",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1798,
        "votersCount": 293,
        "governorIds": [
            "eip155:1:0x134E7ABaF7E8c440f634aE9f5532A4df53c19385"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/838a31fe-662b-4ac8-8bcb-7129c5107a8a_original.png"
        }
    },
    {
        "id": "2206072050022352173",
        "slug": "hifi-dao",
        "name": "Hifi DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 5,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 2010,
        "votersCount": 176,
        "governorIds": [
            "eip155:1:0xef0A0421Ea43b602E5Be35e9018Dd3E34Bcee007"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/0f8cdc4f-e509-4095-a558-efbec5e26260_original.png"
        }
    },
    {
        "id": "2206072050416616995",
        "slug": "dimo",
        "name": "DIMO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 6,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 25032,
        "votersCount": 158,
        "governorIds": [
            "eip155:137:0xD203e37D96cC0b9b7Dc00fC3fDfcf1b1A2E8c547"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/ecea97aa-82ad-45de-87fe-4d11ab4cbe93_original.png"
        }
    },
    {
        "id": "2206072050089461594",
        "slug": "inedible",
        "name": "Inedible",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1628,
        "votersCount": 155,
        "governorIds": [
            "eip155:1:0xB787139B526c6aecF5d21B1288539B94e9769BF3"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/bcb87a71-c4e4-4b2c-a41e-e95b49798933_original.png"
        }
    },
    {
        "id": "2206072050206902110",
        "slug": "dfrag",
        "name": "Defrag",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 153,
        "votersCount": 152,
        "governorIds": [
            "eip155:1:0x5ff6D58DEFDbd783f4f88E80E94D9481E2Bb0a45"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/a5407542-2c34-497a-902b-8677998e8c8a_400x400.jpg"
        }
    },
    {
        "id": "2206072050307565252",
        "slug": "inverse",
        "name": "Inverse",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 29,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 3676,
        "votersCount": 136,
        "governorIds": [
            "eip155:1:0x35d9f4953748b318f18c30634bA299b237eeDfff"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/805187f5-a562-4bb8-8b06-2ca6967301ed_400x400.jpg"
        }
    },
    {
        "id": "2206072050215290765",
        "slug": "union",
        "name": "Union",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 11,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 352,
        "votersCount": 103,
        "governorIds": [
            "eip155:1:0xe1b3F07a9032F0d3deDf3E96c395A4Da74130f6e"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/7873aa6b-9eb3-45f4-8e94-87fdb2077686_original.png"
        }
    },
    {
        "id": "2206072049896523047",
        "slug": "sudoswap",
        "name": "sudoswap DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 7,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 2382,
        "votersCount": 102,
        "governorIds": [
            "eip155:1:0x6853f8865BA8e9FBd9C8CCE3155ce5023fB7EEB0"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/c8e4a42a-b60f-41a6-9cff-3f78cd22bfaf_original.png"
        }
    },
    {
        "id": "2206072050408228384",
        "slug": "dafo-club",
        "name": "DAFO Club",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 3,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 87,
        "votersCount": 87,
        "governorIds": [
            "eip155:1:0x41FA7898cC5067Eb1ee73A2205eE30cC514D6C71"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/785ec80a-5fcd-49e8-b50b-26c9dcd7c7b8_original.jpeg"
        }
    },
    {
        "id": "2206072050089461572",
        "slug": "radworks",
        "name": "Radworks",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 20,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 7114,
        "votersCount": 83,
        "governorIds": [
            "eip155:1:0x690e775361AD66D1c4A25d89da9fCd639F5198eD"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/27b89303-1412-45b6-acfc-4e93aa4f4630_original.png"
        }
    },
    {
        "id": "2206072049938466471",
        "slug": "blur",
        "name": "Blur",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 54429,
        "votersCount": 83,
        "governorIds": [
            "eip155:1:0xF7967b43949Fb0Cec48e63e345512d5Ea5845810"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/13e8e68b-c46d-4ee5-ae67-fcb366e81e0a_original.png"
        }
    },
    {
        "id": "2206072050433394350",
        "slug": "lucidao",
        "name": "Lucidao",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 18,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1644,
        "votersCount": 82,
        "governorIds": [
            "eip155:137:0xac1fdCA2Be645E3e06c7832613a78C72135DA945"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/c8415fa4-8f40-40b5-9b95-7923833a3e43_original.png"
        }
    },
    {
        "id": "2206072050206902135",
        "slug": "silo",
        "name": "Silo",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 54,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 3130,
        "votersCount": 70,
        "governorIds": [
            "eip155:1:0xA89163F7B2D68A8fbA6Ca36BEEd32Bd4f3EeAf61"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/9c5c9d1a-2fa7-4860-8516-bd958acfc22a_400x400.jpg"
        }
    },
    {
        "id": "2206072050240455818",
        "slug": "code4rena",
        "name": "Code4rena",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 26,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 168,
        "votersCount": 69,
        "governorIds": [
            "eip155:137:0x4Db7E521942BDA8b1fB1B310280135ba4B9c2bee"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/1b659aed-1cf8-4717-b3f0-a92ce632de7b_original.png"
        }
    },
    {
        "id": "2206072050466949088",
        "slug": "baconcoin",
        "name": "BaconCoin",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 11,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 332,
        "votersCount": 67,
        "governorIds": [
            "eip155:1:0xaBB55d166Bb028d0d73c9aA31e294c88cFE29579"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/8ffd354f-1ddb-49f4-8ae5-620157d79222_original.png"
        }
    },
    {
        "id": "2206072050458560435",
        "slug": "old-idle-dao",
        "name": "[old] Idle DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 18,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 3760,
        "votersCount": 62,
        "governorIds": [
            "eip155:1:0x2256b25CFC8E35c3135664FD03E77595042fe31B"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/bccbeff1-6321-4aa9-bcf9-526e0e32dd53_original.png"
        }
    },
    {
        "id": "2206072050408228376",
        "slug": "idle",
        "name": "Idle DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 20,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 3760,
        "votersCount": 62,
        "governorIds": [
            "eip155:1:0x3D5Fc645320be0A085A32885F078F7121e5E5375"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/c67b7c6f-e868-4d04-870f-b79ef8c8aa7e_original.png"
        }
    },
    {
        "id": "2206072050022352198",
        "slug": "degenx-ecosystem",
        "name": "DegenX Ecosystem",
        "chainIds": [
            "eip155:43114"
        ],
        "proposalsCount": 17,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 531,
        "votersCount": 59,
        "governorIds": [
            "eip155:43114:0xbdA8dcEB22b0e06Ad612f339C41539Ea2ddCCEf8"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/320e4d0c-92a7-4335-a800-a16c8e104c08_original.png"
        }
    },
    {
        "id": "2206072050240455819",
        "slug": "degen-dogs",
        "name": "Degen Dogs",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 23,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 56,
        "votersCount": 54,
        "governorIds": [
            "eip155:137:0x18288e01e2247166d7dF094743a5669BF7fDAaD2"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/b5aa23b1-10ac-472b-b4c0-42d67c57e758_original.png"
        }
    },
    {
        "id": "2206072050416617005",
        "slug": "threshold-network",
        "name": "Threshold Network",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 17,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 6655,
        "votersCount": 50,
        "governorIds": [
            "eip155:1:0xd101f2B25bCBF992BdF55dB67c104FE7646F5447"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/ca23f8a9-8c78-47c2-a10a-877a6e087153_original.png"
        }
    },
    {
        "id": "2206072050307565244",
        "slug": "instadapp",
        "name": "InstaDapp",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 7,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 3483,
        "votersCount": 48,
        "governorIds": [
            "eip155:1:0x0204Cd037B2ec03605CFdFe482D8e257C765fA1B"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/f92e852c-0c8a-4e75-9918-b4ba1592ffcd_400x400.jpg"
        }
    },
    {
        "id": "2206072050458560427",
        "slug": "babylon",
        "name": "Babylon Finance",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 28,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1099,
        "votersCount": 46,
        "governorIds": [
            "eip155:1:0xBEC3de5b14902C660Bd2C7EfD2F259998424cc24"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/0ae786cd-eb5d-4459-9892-f97f088a0fb2_400x400.jpg"
        }
    },
    {
        "id": "2232026004035995286",
        "slug": "good-entry",
        "name": "Good Entry",
        "chainIds": [
            "eip155:42161"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1824,
        "votersCount": 42,
        "governorIds": [
            "eip155:42161:0xDea8f5634970557DC7938d07a1944bC33a4528a3"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/01f361be-c65b-486f-b933-a7ce921edf60_original.png"
        }
    },
    {
        "id": "2206072050466949094",
        "slug": "mtgoxnft-dao",
        "name": "MtGoxNFT DAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 3,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1864,
        "votersCount": 38,
        "governorIds": [
            "eip155:137:0x4c21dF91283A435714E90367932084ECa456D021"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/87f07e10-790e-405d-b660-619475652f37_400x400.jpg"
        }
    },
    {
        "id": "2206072050433394370",
        "slug": "femboy-dao",
        "name": "Femboy DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 37,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 174,
        "votersCount": 33,
        "governorIds": [
            "eip155:1:0x710C7E422A98963d6BA216840b1d83E77064A031"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/ef1c7f59-bfdd-4d05-b23f-b9713e4a8fdb_original.png"
        }
    },
    {
        "id": "2206072050458560422",
        "slug": "blockswap-dao-805",
        "name": "Blockswap DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 9,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 354,
        "votersCount": 30,
        "governorIds": [
            "eip155:1:0x8869A94df9200C75116A285e12E85C24179129E1"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/804aa109-69d1-4cf5-aef0-e08b94077e17_original.png"
        }
    },
    {
        "id": "2206072049930077747",
        "slug": "pooh",
        "name": "Pooh",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 21,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 14757,
        "votersCount": 27,
        "governorIds": [
            "eip155:1:0xa5DbAae3daD2784D6B61ef56f934768EfE9d1336"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/f2b0b44c-fe0e-4d43-a042-004438624bdd_original.jpeg"
        }
    },
    {
        "id": "2206072050039129561",
        "slug": "wendao",
        "name": "WEN DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 4105,
        "votersCount": 26,
        "governorIds": [
            "eip155:1:0xcd5F6EE0282162452B6bDcC689d29c5B12fE9163"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/dc5b2d29-af3a-4a48-b6d1-2cef212e63fe_original.png"
        }
    },
    {
        "id": "2206072050215290818",
        "slug": "thurman",
        "name": "Thurman",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 4,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 30,
        "votersCount": 25,
        "governorIds": [
            "eip155:1:0x6518998C230Ceb7A7AD530c7088f0747604C06f5"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/e8cc190d-3c82-4601-aeab-a72556ef3c02_original.png"
        }
    },
    {
        "id": "2206072050441783052",
        "slug": "mojos-dao",
        "name": "Mojos DAO",
        "chainIds": [
            "eip155:10"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 22,
        "votersCount": 22,
        "governorIds": [
            "eip155:10:0x7d347cb7473dA7f64f9Ea940a6F9b5e1b3f89559"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/98d7c7e8-df9a-44be-a56d-856c1d4d825b_original.png"
        }
    },
    {
        "id": "2206072050324342555",
        "slug": "lybra-dao",
        "name": "Lybra DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1656,
        "votersCount": 20,
        "governorIds": [
            "eip155:1:0x62173C25a96Abfe84e45fd62cbA2521772f4FaEb"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/16d65a76-82c9-4990-811b-935d16aebd68_original.png"
        }
    },
    {
        "id": "2206072050307565253",
        "slug": "unslashed",
        "name": "Unslashed",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 7,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1444,
        "votersCount": 19,
        "governorIds": [
            "eip155:1:0xA0Ae994229b1BC31850d8A17a273904D1Ed12190"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/8c22c138-3192-4a84-a11a-d29c49c2b803_400x400.jpg"
        }
    },
    {
        "id": "2206072050307565243",
        "slug": "armor",
        "name": "Armor",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 7,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 150,
        "votersCount": 19,
        "governorIds": [
            "eip155:1:0x5aFeDeF1454CDd11d4705c06aa4D66Aa396343f6"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/8783473d-7f07-4d5f-9a77-16ebc96107e0_400x400.jpg"
        }
    },
    {
        "id": "2206072049837803315",
        "slug": "emptyset",
        "name": "Emptyset",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 6,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 400,
        "votersCount": 18,
        "governorIds": [
            "eip155:1:0x47C61a54B1d24d571F07a79d54543231292f769b"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/3991c3e8-caf8-4a89-8aea-f6a8bc9b039c_original.png"
        }
    },
    {
        "id": "2206072050433394351",
        "slug": "aggregated-finance",
        "name": "Aggregated Finance",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 6,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1172,
        "votersCount": 17,
        "governorIds": [
            "eip155:1:0xD243F9aAfCf32e60b2e9D0FF016cf7f1552d5952"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/ac182461-023d-45a1-b52d-a0bf0df435c1_original.png"
        }
    },
    {
        "id": "2206072050206902120",
        "slug": "braintrust",
        "name": "Braintrust",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 6,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 5065,
        "votersCount": 17,
        "governorIds": [
            "eip155:1:0x1a0D3d5a43e53510f80F16905Bc96e907A47dD01"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/090cc5ce-b99b-40cf-985c-05e162654370_400x400.jpg"
        }
    },
    {
        "id": "2206072050156570008",
        "slug": "eth",
        "name": "ETH+",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 3,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 35,
        "votersCount": 17,
        "governorIds": [
            "eip155:1:0x239cDcBE174B4728c870A24F77540dAB3dC5F981"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/850b7f58-1a22-43cc-9442-2e342a4c861c_original.png"
        }
    },
    {
        "id": "2206072050492114115",
        "slug": "test-735",
        "name": "test",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 116,
        "votersCount": 16,
        "governorIds": [
            "eip155:137:0xA94d9679950fC31cAE1f1373142AD8f668dcACC4"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/acfb81be-1581-4bb5-9444-d467622991d2_original.png"
        }
    },
    {
        "id": "2206072050148181370",
        "slug": "high-yield-usd",
        "name": "High Yield USD",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 5,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 39,
        "votersCount": 14,
        "governorIds": [
            "eip155:1:0x22d7937438b4bBf02f6cA55E3831ABB94Bd0b6f1"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/fdf5320b-8f11-4608-9d26-38bb46842be9_original.png"
        }
    },
    {
        "id": "2206072049829414615",
        "slug": "Toupee-Tech-2",
        "name": "Toupee Tech",
        "chainIds": [
            "eip155:8453"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 603,
        "votersCount": 14,
        "governorIds": [
            "eip155:8453:0x46e77D8349BA8AE9137B89196A61FFEE2c8c64B4"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/58356568-a434-49d7-94c1-f3cf95913342_original.png"
        }
    },
    {
        "id": "2206072050433394405",
        "slug": "ratalert",
        "name": "RatAlert",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 3,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 48,
        "votersCount": 13,
        "governorIds": [
            "eip155:137:0xb85F643F9bb94a30c1B95e9dC3bADff771B749A6"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/0f783883-11bb-444b-8a9e-941202cd2f84_original.png"
        }
    },
    {
        "id": "2206072050206902106",
        "slug": "cryptex",
        "name": "Cryptex",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 16,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1945,
        "votersCount": 13,
        "governorIds": [
            "eip155:1:0x874C5D592AfC6803c3DD60d6442357879F196d5b"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/15f21cc4-7bbc-46c9-82df-d4bd4c0228db_400x400.jpg"
        }
    },
    {
        "id": "2206072050383062316",
        "slug": "bpropotocl",
        "name": "Bprotocol",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1310,
        "votersCount": 12,
        "governorIds": [
            "eip155:1:0xbbBBBb512661E9A574A8A3E8c12AfAf647E98809"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/33f092c2-1720-48c7-b625-a134864aa372_400x400.jpg"
        }
    },
    {
        "id": "2206072049896523079",
        "slug": "context-protocol",
        "name": "Context Protocol",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 30,
        "votersCount": 12,
        "governorIds": [
            "eip155:137:0xC892E337d73F606C801809bf16bE69C7f42ca5F1"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/558981b8-977c-41ad-863b-a394127b38bf_original.png"
        }
    },
    {
        "id": "2206072050466949089",
        "slug": "antfarm-dao",
        "name": "Antfarm DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 11,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 68,
        "votersCount": 11,
        "governorIds": [
            "eip155:1:0xD63123527551F037fAAc74bf5fDA5B71569cf5af"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/488e298c-f5b4-474c-a93e-69926bf2e7f1_original.png"
        }
    },
    {
        "id": "2206072050441783053",
        "slug": "pony-finance",
        "name": "Pony Finance",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 14,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 116,
        "votersCount": 11,
        "governorIds": [
            "eip155:1:0x6CC90C97a940b8A3BAA3055c809Ed16d609073EA"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/f5106fc4-fd29-4d92-bf7f-fe60f7cd0048_original.png"
        }
    },
    {
        "id": "2206072050416616997",
        "slug": "bigcap",
        "name": "BIGCAP",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 19,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 220,
        "votersCount": 11,
        "governorIds": [
            "eip155:1:0x442660DDf67dd90f9a75885b2e2312F991b3027B"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/1a1a0afb-d4ba-4fb1-8ec9-7038b6f139a6_original.png"
        }
    },
    {
        "id": "2206072050315953907",
        "slug": "kroma-security-council-l2",
        "name": "Kroma Security Council (L2)",
        "chainIds": [
            "eip155:255"
        ],
        "proposalsCount": 3,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 9,
        "votersCount": 10,
        "governorIds": [
            "eip155:255:0x636E63F4ED43E396b2454560ab4E6a37581C6e90"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/ffe6e2ca-bf7f-4262-a92d-886782b71ce0_original.png"
        }
    },
    {
        "id": "2206072050433394352",
        "slug": "signata-dao",
        "name": "Signata DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 8,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 61,
        "votersCount": 9,
        "governorIds": [
            "eip155:1:0x3D3255D21654B9a8325DfE6353ac6B37352Eb80B"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/6028db2a-b111-498c-87c8-7552007d8321_original.png"
        }
    },
    {
        "id": "2206072049837803280",
        "slug": "content-guild",
        "name": "Content Guild",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 102,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 12,
        "votersCount": 9,
        "governorIds": [
            "eip155:137:0x26217Ec5044AEB8D6495BC68eE91951cd7Bb02a0"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/35effe07-180d-4b55-9998-4ad983e9d8ba_original.png"
        }
    },
    {
        "id": "2206072050441783032",
        "slug": "firebot",
        "name": "FireBot",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1324,
        "votersCount": 8,
        "governorIds": [
            "eip155:137:0x1C10dB92C0a6e2bf089f08A60fA98158359aE457"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/56af4902-9c21-45ad-9fdc-bcdba8312633_original.png"
        }
    },
    {
        "id": "2206072050399839664",
        "slug": "ease-1226",
        "name": "Ease",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 22,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 8,
        "governorIds": [
            "eip155:1:0xEA5eDeF17c4FCE9C120790F3c54D6E04823dE587"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/dc527eb4-f637-4dbc-bfeb-31353e410c7a_original.png"
        }
    },
    {
        "id": "2206072050483725391",
        "slug": "hashstrat",
        "name": "HashStrat",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 8,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 7,
        "votersCount": 7,
        "governorIds": [
            "eip155:137:0xEEE17dd25c6ac652c434977D291b016b9bA61a1A"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/4ffd87d2-8000-492b-a3fa-6e33d4c9ef0d_original.png"
        }
    },
    {
        "id": "2206072050341119939",
        "slug": "mythical-dao",
        "name": "Mythical DAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 27,
        "votersCount": 7,
        "governorIds": [
            "eip155:137:0x7B9e327748462F1038c9D081c98d189b22C60A27"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/624725e8-a3fc-470e-96e1-f8aacd6dcfe8_original.png"
        }
    },
    {
        "id": "2206072050341119928",
        "slug": "mythical-dao1wrong",
        "name": "Mythical DAO v1",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 27,
        "votersCount": 7,
        "governorIds": [
            "eip155:137:0xA7B6B9E380BBea4CecBD51E1073C4e96D20f66b4"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/678eb170-2a1b-4bdd-b93e-110c0e822aa3_original.png"
        }
    },
    {
        "id": "2206072050257233121",
        "slug": "stability",
        "name": "Stability",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 125,
        "votersCount": 7,
        "governorIds": [
            "eip155:137:0x6214Ba4Ce85C0A6F6025b0d63be7d65214463226"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/82384594-325a-4db7-96fe-e2e6a639a393_400x400.jpg"
        }
    },
    {
        "id": "2206072050248844504",
        "slug": "jamonswap",
        "name": "JamonSwap",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 11,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 318,
        "votersCount": 7,
        "governorIds": [
            "eip155:137:0xd7f337d597E4A5d891b7882aBcB4C1d3f7D4Cb97"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/cc0e6a90-e4d7-40a0-b825-b9f766d8fef0_400x400.jpg"
        }
    },
    {
        "id": "2242979462427706599",
        "slug": "merlin-protocol-dao",
        "name": "Merlin Protocol",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 15,
        "votersCount": 6,
        "governorIds": [
            "eip155:137:0x2c27F6711691caeC58B631bb15c5a08ca8d4A2E7"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/74df48b1-10d7-439b-8973-fef9fe1bec3e_original.png"
        }
    },
    {
        "id": "2206072050081072960",
        "slug": "niftydao",
        "name": "NiftyDAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 89,
        "votersCount": 6,
        "governorIds": [
            "eip155:1:0x930e4bA52a5d2E24980290fcb51392462a7ab308"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/94cb5771-ef6a-4292-999d-7eb7be30f042_original.jpeg"
        }
    },
    {
        "id": "2206072050475336746",
        "slug": "tdtt",
        "name": "Tdtt",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 3,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 13,
        "votersCount": 5,
        "governorIds": [
            "eip155:137:0x10c2032dD5012cDFDAF9728FD158D687329dF6ed"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/73399539-837f-4c23-85e3-31528001fad0_original.jpeg"
        }
    },
    {
        "id": "2206072050416617006",
        "slug": "relevant-dao",
        "name": "Relevant DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 6,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 31,
        "votersCount": 5,
        "governorIds": [
            "eip155:1:0x663d77b608B05b81B0a826a558e1665AC6e00C36"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/3b2f09a7-13b7-41ac-8791-79b95d7cc0b9_400x400.jpg"
        }
    },
    {
        "id": "2206072050416617000",
        "slug": "entrypoint",
        "name": "entrypoint",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 10,
        "votersCount": 5,
        "governorIds": [
            "eip155:137:0xC672F1D0Dc62405deBfb0C54e7766c42f4FE0Ac3"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/ccc6e8a1-7551-40af-a382-b66c4637a056_original.png"
        }
    },
    {
        "id": "2206072050374673629",
        "slug": "inc-governor",
        "name": "INC Governor",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1533,
        "votersCount": 5,
        "governorIds": [
            "eip155:137:0x9a342e71abEab4B9F47Daf520D4C8df3bE938153"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/40eb42b1-4a47-4532-8696-937d6fd3de71_original.png"
        }
    },
    {
        "id": "2206072050064295602",
        "slug": "ayaan",
        "name": "77777",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 9,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 6,
        "votersCount": 5,
        "governorIds": [
            "eip155:1:0x1a356189E5d553e900Ecc5E86cB41FBb9f35FD38"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/9e9eb67b-eb1f-4ebf-a040-c9fba5ccd5bf_original.png"
        }
    },
    {
        "id": "2206072050039129562",
        "slug": "plasma",
        "name": "0xPlasma DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 6155,
        "votersCount": 5,
        "governorIds": [
            "eip155:1:0x7614992e714e88424402eBEE62d003d08e2A35f1"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/9dd43a21-f273-4b6d-8414-fbc186ae7728_original.png"
        }
    },
    {
        "id": "2206072049980409843",
        "slug": "savanna-dao",
        "name": "Savanna DAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 3,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 6,
        "votersCount": 5,
        "governorIds": [
            "eip155:137:0xCC4aB2456F4b30C72888E564b5653095Ce76AC23"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/e8104917-a19f-444b-9f1f-831a2b4dae3a_original.png"
        }
    },
    {
        "id": "2206072049904911696",
        "slug": "bambi-cash-dao",
        "name": "Bambi Cash DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 5,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 6318,
        "votersCount": 5,
        "governorIds": [
            "eip155:1:0xee8960fbbdbB6EBbEE01c11b1F6Caac0ac9fECc6"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/dc56e61f-6cb0-4b59-9ddf-e18ad33cff50_original.jpeg"
        }
    },
    {
        "id": "2206072049871356968",
        "slug": "brownwatersdao",
        "name": "Brown Waters Dao",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 79,
        "votersCount": 5,
        "governorIds": [
            "eip155:137:0x19733aC20CEd46593E29Ac27230069A2F8df6A3b"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/f041cb15-2dbc-4dee-8519-0d2ee58d63ba_original.png"
        }
    },
    {
        "id": "2206072049821025967",
        "slug": "sector-3",
        "name": "Sector#3",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 8,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 12,
        "votersCount": 5,
        "governorIds": [
            "eip155:1:0x1C9a7ced4CAdb9c5a65E564e73091912aaec7494"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/426e48a8-bab8-452e-9208-243fe43003d8_original.png"
        }
    },
    {
        "id": "2206072050441783078",
        "slug": "ubuntu-village-zanzibar",
        "name": "Ubuntu Village Zanzibar",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 13,
        "votersCount": 4,
        "governorIds": [
            "eip155:1:0x1Da276eCD8eE0A09a4668E3A1802C8d2Fa34f61f"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/4ebc568e-21ed-4105-b11b-659fac2085d7_original.png"
        }
    },
    {
        "id": "2206072050416617001",
        "slug": "souleigh-dao",
        "name": "Souleigh DAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 4,
        "votersCount": 4,
        "governorIds": [
            "eip155:137:0x09093A5b9623aACd65BFB707b02E47a9d6f5C211"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/e3180551-47ab-4956-b7f6-4c434c28c023_original.png"
        }
    },
    {
        "id": "2206072050089461631",
        "slug": "SWEEP-TEST-GOVERNANCE-2",
        "name": "SWEEP TEST GOVERNANCE",
        "chainIds": [
            "eip155:42161"
        ],
        "proposalsCount": 3,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 5,
        "votersCount": 4,
        "governorIds": [
            "eip155:42161:0xD013237b30e5Bcd8924b85aCA7b2254DF06D5B92"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/1777de3f-de05-457b-9310-b5c26b3cd8cc_original.png"
        }
    },
    {
        "id": "2206072050064295585",
        "slug": "sector-3-optimism",
        "name": "Sector#3 (Optimism)",
        "chainIds": [
            "eip155:10"
        ],
        "proposalsCount": 3,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 12,
        "votersCount": 4,
        "governorIds": [
            "eip155:10:0x8087dE46076212A21EA5cD8b4368BCbd826d7B32"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/268e141b-ec0e-44ba-b148-a518aea553bc_original.png"
        }
    },
    {
        "id": "2230882835751766006",
        "slug": "guinea-pig-dao",
        "name": "Guinea Pig DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 5,
        "votersCount": 3,
        "governorIds": [
            "eip155:1:0x96032D2B0640c220Fc5128cac3E4962AcA570C61"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/147f00f8-f01a-4568-b68d-1a75535689c3_original.png"
        }
    },
    {
        "id": "2206072050366284955",
        "slug": "nft-butterfly-lab-gov",
        "name": "NFT Butterfly Lab Gov",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 7,
        "votersCount": 3,
        "governorIds": [
            "eip155:137:0xA2Fef71e0d919e577eB98091A6fc2B193de8d0C4"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/d94e7585-8ce8-4759-bf96-0bcb4ac5f748_original.png"
        }
    },
    {
        "id": "2206072050148181367",
        "slug": "mythical-simulator",
        "name": "Mythical Simulator",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 8,
        "votersCount": 3,
        "governorIds": [
            "eip155:137:0x8814a7B818433d88CC1490e0897Cdd83aD8680D9"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/f5a76eb8-c0c9-4d4d-90c0-0437817a3501_original.png"
        }
    },
    {
        "id": "2206072050064295600",
        "slug": "amphora-dao",
        "name": "Amphora DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 5,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 34,
        "votersCount": 3,
        "governorIds": [
            "eip155:1:0xA905f9f0b525420d4E5214E73d70dfFe8438D8C8"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/3458677a-eff2-4ca3-bd66-1f126ec6a005_original.png"
        }
    },
    {
        "id": "2206072050047518246",
        "slug": "gramsdao",
        "name": "GRAMS DAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 8,
        "votersCount": 3,
        "governorIds": [
            "eip155:137:0x82299BC2915e9827cFb02d1CBa8E4fF536587De1"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/5cd3dc33-f200-4c6a-a811-9226359234a8_original.png"
        }
    },
    {
        "id": "2206072049913300410",
        "slug": "web3-hackers-collective",
        "name": "Web3 Hackers Collective",
        "chainIds": [
            "eip155:10"
        ],
        "proposalsCount": 7,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 3,
        "votersCount": 3,
        "governorIds": [
            "eip155:10:0x83E2403A8b94AF988B4F4Ae9869577783b8CD216"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/e90f0f55-3ab2-4a4a-87af-1c352e9deb59_original.png"
        }
    },
    {
        "id": "2206072049837803287",
        "slug": "HKW_USA_DAO-2",
        "name": "HKW_USA_DAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 5,
        "votersCount": 3,
        "governorIds": [
            "eip155:137:0xF8723921e48D123B54dA6BA8F7C66363FD63A9CE"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/23c63657-6d86-4df1-95bb-137b4e313230_original.png"
        }
    },
    {
        "id": "2206072049829414580",
        "slug": "pepe-cash",
        "name": "PEPE CASH",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 3,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 245,
        "votersCount": 3,
        "governorIds": [
            "eip155:1:0x6B9b2828C949FC98e9D98958900e96B4145B664d"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/030332c7-cab1-432d-a763-c9f42a7be3cd_original.png"
        }
    },
    {
        "id": "2206072050500502744",
        "slug": "ondo-test-1601",
        "name": "Ondo-Test",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 8,
        "votersCount": 2,
        "governorIds": [
            "eip155:137:0x93073f64d2e8eADc69D760bD8f24EBdE4236dbA3"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/1b8ad03c-f181-4924-86b5-3ba07a2e5c3a_original.png"
        }
    },
    {
        "id": "2206072050433394392",
        "slug": "acmetest-543",
        "name": "ACMETest",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 8,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 2,
        "votersCount": 2,
        "governorIds": [
            "eip155:137:0x046B8CEc619F1577462973D396B4f47244d669D4"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/24d36225-257a-44db-bfdc-39212dbe350b_original.png"
        }
    },
    {
        "id": "2206072050416617013",
        "slug": "cryptocult",
        "name": "CryptoCult with Gov",
        "chainIds": [
            "eip155:56"
        ],
        "proposalsCount": 4,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 2,
        "votersCount": 2,
        "governorIds": [
            "eip155:56:0x7595654aaA0BCbC0358cC65C01D20f8c49A5BEd0"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/facab2e9-0b4b-408f-8e45-16d1be67ba18_original.png"
        }
    },
    {
        "id": "2206072050357896291",
        "slug": "shenxianju-dao",
        "name": "Shenxianju DAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 2,
        "votersCount": 2,
        "governorIds": [
            "eip155:137:0x617924bBe1361e0F94A01cc245f83DfD78b909D8"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/8a11aa81-f4c0-4fb0-933a-a55ddd2fc812_original.jpeg"
        }
    },
    {
        "id": "2206072050357896290",
        "slug": "wagmi1",
        "name": "WAGMI1",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 2,
        "votersCount": 2,
        "governorIds": [
            "eip155:137:0x648e61f8530179ffD67eB635fD4B5BBd26E33532"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/07d979aa-d814-4a31-a8e0-e4e208e65cc3_original.png"
        }
    },
    {
        "id": "2206072050357896289",
        "slug": "panda-ventures-dao",
        "name": "Panda Ventures DAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 10,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 2,
        "votersCount": 2,
        "governorIds": [
            "eip155:137:0x8b4aB08dF28579EC8363D1472cE2d3f9F634C952"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/886265e0-f87a-4c4e-9fdc-b1d1014f622d_original.png"
        }
    },
    {
        "id": "2206072050307565246",
        "slug": "elyfi-34",
        "name": "Elyfi",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 21,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 16,
        "votersCount": 2,
        "governorIds": [
            "eip155:1:0x0c54629266d7fa40B4BFaF1640ebC2Cd093866C3"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/0d004a77-18bb-4212-bb0a-07f56f866636_400x400.jpg"
        }
    },
    {
        "id": "2206072050223679485",
        "slug": "under3",
        "name": "Under3",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 7,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 3,
        "votersCount": 2,
        "governorIds": [
            "eip155:137:0x9B3a9e3f289095A7E1117deb3bD29Fd7C1320D81"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/a5054e92-ff63-4c15-9658-16fed8b00e22_400x400.jpg"
        }
    },
    {
        "id": "2206072050215290787",
        "slug": "rektdao-204",
        "name": "RektDAO",
        "chainIds": [
            "eip155:43114"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 5,
        "votersCount": 2,
        "governorIds": [
            "eip155:43114:0x5ced075727BE7E9b6E2D1daF787D4336334dBA4d"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/15b23ebe-9c8a-443d-a976-179185c31acb_original.png"
        }
    },
    {
        "id": "2206072050097850303",
        "slug": "guildfi",
        "name": "GuildFi",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 2158,
        "votersCount": 2,
        "governorIds": [
            "eip155:1:0x5759F60E3F2e8C073414fD4653ed25360D92399C"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/11a6603c-83b8-4be8-a6da-ce09972848e2_original.png"
        }
    },
    {
        "id": "2206072050081072910",
        "slug": "bwatest",
        "name": "Bwhale Club",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 9,
        "votersCount": 2,
        "governorIds": [
            "eip155:137:0xf7E10E7BB3a94325E3a3EC4Fe9266e40E0DDf2D1",
            "eip155:137:0x7ADBb8Bd5957EcFb5059f9CE75Fd080F34925e33"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/0012c8aa-3865-4e95-ab57-b3ceaba64189_original.png"
        }
    },
    {
        "id": "2206072049930077772",
        "slug": "w3hc",
        "name": "W3HC",
        "chainIds": [
            "eip155:10"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 3,
        "votersCount": 2,
        "governorIds": [
            "eip155:10:0x81e7fA0a7Fc2Ad0Fde1947d67aD7965038CEde83"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/9a510bf7-a460-4afa-8389-21f5c26d319c_original.png"
        }
    },
    {
        "id": "2206072049896523051",
        "slug": "souleigh-dao-1172",
        "name": "Souleigh DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 2,
        "votersCount": 2,
        "governorIds": [
            "eip155:1:0xD5a89bacaD0939B499a12f7EF456953a8bA70797"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/dbaa5f4d-6e92-41e1-b910-54b679675266_original.png"
        }
    },
    {
        "id": "2271074070151824838",
        "slug": "torque",
        "name": "Torque",
        "chainIds": [
            "eip155:42161"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1010,
        "votersCount": 1,
        "governorIds": [
            "eip155:42161:0x43F726347b5C56325e116b92cc846C3cF50F16c7"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/fbe272dd-6943-4262-9bb2-74ea97ddbe4e_original.png"
        }
    },
    {
        "id": "2265922182079054848",
        "slug": "tshn-0x57c5adf966692482348e3c5993e09dd64ba5001e",
        "name": "ShineDAO Treasury",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 3,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x57C5adF966692482348e3C5993e09Dd64BA5001e"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/b31d35e9-5e1a-4d4f-9f82-c144a79dc228_original.jpeg"
        }
    },
    {
        "id": "2253911060618675290",
        "slug": "hai-old",
        "name": "HAI Old (Deprecated)",
        "chainIds": [
            "eip155:10"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:10:0x44d13EA297942a49E2A0b0112D21FD132A65a06a"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/24545b30-de0a-4bc6-b5fb-85656282d065_original.png"
        }
    },
    {
        "id": "2206072050492114103",
        "slug": "stitchiadao-728",
        "name": "StitchiaDAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 7,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x1Ac9d2EDdD7F061A9748e35Fb1Cd4A6B904C7e09"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/60184399-6707-47e4-877e-39cacd9d0980_original.png"
        }
    },
    {
        "id": "2206072050492114073",
        "slug": "ethernalotto-1562",
        "name": "EthernaLotto",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 11,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:1:0x7F5CA8e9664D66Fc7c11d26C7D9B750988d5c8a7"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/e4ec83ae-8086-4045-b3ee-f174452f93ab_original.png"
        }
    },
    {
        "id": "2206072050475336763",
        "slug": "open-delivery-platform-1432",
        "name": "Open Delivery Platform",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 3,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 16,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x91B4e2301f90DCe716758822D6CBAE194Fe25a1e"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/b2d14d4e-67af-40ca-86bc-b9b73651de01_original.png"
        }
    },
    {
        "id": "2206072050475336744",
        "slug": "opendeliveryplatform-1401",
        "name": "OpenDeliveryPlatform",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 4,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 3,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x3B2D48803aB620D39523Da51914f704d76B01a63"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/4e250e56-b977-47d8-a730-62fa2212807b_original.png"
        }
    },
    {
        "id": "2206072050475336737",
        "slug": "dex-1392",
        "name": "DEX",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 19,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0xC499560F09c323622878cBDaf7322270E84D89B1"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/6ff07916-99db-42de-98ee-15f5888fa810_original.png"
        }
    },
    {
        "id": "2206072050466949079",
        "slug": "jffdao-1019",
        "name": "JFFDao",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x096aDc2290c13e0B0a5F0ca046A89abb9b59cF42"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/f4ba4793-dc56-406b-a46a-8827effeb890_original.png"
        }
    },
    {
        "id": "2206072050466949076",
        "slug": "gat-928",
        "name": "gat",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x34183E85c6169bB1c3B15BdfD5C1629Ab9f25E43"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/06e2a596-fa43-482b-88f0-1880da6db325_original.png"
        }
    },
    {
        "id": "2206072050466949062",
        "slug": "feiyudao-852",
        "name": "FeiyuDAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 3,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0xB35d794473942369F6Ecc0C383eb9ef88c167564"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/d648d39d-5fb4-48d9-99f6-e5cb9d1d4d88_original.png"
        }
    },
    {
        "id": "2206072050466949060",
        "slug": "wolfdao-850",
        "name": "wolfdao",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x425eAD360cfFDEA4C05d168052b938fbCa97Af32"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/b4bcfa3b-f661-4f1a-832d-8bb31e9fc27c_original.png"
        }
    },
    {
        "id": "2206072050466949056",
        "slug": "azurebluedao-846",
        "name": "azureblueDAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x1ff4F33CC09B8699653d96A1BD181761f792597F"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/bc58ba6b-0821-43cf-a73f-de2783b007b0_original.png"
        }
    },
    {
        "id": "2206072050466949053",
        "slug": "airdroptoyou-842",
        "name": "AirdropToYou",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0xdA8151D4ff3EB4Adf8C610378d317236538C04a2"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/0b1fc310-1530-4fb3-a9d4-471193ae2c72_original.jpeg"
        }
    },
    {
        "id": "2206072050458560377",
        "slug": "omega-gaming-dao-752",
        "name": "Omega Gaming DAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 6,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x70FA67A3233639Ff3EDB275463143DFcEd128E66"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/1c7331db-1c2c-45b9-b753-66c36db5b2dc_original.png"
        }
    },
    {
        "id": "2206072050450171712",
        "slug": "heroes-battle-arena-dao-667",
        "name": "Heroes Battle Arena DAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0xED6E26143947A66Be812f8b1339302f3bD13C975"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/6385bf5d-95a4-4d3a-ac1d-74be1b908a07_original.png"
        }
    },
    {
        "id": "2206072050450171695",
        "slug": "ctrlx-532",
        "name": "CtrlX",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 2,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x5B3F98E40FDb98186871bE10Cd109664C55ebd07"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/24d36225-257a-44db-bfdc-39212dbe350b_original.png"
        }
    },
    {
        "id": "2206072050441783066",
        "slug": "ctrlx-dao-623",
        "name": "CtrlX DAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 3,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0xb5930ADC9f9d19c7ea152F207977Ec1c2Fe450b8"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/24d36225-257a-44db-bfdc-39212dbe350b_original.png"
        }
    },
    {
        "id": "2206072050441783054",
        "slug": "sigma-squared",
        "name": "Sigma Squared",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 3,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 14,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0xBBaA09aBFfe23b70275BD2a87AC6D65B6a0556B7"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/eaa59924-cd76-431d-97e9-937b7db963f8_original.png"
        }
    },
    {
        "id": "2206072050433394387",
        "slug": "ctrl-x-536",
        "name": "Ctrl X",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 2,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0xC7E2F45F710320379b57FfcB9Abc92454f2EBe0A"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/24d36225-257a-44db-bfdc-39212dbe350b_original.png"
        }
    },
    {
        "id": "2206072050433394347",
        "slug": "amazingdao-495",
        "name": "AmazingDAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x72De56D554d17399e3c3A909a93B36bf176AA8a2"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/60c4ff9a-fc7a-4de8-9ab1-f4247970341a_original.png"
        }
    },
    {
        "id": "2206072050425005727",
        "slug": "devicechain-484",
        "name": "DeviceChain",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x96B5e0ad24e6A9e6561aea0Aed9C183f8fDC456b"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/055e01d9-3251-430b-8b23-0509dad58e30_original.jpeg"
        }
    },
    {
        "id": "2206072050425005686",
        "slug": "discdao-439",
        "name": "discDAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 15,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 5,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0xa70a7B6e5644d57A3e9EcfDDBa07D2b094333a49"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/4e38adf6-dadd-43bc-ad43-b278ba7258e5_original.png"
        }
    },
    {
        "id": "2206072050416617031",
        "slug": "dao0z0-385",
        "name": "DAO0Z0",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0xf08Cd0c3f5409B17728e464fB5Adb383ffd21827"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/916bb622-1fca-481d-ae18-ae15f6e69df7_original.jpeg"
        }
    },
    {
        "id": "2206072050416617028",
        "slug": "testondo-381",
        "name": "TestOndo",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 18,
        "votersCount": 1,
        "governorIds": [
            "eip155:1:0xeaA87097991A874EEe2c66B8a09c3dc90e45f6f0"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/952e59b9-9567-46ef-b1b5-b7295443c1b2_original.jpeg"
        }
    },
    {
        "id": "2206072050408228381",
        "slug": "metadao",
        "name": "MetaDAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x0BBF39A4399F047A08446d9771c43d0F5DfA44F7"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/5feb5896-80ca-4677-8013-e9fbea63f8a6_original.png"
        }
    },
    {
        "id": "2206072050408228374",
        "slug": "kongtaoxings-dao-1308",
        "name": "Kongtaoxing's DAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x8d428B7F00B33F7A0511653e89431E9221DE1FD7"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/5274594e-a0c1-4974-b7b8-9a80a7c6372a_original.png"
        }
    },
    {
        "id": "2206072050408228337",
        "slug": "babushediao369-1212",
        "name": "babushediao369",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:1:0x5FaeA8Ba0F14DFdd004f1C7aD6ADFFD9bc38fb71"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/cc73eb2a-d317-40d0-8915-009074c77cb7_original.png"
        }
    },
    {
        "id": "2206072050408228333",
        "slug": "arrowdao-1207",
        "name": "ArrowDAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0xCEEe6f9c46aee00c7e4e7094444755f79e05889C"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/0f9f9326-dfe4-483f-a30a-2dc6465d3881_original.png"
        }
    },
    {
        "id": "2206072050399839704",
        "slug": "sunmeta-1262",
        "name": "sunmeta",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:1:0xF3095deB283b06e336EE2A640684C74EFDb1056e"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/d2843e68-762f-4897-b5e9-7fd99601517f_original.png"
        }
    },
    {
        "id": "2206072050399839700",
        "slug": "odysseydao-1184",
        "name": "OdysseyDao",
        "chainIds": [
            "eip155:42161"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:42161:0xbCC46a8D83B6f16e5b8A99116B4467B82EB04F01"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/252b52c0-c608-4832-ac2b-e9ba308c91d3_original.png"
        }
    },
    {
        "id": "2206072050399839699",
        "slug": "superdao-1183",
        "name": "SuperDao",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x14FD7572bA2549D7037db52db07733A880E595bC"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/3b384805-e6d2-4762-a24d-4166ff3b4655_original.png"
        }
    },
    {
        "id": "2206072050399839679",
        "slug": "maticunicorn-1177",
        "name": "MaticUnicorn",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x2426e2F65Cf95CB84C926081C3F3c3eC319B4BA7"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/54706e3d-c40c-4d6b-9400-eb148a5cf50c_original.png"
        }
    },
    {
        "id": "2206072050399839654",
        "slug": "kekes-first-dao-1168",
        "name": "keke's first DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 4,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:1:0x4626734db08864c9A51564BB2682C980c7390260"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/76ac537a-8c4e-4daa-a4a5-30b607e36f53_original.png"
        }
    },
    {
        "id": "2206072050399839652",
        "slug": "opendao-1195",
        "name": "Opendao",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x6bf7851b03Fa93D604b6A267C4a171E76e127777"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/fc13f566-7006-4c7e-ad4a-82f4ef363d96_original.png"
        }
    },
    {
        "id": "2206072050399839641",
        "slug": "wandergovernor-1169",
        "name": "Wandergovernor",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0xa8c8dc2E3377e7186F5A3efd496D1A573e810B88"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/5758e05b-45fc-4dae-b585-4f69a03d5960_original.png"
        }
    },
    {
        "id": "2206072050399839640",
        "slug": "qq3332-1165",
        "name": "qq3332",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x80A67A3cFaedC69fb5974c31c4F5BF15BF4B26b9"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/5f3a1d88-4bb7-4b5f-b5e4-68eb8c27c17a_original.png"
        }
    },
    {
        "id": "2206072050399839637",
        "slug": "davidma-1162",
        "name": "DAVIDMA",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x49fba172d3912aafC4bA792E63E6241bcd2985Ae"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/b27a8cb6-8402-4c25-9f76-50916d0f7637_original.jpeg"
        }
    },
    {
        "id": "2206072050399839635",
        "slug": "qq333-1160",
        "name": "qq333",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 5,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x3861618e7Ea9D1902E0aFab3C031f238Bc5903C0"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/7a7cce13-84e0-49fa-a5fd-6bc6d2212226_original.png"
        }
    },
    {
        "id": "2206072050399839634",
        "slug": "ll2ms-dao-1153",
        "name": "LL2M's DAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x0871472Ee3D8515b0b424bC7a58b1D6FfD8E99B1"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/85cc3ab5-bec6-406a-b42e-7a322be00a79_original.png"
        }
    },
    {
        "id": "2206072050391451022",
        "slug": "m6cat-1159",
        "name": "m6cat",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0xcb37Fd8529619d6Bce83CF25E1F1eB9421706b84"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/5e5982ae-9a43-455e-a3d2-b9378e7148a2_original.png"
        }
    },
    {
        "id": "2206072050391451001",
        "slug": "aaacat-1142",
        "name": "aaacat",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x98AC04c37CBFD98c81c9A7390dc41771dD0235f3"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/6e534ce1-5518-46b4-8732-5ead19560051_original.png"
        }
    },
    {
        "id": "2206072050391450999",
        "slug": "kdg-gov-1139",
        "name": "kdg gov",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0xdecfa119589a08Be0f61219C61b91381bB5faf48"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/f19f1d52-26fb-400e-9a4a-7ddd5e6829e5_original.jpeg"
        }
    },
    {
        "id": "2206072050391450978",
        "slug": "yiyi-1116",
        "name": "YIYI",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 2,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x140BA6Ab670f96f9521675d6202cdDE06c75ea8F"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/c9b64867-05e1-4651-bb5a-dcf99857daa9_original.png"
        }
    },
    {
        "id": "2206072050383062293",
        "slug": "yangjian-1043",
        "name": "yangjian",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x2cbb64e6b910E0C3a6C6a1099c8Bcabd66706C3E"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/16a78fcc-8c99-4f61-9d7a-fa4088fa3ac1_original.png"
        }
    },
    {
        "id": "2206072050383062285",
        "slug": "nikidao-1027",
        "name": "NIKIDAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 7,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x9b121A1E97F0ddDC17F3B91A7A4aAF2664d33254"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/634f4a06-05a7-48f0-ac21-c18614287aa6_original.png"
        }
    },
    {
        "id": "2206072050383062280",
        "slug": "first-test-gov-1022",
        "name": "First Test Gov",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x055D3b97bFdbff5257Af273ACb637A33F6448e9b"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/7bd56e07-cf60-42b2-86bf-1f6697ff031d_original.png"
        }
    },
    {
        "id": "2206072050374673660",
        "slug": "toydao-1010",
        "name": "toydao",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0xeE76E82fb8581cB00Cf82b5151C922F6ee64b718"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/7101df94-ef1a-42ec-89b8-42f3fc7e968b_original.png"
        }
    },
    {
        "id": "2206072050374673653",
        "slug": "dimension-1002",
        "name": "dimension",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0xDBb035dBD1BE6A64680668a0eED6f86563C651f9"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/c0437d2f-c469-4123-9669-e036e729252f_original.png"
        }
    },
    {
        "id": "2206072050374673621",
        "slug": "onepiecedao-977",
        "name": "OnepieceDAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:1:0x967bD42Aff5B0279DBB2F9aEb49beC6678a33F39"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/9e1ba4ff-bcb0-4afc-b59e-179cea5723c4_original.jpeg"
        }
    },
    {
        "id": "2206072050374673619",
        "slug": "xcv-974",
        "name": "xcv",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x688EBD3168cfD43e9E6480976E53c8CB0678253F"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/45d209f7-9937-4848-9843-55ea8f09efbe_original.png"
        }
    },
    {
        "id": "2206072050374673617",
        "slug": "huidao3880-972",
        "name": "huidao3880",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x680CAf459e61930B66a9cC5458ac66D8C616e362"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/6924cb51-8b57-41d7-8283-99f1cf6afb4f_original.png"
        }
    },
    {
        "id": "2206072050374673610",
        "slug": "lhm-dao-965",
        "name": "LHM DAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0xB37aA8A791Fa27fa94C60eA789087d9A86A3665A"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/e386375c-da9b-4980-a684-b0c1c7424637_original.jpeg"
        }
    },
    {
        "id": "2206072050374673606",
        "slug": "ozagov-960",
        "name": "OZAGOV",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 4,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0xFe40e5C9E8a85063b5055da195E7B72920128d93"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/fc8376d8-a2d0-48ea-be2b-5ccc1f6d7b17_original.png"
        }
    },
    {
        "id": "2206072050374673598",
        "slug": "luckydao-953",
        "name": "luckydao",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x702179213d8BDB316Ebba5c7763cDE0D3121134F"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/1a2a07be-567d-4893-9b26-1f294b435c2a_original.png"
        }
    },
    {
        "id": "2206072050374673597",
        "slug": "matic-voting-952",
        "name": "matic voting",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0xE4a20a19B4498F051E5e3ab3C20A8a31E42bFcd5"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/82e187d2-e1cd-4d07-8a70-a171816a6256_original.png"
        }
    },
    {
        "id": "2206072050366284986",
        "slug": "keadedaogovernance-949",
        "name": "KeadeDAOGovernance",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:1:0xf6a7Dbc0acf222EE6240f5Ee1D45557Ce4Cb9c66"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/7f90824e-d7ce-42f1-b1f5-40b6bc9f0626_original.jpeg"
        }
    },
    {
        "id": "2206072050366284950",
        "slug": "shiyue-908",
        "name": "shiyue",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x315145e2108c636C03D36fC0A80a37f387dA5520"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/12329faf-3739-42df-93c1-8574011663a6_original.png"
        }
    },
    {
        "id": "2206072050366284943",
        "slug": "apedao-898",
        "name": "ApeDao",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 5,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0xe4bB5d97354EE24FA6db35ec67A558747cFB21BF"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/a85b0c9d-785d-44c0-bad8-9668f3daa975_original.png"
        }
    },
    {
        "id": "2206072050366284938",
        "slug": "airdrop-brk-894",
        "name": "airdrop BRK",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0xbB2f41285251D1910b7Ae9E5B42e2c0ED917Ce35"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/ca67b96d-772d-4659-8af2-83ba5c975053_original.png"
        }
    },
    {
        "id": "2206072050366284929",
        "slug": "carlos-887",
        "name": "CARLOS",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x58d309331363139C91A83675A5f443a2B5c1Fdb1"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/50d294f5-4222-4b48-9c8a-402844543c8c_original.jpeg"
        }
    },
    {
        "id": "2206072050366284928",
        "slug": "rabbit-886",
        "name": "Rabbit",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x10095Eaaf0A2d6690Efb2C011b4a1Cb9fF752dD3"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/4f29aaac-c772-4938-b895-ee0abd1d95f9_original.png"
        }
    },
    {
        "id": "2206072050357896292",
        "slug": "bear-light",
        "name": "Bear Light",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 12,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x39C3798f7210A18611e594ad2BB219AE479927E0"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/a602eaeb-1da9-4b4e-8363-252add27fd5f_original.jpeg"
        }
    },
    {
        "id": "2206072050357896275",
        "slug": "decrypto-bet-409",
        "name": "DeCrypto.Bet",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x1E7C3385C5D7B5c28f985179884571eBCAdb5494"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/b2a27491-a058-438d-a0e1-41463b07dbd3_original.png"
        }
    },
    {
        "id": "2206072050357896254",
        "slug": "pingdao-862",
        "name": "PINGDAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x892706eEE14c7E39e052431719c35cfAdB7c3d0c"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/332497ec-421a-4eb2-a9eb-3032378c88f2_original.png"
        }
    },
    {
        "id": "2206072050357896252",
        "slug": "degendao-860",
        "name": "DegenDAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:1:0x1eE896b22021f32704BDdc8ab10075F63Fa44BC3"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/47a627dd-597e-4070-aee1-c79905511eb7_original.jpeg"
        }
    },
    {
        "id": "2206072050324342564",
        "slug": "sweepr-governor",
        "name": "SWEEPR Governor",
        "chainIds": [
            "eip155:42161"
        ],
        "proposalsCount": 9,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 15,
        "votersCount": 1,
        "governorIds": [
            "eip155:42161:0xC0507cFC6A9E65894C05C1c5b193C7B58b36791f"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/c44df9d2-3315-4c6a-9893-19b8527340e0_original.png"
        }
    },
    {
        "id": "2206072050307565255",
        "slug": "harry-potter-82",
        "name": "Harry Potter",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 6,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x89de859404FeAC5346f5a843Db6B5E136d89CCA1"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/131bcd2b-de7e-41b4-ab0b-11106b93e901_400x400.jpg"
        }
    },
    {
        "id": "2206072050307565254",
        "slug": "conjure",
        "name": "Conjure",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 306,
        "votersCount": 1,
        "governorIds": [
            "eip155:1:0x6cAe87E30445665CA5125d574aa02db4aA9eDB96"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/cc8d0e19-1a9f-45c6-b41e-205fb51df280_400x400.jpg"
        }
    },
    {
        "id": "2206072050307565238",
        "slug": "london-dao",
        "name": "London DAO",
        "chainIds": [
            "eip155:42161"
        ],
        "proposalsCount": 156,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 2,
        "votersCount": 1,
        "governorIds": [
            "eip155:42161:0x936139366c5db48543368EE9cD075267d176a02c"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/1ad1bf15-fc53-4c02-95f3-ba8310b90043_original.jpeg"
        }
    },
    {
        "id": "2206072050299176574",
        "slug": "yubos-dao-341",
        "name": "Yubo's DAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 3,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 3,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x3abbaC80dE0eb4E81f15572AcDe7eb3Aa192ab3f"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/f36154a4-aecb-436b-be41-a0e710e7f1f7_400x400.jpg"
        }
    },
    {
        "id": "2206072050257233162",
        "slug": "immunity-dao-181",
        "name": "Immunity DAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x010C5507C43a161240d4C0FA40043244c5744CCF"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/d51a6580-9705-4d1d-a825-7f2536f8aea5_original.png"
        }
    },
    {
        "id": "2206072050240455798",
        "slug": "algodvsdodao-212",
        "name": "AlgodVsDoDAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 2,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x5AB623153b10e44E4c0314BB4e8c24B9598E3620"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/876cb4cb-247b-4c4f-b354-974f23ef0ef9_original.png"
        }
    },
    {
        "id": "2206072050223679475",
        "slug": "mind-uploading-dao-110",
        "name": "Mind Uploading DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 7,
        "votersCount": 1,
        "governorIds": [
            "eip155:1:0x7Bf0d70C0Cc3bde1e79EE7faBB59B61D7bf00480"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/0092b6d1-4da9-4d59-a260-351326af4cd2_400x400.jpg"
        }
    },
    {
        "id": "2206072050206902122",
        "slug": "candle",
        "name": "Candle",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 4,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 151,
        "votersCount": 1,
        "governorIds": [
            "eip155:1:0xB80Be29667021AE0B617AC9eFe0a3A1a58033681"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/c2b569e1-e7ee-418e-89d7-22c866495b9b_400x400.jpg"
        }
    },
    {
        "id": "2206072050089461634",
        "slug": "zecodao",
        "name": "ZECODAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 9,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 2,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0xD0a9dc62A39c5eb3F1730F46dd9a5E9e6Bbb177d"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/8e95fa61-de79-4122-901d-8f9ffa771497_original.png"
        }
    },
    {
        "id": "2206072050047518258",
        "slug": "nexus-polygon",
        "name": "Nexus Dao (Polygon)",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 2,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x3343aEb44A2a277e3Ae346014e181aE152926D4C"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/24c28289-666f-4f8a-bd19-6eca5f01002c_original.png"
        }
    },
    {
        "id": "2206072050047518201",
        "slug": "zendao",
        "name": "ZENDAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 8,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 2,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x0a12F803F66551cd3683aE8115F66f3129B54DA2"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/6aa04d22-9d10-4b20-b287-1a7721e796c0_original.png"
        }
    },
    {
        "id": "2206072050030740882",
        "slug": "cazidao",
        "name": "CAZIDAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 2,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x26e81f19A76c07237Dd9D88c2e5d9129641e544E"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/6f38743a-5ba3-41d1-bff2-dca82e3a056c_original.png"
        }
    },
    {
        "id": "2206072049988797511",
        "slug": "thrust",
        "name": "Thrust",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 2,
        "votersCount": 1,
        "governorIds": [
            "eip155:1:0xDE80c40921b569ed1326Bb6e2c440c9ee18B7438"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/86b63a3f-3b75-41a5-b60b-1408fda4d9b7_original.png"
        }
    },
    {
        "id": "2206072049988797483",
        "slug": "exalotto-staging",
        "name": "ExaLotto Staging",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0xF00C19727625046479F094D11c1FFC8D8342Ea94"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/4a77d0e7-2170-4d4c-bb86-23f83c1327c7_original.png"
        }
    },
    {
        "id": "2206072049980409832",
        "slug": "exalotto-deprecated",
        "name": "DEPRECATED",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0x31481FD40DE5F2c7CAdA7bFE0fA947A3FDf25fAB"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/ea708c6f-45ef-4194-b29d-232736f598c8_original.png"
        }
    },
    {
        "id": "2206072049921689057",
        "slug": "onepunch-coin-dao",
        "name": "ONEPUNCH COIN - DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 15,
        "votersCount": 1,
        "governorIds": [
            "eip155:1:0x43EDF7e0E2694Cdf278b0463459Cc138600BA6bf"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/5fca1969-e1f6-429d-bbf4-3f7c636adc7f_original.png"
        }
    },
    {
        "id": "2206072049921689055",
        "slug": "immutable-dao",
        "name": "Immutable DAO",
        "chainIds": [
            "eip155:42161"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 1,
        "governorIds": [
            "eip155:42161:0x8FBF62eEA6Dc9493836A182DD66db02bFfF10695"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/f2873862-2c63-4025-89e2-0fff7bebfba8_original.png"
        }
    },
    {
        "id": "2206072049904911716",
        "slug": "bobodao",
        "name": "BOBO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 49,
        "votersCount": 1,
        "governorIds": [
            "eip155:1:0xD0Fb4e37625c438B2B34144F9D3c81c67f1EdA3d"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/5b70a38d-de2a-4a5c-b97d-abdc6acc7ddb_original.png"
        }
    },
    {
        "id": "2206072049879745684",
        "slug": "zendao2",
        "name": "ZEN2DAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 12,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 2,
        "votersCount": 1,
        "governorIds": [
            "eip155:137:0xCb4D57CebB9b9B93f717aB1d3775146be7D50764"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/bba77bb5-1d89-4b45-a16b-253c8840d8ab_original.png"
        }
    },
    {
        "id": "2206072049862968358",
        "slug": "unifi",
        "name": "Unifi Protocol DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 100,
        "votersCount": 1,
        "governorIds": [
            "eip155:1:0x96618A5F91720f61FfBA80Fd1CE2822F4f4Ba634"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/aa6360f8-8885-4fb9-8159-004f082aa9c4_original.png"
        }
    },
    {
        "id": "2206072049854580673",
        "slug": "qbi-1",
        "name": "QBI",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 3,
        "votersCount": 1,
        "governorIds": [
            "eip155:1:0xA2e8fDf1c6d5e5c237d8Cd93d5Cdae5547c06c8b"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/7457a4b5-444f-4406-b29a-8fc744e1dd67_original.png"
        }
    },
    {
        "id": "2206072049846192022",
        "slug": "marsereum-governor",
        "name": "Marsereum Governor",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 25,
        "votersCount": 1,
        "governorIds": [
            "eip155:1:0x60F5128A1e9F48E4e73B248018ca1C3db9a3B118"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/c25822fd-c584-40e3-9a86-5470bd646970_original.png"
        }
    },
    {
        "id": "2206072049846192018",
        "slug": "dreambyt3",
        "name": "DREAM DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 92,
        "votersCount": 1,
        "governorIds": [
            "eip155:1:0x1Da732F0CA1EC8145f72a28a4B30a8bbDf7106A1"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/9585290b-6f1b-4a0c-826c-727ec60f0e96_original.png"
        }
    },
    {
        "id": "2255587656777860463",
        "slug": "shmaplex",
        "name": "Shmaplex",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 2,
        "votersCount": 0,
        "governorIds": [
            "eip155:1:0xC0A16daDa9baB13b93258ac0bA09080b1e8687b3"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/704bf5cb-2946-4d00-b5f1-3a29526a3578_original.jpeg"
        }
    },
    {
        "id": "2246489674069575557",
        "slug": "worldassociation",
        "name": "World Association",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0x7b744Ed370EA827e6fDed03af8f8B63d5354ED92"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/8ad8136d-a7e0-4310-8f4b-6450cdf07237_original.png"
        }
    },
    {
        "id": "2230080022335457264",
        "slug": "kryptovote",
        "name": "KryptoVote",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 124,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0xCC498F20583d3808c2D883d6c729aF635f801320"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/705df78a-d4a9-4fcc-b27e-7eb21ed603f0_original.png"
        }
    },
    {
        "id": "2227050094312556528",
        "slug": "venus-protocol",
        "name": "Venus protocol",
        "chainIds": [
            "eip155:56"
        ],
        "proposalsCount": 32,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1988,
        "votersCount": 0,
        "governorIds": [
            "eip155:56:0x2d56dC077072B53571b8252008C60e945108c75a"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/29743075-10b5-44fe-8e9e-7f345984edb8_original.png"
        }
    },
    {
        "id": "2206072050483725424",
        "slug": "hammercoin-1506",
        "name": "HammerCOIN",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0x14e09235915dCc34Fe6c1396Ab4e827F46D0d19d"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/e0160363-6a4b-4a95-8dc2-3861da08af4a_original.jpeg"
        }
    },
    {
        "id": "2206072050475336762",
        "slug": "collectdao-1431",
        "name": "CollectDAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 0,
        "governorIds": [
            "eip155:1:0x33dCb4fe0096cea56735bDB021199da67dE8e1d0"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/1a6b0f16-43d0-4246-8a3d-ad3d7e03e97d_original.png"
        }
    },
    {
        "id": "2206072050475336705",
        "slug": "poorguy-1340",
        "name": "PoorGuy",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0x264A0B05C7d1495C1D60a7b17CB13bEB52EaD5aE"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/6fb4849a-c607-4916-a462-52fc000c6b26_original.png"
        }
    },
    {
        "id": "2206072050466949104",
        "slug": "orderofthesquaredcircle-1321",
        "name": "OrderOfTheSquaredCircle",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0xe99Ca1140Fcd9EDDE893315a99aC5f010927F454"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/b83d816d-fb80-48bf-9a29-0e85fcc5c1ae_original.png"
        }
    },
    {
        "id": "2206072050458560439",
        "slug": "daocoin-822",
        "name": "Daocoin",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 6,
        "votersCount": 0,
        "governorIds": [
            "eip155:1:0x91CB555A002b20cA6c7978F77BCfB272C4EfE937"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/bcbbd00c-d42f-4a75-8551-52398068ac06_original.png"
        }
    },
    {
        "id": "2206072050458560421",
        "slug": "daocoin-governance-804",
        "name": "Daocoin Governance",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 5,
        "votersCount": 0,
        "governorIds": [
            "eip155:1:0x7FD10b0666F051b1078bb04D6Ad332e3a017dF55"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/25d5cb32-52b0-49a5-aec0-8d9621381d97_original.png"
        }
    },
    {
        "id": "2206072050441783061",
        "slug": "club-epic-613",
        "name": "Club Epic!",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 208,
        "votersCount": 0,
        "governorIds": [
            "eip155:1:0x08403C04FD7163e59a71dD237A4Ea33d8A9f821B"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/24d36225-257a-44db-bfdc-39212dbe350b_original.png"
        }
    },
    {
        "id": "2206072050441783056",
        "slug": "autonomies-dao-612",
        "name": "Autonomies DAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 36,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0xa062e4424385Fb3403322cc4760DaC4078621155"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/9fa65f33-abf2-484d-876f-b879f6127126_original.png"
        }
    },
    {
        "id": "2206072050433394404",
        "slug": "pony-finance-555",
        "name": "Pony Finance",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 4,
        "votersCount": 0,
        "governorIds": [
            "eip155:1:0xC60a226bD2a90e4865331cfe81519EC13B44bC14"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/24d36225-257a-44db-bfdc-39212dbe350b_original.png"
        }
    },
    {
        "id": "2206072050433394400",
        "slug": "champagne-collective-551",
        "name": "Champagne Collective",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 11,
        "votersCount": 0,
        "governorIds": [
            "eip155:1:0xBBaB3cf44acc3Bbf359cb02F38D9262472B236C4"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/24d36225-257a-44db-bfdc-39212dbe350b_original.png"
        }
    },
    {
        "id": "2206072050433394381",
        "slug": "artizen-526",
        "name": "Artizen",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 200,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0x5eEabb5a86eBbdDaAe862149F8461eaa2efe4569"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/e9bd7fa2-54a9-4953-aca3-48c668adb6c1_original.png"
        }
    },
    {
        "id": "2206072050433394369",
        "slug": "ethernalotto-515",
        "name": "EthernaLotto",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0x2d1E626e155c4a53aeb5b74a301c622088e11808"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/2270f583-0d42-4181-ae9a-672d2fa19df3_original.jpeg"
        }
    },
    {
        "id": "2206072050425005733",
        "slug": "green-nation-dao-t5-489",
        "name": "Green Nation DAO t5",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0x99720599D14c5EdA42bd6a9AAd6dFBc6c2dFDF5d"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/f6baea9e-221c-42b2-88b5-79de468b5f9e_original.png"
        }
    },
    {
        "id": "2206072050425005718",
        "slug": "streetcreditdao-474",
        "name": "StreetCreditDAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 0,
        "governorIds": [
            "eip155:1:0xd63E45e2f6Cf214E7652061e3DA830D908d5866A"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/f0eec8fd-b6a0-43c9-bde8-37f82c807e49_original.jpeg"
        }
    },
    {
        "id": "2206072050425005681",
        "slug": "test-qwefasiuh-434",
        "name": "test-qwefasiuh",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0x3AE74F8AF73873D43D4c555D69D544276d86B893"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/3e2e982d-38fd-4f92-9a13-64952811ca80_original.png"
        }
    },
    {
        "id": "2206072050425005680",
        "slug": "test-odasfuirghauih-433",
        "name": "test-odasfuirghauih",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0xf9983A0936a100CdA25439a098d5a4768B4a3b00"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/3e2e982d-38fd-4f92-9a13-64952811ca80_original.png"
        }
    },
    {
        "id": "2206072050425005677",
        "slug": "test-bgfdsa-430",
        "name": "test-bgfdsa",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0x92E21Fa1a5330e032Cb546a2b57E231f077BaFE3"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/38c04c22-1f7e-4433-9dad-c4886ee40c38_original.jpeg"
        }
    },
    {
        "id": "2206072050416617041",
        "slug": "dart-dao-396",
        "name": "DArt DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 0,
        "governorIds": [
            "eip155:1:0xa967Ae47aA8bd72e35296cDdDA9E62b1B4c40a32"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/dbdbd4c3-342b-42a9-b809-9e6ae06f4c2e_original.png"
        }
    },
    {
        "id": "2206072050416617040",
        "slug": "ps2o-395",
        "name": "PS2O",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0x816cdd9E52c00FBDfa5B6684E810c504A33CE358"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/cb856807-c7ec-4dd2-b7fd-e2d97c31ea50_original.png"
        }
    },
    {
        "id": "2206072050408228371",
        "slug": "defifa-world-cup-2022-52",
        "name": "Defifa: World Cup 2022",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 3,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 18,
        "votersCount": 0,
        "governorIds": [
            "eip155:1:0xd6a2C0383dcfE7c516275138FE035269F4a4A534"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/6cdd23c9-740b-4b95-8153-e9d400a717af_original.png"
        }
    },
    {
        "id": "2206072050408228365",
        "slug": "starbull-dao-1301",
        "name": "StarBull DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:1:0xEF2E51a4B181401764e1F5f68C00659366a65A99"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/eb63d430-b4ab-432a-ad61-848aaebdf41b_original.png"
        }
    },
    {
        "id": "2206072050408228336",
        "slug": "test-1211",
        "name": "TEST",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0x4f7f30Ab7255663FB900BDba6A1DEA5Edc8a59C0"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/0dbd01a7-168b-4544-bc70-49561f7bf98c_original.png"
        }
    },
    {
        "id": "2206072050399839658",
        "slug": "spinet-dao-1216",
        "name": "Spinet Dao",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0x2ff55B6B9535F99A527E5cB24fE8325101A8251C"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/00d1e14e-7422-4180-8366-92f2c2a97cff_original.png"
        }
    },
    {
        "id": "2206072050399839643",
        "slug": "fooldao-1170",
        "name": "FoolDao",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0x091A58C31238d484D6525Ba09ebe7e35E9A91c9C"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/a329a03c-f82d-4b42-b7f7-1b4766643b3f_original.jpeg"
        }
    },
    {
        "id": "2206072050391451020",
        "slug": "celestabeing-1157",
        "name": "CelestaBeing",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 3,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0x31Ae828e6093C37F26bA1c1b18c76911D36DB5D0"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/dd88fa3c-1982-4c0d-b480-daf0e0c21c73_original.jpeg"
        }
    },
    {
        "id": "2206072050391451002",
        "slug": "colorforu-1145",
        "name": "Colorforu",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 12,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0xd02b70C9AA91bfEA7b656674a88B579e930d7AB3"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/bbc0769b-62f3-453a-aa29-da86d56cf239_original.jpeg"
        }
    },
    {
        "id": "2206072050383062341",
        "slug": "aningdao-1081",
        "name": "aningdao",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0xD39f8ebfFAe1C9Cf706e7eEC738004BAe5ba3d17"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/7da855f3-4471-48ef-b277-a49ad85a53ed_original.png"
        }
    },
    {
        "id": "2206072050383062330",
        "slug": "hi-1078",
        "name": "HI",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0xdb12dbBdf97b3bF10C2D62568907FB7EEf145eF3"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/b8d60714-fb6e-41ee-a744-7d3183be2a76_original.png"
        }
    },
    {
        "id": "2206072050383062327",
        "slug": "bandao-1074",
        "name": "bandao",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0x646E2b495BeD80bd012899d7B20fdeD35d0a6c0f"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/af8d4f27-f1be-488c-b133-c3978d439a07_original.jpeg"
        }
    },
    {
        "id": "2206072050383062303",
        "slug": "gods-of-olympus-1048",
        "name": "Gods of olympus",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0x448062E152eA4D2433E4a1AA2Ec37eba6e377282"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/7c589653-5c27-4b7c-84bb-20aa1016b6d8_original.jpeg"
        }
    },
    {
        "id": "2206072050383062299",
        "slug": "ponypick-1052",
        "name": "Ponypick",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0xa2B18b44D7B705a2cb5F0429Ec36E2e8AdDbCEEC"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/352fe979-0518-42d5-958b-b21d8074a0f5_original.png"
        }
    },
    {
        "id": "2206072050383062294",
        "slug": "yuan-1044",
        "name": "Yuan",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0x60A65EB72b82ac55899E4fC2d7da50D6fbfE2F11"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/04ccbe46-00fa-4355-bee6-d2f4d9475fba_original.png"
        }
    },
    {
        "id": "2206072050383062287",
        "slug": "vellus-dao-1029",
        "name": "Vellus Dao",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0xC4646697c004a7CF5D8A922D165cc807342CBA38"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/00f7fa59-fe2f-4f1f-86d7-707cbaf68755_original.jpeg"
        }
    },
    {
        "id": "2206072050374673663",
        "slug": "bithinker-1016",
        "name": "bithinker",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0x9BA058BC31A23555a4e296Ec51E8984BC669670F"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/2c7802ff-a0eb-45cf-8c5c-8197d47495d5_original.png"
        }
    },
    {
        "id": "2206072050374673655",
        "slug": "shui-1003",
        "name": "Shui",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0x6c81A83Cbe11F0aC75455A4D5c4788e300650Be9"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/306b2d20-ca2e-496f-80b0-08516d32fe64_original.jpeg"
        }
    },
    {
        "id": "2206072050374673651",
        "slug": "zero-999",
        "name": "Zero",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0x24ba8bd4402d547612677A581349C2807F383dc6"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/ef461883-2727-4818-9ed3-89b26092ded1_original.png"
        }
    },
    {
        "id": "2206072050374673616",
        "slug": "hozaih-971",
        "name": "hozaih",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0x9981E73457f0DE509be77F6f7A7A3908E641654B"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/42537bb0-969a-4e84-82cf-3937b74551bf_original.png"
        }
    },
    {
        "id": "2206072050374673615",
        "slug": "wutonk-970",
        "name": "wutonk",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0x8A17628dBC2F59febD7a8C253D22B188dC2cbA1c"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/01773ae5-5a27-46bf-836f-e7ab163ab3de_original.png"
        }
    },
    {
        "id": "2206072050374673609",
        "slug": "unicorndao-963",
        "name": "UnicornDao",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:1:0x8baEd26C83aB539ED22946bb37c32b3711b5fC55"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/d7b363a1-abd2-4b87-ad46-43ae01597fda_original.png"
        }
    },
    {
        "id": "2206072050374673602",
        "slug": "ethxg-958",
        "name": "ETHXG",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0xEfe48bD46095B9E165BF9E12f65EF4eE899D6BBf"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/61887b00-b0cb-4e54-be5d-bb7ea506a23d_original.jpeg"
        }
    },
    {
        "id": "2206072050374673601",
        "slug": "pip-dao-957",
        "name": "PIP Dao",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0xECc5d68D52c2401c168F56cf00A77ACe6964075F"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/4d5c88a1-21e2-47ea-bcfe-397b216e2044_original.jpeg"
        }
    },
    {
        "id": "2206072050366284982",
        "slug": "nina-945",
        "name": "Nina",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 4,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0xFC1644270F09C163CC932fd0BF1d5Ae2edb14211"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/38681f5b-5e8e-408e-8834-a4eaf9d45f9d_original.png"
        }
    },
    {
        "id": "2206072050366284976",
        "slug": "mtdg-939",
        "name": "MTDG",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 3,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0xc6612f68f045CdC1272e29953184401A71d5e6E3"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/132bf470-3bab-4736-8b1e-a6b7fef73763_original.png"
        }
    },
    {
        "id": "2206072050366284972",
        "slug": "pgmg-935",
        "name": "PGMG",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0xdA87675cE28481A2108dB3d9f692BA8A132e7d01"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/57d0645d-e6da-4e1b-b036-c3be4a741857_original.png"
        }
    },
    {
        "id": "2206072050366284956",
        "slug": "la-scaloneta-fans-club",
        "name": "La Scaloneta Fans Club",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0x58bE0DFe2823459096459Cfb02729617e71B619B"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/8c9a9f95-692c-4628-815b-3bc0cef9fe22_original.png"
        }
    },
    {
        "id": "2206072050366284952",
        "slug": "cryptoflx-911",
        "name": "CryptoFlx",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 2,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:1:0x605624395768746d5Fc793bc4e86C16514B97ba8"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/a838e350-779d-4767-a810-81a39707360c_original.jpeg"
        }
    },
    {
        "id": "2206072050366284922",
        "slug": "ytttt-891",
        "name": "ytttt",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0x1f6A43eA8c48551Dd5819A39ad9C9009a7876aA4"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/a9801450-8d0f-493e-8270-3f1cd486f26c_original.png"
        }
    },
    {
        "id": "2206072050366284921",
        "slug": "xld-890",
        "name": "XLD",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:1:0x292EcBCc6F4F4bEcdD59b17F8A6dD6389CfD3Ab5"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/e8aa5e86-5de2-4d6b-8c8e-c39199d64d7a_original.png"
        }
    },
    {
        "id": "2206072050307565232",
        "slug": "bifi",
        "name": "BiFi",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 9,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 0,
        "governorIds": [
            "eip155:1:0x54F50d2f584F1DD05307aB5eB298Ba96C7d4E0ea"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/02acb9df-edab-48f0-86e5-78aea91f4e24_400x400.jpg"
        }
    },
    {
        "id": "2206072050299176565",
        "slug": "testetheriel-340",
        "name": "TestEtheriel",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0x57D63D76FB83b0882Bd1E8D33AC9c0ba74cb37CD"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/44da26ba-21b7-4225-b62e-f0df88328632_400x400.jpg"
        }
    },
    {
        "id": "2206072050299176532",
        "slug": "drones-dao-313",
        "name": "Drones DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 31,
        "votersCount": 0,
        "governorIds": [
            "eip155:1:0x0Dee0D0D4Cf87C54F8e4611B578C6dC5E1B17359"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/c118ea0a-1bb8-49ca-adcf-45e1bea1ffbf_400x400.jpg"
        }
    },
    {
        "id": "2206072050257233146",
        "slug": "pigment-dao-264",
        "name": "Pigment DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 0,
        "governorIds": [
            "eip155:1:0x182e1e209778F81BBc4c32bfd7571f78601F1E44"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/473c9636-8e8f-4304-b691-3c43c57618c8_400x400.jpg"
        }
    },
    {
        "id": "2206072050240455825",
        "slug": "mining3dao-237",
        "name": "Mining3DAO",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0x68d47F8bEA66758453D45BC2Be6eEc8a121BAC54"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/38a30f70-4909-439c-aa84-2348d5d62ec8_original.jpeg"
        }
    },
    {
        "id": "2206072050232067110",
        "slug": "polly-finance",
        "name": "Polly Finance",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0xa17B5d58BFf2f03B16892952D777dA1352C0CB24"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/35f8ef6b-f749-403a-984c-47e2f0023992_original.png"
        }
    },
    {
        "id": "2206072050206902136",
        "slug": "anoncats-54",
        "name": "AnonCats",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 14,
        "votersCount": 0,
        "governorIds": [
            "eip155:1:0xCCAF310D9506d09806e78EcC52a09029d36Cea57"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/b71cce79-a7de-4cfb-90c4-b38e2a17db2d_400x400.jpg"
        }
    },
    {
        "id": "2206072050131403967",
        "slug": "wuzi",
        "name": "wuzi",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0xC8bB657AddeADE09720181498795f6D73Bf3f207",
            "eip155:137:0xcF757D2d4b6dD80210227ff52f4564d0B7332e8B"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/5273fd0e-849f-4c0f-82cb-9bb0a0f92321_original.png"
        }
    },
    {
        "id": "2206072050106237959",
        "slug": "prova",
        "name": "prova",
        "chainIds": [
            "eip155:100"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 0,
        "governorIds": [
            "eip155:100:0x10d6fb4401DA62Ec2180B70c0f1974803368E3F2"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/2074d6bd-40d2-4c83-a168-9bcff59ec96e_original.png"
        }
    },
    {
        "id": "2206072050072684266",
        "slug": "madl",
        "name": "Make Adelaide DAO",
        "chainIds": [
            "eip155:10"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 0,
        "governorIds": [
            "eip155:10:0xEea86705CfcAB5b40dE65487F56676206603391D"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/e3f91644-d4d4-407c-b238-580d9cd0da14_original.png"
        }
    },
    {
        "id": "2206072050064295540",
        "slug": "moe",
        "name": "MOE",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:1:0x37bb7Ac5aeD49C8bE56cABA39aad54f1e3D1dE9D"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/56b48000-a85d-4b87-853c-c0f1f5ae86dc_original.png"
        }
    },
    {
        "id": "2206072050022352172",
        "slug": "spore-engineering",
        "name": "Spore Engineering",
        "chainIds": [
            "eip155:100"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1529,
        "votersCount": 0,
        "governorIds": [
            "eip155:100:0x96853087C9E364FE9554fD6FCFE13BcD942b04d5"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/fbe60111-1b94-4fe0-8109-266c47a222db_original.png"
        }
    },
    {
        "id": "2206072049930077758",
        "slug": "united-gabriel-nation-dao",
        "name": "United Gabriel Nation DAO",
        "chainIds": [
            "eip155:10"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 1,
        "votersCount": 0,
        "governorIds": [
            "eip155:10:0xF8fBe44761844b26E848F10C831a0D6319B7b507"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/9ecc3d1a-536d-4055-9760-6a323442fb80_original.png"
        }
    },
    {
        "id": "2206072049913300397",
        "slug": "smiledao",
        "name": "SmileDAO",
        "chainIds": [
            "eip155:100"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 4,
        "votersCount": 0,
        "governorIds": [
            "eip155:100:0xF84D94Fe16977F5394b9964A8948196011960469"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/35e1fbf0-edbf-4851-84c1-b6da948bc43b_original.png"
        }
    },
    {
        "id": "2206072049913300391",
        "slug": "allm",
        "name": "Allm",
        "chainIds": [
            "eip155:137"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:137:0x3eecE8E0E53518adC215CD14A42C4064DA4C1718"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/d0421854-0625-47a4-8dcf-3c6ccd7b1a6f_original.png"
        }
    },
    {
        "id": "2206072049879745704",
        "slug": "ordinal-nouns",
        "name": "Ordinal Nouns",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:1:0x11dd6A656101f16731559A66e670Abb78357aa3a"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/8ee9e860-1dc4-495b-abcf-7d0002087386_original.png"
        }
    },
    {
        "id": "2206072049879745679",
        "slug": "gmx-blueberry-club",
        "name": "GMX Blueberry Club",
        "chainIds": [
            "eip155:42161"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 3916,
        "votersCount": 0,
        "governorIds": [
            "eip155:42161:0x28C3ABA27542e0680Cc3706AEdebFA40bBF9AF1E"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/bfd7b11e-fd33-4fe6-994e-ea824fed6a88_original.jpeg"
        }
    },
    {
        "id": "2206072049862969336",
        "slug": "hunter-dao",
        "name": "Hunter DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 292,
        "votersCount": 0,
        "governorIds": [
            "eip155:1:0x9f30C4d5dF166B009A310b6cCf0f6d2B310A63C1"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/4163f420-365b-43b4-b3bb-e37745631056_original.jpeg"
        }
    },
    {
        "id": "2206072049854580688",
        "slug": "q-dao-1440",
        "name": "Q DAO",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 1,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 0,
        "votersCount": 0,
        "governorIds": [
            "eip155:1:0xc6770De10661CbAa084bD695BCD225f9fF4733F0"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/f5669f6e-5f06-4bc9-a1ea-0ecb8f21fac7_original.png"
        }
    },
    {
        "id": "2206072049846191974",
        "slug": "immutable-governor",
        "name": "Immutable Governor",
        "chainIds": [
            "eip155:42161"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 10,
        "votersCount": 0,
        "governorIds": [
            "eip155:42161:0xF6511b95a770421fa74009144bAB94142d332600"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/9fb75f90-67d2-4423-b949-ebfd5d513dce_original.png"
        }
    },
    {
        "id": "2206072049837803286",
        "slug": "fomo-house",
        "name": "FOMO HOUSE",
        "chainIds": [
            "eip155:42161"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 31,
        "votersCount": 0,
        "governorIds": [
            "eip155:42161:0xFed719dB1b8B4a41F30195E1589331A889140433"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/6c7c4cac-6667-4ea0-85b8-8661058fcc2e_original.png"
        }
    },
    {
        "id": "2206072049829414582",
        "slug": "delta",
        "name": "Delta",
        "chainIds": [
            "eip155:100"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 14,
        "votersCount": 0,
        "governorIds": [
            "eip155:100:0xF762e5188a445061F2219AD742A46873fCF4203D"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/6926b697-779b-4cad-9f98-bde70d0defae_original.jpeg"
        }
    },
    {
        "id": "2206072049821025966",
        "slug": "crypto-collective",
        "name": "Crypto Collective",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 0,
        "activeProposalsCount": 0,
        "tokenHoldersCount": 6,
        "votersCount": 0,
        "governorIds": [
            "eip155:1:0x42B37c23623f93532ccC99475Eae436458bf34d4"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/c69e53a2-f1d7-4070-818f-875d019c901d_original.png"
        }
    },
    {
        "id": "2206072050458560433",
        "slug": "compound",
        "name": "Compound",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 178,
        "activeProposalsCount": -1,
        "tokenHoldersCount": 218405,
        "votersCount": 5173,
        "governorIds": [
            "eip155:1:0xc0Da02939E1441F497fd74F78cE7Decb17B66529"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/bc952927-da93-4cab-b0ce-b5e2f5976b9a_400x400.jpg"
        }
    },
    {
        "id": "2206072050408228383",
        "slug": "public-nouns",
        "name": "Public Nouns",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 36,
        "activeProposalsCount": -1,
        "tokenHoldersCount": 135,
        "votersCount": 130,
        "governorIds": [
            "eip155:1:0x2BbEbFECA0fEbde8C70EF8501C991f3AB2095862"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/8302cf81-6e0b-447b-8637-dd206c74b4a8_original.png"
        }
    },
    {
        "id": "2206072049930077786",
        "slug": "tai",
        "name": "TAI Governance",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 8,
        "activeProposalsCount": -1,
        "tokenHoldersCount": 139,
        "votersCount": 10,
        "governorIds": [
            "eip155:1:0x90F2273a793B2E883196fC0dB72a2da483eEE883"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/3cda4f61-fa08-454f-b0cf-7f39fb1998df_original.png"
        }
    },
    {
        "id": "2206072050223679438",
        "slug": "ooki-98",
        "name": "Ooki",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 14,
        "activeProposalsCount": -1,
        "tokenHoldersCount": 3414,
        "votersCount": 0,
        "governorIds": [
            "eip155:1:0x3133b4F4dcffc083724435784fEFAD510FA659c6"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/8ec7dcbe-5ab2-445f-8df2-6aeac2d1121d_400x400.jpg"
        }
    },
    {
        "id": "2206072050458560426",
        "slug": "ens",
        "name": "ENS",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 22,
        "activeProposalsCount": -2,
        "tokenHoldersCount": 66310,
        "votersCount": 12146,
        "governorIds": [
            "eip155:1:0x323A76393544d5ecca80cd6ef2A560C6a395b7E3"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/52dcc4c6-eac8-4ce4-b50e-a258a21abd7e_400x400.jpg"
        }
    },
    {
        "id": "2206072050307565230",
        "slug": "dopewars",
        "name": "Dope Wars",
        "chainIds": [
            "eip155:1"
        ],
        "proposalsCount": 72,
        "activeProposalsCount": -3,
        "tokenHoldersCount": 1858,
        "votersCount": 1787,
        "governorIds": [
            "eip155:1:0xDBd38F7e739709fe5bFaE6cc8eF67C3820830E0C"
        ],
        "metadata": {
            "icon": "https://static.tally.xyz/6b1e8e31-de1d-425f-a46d-634c0d1e230e_400x400.jpg"
        }
    }
];
insertData(daos_data);
