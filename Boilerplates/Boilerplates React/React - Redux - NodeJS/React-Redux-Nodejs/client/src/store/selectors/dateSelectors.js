import { createSelector } from 'reselect';

const getCategory = (state) => state
const getType = (state, props) => props

 let currentDate = new Date()
 let delayedTime = currentDate.getTime() - 130000 // Es delayed

  export const getDelayed = createSelector(
    [getCategory],
    (category) => {
          if(category && category !== 'undefined') {
          return category.filter(
            (user) => {
              var startTime = new Date(user.dt_start).getTime()
              var elapsedTime = startTime - delayedTime
              if(elapsedTime < 0) {
                return user
              }
            })
          }
       }
    )
  
  export const getOntime = createSelector(
      [getCategory],
      (category) => {
            if(category && category !== 'undefined') {
            return category.filter(
              (user) => {
                var startTime = new Date(user.dt_start).getTime()
                var elapsedTime = startTime - delayedTime
                if(elapsedTime > 0) {
                  return user
                }
              })
            }
         }
      )

  export const getDelayedArray = createSelector(
    [getCategory, getType],
    (category, type) => {
      if(category && category !== 'undefined') {
        let d100 = [], d120 = [], d140 = [], d160 = [], d180 = []
        category.forEach(
          (user) => {
            if(type === "id") {
              var d = new Date(user.dt_start)
            } else if (type === "service") {
              if(user.dt_start > user.dt_intent) {
                var d = new Date(user.dt_start)
              } else {
                var d = new Date(user.dt_intent)
              }
            } else if (type === "monitor") {
              var d = new Date(user.dt_request)
            } else if (type === "outcome") {
              var d = new Date(user.dt_outcome)
            }
            var startTime = d.getTime()
            var elapsedTime = startTime - delayedTime
            if(elapsedTime > -20000 && elapsedTime < 0) { 
              d100.push(user)
            } else if(elapsedTime > -40000 && elapsedTime < -20000) {
              d120.push(user)
            } else if(elapsedTime > -60000 && elapsedTime < -40000) {
              d140.push(user)
            } else if(elapsedTime > -80000 && elapsedTime < -60000) {
              d160.push(user)
            } else if(elapsedTime < -80000) {
              d180.push(user)
            }
          }
        )
        const delayeds = {
          d100, d120, d140, d160, d180
        }
        return delayeds;
      } 
    }
  )
