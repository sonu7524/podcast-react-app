import {useState} from 'react';
import Drawer from '@mui/material/Drawer';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { IconButton } from '@mui/material';
//import "./style.css";
import { Link, useLocation } from "react-router-dom";
import "./styles.css"


export default function TemporaryDrawer() {
    const location = useLocation();
  const currentPath = location.pathname;
  const [open, setOpen] = useState(false);


  return (
    <div>
          <IconButton style={{color: 'white'}} onClick={()=> setOpen(true)}><MenuRoundedIcon /></IconButton>
          <Drawer
            anchor={"top"}
            open={open}
            onClose={()=> setOpen(false)}
          >
            <div className="mobile-links">
                <Link style={{color: "white"}} to="/" className={currentPath == "/" ? "active" : ""}>
                    Signup
                </Link>
                <Link
                style={{color: "white"}}
                    to="/podcasts"
                    className={currentPath == "/podcasts" ? "active" : ""}
                >
          Podcasts
        </Link>
        <Link
          to="/create-a-podcast"
          style={{color: "white"}}
          className={currentPath == "/create-a-podcast" ? "active" : ""}
        >
          Start A Podcast
        </Link>
        <Link
          to="/profile"
          style={{color: "white"}}
          className={currentPath == "/profile" ? "active" : ""}
        >
          Profile
        </Link>
      </div>
          </Drawer>
    </div>
  );
}