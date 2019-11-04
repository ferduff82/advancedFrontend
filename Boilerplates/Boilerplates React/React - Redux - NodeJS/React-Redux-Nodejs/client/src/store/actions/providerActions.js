import DBConnection from '../../components/DBConnection';
import { GET_PROVIDER_AUTH } from '../../constants/ActionTypes';
import { freeRegex, preassignRegex, assignRegex, attRegex } from '../../constants/regEx'

const firestore = DBConnection.firestore(),
// Todavía no está el firebase de Providers con dates. Comentado mientras tanto....
/*     query = firestore.collection('providers_auth').orderBy("dt_start", "desc") */
    query = firestore.collection('providers_auth').orderBy("cuit", "desc")

export const getProviders = (providers) => ({type: GET_PROVIDER_AUTH, payload: providers})

export function getProvidersThunk() {
    return dispatch => {
    query.onSnapshot(function(snapshot) {
        const users = [], free = [], preassign = [], assign = [], att = [], freeDelayed = [], preassignDelayed = [],  assignDelayed = [], attDelayed=[]
        let currentDate = new Date()
            let delayedTime = currentDate.getTime() - 90000 // Es delay a partir de 90 segundos     
            snapshot.forEach((subDoc) => {
                if(subDoc.data().context !== ""){
                let data = subDoc.data()
                // Free
                if(freeRegex.test(data.context)) {
                    let d = new Date(data.dt_start) // Agregar dt_ cuando esté
                    let startTime = d.getTime()
                    let timeAi = startTime - delayedTime
                    // Ontime
                    if(timeAi > 0){
                        free.push(data)
                    } 
                    // Delayed
                    if(timeAi <= 0){
                        freeDelayed.push(data)
                    }
                }
                // Preassign
                if(preassignRegex.test(data.context)) {
                    let d = new Date(data.dt_intent)  // Agregar dt_ cuando esté
                    let timeAi = d.getTime() - delayedTime
                    // Ontime
                        if(timeAi > 0){
                            preassign.push(data)
                        }
                    // Delayed
                    if(timeAi < 0){
                        if(!service.includes(data)) {
                            preassignDelayed.push(data)
                        } 
                    }
                  }
                // Assign 
                if(assignRegex.test(data.context)) {
                    let d = new Date(data.dt_request)  // Agregar dt_ cuando esté
                    let startTime = d.getTime()
                    let timeAi = startTime - delayedTime
                    // Ontime
                    if(timeAi > 0){
                        assign.push(data)
                    }
                    // Delayed
                    if(timeAi <= 0){
                        assignDelayed.push(data)
                    }
                }
                // ATT
                if(attRegex.test(data.context)) {
                    att.push(data)
                }
            }    
            })
            providers.push({free}, {freeDelayed}, {preassign}, {preassignDelayed}, {assign}, {assignDelayed}, {att})
            dispatch(getAuth(providers))
        })
 }
}




