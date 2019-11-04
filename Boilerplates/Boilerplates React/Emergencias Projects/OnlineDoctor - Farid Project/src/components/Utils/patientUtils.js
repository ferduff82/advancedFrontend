export function getAge(patient) {
    if(patient._fullname) {
        let data = patient._fullname.split("#", 5)
        return data[0]
     }
}
export function getGender(patient) {
    if(patient._fullname) {
        let data = patient._fullname.split("#", 5)
        if(data[2] === "M") {
            data = "M"
        } else if (data[2] === "F") {
            data = "F"
        }
        return data
     }
}