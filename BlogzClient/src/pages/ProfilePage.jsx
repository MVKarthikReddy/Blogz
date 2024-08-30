import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { imageDb } from "../Utils/FireBaseImageStore"
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import notify from "../Utils/notifier/Notifier";

const ProfilePage = () => {
  const state = useSelector((state) => state.user)
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null); //set  to current user image if no new file is uploaded temperory
  const filePickerRef = useRef(); //useRef for  the button to be able to click on it programmatically
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null); // to keep track of how much progress is made in
  const [imageFileUploadError, setImageFileUploadError] = useState(null); // to store any error that might occur during image upload
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: state.currentUser.username,
    email: state.currentUser.email,
    profilePicture: state.currentUser.profilePicture,
    token: state.currentUser.token
  }); // formdata
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); //set  image file to the selected one
      //change into file into url  for previewing
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    console.log(state.currentUser)
    if (imageFile) {
      
      console.log("Form Data :",formData)
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true); // set that we are currently uploading an image
    setImageFileUploadError(null); // resetting error message when a new image is uploaded
    // const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageref = ref(imageDb, fileName); //creating a reference in firebase to store our images
    const uploadTask = uploadBytesResumable(storageref, imageFile); //uploading the file using the method provided by Firebase
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, or resume
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0)); //showing the percentage of how much is uploaded and  tofixed is used for rounded the value 20.33 to 20
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image(File must be less then 2MB)"
        );

        setImageFileUploadProgress(null); // remove the circular loader when error occurs
        setImageFile(null); //remove the image from display once there's been an error
        setImageFileUrl(null); // remove the image URL so no broken image link will show up
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };
  


  //handle changes in input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // form submition for update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    // to wait until image fully uploaded
    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload");
      return;
    }
    try {
      console.log(state.currentUser.token)
      dispatch(updateStart());
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/user/update/${state.currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization : `Bearer ${state.currentUser.token}` 
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        notify(data.message,res.status)
        dispatch(updateFailure(data.message));

        
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/user/delete/${state.currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  /* Sign out function */
  const handleSignout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };





  return (
    <div className="absolute w-11/12 right-0 top-28 ">
        <div className="max-w-lg mx-auto p-3 mb-5 w-full">
            <h1 className="my-7 text-center font-bold text-3xl font-Georgia text-gray-600">
                Profile
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 dark:text-gray-600">
                <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={filePickerRef}
                hidden
                />
                <div
                    className="relative w-32 h-32 self-center cursor-pointer text-gray-600 dark:text-gray-600 shadow-md overflow-hidden rounded-full"
                    onClick={() => filePickerRef.current.click()}
                    >
                    {imageFileUploadProgress && (
                        <CircularProgressbar
                        value={imageFileUploadProgress || 0}
                        text={`${imageFileUploadProgress}%`}
                        strokeWidth={5}
                        styles={{
                            root: {
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            },
                            path: {
                            stroke: `rgba(62,152,199, ${imageFileUploadProgress / 100})`,
                            },
                        }}
                        />
                    )}
                    <img
                        src={imageFileUrl || state.currentUser.profilePicture}
                        alt="user"
                        className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
                        imageFileUploadProgress &&
                        imageFileUploadProgress < 100 &&
                        "opacity-60"
                        }`}
                    />
                </div>
                {imageFileUploadError && (
                <Alert color="failure">{imageFileUploadError}</Alert>
                )}

                <TextInput
                    type="text"
                    id="username"
                    placeholder="username"
                    defaultValue={String(state.currentUser.username)}
                    onChange={handleChange}
                />
                <TextInput
                    type="email"
                    id="email"
                    placeholder="email"
                    defaultValue={String(state.currentUser.email)}
                    onChange={handleChange}
                />
                <TextInput
                    type="password"
                    id="password"
                    placeholder="password"
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    gradientDuoTone="purpleToBlue"
                    outline
                    disabled={state.loading || imageFileUploading}
                    >
                    {state.loading ? "Loading..." : "Update"}
                </Button>
            
            </form>
            <div className="text-red-500 flex justify-between mt-5">
                <span onClick={() => setShowModal(true)} className="cursor-pointer">
                    Delete Account?
                </span>
                <span onClick={handleSignout} className="cursor-pointer">
                    Sign Out
                </span>
            </div>

            {/* create a model for show alert box */}
            <Modal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    popup
                    size="md"
                >
                <Modal.Header />
                <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                    <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete your account?
                    </h3>
                    <div className="flex justify-center gap-4">
                    <Button color="failure" onClick={handleDeleteUser}>
                        Yes, I'm sure
                    </Button>
                    <Button color="gray" onClick={() => setShowModal(false)}>
                        No, cancel
                    </Button>
                    </div>
                </div>
                </Modal.Body>
            </Modal>
        </div>
        <ToastContainer />
    </div>
  );
}

export default ProfilePage