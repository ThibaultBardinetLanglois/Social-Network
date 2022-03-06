export const dateParser = (timestamp) => {
  let options = {
    hour: "2-digit",
    minute: "2-digit",
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  }

  let newDate = new Date(timestamp)

  let hours = newDate.getHours()
  let minutes = newDate.getMinutes()

  if (hours < 10) {
    console.log("hours is inferior than 10")
    hours = ('0' + hours.toString())
  }
    
  if (minutes < 10) {
    console.log("minutes is inferior than 10")
    minutes = ('0' + minutes.toString())
  }
    
  
  newDate = newDate.toLocaleDateString('fr-FR', options).split(",")[0]
  
  
  return newDate.toString() + " à " + hours +"h" + minutes
}