module.exports.signUpErrors = (err) => {
  let errors = { pseudo: '', email: '', password: '' }

  if(err.message.includes("pseudo"))
    errors.pseudo = "Le pseudo doit contenir au moins 3 caractères"
  
  if(err.message.includes("pseudo") && err.code === 11000)
    errors.pseudo = `Pseudo (${err.keyValue.pseudo}) déjà enregistré`

  if (err.message.includes("email")) 
    errors.email = "L'email est incorrect"

  if (err.message.includes("email") && err.code === 11000) 
    errors.email = `Email (${err.keyValue.email}) déjà enregistré`

  if (err.message.includes("password")) 
    errors.password = "Le mot de passe doit au moins avoir 10 caractères"

  return errors
}

module.exports.signInErrors = (err) => {
  let errors = { email: '', password: '' }

  if (err.message.includes("email")) 
    errors.email = "L'email est incorrect"
    
  if (err.message.includes("email") && err.code === 11000) 
    errors.email = `Email (${err.keyValue.email}) déjà enregistré`

  if (err.message.includes("password")) 
    errors.password = "Le mot de passe doit au moins avoir 10 caractères"

  return errors
}

module.exports.uploadErrors = (file) => {
  let errors = { format: '', maxSize: '' }

  if (file.mimetype !== "image/png" && file.mimetype && "image/jpg" && file.mimetype !== "image/jpeg") 
    errors.format = 'Format incompatible, vous devez choisir pour un format png, jpeg ou jpg'

  if (file.size > 600000)
    errors.maxSize = 'Le fichier dépasse 600ko'

  if (errors.format.length || errors.maxSize.length) return errors
}