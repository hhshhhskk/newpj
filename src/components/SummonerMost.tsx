import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import styled from "styled-components";
import { motion } from "framer-motion";
import { getChampionMost } from '../api';
import { summonerNameAtom } from "../atoms"
import { makeChampionImagePath } from '../utils';
import { useState } from "react";

const SummonerMostDiv = styled.div`
    flex-direction: row;
    font-size: 30px;
    color: black;
`;

const ChampionMasteryButton = styled.button`
    cursor: pointer;
    font-size: 15px;
    border: 0;
    background-color: white;
`;

const UnrankedDiv = styled.div`
    font-size: 50px;
    font-weight: bold;
    color: red;
`;

const GameCount = styled.div`
  margin-top: 10%;  
`;
const MostBox = styled.div`
    display: flex;
    margin-top: 10%;
    font-size: 18px;
    gap: 15px;
`;

const ChampionBox = styled(motion.img)`
  border-radius: 100px;
  height: 60px;
`;

const MostTable = styled.table`
  td {
        padding: 7px;
  }
`;


export function SummonerMost() {
    const summonerName = useRecoilValue(summonerNameAtom);
    const { data: summonerMostData } = useQuery(["lol"], () => getChampionMost(summonerName),
        {
            enabled: !!summonerName,
        }
    );
    console.log(summonerMostData?.length);
    const [clicked, setClicked] = useState(true);
    const toggleClicked = () => setClicked((prev) => !prev);
    return (
        <>
            {summonerMostData?.length === undefined || 0 ?
                // UnRanked 일때
                <SummonerMostDiv>
                    <div>모스트 3</div>
                    <UnrankedDiv>
                        Unranked
                    </UnrankedDiv>
                </SummonerMostDiv>
                :
                clicked // 모스트3 일떄
                    ?
                    <SummonerMostDiv>
                        <div>모스트 3</div>
                        <ChampionMasteryButton
                            onClick={toggleClicked}
                        >
                            숙력도 TOP3
                        </ChampionMasteryButton>
                        {[0, 1, 2].map((i) => (
                            <MostBox key={i}>
                                <ChampionBox
                                    key={i}
                                    src={makeChampionImagePath(summonerMostData?.[i].champion.replace(/ /gi, ""))}
                                    alt="이미지를 불러올 수 없습니다."
                                />
                                <GameCount>{summonerMostData?.[i].count}게임
                                </GameCount>
                                <MostTable>
                                    <tbody>
                                        <tr>
                                            <td>KDA</td>
                                            <td>승률</td>
                                        </tr>
                                        <tr>
                                            <td>{summonerMostData?.[i].kda}</td>
                                            <td>{summonerMostData?.[i].winRate}%</td>
                                        </tr>
                                    </tbody>
                                </MostTable>
                            </MostBox>
                        ))}
                    </SummonerMostDiv>
                    :
                    // 숙련도3 일때
                    <SummonerMostDiv>
                        <div>모스트 3</div>
                        <ChampionMasteryButton
                            onClick={toggleClicked}
                        >
                            숙력도 TOP3
                        </ChampionMasteryButton>
                        {[0, 1, 2].map((i) => (
                            <MostBox key={i}>
                                <ChampionBox
                                    key={i}
                                    src={makeChampionImagePath(summonerMostData?.[i].champion.replace(/ /gi, ""))}
                                    alt="이미지를 불러올 수 없습니다."
                                />
                                <GameCount>{summonerMostData?.[i].count}게임
                                </GameCount>
                                <MostTable>
                                    <tbody>
                                        <tr>
                                            <td>KDA</td>
                                            <td>승률</td>
                                        </tr>
                                        <tr>
                                            <td>{summonerMostData?.[i].kda}</td>
                                            <td>{summonerMostData?.[i].winRate}%</td>
                                        </tr>
                                    </tbody>
                                </MostTable>
                            </MostBox>
                        ))}
                    </SummonerMostDiv>
            }
        </>
    )
}