import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";
import useOnline from "../../utils/useOnline";
 
 const  Home=()=> {
  const isOnline=useOnline();
  if(isOnline) return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed/>
        <Rightbar/>
      </div>
    </>
  );
  else return <h2>You are offline Please check your connection!</h2>;
}
export default Home;
