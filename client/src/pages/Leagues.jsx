import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchLeagues } from "../features/leagues/leaguesSlice";
import Card from "../components/Card";

export default function Leagues() {
  const leagues = useSelector((state) => state.leagues.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLeagues());
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-5 p-6">
      {leagues.map((e) => {
        return (
          <Card
            key={e.id}
            id={e.id}
            name={e.name}
            logoImg={e.logo}
            country={e.country}
            countryImg={e.flag}
          />
        );
      })}
    </div>
  );
}
