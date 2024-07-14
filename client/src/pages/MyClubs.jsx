import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyClubs } from "../features/myclubs/myclubsSlice";
import PlainCard from "../components/PlainCard";
import Loading from "../components/Loading";

export default function MyClubs() {
  const myclubs = useSelector((state) => state.myclubs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyClubs());
  }, []);

  console.log(myclubs);

  if (myclubs.loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-wrap justify-center gap-5 p-6">
      {myclubs.value.map((e) => {
        return (
          <PlainCard
            key={e.id}
            id={e.id}
            name={e.name}
            logoImg={e.imgUrl}
          />
        );
      })}
    </div>
  );
}
