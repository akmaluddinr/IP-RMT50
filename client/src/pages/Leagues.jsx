import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchLeagues } from "../features/leagues/leaguesSlice";
import Card from "../components/Card";
import Loading from "../components/Loading";

export default function Leagues() {
  const leagues = useSelector((state) => state.leagues);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLeagues());
  }, []);

  if (leagues.loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-wrap justify-center gap-5 p-6">
      {leagues.value.map((e) => {
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
