import { useState } from "react"

// components
import LeftNav from "../LeftNav"
import UploadImg from "./UploadImg"

// Redux
import { useDispatch, useSelector } from "react-redux"
import { updateBio } from "../../actions/user.actions"

// utils
import { dateParser } from "../utils"


const UpdateProfile = () => {
  const [bio, setBio] = useState('')
  const [updateForm, setUpdateForm] = useState(false)
  const userData = useSelector((state) => state.userReducer)
  const dispatch = useDispatch()
  const [followingPopup, setFollowingPopup] = useState(false)
  const [followersPopup, setFollowersPopup] = useState(false)

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio))
    setUpdateForm(false)
  }

  return (
    <div className="profile-container">
      <LeftNav />
      <h1>
        Profil de { userData.pseudo }
      </h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          { userData.picture !== "" ? (
            <div>
              <img src={'http://localhost:5000/uploads/profile/' + userData.picture} alt="user-pic" />  
            </div>
          ) : (
            <div>
              <p>Vous n'avez pas encore choisi d'image de profil</p>
              <img src='./img/no-profile-picture.png' alt='no-profile-img' />
            </div>
          )}
          <UploadImg />
        </div>  
        <div className="right-part">
            <div className="bio-update">
              <h3>Bio</h3>
              {!updateForm && 
                <>
                  <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                  <button onClick={() => setUpdateForm(!updateForm)}>Modifier bio</button>
                </>
              }
              {updateForm && 
                <>
                  <textarea 
                    type="text" 
                    defaultValue={userData.bio} 
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                  <button onClick={handleUpdate}>Valider les modifications</button>
                </>
              }
            </div>
            <h4>Membre depuis le { dateParser(userData.createdAt) }</h4>
            <h5 onClick={() => setFollowingPopup(true)}>Abonnements : {userData.following ? userData.following.length : ""} </h5>
            <h5 onClick={() => setFollowersPopup(true)}>Abonnés : {userData.followers ? userData.followers.length : ""}</h5>
        </div>
      </div>
      {followingPopup && 
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnements</h3>  
            <span className="cross" onClick={() => setFollowingPopup(false)}>&#10005;</span>
            <ul>
              
            </ul>
          </div>  
        </div>
      }
    </div>
  )
}

export default UpdateProfile
