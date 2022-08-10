// 롤 API 키는 발급 시 24시간 사용가능
const API_KEY = "RGAPI-7f00b3f9-ef14-4e96-8238-267fc3758987";

// export interface IgetSummonerId {
//   id: string;
//   accountId: string;
//   puuid: string;
//   name: string;
//   profileIconId: number;
//   revisionDate: number;
//   summonerLevel: number;
// }

// interface ISummonerInfo {
//     leagueId: string,
//     queueType: string,
//     tier: string,
//     rank: string,
//     summonerId: string,
//     summonerName: string,
//     leaguePoints: number,
//     wins: number,
//     losses: number,
//     veteran: boolean,
//     inactive: boolean,
//     freshBlood: boolean,
//     hotStreak: boolean,
// }

// 입력한 소환사 이름으로 소환사 ID값 API호출
export function getSummonerId(summonerName: any) {
    return fetch(
        `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`
    )
        .then((response) => response.json())
}
// getSummonerId에서 가져온 Id로 소환사 데이터 API호출
export function getSummonerData(summonerId: string) {
    return fetch(
        `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${API_KEY}`
    )
        .then((response) => response.json())
}

export async function getSummoerName() {}