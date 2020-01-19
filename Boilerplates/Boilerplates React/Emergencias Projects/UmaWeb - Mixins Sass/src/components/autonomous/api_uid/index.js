export const generateUid = {
    uid: null,
    setUid(){
        const date = new Date();
        this.uid = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}_${("0" + (date.getHours() + 1)).slice(-2)}-${("0" + (date.getMinutes() + 1)).slice(-2)}-${("0" + (date.getSeconds() + 1)).slice(-2)}_${date.getMilliseconds()}`;
    },
    getUid(){
        return this.uid;
    }
}
export default generateUid;