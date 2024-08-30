import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import { IoHome } from "react-icons/io5";
import { IoNewspaperSharp } from "react-icons/io5";
import { PiNewspaperClippingFill } from "react-icons/pi";
import { ImPen } from "react-icons/im";
import { useNavigate } from "react-router-dom";



 
function DrawerWithNavigation(props) {
  const [open, setOpen] = React.useState(props.open);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const navigate = useNavigate()
 
  return (
    <React.Fragment>
      <Drawer open={open} onClose={closeDrawer}>
        <div className="mb-2 flex items-center justify-between p-4 text-black">
          <Typography variant="h5" color="blue-gray">
            Blogz
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <List className="text-black">
          <ListItem onClick={() => navigate('/')}>
            <ListItemPrefix className="">
              <IoHome className="w-6 h-6 border"/>
            </ListItemPrefix>
            Home
          </ListItem>
          <ListItem onClick={() => navigate('/blogs')}>
            <ListItemPrefix>
              <IoNewspaperSharp className="w-6 h-6 border"/>
            </ListItemPrefix>
            All blogs
            <ListItemSuffix>
              <Chip
                value="5"
                size="sm"
                color="green"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>
          <ListItem onClick={() => navigate('/my-blogs')}>
            <ListItemPrefix>
              <PiNewspaperClippingFill className="w-6 h-6 border"/>
            </ListItemPrefix>
            My blogs
          </ListItem>
          <ListItem onClick={() => navigate('/create-blog')}>
            <ListItemPrefix>
             <ImPen className="w-6 h-6 border"/>
            </ListItemPrefix>
            Post blog
          </ListItem>
          <ListItem onClick={() => navigate('/account')}>
            <ListItemPrefix>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clipRule="evenodd"
                />
              </svg>
            </ListItemPrefix>
            Account
          </ListItem>
        </List>
       
      </Drawer>
    </React.Fragment>
  );
}

export default DrawerWithNavigation