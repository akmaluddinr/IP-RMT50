import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchClubs } from "../features/clubs/clubsSlice";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { errorHandler } from "../util/reactToastify";
import axios from "axios";

export default function Clubs() {
  const { id } = useParams();
  const navigate = useNavigate();

  const clubs = useSelector((state) => state.clubs);
  const dispatch = useDispatch();

  const addClub = async (name, img, id) => {
    try {
      await axios({
        method: "post",
        url: "http://localhost:3000/clubs/my-clubs",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          clubId: id,
          clubName: name,
          imgUrl: img,
        },
      });
      navigate("/myclubs");
    } catch (error) {
      const message = error.response.data.message || error.message;
      errorHandler(message);
    }
  };

  useEffect(() => {
    dispatch(fetchClubs(id));
  }, []);

  if (clubs.loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-wrap justify-center gap-5 p-6">
      {clubs.value.map((e) => {
        return (
          <Card
            key={e.id}
            id={e.id}
            name={e.name}
            logoImg={e.logo}
            fn={addClub}
          />
        );
      })}
    </div>
  );
}
