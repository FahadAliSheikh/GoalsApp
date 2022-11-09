import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import GoalForm from "../components/GoalForm";
import Spinner from '../components/Spinner';
import { getGoals, reset } from "../features/goals/goalSlice";
import GoalItem from "../components/GoalItem";


function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals)


  useEffect(() => {
    if (isError) {
    }
    if (!user) {
      navigate('/login')
    }
    dispatch(getGoals())

    if (isLoading) {
      return <Spinner></Spinner>
    }
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch]);

  return (
    <>
      <section className="heading">
        <h1>{user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm></GoalForm>
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal}></GoalItem>
            ))}
          </div>
        ) : (<h3> You have not set any goals </h3>)}
      </section>
    </>
  )
}

export default Dashboard