import { useState } from "react"

// redux
import { useDispatch, useSelector } from "react-redux"
import { uploadPicture } from "../../actions/user.actions"


const UploadImg = () => {
  const [file, setFile] = useState()
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.userReducer)
  const pictureToDelete = userData.picture

  const handlePicture = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("userId", userData._id)
    data.append("file", file)
    data.append("pictureToDelete", pictureToDelete)
    dispatch(uploadPicture(data, userData._id))
  }

  return (
    <form 
      action="" 
      onSubmit={handlePicture} 
      className="upload-pic-form"
    >
      <label htmlFor="upload-profile-img">Changer d'image</label>
      <input 
        type="file" 
        id="upload-profile-img" 
        name="file" 
        accept='.jpg, .jpeg, .png'
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <input type="submit" value="Envoyer" />
    </form>
  )
}

export default UploadImg
