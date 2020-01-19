
import OrderByTime from './OrderByTime';

function filterAssignations(assignations, props) {
    let filterAssignations = assignations.filter(item => 
        item.provider_id === props.userIdB &&        
        item.current_state !== "FREE" &&  
        item.current_state !== "REASSIGN" &&  
        item.current_state !== "DONE" &&
        item.request.autorizado === "1"
    );
    var timeOrdered = OrderByTime(filterAssignations);
    return timeOrdered;
}

export default filterAssignations;