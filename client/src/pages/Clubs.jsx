import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchClubs } from "../features/clubs/clubsSlice";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

export default function Clubs() {
  const { id } = useParams();

  const clubs = useSelector((state) => state.clubs.value);
  const dispatch = useDispatch();

  //   console.log(leagues);

  useEffect(() => {
    dispatch(fetchClubs(id));
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-5 p-6">
      {clubs.map((e) => {
        return <Card key={e.id} id={e.id} name={e.name} logoImg={e.logo} />;
      })}
    </div>
  );
}
